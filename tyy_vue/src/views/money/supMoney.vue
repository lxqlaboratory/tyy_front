<template>
  <div class="app-container">
    <el-dialog v-dialog-drag  :visible.sync="vAddMoney" title="供应商充值">
      <div style="display: flex;align-items: center;justify-content: center;">
        <div class="o-title">给 <span style="color: #66CDAA;">{{' '+addMoneyData.supName+' '}}</span>充值</div>
      </div>


      <div style="margin:15px 0;">
        <el-row>
          <el-col :span="6">
            <label>可用余额</label>
          </el-col>
          <el-col :span="6">
            <price-show :price="addMoneyData.supBalance"></price-show>
          </el-col>
          <el-col :span="6"><label>消费总额</label></el-col>
          <el-col :span="6">
            <price-show :price="addMoneyData.supPayment"></price-show>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <label>联系人</label>

          </el-col>
          <el-col :span="6">
            {{addMoneyData.supContactor}}
          </el-col>
          <el-col :span="6"><label>手机号</label>

          </el-col>
          <el-col :span="6">
            {{addMoneyData.supPhone}}
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <label>所属公司</label>
          </el-col>
          <el-col :span="6">
            {{addMoneyData.supCompany}}
          </el-col>
          <el-col :span="6">
            <label>供应商类型</label>

          </el-col>
          <el-col :span="6">
            {{addMoneyData.supType}}
          </el-col>
        </el-row>
      </div>

      <div style="margin: 15px;">
        <label>充值金额</label>
          <price-input placeholder="请输入充值金额" style="margin-left:15px;width: 30%;" type="number" v-model="addMoneyForm.payment"></price-input>

        </el-input>
      </div>

      <div style="margin: 15px;display: flex;align-items: center">
        <label>备注说明</label>
        <el-input placeholder="可填写充值单详细信息" style="margin-left:15px;width: 60%;" type="textarea"
                  v-model="addMoneyForm.remark"></el-input>
      </div>

      <div style="text-align: center">
        <el-button @click="addSupRecode" style="width: 20%" type="primary">充值</el-button>
      </div>


    </el-dialog>

    <div class="filter-container">
      <div class="filter-item">
        <el-select :value="queryForm.roleId" @change="getList" clearable placeholder="请选择供应商类型"
                   v-model="queryForm.roleId">
          <el-option :key="item.id" :label="item.roleName" :value="item.id" v-for="item in supTypeList"></el-option>
        </el-select>
      </div>

      <div class="filter-item">
        <el-input placeholder="供应商名称" v-model="queryForm.supName"></el-input>

      </div>

      <div class="filter-item">
        <el-input placeholder="供应商所属公司" v-model="queryForm.supCompany"></el-input>
      </div>

      <div class="filter-item">
        <el-input placeholder="联系人" v-model="queryForm.supContactor"></el-input>
      </div>

      <div class="filter-item">
        <el-button @click="getList" icon="el-icon-search" type="primary">查询</el-button>
      </div>

    </div>


    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      stripe
      style="margin-top: 15px;"
      v-loading="onLoading"
    >



      <el-table-column align="center" label="单位名称" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.supName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="供应商类型" min-width="45">
        <template slot-scope="scope">
          <el-tag type="primary"> {{ scope.row.supType }}</el-tag>

        </template>
      </el-table-column>

      <el-table-column align="center" label="联系人" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.supContactor }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属公司" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.supCompany }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="可用余额" min-width="45">
        <template slot-scope="scope">
          <price-show :price="scope.row.supBalance"></price-show>
        </template>
      </el-table-column>


      <el-table-column align="center" label="消费总额" min-width="45">
        <template slot-scope="scope">
          <price-show :price="scope.row.supPayment"></price-show>
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button @click="toJsList(scope.row.supName)" type="primary">流水记录</el-button>
          <el-button v-if="$_has('PAYUPDATE')" @click="addMoney(scope.row)" type="warning">立即充值</el-button>
          <el-button v-if="$_has('PAYUPDATE')" @click="toQdgz(scope.row.supName)" type="success">销账处理</el-button>
          <el-button @click="printSupPay(scope.row.id)" type="info">打印账单</el-button>
        </template>
      </el-table-column>


    </el-table>

    <el-pagination
      :current-page.sync="queryForm.pageNum"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="getList"
      background
      layout="prev, pager, next"
      style="margin-top: 15px;"/>

  </div>
</template>

<script>
    import {editSupRecode, getSupList} from "@/api/money"
    import {getSupType} from "@/api/support"
    import priceShow from '@/views/com/priceShow'
    import priceInput from '@/views/com/priceInput'

    export default {
        name: "supMoney",
        data() {
            return {

                onAddMoney: false,

                vAddMoney: false,
                supTypeList: [],
                onLoading: false,
                list: [],
                total: 0,

                addMoneyForm: {
                    supId: -1,
                    remark: '',
                    payment: 0,
                    recType: 1
                },

                addMoneyData: {
                    id: '',
                    supBalance: '',
                    supCompany: '',
                    supContactor: '',
                    supName: '',
                    supPayment: 0,
                    supType: '',
                    supPhone: ''
                },

                queryForm: {
                    roleId: '',
                    supContactor: '',
                    supName: '',
                    supCompany: '',

                    pageNum: 1,
                    pageSorted: 'desc',
                    pageSize: 10
                }
            }
        },
        created() {
            this.getTypeList()
            this.getList()
        },
        components:{priceShow,priceInput},
        methods: {
            toQdgz(supName) {
                this.$router.push({name: 'supMoneyQdgz', query: {supName}})
            },
            printSupPay(id){
                window.open(process.env.VUE_APP_PRINT_URL+"supPayment?supId="+id);
            },
            addSupRecode() {
                this.onAddMoney = true
                editSupRecode(this.addMoneyForm).then(res => {
                    this.$message({
                        type: "success",
                        message: "充值金额成功"
                    })
                    this.onAddMoney = false
                    this.vAddMoney = false
                    this.getList()
                }).catch(error => {
                    this.onAddMoney = false
                })
            },
            addMoney: function (item) {
                this.vAddMoney = true;
                this.addMoneyData = item;

                this.addMoneyForm =
                    {
                        supId: item.id,
                        remark: '',
                        payment: 0,
                        recType: 1
                    }
            },

            toJsList: function (supName) {
                this.$router.push({name: 'supMoneyList', query: {supName}})
            },

            getTypeList: function () {
                getSupType().then(res => {
                    this.supTypeList = res
                }).catch(error => {
                })
            },

            getList() {
                getSupList(this.queryForm).then(res => {
                    console.log(res)
                    this.list = res.list
                    this.total = res.pagination.total
                }).catch(error => {
                })
            }
        }
    }
</script>

<style scoped>

  .el-col {
    padding: 15px;
    border: 1px solid lightgray;

    text-align: left;
  }

  .el-col label {
    text-align: right;
  }

  .o-title {
    font-weight: bold;
    font-size: 19px;
    background-color: whitesmoke;
    border-radius: 3px;
    color: #333;
    margin: 5px 0;
    padding: 8px 15px;
  }
</style>
