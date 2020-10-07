<template>
  <div class="app-container">


    <el-row align="medium" type="flex">
      <el-col :span="22">
        <div class="filter-container">
          <div class="filter-item">
            <label>申请时间</label>
            <el-date-picker
              :picker-options="pickerOptions"
              end-placeholder="结束日期"
              range-separator="-"
              start-placeholder="开始日期"
              type="daterange"
              v-model="queryForm.createTime"
              value-format="yyyy-MM-dd">
            >
            </el-date-picker>

          </div>


          <div class="filter-item">
            <label>流水号</label>
            <el-input v-model="queryForm.number" clearable></el-input>
          </div>

          <div class="filter-item">
            <label>订单号</label>
            <el-input v-model="queryForm.orderNum" clearable></el-input>
          </div>

          <div class="filter-item">
            <label>抬头</label>
            <el-input v-model="queryForm.company" clearable></el-input>
          </div>
          <div class="filter-item">
            <label>申请人</label>
            <el-input v-model="queryForm.adminName" clearable></el-input>
          </div>
          <div class="filter-item">
            <label>发票代码</label>
            <el-input v-model="queryForm.invCode" clearable></el-input>
          </div>
          <div class="filter-item">
            <label>发票号码</label>
            <el-input v-model="queryForm.invNum" clearable></el-input>
          </div>

          <div class="filter-item">
            <label>状态</label>
            <el-select :value="queryForm.state" v-model="queryForm.state" clearable>
              <el-option :key="-1" label="拒绝" :value="-1"></el-option>
              <el-option :key="1" label="已开票" :value="1"></el-option>
              <el-option :key="0" label="处理中" :value="0"></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <el-button @click="getList" icon="el-icon-search" style="width: 180px" type="primary">查询</el-button>
        <el-button v-if="$_has('INVUPDATE')" @click="$router.push({name:'addInvoice'})" icon="el-icon-plus" style="width: 180px" type="warning">
          申请发票
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

      <el-table-column align="center" label="发票图片" min-width="20">
        <template slot-scope="scope">
          <el-popover placement="right" v-if="scope.row.invImgs">
            <div>
              <el-image :src="scope.row.invImgs" style="max-width: 100%;max-height: 100%;"></el-image>
            </div>
            <el-image :src="scope.row.invImgs" slot="reference" style="width: 100px;height: 50px;"></el-image>
          </el-popover>
          <span style="color:gray" v-else>未上传</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="流水号" min-width="20">
        <template slot-scope="scope">
          {{ scope.row.number}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="发票抬头" min-width="20">
        <template slot-scope="scope">
          {{ scope.row.company}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="金额" min-width="10">
        <template slot-scope="scope">
          <price-show :price="scope.row.price"></price-show>
        </template>
      </el-table-column>

      <el-table-column align="center" label="关联订单" min-width="15">
        <template slot-scope="scope">
          <el-popover

            trigger="click">
            <el-button
              v-for="item in scope.row.orderDetail"
              type="primary" plain
              style="margin-right: 20px"
              @click="$router.push({name:'orderList',params:{orderNum:scope.row.orderNum}})">
              {{ item }}
            </el-button>
            <el-button slot="reference">{{scope.row.orderDetail.length}}</el-button>
          </el-popover>
        </template>
      </el-table-column>


      <el-table-column align="center" label="申请时间" min-width="15">
        <template slot-scope="scope">
          {{scope.row.createTime}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="申请人" min-width="10">
        <template slot-scope="scope">
          {{scope.row.adminName}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="受理状态" min-width="9">
        <template slot-scope="scope">
          <span style="color: green" v-if="scope.row.state===1">已开票</span>
          <span style="color: orangered" v-if="scope.row.state===0">受理中</span>
          <span style="color: black" v-if="scope.row.state===-1">拒绝</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="18">
        <template slot-scope="scope">
          <el-button v-if="$_has('INVUPDATE')" @click="$router.push({name:'addInvoice',query:{id:scope.row.id}})" type="primary">处理</el-button>
          <el-button v-if="$_has('INVUPDATE')" @click="delInvoice(scope.row.id)" type="danger">删除</el-button>
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
    import {getInvList,delInv}  from "@/api/invoice"
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
                    invCode: '',
                    invNum: '',
                    state: '',
                    number: '',
                    company: '',
                    adminName: '',
                    createTime: [],


                    pageNum: 1,
                    pageSorted: 'desc',
                    pageSize: 10
                }
            }
        },
        components:{channelSelect,priceShow},
        created() {
            // this.queryForm.disName = this.$route.query.disName;
            // this.getDisList();
            // this.getPayType();
            this.getList();
        },
        methods: {
            delInvoice(id) {
                this.$confirm('此操作不可撤销，是否继续', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    delInv(id).then(res => {
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

            getList() {
                getInvList(this.queryForm).then(res => {
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
