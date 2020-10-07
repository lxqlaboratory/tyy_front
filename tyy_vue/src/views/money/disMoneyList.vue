<template>
  <div class="app-container">


    <el-row align="medium" type="flex">
      <el-col :span="22">
        <div class="filter-container">
          <div class="filter-item">
            <label>收款日期</label>
            <el-date-picker
              :picker-options="pickerOptions"
              end-placeholder="结束日期"
              range-separator="-"
              start-placeholder="开始日期"
              type="daterange"
              v-model="queryForm.moneyDate"
            >
            </el-date-picker>
          </div>

          <div class="filter-item">
            <label>创建时间</label>
            <el-date-picker
              :picker-options="pickerOptions"
              end-placeholder="结束日期"
              range-separator="-"
              start-placeholder="开始日期"
              type="daterange"
              v-model="queryForm.createTime"
            >
            </el-date-picker>

          </div>


          <div class="filter-item">
            <label>订单编号</label>
            <el-input v-model="queryForm.moneyNum"></el-input>


          </div>

          <div class="filter-item">
            <label>账单编号</label>
            <el-input v-model="queryForm.orderNum"></el-input>


          </div>


          <div class="filter-item">
            <label>分销商名</label>
            <el-input v-model="queryForm.disName"></el-input>

          </div>

          <div class="filter-item">
            <label>分销商省份</label>
            <el-select :value="queryForm.disProvince" v-model="queryForm.disProvince">
              <el-option :key="item" :label="item" :value="item" v-for="item in provinceList"></el-option>
            </el-select>

          </div>


          <div class="filter-item">
            <label>分销商城市</label>
            <el-select :value="queryForm.disCity" v-model="queryForm.disCity">
              <el-option :key="item" :label="item" :value="item" v-for="item in cityList"></el-option>
            </el-select>
          </div>

          <div class="filter-item">
            <label>支付方式</label>
<!--            <el-select :value="queryForm.payType" v-model="queryForm.payType">-->
<!--              <el-option :key="item.code" :label="item.description" :value="item.code"-->
<!--                         v-for="item in payTypeList"></el-option>-->
<!--            </el-select>-->
            <channel-select :pay-type.sync="queryForm.payType"></channel-select>

          </div>


          <div class="filter-item">
            <label>收款人</label>
            <el-input v-model="queryForm.payee"></el-input>

          </div>


        </div>
      </el-col>
      <el-col :span="2">
        <el-button @click="getList" size="medium" style="padding: 20px 35px 20px 35px;font-size: 15px;"
                   type="primary">
          查询
        </el-button>
      </el-col>
    </el-row>


    <el-table
      :data="list"
      autocapitalize="words"
      border
      highlight-current-row
      stripe
      style="margin-top: 15px;"
      v-loading="onLoading"
    >

      <el-table-column align="center" label="报账凭证" min-width="20">
        <template slot-scope="scope">
          <el-popover placement="right" v-if="scope.row.payImage">
            <div>
              <el-image :src="scope.row.payImage" style="max-width: 100%;max-height: 100%;"></el-image>
            </div>
            <el-image :src="scope.row.payImage" slot="reference" style="width: 100px;height: 50px;"></el-image>
          </el-popover>
          <span style="color:gray" v-else>未上传</span>
        </template>
      </el-table-column>



      <el-table-column align="center" label="账单编号" min-width="20">
        <template slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.payType==='抹零'">抹零账单</el-tag>
          {{ scope.row.payNum}}


        </template>
      </el-table-column>


      <el-table-column align="center" label="分销商" min-width="10">
        <template slot-scope="scope">
          {{scope.row.disName}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="订单编号" min-width="15">
        <template slot-scope="scope">
          {{ scope.row.orderNum}}
        </template>
      </el-table-column>


      <el-table-column align="center" label="产品名" min-width="15">
        <template slot-scope="scope">
          <el-button @click="toProduct(scope.row.proId)" type="text">{{scope.row.proName}}</el-button>
        </template>
      </el-table-column>


      <el-table-column align="center" label="金额" min-width="7">
        <template slot-scope="scope">
          <price-show :price="scope.row.payment"></price-show>
        </template>
      </el-table-column>


      <el-table-column align="center" label="收款日期" min-width="10">
        <template slot-scope="scope">
          {{ scope.row.payTime.substr(0,10)}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间" min-width="10">
        <template slot-scope="scope">
          {{scope.row.createTime.substr(0,10)}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="收款方式" min-width="9">
        <template slot-scope="scope">
          {{ scope.row.payType}}
        </template>
      </el-table-column>


      <el-table-column align="center" label="备注" min-width="15">
        <template slot-scope="scope">
          {{scope.row.remark}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="收款人" min-width="7">
        <template slot-scope="scope">
          {{scope.row.payee}}
        </template>
      </el-table-column>


      <el-table-column align="center" label="审核人" min-width="7">
        <template slot-scope="scope">
          {{scope.row.checker}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="18">
        <template slot-scope="scope">
          <el-button @click="changeState(scope.row.id,1)" type="primary" v-if="scope.row.checkState===0 &&$_has('PAYUPDATE')">审批</el-button>
          <el-button @click="changeState(scope.row.id,0)" type="warning" v-if="scope.row.checkState===1&&$_has('PAYUPDATE')">取消审批
          </el-button>
          <el-button @click="delMoney(scope.row.id)" type="danger" v-if="scope.row.checkState===0&&$_has('PAYUPDATE')">删除</el-button>
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

    //批量结算界面。显示 已审核的 未结算的 属于特定分销商的 所有订单。复用 getOrders接口 使用前端分页 不筛选
    import {getDisList} from "@/api/distribute";
    import {changeMoneyState, delMoney, getPayType} from "@/api/order";
    import {getDisPayList} from "@/api/money";
    import channelSelect from "@/views/money/channelSelect"
    import priceShow from '@/views/com/priceShow'



    export default {
        name: "disMoneyList",
        data() {
            return {
                //分销商账目页面传过来的disId 复用getOrders接口得到 页面
                disName: '',
                list: [],
                onLoading: true,
                //分销商列表。只用来set出省份和城市
                disList: [],


                // payTypeList: [],

                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                total: 0,

                queryForm: {
                    moneyDate: [],
                    orderNum: '',
                    moneyNum: '',
                    disName: '',
                    disProvince: '',
                    disCity: '',
                    payType: '',
                    createTime: [],
                    payee: '',


                    pageNum: 1,
                    pageSorted: 'desc',
                    pageSize: 10
                }
            }
        },
        components:{channelSelect,priceShow},
        computed: {
            provinceList() {
                return Array.from(new Set(this.disList.map(item => item.disProvince)));
            },
            cityList() {
                return Array.from(new Set(this.disList.map(item => item.disCity)));
            }
        },
        created() {
            this.queryForm.disName = this.$route.query.disName;
            this.getDisList();
            // this.getPayType();
            this.getList();
        },
        methods: {
            delMoney(id) {
                this.$confirm('此操作不可撤销，是否继续', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    delMoney(id).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        this.getList()
                    }).catch(error => {
                    })
                });
                console.log(id)
            },

            changeState(id, state) {
                changeMoneyState(id, state).then(res => {
                    this.$message({type: 'success', message: '账单状态变更成功'});
                    this.getList()
                }).catch(error => {
                })
            },

            getDisList() {
                getDisList().then(res => {
                    this.disList = res
                }).catch(error => {
                })
            },

            toProduct(id) {
                this.$router.push({name: 'AddProduction', query: {id}})
            },
            getList() {
                getDisPayList(this.queryForm).then(res => {
                    console.log(res)
                    this.onLoading = false
                    this.list = res.list
                    this.total = res.pagination.total
                }).catch(error => {
                })
            }
        }


    }
</script>

<style scoped>

</style>
