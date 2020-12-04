<template>
  <div class="app-container">
    <el-dialog v-dialog-drag  :visible.sync="v_addGroup" style="width: 100%;" title="创建团队">
      <el-form :model="groupAddForm" label-width="80px" ref="addGroup">
        <el-form-item
          :rules=" [{ required: true, message: '请输入活动名称', trigger: 'blur' },  { min: 3, max:25, message: '长度在 3 到 25 个字符', trigger: 'blur' }]"
          label="团队名"
          prop="groupName">
          <el-input placeholder="请输入团队名" v-model="groupAddForm.groupName"></el-input>
        </el-form-item>

        <el-form-item
          :rules=" [{ required: true}]"
          label="出团日期"
          prop="groupDate">
          <div style="display: flex;align-items: center;justify-content: flex-start;flex-wrap: wrap;margin-left: 0px;">
            <el-date-picker placeholder="请选择出团日期" v-model="groupAddForm.groupDate"
                            value="yyyy-MM-dd" type="date"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="选择导游" required>
          <el-select :value="groupAddForm.guiderTypeId" @change="groupAddForm.guiderId=''" placeholder="筛选导游类型"
                     v-model="groupAddForm.guiderTypeId">
            <el-option :key="item.id" :label="item.guiderTypeName" :value="item.id"
                       v-for="item in initData.guiderTypeList"></el-option>
          </el-select>
          <el-select :value="groupAddForm.guiderId" placeholder="选择导游" v-model="groupAddForm.guiderId">
            <el-option :key="item.id"
                       :label="item.guiderName" :value="item.id"
                       v-for="item in initData.guiderList.filter(item=>(item.typeId===groupAddForm.guiderTypeId))"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选择车辆" required>
          <el-select :value="groupAddForm.carTypeId" @change="groupAddForm.carId=''" placeholder="筛选车型"
                     v-model="groupAddForm.carTypeId">
            <el-option :key="item.id" :label="item.typeName" :value="item.id"
                       v-for="item in initData.carTypeList"></el-option>
          </el-select>
          <el-select :value="groupAddForm.carId" placeholder="选择车辆" v-model="groupAddForm.carId">
            <el-option :key="item.id"
                       :label="item.carName" :value="item.id"
                       v-for="item in initData.carList.filter(item=>(item.carType===groupAddForm.carTypeId))"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="团队备注">
          <el-input :rules=" [ { min: 0, max:500, message: '长度小于500字符', trigger: 'blur' }]" placeholder="简单记录团队情况"
                    type="textarea"
                    v-model="groupAddForm.groupDes"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="onSubmit">立即创建</el-button>
          <el-button @click="v_addGroup = false" >取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row align="middle" type="flex">
      <el-col :span="22">
        <el-row :gutter="5" style="margin-top: 15px;">
          <el-col :span="4">
            <label>所属计划编号</label>
            <el-input v-model="queryForm.planNum"></el-input>
          </el-col>
          <el-col :span="4">
            <label>订单编号</label>
            <el-input v-model="queryForm.orderName"></el-input>
          </el-col>
          <el-col :span="4">
            <label>集合地点</label>
            <el-input v-model="queryForm.location"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button @click="getList" type="primary">
              查询
            </el-button>
            <el-button  @click="toGro"  icon="el-icon-plus" type="primary">
              创建团队
            </el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="2" style="display: flex;flex-direction: column;align-items: flex-start;justify-content: flex-end">
        <el-popover
          placement="left"
          trigger="click"
          width="800">
          <div>
            <el-checkbox v-model="listTitleFilter.orderNum"  @change="saveLocalStorge">订单号</el-checkbox>
            <el-checkbox v-model="listTitleFilter.location"  @change="saveLocalStorge">集合地点</el-checkbox>
            <el-checkbox v-model="listTitleFilter.groupState"  @change="saveLocalStorge">拼团状态</el-checkbox>
            <el-checkbox v-model="listTitleFilter.productName"  @change="saveLocalStorge">产品名称</el-checkbox>
            <el-checkbox v-model="listTitleFilter.disName"  @change="saveLocalStorge">分销商名称</el-checkbox>
            <el-checkbox v-model="listTitleFilter.travelDate" @change="saveLocalStorge">出团日期</el-checkbox>
            <el-checkbox v-model="listTitleFilter.touNum" @change="saveLocalStorge">游客数</el-checkbox>
            <el-checkbox v-model="listTitleFilter.creatTime" @change="saveLocalStorge">创建时间</el-checkbox>
            <el-checkbox v-model="listTitleFilter.shoudPay" @change="saveLocalStorge">应收款</el-checkbox>
            <el-checkbox v-model="listTitleFilter.hashPay" @change="saveLocalStorge">实收款</el-checkbox>
            <el-checkbox v-model="listTitleFilter.arrPay" @change="saveLocalStorge">欠款</el-checkbox>
            <!--<el-checkbox v-model="listTitleFilter.loss" @change="saveLocalStorge">损耗</el-checkbox>-->
            <!--<el-checkbox v-model="listTitleFilter.adminUser" @change="saveLocalStorge">录入人员</el-checkbox>-->
            <!--<el-checkbox v-model="listTitleFilter.state" @change="saveLocalStorge">订单状态</el-checkbox>-->

          </div>
          <el-button slot="reference">列筛选</el-button>
        </el-popover>
      </el-col>
    </el-row>

    <el-divider></el-divider>

    <el-dialog :close-on-click-modal="false" :visible.sync="v_addTou" title="游客信息" v-dialog-drag width="80vw">
      <el-table :data="tourList" border
                ref="mtable"
                stripe>
        <el-table-column type="selection"></el-table-column>

        <el-table-column align="center" label="游客类型">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.identity===1">成人</el-tag>
            <el-tag type="warning" v-if="scope.row.identity===2">儿童</el-tag>
            <el-tag type="success" v-if="scope.row.identity===3">老人</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="游客姓名">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column align="center" label="游客性别">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.sex===1">男</el-tag>
            <el-tag type="warning" v-if="scope.row.sex===0">女</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="游客年龄">
          <template slot-scope="scope">{{scope.row.age}}</template>
        </el-table-column>
        <el-table-column align="center" label="证件类型">

          <template slot-scope="scope">{{scope.row.cerType}}</template>
        </el-table-column>
        <el-table-column align="center" label="证件号码">
          <template slot-scope="scope">{{scope.row.cerNum}}</template>
        </el-table-column>
        <el-table-column align="center" label="联系电话">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column align="center" label="备注">
          <template slot-scope="scope">{{scope.row.remark}}</template>
        </el-table-column>
        <!--<el-table-column align="center" label="操作" width="350px">-->
        <!--<template slot-scope="scope">-->
        <!--<div>-->
        <!--<el-button @click="editTou(scope.row)" type="primary">编辑</el-button>-->
        <!--<el-button @click="delTou(scope.row.id)" type="danger">删除</el-button>-->
        <!--<el-button @click="editIsBlack(scope.row.id,1)" type="warning" v-if="scope.row.isBlack===0">拉黑</el-button>-->
        <!--<el-button @click="editIsBlack(scope.row.id,0)" type="success" v-if="scope.row.isBlack===1">恢复</el-button>-->
        <!--</div>-->

        <!--</template>-->
        <!--</el-table-column>-->

      </el-table>

    </el-dialog>

    <el-table
      :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      border
      highlight-current-row
      ref="mtable"
      stripe
      style="margin-top: 15px;"
      v-loading="onLoading"
    >


      <el-table-column align="center" type="selection" width="65"></el-table-column>
      <el-table-column v-if="listTitleFilter.orderNum" align="center" label="订单号" prop="orderNum" width="200">
        <template slot-scope="scope">
          {{ scope.row.orderName }}
        </template>
      </el-table-column>

      <!--<el-table-column align="center" label="产品名" v-if="listTitleFilter.proName"  width="250">-->
      <!--<template slot-scope="scope">-->
      <!--<el-button @click="toProduct(scope.row.proNum,scope.row.proSertype)" style="font-size: 13px;"-->
      <!--type="text" v-if="scope.row.proSertype===1">【散客】{{scope.row.proName}}-->
      <!--</el-button>-->
      <!--<el-button @click="toProduct(scope.row.proNum,scope.row.proSertype)" style="font-size: 13px;"-->
      <!--type="text" v-if="scope.row.proSertype===2">【团队】{{scope.row.proName}}-->
      <!--</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->


      <el-table-column v-if="listTitleFilter.groupState" align="center" label="订单状态" width="150">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.groupId===0">未拼团</el-tag>
          <el-tag type="warning" v-else>已拼团</el-tag>
        </template>
      </el-table-column>

      <el-table-column v-if="listTitleFilter.productName"  align="center" label="产品名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.productName}}
        </template>
      </el-table-column>

      <el-table-column v-if="listTitleFilter.disName"  align="center" label="分销商名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.disName}}
        </template>
      </el-table-column>

      <el-table-column v-if="listTitleFilter.travelDate" align="center" label="出团日期" width="150">
        <template slot-scope="scope">
          {{ scope.row.travelDate }}
        </template>
      </el-table-column>

      <el-table-column v-if="listTitleFilter.location" align="center" label="集合地点" width="200">
        <template slot-scope="scope">
          {{ scope.row.location}}
        </template>
      </el-table-column>

      <el-table-column v-if="listTitleFilter.touNum" align="center" label="游客数" width="250">
        <template slot-scope="scope">
          <el-button @click="openAddTou(scope.row.orderId)" size="mini"> {{ scope.row.tourNum}}人</el-button>
          <order-tou-contract :order-id="scope.row.id"></order-tou-contract>
        </template>
      </el-table-column>

      <el-table-column v-if="listTitleFilter.shoudPay" align="center" label="应收款" width="100">
        <template slot-scope="scope">
          {{ scope.row.shoudPay}}元
        </template>
      </el-table-column>

      <el-table-column v-if="listTitleFilter.hashPay" align="center" label="实收款" width="100">
        <template slot-scope="scope">
          {{ scope.row.hashPay}}元
        </template>
      </el-table-column>

      <el-table-column v-if="listTitleFilter.arrPay" align="center" label="欠款" width="100">
        <template slot-scope="scope">
          {{ scope.row.arrPay}}元
        </template>
      </el-table-column>

      <el-table-column v-if="listTitleFilter.creatTime" align="center" label="创建时间" width="250">
        <template slot-scope="scope">
          {{ scope.row.creatTime}}
        </template>
      </el-table-column>


      <el-table-column align="center" fixed="right" label="操作" min-width="300">
        <template slot-scope="scope">
          <wc-order-info :order-state="scope.row.state" :orderId="scope.row.orderId" @refresh="getList"></wc-order-info>
          <!--<el-button v-if ="$_has('ORDERUPDATE')" :type="orderState===1?'primary':'primary'"-->
          <!--@click="getData(scope.row.id)" icon="el-icon-edit" size="mini">处理</el-button>-->
          <!--<el-button @click="printOrder(scope.row)" icon="el-icon-printer" size="mini">打印</el-button>-->
          <!--<el-button @click="delOrder(scope.row.orderId)" icon="el-icon-delete" size="mini" type="danger">删除</el-button>-->
        </template>
      </el-table-column>

    </el-table>

    <div style="display: flex;align-items: center;margin-top: 15px;">

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20, 40,100]"
        :page-size="pageSize"
        :total="list.length"
        style="margin-top: 15px;"
        background
        layout="sizes, prev, pager, next"/>

      <div>
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
  import {getNewTouList,getArrWeChatOrders,deleteOrder} from "@/api/order"
  import wcOrderInfo from "@/views/order/wcOrderInfo"
  import {addGro} from "@/api/group"
  import OrderToulist from "@/views/order/orderToulist"
  import priceShow from '@/views/com/priceShow'
  import priceInput from '@/views/com/priceInput'
  import {parseTime} from "@/utils/index"
  import OrderTouContract from "@/views/order/orderTouContract"
  import {getCarList, getCarTypeList} from "@/api/tourist";
  import {getGuiderList, getGuiderType} from '@/api/guide';

  export default {
    name: "wechatArrorderList",
    data() {
      return {
        // 当前页
        currentPage: 1,
        // 每页多少条
        pageSize: 10,
        initData: {
          guiderTypeList: [],
          guiderList: [],
          carTypeList: [],
          carList: []
        },
        groupAddForm: {
          guiderTypeId: '',
          guiderId: '',
          carTypeId: '',
          carId: '',
          groupDes: '',
          groupName: '',
          groupDate: '',
          orderList:[],
          serType: this.$route.query.serType,
          planId: ''
        },
        v_addGroup:false,
        listTitleFilter:{
          orderNum:true,
          location:true,
          groupState:true,
          travelDate:true,
          touNum:true,
          creatTime:true,
          disName:true,
          productName:true,
          hashPay:true,
          shoudPay:true,
          arrPay:true,
          // paid:true,
          // arrears:true,
          // loss:true,
          // adminUser:true,
          // state:true
        },
        v_addTou: false,
        id_addTou: -1,
        tou_max: 10000,


        isQf: false,
        isWsh: false,
        total: 0,
        list: [],
        tourList:[],
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
          location:'',
          proName: '',
          proNum: '',
          serType: '',
          planNum: '',
          //是否已经拼团
          groupState: '',
          groupNum: '',
          travelDate: [],
          orderName: '',
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

    components: {OrderTouContract, OrderToulist, wcOrderInfo, priceInput, priceShow},
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

      if (this.$route.params.orderName) {
        this.queryForm.orderName = this.$route.params.orderName
      }


      if (this.$route.params.groupNum) {
        this.queryForm.groupNum = this.$route.params.groupNum
      }

      if (this.$route.params.disName) {
        this.queryForm.disName = this.$route.params.disName
      }

      if (this.$route.params.productName) {
        this.queryForm.productName = this.$route.params.productName
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
      // 每页多少条
      handleSizeChange(val) {
        this.pageSize = val;
      },
      // 当前页
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      toGro() {
        this.v_addGroup = true
      },
      onSubmit(){
        // this.inGroupList.forEach(item=>{
        //   this.groupAddForm.orderList.push(item.id);
        // });
        addGro(this.groupAddForm).then(res=>{
          this.$message({type: 'success', message: "创建团队成功！"})
          this.onCreate=false
          this.v_addGroup = false
          // this.$router.back()
          this.$router.push({name: 'groupNew'})
        }).catch(error => {

          this.onCreate=false
        })

      },
      delOrder(id) {
        this.$confirm('该订单将移入回收站，是否继续', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          deleteOrder(id).then(res => {
            this.$message({
              type: 'success',
              message: '订单删除成功！'
            })
            this.getList()
          }).catch(error => {
          })

        })
      },
      printOrder(item) {
        // window.open(process.env.VUE_APP_PRINT_URL + 'order?orderId=' + this.orderId)
        this.orderId = item.orderId
        let routeUrl = this.$router.resolve({
          path: "/printTry",
          query: {id:this.orderId}
        });
        window.open(routeUrl.href,'_blank');
      },
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
          const tHeader = ['订单号', '产品名', '团队名', '出团日期','集合地点', '游客数', '分销商', '录入人员']


          let templistArray = []
          this.$refs.mtable.selection.forEach(item => {
            templistArray[templistArray.length] = [item.orderName, item.productName, item.groupName, item.travelDate.substring(0,10), item.location,item.tourNum, item.disName, item.workerName]
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


      openAddTou(id) {
        getNewTouList(id).then(res => {
          this.tourList = res.data
          this.total = res.pagination.total
          this.onLoading = false
        }).catch(error => {
          this.onLoading = false
        })

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
        getArrWeChatOrders(this.queryForm).then(res => {
          this.list = res.data
          this.onLoading = false
        }).catch(error => {
          this.onLoading = false
        })
      },

      initQueryList() {
        getProTye().then(res => {
          this.initList.proTypeList = res.data
        }).catch(error => {
        })
        getSerTypes().then(res => {
          this.initList.serTypeList = res.data
        }).catch(error => {
        })
        getDisType().then(res => {
          this.initList.disTypeList = res.data
        }).catch(error => {
        })
        getGuiderType().then(res => {
          this.initData.guiderTypeList = res.data
        }).catch(error => {
        })
        getGuiderList().then(res => {
          this.initData.guiderList = res.data
        }).catch(error => {
        })
        getCarList().then(res => {
          this.initData.carList = res.data
        }).catch((error => {
        }))
        getCarTypeList().then(res => {
          this.initData.carTypeList = res.data
        }).catch(error => {
        })
        this.onLoading = true
      }
    },
    props: {
      orderState: '',
      orderId: {
        type: Number,
        default: 0
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
