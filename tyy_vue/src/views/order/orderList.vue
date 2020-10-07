<template>
  <div class="app-container">
    <el-row align="middle" type="flex">
      <el-col :span="22">
        <el-row :gutter="5">
          <el-col :span="4">
            <label>产品分类</label>
            <el-select :value="queryForm.proType_1" clearable v-model="queryForm.proType_1">
              <el-option :key="item.id" :label="item.proTypeName" :value="item.id"
                         v-for="item in initList.proTypeList"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <label>二级分类</label>
            <el-select :value="queryForm.proType_2" clearable v-model="queryForm.proType_2">
              <el-option :key="item.id" :label="item.proTypeName" :value="item.id"
                         v-for="item in proTypeList_2"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <label>服务类型</label>
            <el-select :value="queryForm.serType" clearable v-model="queryForm.serType">
              <el-option :key="item.id" :label="item.serviceName" :value="item.id"
                         v-for="item in initList.serTypeList"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <label>产品名称</label>
            <el-input v-model="queryForm.proName"></el-input>
          </el-col>

          <el-col :span="4">
            <label>产品编号</label>
            <el-input v-model="queryForm.proNum"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="5" style="margin-top: 15px;">
          <el-col :span="4">
            <label>分销商类</label>
            <el-select :value="queryForm.disType" clearable v-model="queryForm.disType">
              <el-option :key="item.id" :label="item.roleName" :value="item.id"
                         v-for="item in initList.disTypeList"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <label>分销商名</label>
            <el-input v-model="queryForm.disName"></el-input>
          </el-col>
          <el-col :span="4">
            <label>计划编号</label>
            <el-input v-model="queryForm.planNum"></el-input>
          </el-col>

          <el-col :span="4">
            <label>团队状态</label>
            <el-select :value="queryForm.groupState" clearable v-model="queryForm.groupState">
              <el-option :value="1" label="已拼团"></el-option>
              <el-option :value="0" label="未拼团"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <label>团队编号</label>
            <el-input v-model="queryForm.groupNum"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="5" style="margin-top: 15px;">
          <el-col :span="4">
            <label>订单编号</label>
            <el-input v-model="queryForm.orderNum"></el-input>
          </el-col>


          <el-col :span="4">
            <label>订单状态</label>
            <el-select :disabled="isWsh" :value="queryForm.orderState" clearable v-model="queryForm.orderState">
              <el-option :value="1" label="已审核"></el-option>
              <el-option :value="0" label="未审核"></el-option>
              <el-option :value="-1" label="已拒绝"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <label>欠费状态</label>
            <el-select :disabled="isQf" :value="queryForm.orderPayState" clearable v-model="queryForm.orderPayState">
              <el-option :value="true" label="已结清"></el-option>
              <el-option :value="false" label="未结清"></el-option>
            </el-select>
          </el-col>

        </el-row>
        <el-row :gutter="5" style="margin-top: 15px;">
          <el-col :span="8">
            <label>出团日期</label>
            <el-date-picker
              :picker-options="TravelRangeOptions"
              end-placeholder="结束日期"
              range-separator="至"
              start-placeholder="开始日期"
              type="daterange"
              v-model="queryForm.travelDate"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-col>
          <el-col :span="8">
            <label>下单日期</label>
            <el-date-picker
              :picker-options="OrderRangeOptions"
              end-placeholder="结束日期"
              range-separator="至"
              start-placeholder="开始日期"
              type="daterange"
              v-model="queryForm.orderDate"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="2" style="display: flex;flex-direction: column;align-items: flex-start;justify-content: flex-end">

          <el-button @click="getList" size="medium"
                     style="padding: 20px 35px 20px 35px;font-size: 15px;margin-bottom: 15px" type="primary">
            查询
          </el-button>
          <el-popover
            placement="left"
            trigger="click"
            width="800">

            <div>
              <el-checkbox v-model="listTitleFilter.orderNum"  @change="saveLocalStorge">订单号</el-checkbox>
              <el-checkbox v-model="listTitleFilter.proName"  @change="saveLocalStorge">产品名</el-checkbox>
              <el-checkbox v-model="listTitleFilter.groupState"  @change="saveLocalStorge">拼团状态</el-checkbox>
              <el-checkbox v-model="listTitleFilter.travelDate" @change="saveLocalStorge">出团日期</el-checkbox>
              <el-checkbox v-model="listTitleFilter.touNum" @change="saveLocalStorge">游客数</el-checkbox>
              <el-checkbox v-model="listTitleFilter.disName" @change="saveLocalStorge">分销商</el-checkbox>
              <el-checkbox v-model="listTitleFilter.payCharge" @change="saveLocalStorge">应收款</el-checkbox>
              <el-checkbox v-model="listTitleFilter.paid" @change="saveLocalStorge">实收款</el-checkbox>
              <el-checkbox v-model="listTitleFilter.arrears" @change="saveLocalStorge">欠款</el-checkbox>
              <el-checkbox v-model="listTitleFilter.loss" @change="saveLocalStorge">损耗</el-checkbox>
              <el-checkbox v-model="listTitleFilter.adminUser" @change="saveLocalStorge">录入人员</el-checkbox>
              <el-checkbox v-model="listTitleFilter.state" @change="saveLocalStorge">订单状态</el-checkbox>

            </div>



            <el-button slot="reference">列筛选</el-button>
          </el-popover>

      </el-col>
    </el-row>

    <el-divider></el-divider>

    <el-dialog :close-on-click-modal="false" :visible.sync="v_addTou" title="录入游客" v-dialog-drag width="80vw">
      <order-toulist :orderid="id_addTou" :tou-max="tou_max"></order-toulist>
    </el-dialog>

    <el-table
      :data="list"
      border
      highlight-current-row
      ref="mtable"
      stripe
      style="margin-top: 15px;"
      v-loading="onLoading"
    >


      <el-table-column align="center" type="selection" width="65"></el-table-column>
      <el-table-column v-if="listTitleFilter.orderNum" align="center" label="订单号" prop="orderNum" width="150"></el-table-column>

      <el-table-column align="center" label="产品名" v-if="listTitleFilter.proName"  width="250">
        <template slot-scope="scope">
          <el-button @click="toProduct(scope.row.proNum,scope.row.proSertype)" style="font-size: 13px;"
                     type="text" v-if="scope.row.proSertype===1">【散客】{{scope.row.proName}}
          </el-button>
          <el-button @click="toProduct(scope.row.proNum,scope.row.proSertype)" style="font-size: 13px;"
                     type="text" v-if="scope.row.proSertype===2">【团队】{{scope.row.proName}}
          </el-button>
        </template>
      </el-table-column>


      <el-table-column v-if="listTitleFilter.groupState" align="center" label="拼团状态" width="150">
        <template slot-scope="scope">

          <el-button @click="toGroup(scope.row.groupNum,scope.row.proSertype)" style="font-size: 13px;"
                     type="text" v-if="scope.row.groupNum">【团队】{{scope.row.groupName}}
          </el-button>
          <span style="color: orangered" v-else>未拼团</span>
        </template>
      </el-table-column>


      <el-table-column v-if="listTitleFilter.travelDate" align="center" label="出团日期" width="100">
        <template slot-scope="scope">
          {{ scope.row.travelDate.substr(0,10) }}
        </template>
      </el-table-column>
      <el-table-column v-if="listTitleFilter.touNum" align="center" label="游客数" width="250">
        <template slot-scope="scope">
          <el-button @click="openAddTou(scope.row.id,scope.row.touNum)" size="mini"> {{ scope.row.touNum}}人</el-button>
          <order-tou-contract :order-id="scope.row.id"></order-tou-contract>
        </template>
      </el-table-column>

      <el-table-column v-if="listTitleFilter.disName" align="center" label="分销商" width="150">
        <template slot-scope="scope">
          <el-button @click="$router.push({name:'DisList',params:{disName:scope.row.disName}})" type="text"> {{
            scope.row.disName}}
          </el-button>
          <el-tag type="info" v-if="scope.row.disIsBlack===1">赖账</el-tag>
        </template>
      </el-table-column>


      <el-table-column v-if="listTitleFilter.payCharge" align="center" label="应收款" width="100">
        <template slot-scope="scope">
          <price-show :price="scope.row.payCharge"></price-show>
        </template>

      </el-table-column>


      <el-table-column v-if="listTitleFilter.paid" align="center" label="实收款" width="100">
        <template slot-scope="scope">
          <price-show :price="scope.row.paid"></price-show>
        </template>
      </el-table-column>
      <el-table-column v-if="listTitleFilter.arrears" align="center" label="欠款" width="100">
        <template slot-scope="scope">
          <price-show :price="scope.row.arrears"></price-show>
        </template>

      </el-table-column>

      <el-table-column v-if="listTitleFilter.loss" align="center" label="损耗" width="100">
        <template slot-scope="scope">
          <price-show :price="scope.row.loss"></price-show>
        </template>

      </el-table-column>

      <el-table-column v-if="listTitleFilter.adminUser" align="center" label="录入人员" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.adminUser}}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="listTitleFilter.state" align="center" label="订单状态" width="80">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.groupNum&&scope.row.state===1">已拼团</el-tag>
          <el-tag type="primary" v-if="!scope.row.groupNum&&scope.row.state===1">已审核</el-tag>
          <el-tag type="danger" v-if="scope.row.state!==1">未审核</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" fixed="right" label="操作" min-width="300">
        <template slot-scope="scope">
          <order-info :order-state="scope.row.state" :orderId="scope.row.id" @refresh="getList"></order-info>
        </template>
      </el-table-column>

    </el-table>

    <div style="display: flex;align-items: center;margin-top: 15px;">

      <el-pagination
        :current-page.sync="queryForm.pageNum"
        :page-size="queryForm.pageSize"
        :total="total"
        @current-change="getList"
        background
        layout="prev, pager, next"
      />
      <div>
        <el-select :value="queryForm.pageSize" @change="getList" style="margin-left:  5px;"
                   v-model="queryForm.pageSize">
          <el-option :value="10" label="10条/页"></el-option>
          <el-option :value="20" label="20条/页"></el-option>
          <el-option :value="30" label="30条/页"></el-option>
          <el-option :value="40" label="40条/页"></el-option>
          <el-option :value="50" label="50条/页"></el-option>
          <el-option :value="100" label="100条/页"></el-option>
          <el-option :value="500" label="500条/页"></el-option>
        </el-select>

        <el-button @click="export2Excel('xlsx')" icon="el-icon-document" style="margin-left: 15px" type="primary">
          导出选中条目(Excel)
        </el-button>

        <el-button @click="export2Excel('csv')" icon="el-icon-document" style="margin-left: 15px" type="success">
          导出选中条目(Csv)
        </el-button>

      </div>

    </div>


  </div>
</template>

<script>
  import {getProTye, getSerTypes} from "@/api/production"
  import {getDisType} from "@/api/distribute"
  import {getOrders} from "@/api/order"
  import orderInfo from "@/views/order/orderInfo"

  import OrderToulist from "@/views/order/orderToulist"
  import priceShow from '@/views/com/priceShow'
  import priceInput from '@/views/com/priceInput'
  import {parseTime} from "@/utils/index"
  import OrderTouContract from "@/views/order/orderTouContract"


  export default {
    name: "orderList",
    data() {
      return {
        listTitleFilter:{
          orderNum:true,
          proName:true,
          groupState:true,
          travelDate:true,
          touNum:true,
          disName:true,
          payCharge:true,
          paid:true,
          arrears:true,
          loss:true,
          adminUser:true,
          state:true
        },
        v_addTou: false,
        id_addTou: -1,
        tou_max: 10000,


        isQf: false,
        isWsh: false,
        total: 0,
        list: [],
        onLoading: false,
        TravelRangeOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        OrderRangeOptions: {
          shortcuts: [{
            text: '过去一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '过去一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '过去三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },

        initList: {
          proTypeList: [],
          serTypeList: [],
          disTypeList: []
        },
        //要打开的那个组件的Num

        queryForm: {
          proName: '',
          proNum: '',
          serType: '',
          planNum: '',
          //是否已经拼团
          groupState: '',
          groupNum: '',
          travelDate: [],
          orderNum: '',
          orderState: '',
          disType: '',
          disName: '',

          proType_1: '',
          proType_2: '',

          orderPayState: '',
          //下单日期，一个范围
          orderDate: [],


          pageNum: 1,
          pageSorted: 'desc',
          pageSize: 10
        }
      }
    },

    components: {OrderTouContract, OrderToulist, orderInfo, priceInput, priceShow},
    created() {





      if (this.$route.name === 'qforderList') {
        this.queryForm.orderPayState = false
        this.isQf = true
      }

      if (this.$route.name === 'wshorderList') {
        this.queryForm.orderState = 0
        this.isWsh = true
      }


      if (this.$route.query.planNum) {
        this.queryForm.planNum = this.$route.query.planNum
      }

      if (this.$route.query.orderNum) {
        this.queryForm.orderNum = this.$route.query.orderNum
      }


      if (this.$route.params.planNum) {
        this.queryForm.planNum = this.$route.params.planNum
      }

      if (this.$route.params.proNum) {
        this.queryForm.proNum = this.$route.params.proNum
      }

      if (this.$route.params.orderNum) {
        this.queryForm.orderNum = this.$route.params.orderNum
      }


      if (this.$route.params.groupNum) {
        this.queryForm.groupNum = this.$route.params.groupNum
      }

      if (this.$route.params.disName) {
        this.queryForm.disName = this.$route.params.disName
      }

      this.initQueryList()
      this.getList()

      //取回用户基础设置
      let localStorage=window.localStorage
      let str=localStorage['listTitleFilter']
      if(str){
        let listTitleFilter=JSON.parse(str)
        this.listTitleFilter=Object.assign({},this.listTitleFilter,listTitleFilter)
      }
    },
    computed: {
      proTypeList_2() {
        if (this.queryForm.proType_1) {
          return this.initList.proTypeList.find(item => (item.id === this.queryForm.proType_1)).children
        }
        return []
      }
    },
    methods: {
      //将用户个人选项写回前端缓存
      saveLocalStorge(){
        let str=JSON.stringify(this.listTitleFilter)
        let localStorage=window.localStorage
        localStorage['listTitleFilter']=str
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },

      export2Excel(bookType) {

        if (this.$refs.mtable.selection.length === 0) {
          this.$message({
            type: 'error',
            message: '您未选中任何订单'
          })
          return
        }

        this.$message({
          type: 'success',
          message: '导出' + this.$refs.mtable.selection.length + '条记录成功'
        })

        let filename = new Date().toLocaleString() + "订单列表导出"
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['订单号', '产品名', '团队名', '出团日期', '游客数', '分销商', '应收款', '实收款', '欠款', '损耗', '录入人员']


          let templistArray = []
          this.$refs.mtable.selection.forEach(item => {
            templistArray[templistArray.length] = [item.orderNum, item.proName, item.groupName, item.collectTime, item.touNum, item.disName, item.payCharge, item.paid, item.arrears, item.loss, item.adminUser]
          })

          excel.export_json_to_excel({
            header: tHeader,
            data: templistArray,
            filename,
            autoWidth: true,
            bookType
          })
        })
      },


      openAddTou(id, tou_max) {
        this.id_addTou = id
        this.tou_max = tou_max
        this.v_addTou = true
      },
      toGroup(groupNum, proSerType) {
        if (proSerType === 1) {
          this.$router.push({name: 'group', query: {groupNum}})
        }
        if (proSerType === 2) {
          this.$router.push({name: 'groupDl', query: {groupNum}})
        }

      },
      toProduct(proNum, proSerType) {
        if (proSerType === 1) {
          this.$router.push({name: 'ProList', query: {proNum}})
        }
        if (proSerType === 2) {
          this.$router.push({name: 'ProTeam', query: {proNum}})
        }
      },


      getList() {
        this.onLoading = true
        getOrders(this.queryForm).then(res => {
          console.log(res.list)
          this.list = res.list
          this.total = res.pagination.total
          this.onLoading = false

          if (this.$route.params.action === 'openTouList' && this.id_addTou === -1) {
            this.id_addTou = this.list.find(item => (item.orderNum === this.$route.params.orderNum)).id
            this.v_addTou = true
          }

        }).catch(error => {
          this.onLoading = false
        })
      },

      initQueryList() {
        getProTye().then(res => {
          this.initList.proTypeList = res
        }).catch(error => {
        })
        getSerTypes().then(res => {
          this.initList.serTypeList = res
        }).catch(error => {
        })
        getDisType().then(res => {
          this.initList.disTypeList = res
        }).catch(error => {
        })
      }
    }
  }
</script>

<style scoped>
  label {
    width: 40%;
    font-size: 14px;
  }

  .el-input {
    max-width: 62%;
  }

  .el-select {
    max-width: 62%;
  }

</style>
