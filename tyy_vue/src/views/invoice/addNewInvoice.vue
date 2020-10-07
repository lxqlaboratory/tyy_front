<template>
  <div class="app-container">
    <div class="o-title">
      <span>选择分销商</span>
    </div>
    <select-new-dis-in-inv :dis-info="disInfo" @selectingDis="selectingDis"></select-new-dis-in-inv>
    <div v-if="queryForm.disId">
    <div class="o-title">
      <span>订单列表</span>
    </div>
      <div class="filter-container" v-if="!invoiceForm.id">

        <div class="filter-item">
          <label>产品名称</label>
          <el-input placeholder="检索订单所属产品名" v-model="queryForm.proName"></el-input>
        </div>
        <div class="filter-item">
          <label>产品编号</label>
          <el-input placeholder="检索订单所属产品编号" v-model="queryForm.proNum"></el-input>
        </div>
        <div class="filter-item">
          <label>订单编号</label>
          <el-input placeholder="检索订单编号" v-model="queryForm.orderNum"></el-input>
        </div>
        <div class="filter-item">
          <label>团队状态</label>
          <el-select :value="queryForm.groupState" clearable v-model="queryForm.groupState">
            <el-option :value="1" label="已拼团"></el-option>
            <el-option :value="0" label="未拼团"></el-option>
          </el-select>
        </div>
        <div class="filter-item">
          <label>团队编号</label>
          <el-input v-model="queryForm.groupNum"></el-input>
        </div>

        <div class="filter-item">
          <label>欠费状态</label>
          <el-select  :value="queryForm.orderPayState" clearable v-model="queryForm.orderPayState">
            <el-option :value="true" label="已结清"></el-option>
            <el-option :value="false" label="未结清"></el-option>
          </el-select>
        </div>
        <div class="filter-item">
          <label>订单状态</label>
          <el-select  :value="queryForm.orderState" clearable v-model="queryForm.orderState">
            <el-option :value="1" label="已审核"></el-option>
            <el-option :value="0" label="未审核"></el-option>
            <el-option :value="-1" label="已拒绝"></el-option>
          </el-select>
        </div>
        <div class="filter-item">
          <label>下单日期</label>
          <el-date-picker
            end-placeholder="结束日期"
            range-separator="至"
            start-placeholder="开始日期"
            type="daterange"
            v-model="queryForm.orderDate"
            value-format="yyyy-MM-dd"
          style="width: 85%">
          </el-date-picker>
        </div>
        <div class="filter-item">
          <label>出团日期</label>
          <el-date-picker
            end-placeholder="结束日期"
            range-separator="至"
            start-placeholder="开始日期"
            type="daterange"
            v-model="queryForm.travelDate"
            value-format="yyyy-MM-dd"
            style="width: 85%">
          </el-date-picker>
        </div>
        <div class="filter-item">
          <el-button @click="getOrderList"  type="primary">
            查询
          </el-button>
        </div>
      </div>

    <el-table
              :data="orderList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
              border
              fit
              highlight-current-row
              stripe
              @selection-change="selectedOrder"
              style="margin-top: 15px;">
      <el-table-column
        type="selection"
        width="55"
        v-if="!invoiceForm.id">
      </el-table-column>

      <el-table-column align="center" label="订单号" prop="orderNum">
        <template slot-scope="scope">
          <el-button @click="$router.push({name:'orderList',params:{orderNum:scope.row.orderNum}})" type="text">
            {{scope.row.orderNum}}
          </el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="产品名">
        <template slot-scope="scope">

          <el-button @click="toProduct(scope.row.proNum,scope.row.proSertype)" style="font-size: 13px;"
                     type="text" v-if="scope.row.proSertype===1">【散客】{{scope.row.proName}}
          </el-button>
          <el-button @click="toProduct(scope.row.proNum,scope.row.proSertype)" style="font-size: 13px;"
                     type="text" v-if="scope.row.proSertype===2">【团队】{{scope.row.proName}}
          </el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="团队编号">
        <template slot-scope="scope">

          <el-button @click="toGroup(scope.row.groupNum,scope.row.proSertype)" style="font-size: 13px;"
                     type="text" v-if="scope.row.groupNum">【团队】{{scope.row.groupName}}
          </el-button>
          <span style="color: orangered" v-else>未拼团</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="出团日期">
        <template slot-scope="scope">
          {{ scope.row.travelDate.substr(0,10) }}
        </template>
      </el-table-column>


      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.state===1">已审核</el-tag>
          <el-tag type="info" v-if="scope.row.state===0">未审核</el-tag>
          <el-tag type="error" v-if="scope.row.state===-1">已拒绝</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="申请开票次数" prop="invNum">
        <template slot-scope="scope">
          {{scope.row.invNum}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="累计申请金额" prop="sumPrice">
        <template slot-scope="scope">
          {{ scope.row.sumPrice}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="已受理金额" prop="surePrice">
        <template slot-scope="scope">
          {{scope.row.surePrice}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="申请中金额" prop="noSurePrice">
        <template slot-scope="scope">
          {{scope.row.noSurePrice}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="已拒绝金额" prop="rejectPrice">
        <template slot-scope="scope">
          {{scope.row.rejectPrice}}
        </template>
      </el-table-column>
    </el-table>
      <el-pagination
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="orderList.length"
        background
        layout="prev, pager, next"
        style="margin-top: 15px;"/>

      <div class="o-title"  >
        <span>发票申请明细&nbsp;</span>
      </div>
      <div v-if="invoiceForm.id">
        <div style="padding-left:50px;width: 100%;min-height: 15vh;">
          <el-row :gutter="30">
            <el-col :span=8>
              <label>流水单号：</label>
              <span>&nbsp;&nbsp;{{invoiceForm.number}}</span>
            </el-col>
            <el-col :span=8>
              <label>发票抬头：</label>
              <span>&nbsp;&nbsp;{{invoiceForm.company}}</span>
            </el-col>
            <el-col :span=8>
              <label>发票金额：</label>
              <span>&nbsp;&nbsp;{{invoiceForm.price}}</span>
            </el-col>

          </el-row>
          <el-row :gutter="30" style="margin-top: 20px">
            <el-col :span=8>
              <label>税号：</label>
              <span>&nbsp;&nbsp;{{invoiceForm.taxNum}}</span>
            </el-col>
            <el-col :span=8>
              <label>申请人：</label>
              <span>&nbsp;&nbsp;{{invoiceForm.adminName}}</span>
            </el-col>
            <el-col :span=8>
              <label>客户信息：</label>
              <span>{{invoiceForm.clientRemark}}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20"style="margin-top: 20px">
            <el-col :span=10>
              <label>申办时间：</label>
              <span>&nbsp;&nbsp;{{invoiceForm.createTime}}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top: 20px">
            <el-col :span=10>
              <label>申办说明：</label>
              <span>&nbsp;&nbsp;{{invoiceForm.remark}}</span>
            </el-col>
          </el-row>

        </div>
      </div>
      <div style="width: 100%;display: flex;" v-else>
        <el-form :model="invoiceForm" label-width="100px" style="margin-top: 15px;">
          <el-row >
            <el-col :span=12>
              <el-form-item label="发票抬头">
                <el-input placeholder="请输入发票抬头" v-model="invoiceForm.company"></el-input>
              </el-form-item>
            </el-col>
              <el-col :span=12>
                <el-form-item label="申请人">
                  <el-input placeholder="请输入申请人" v-model="invoiceForm.adminName"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span=12>

              <el-form-item label="税号">
                <el-input placeholder="请输入税号" v-model="invoiceForm.taxNum"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span=12>
              <el-form-item label="客户信息">
                <el-input placeholder="请输入客户信息" v-model="invoiceForm.clientRemark"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item label="发票金额">
                <price-input v-model="invoiceForm.price"></price-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span=24>
              <el-form-item label="申办说明">
                <el-input
                  placeholder="请输入申办说明"
                  type="textarea"
                  :rows="4"
                  v-model="invoiceForm.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-button :loading="state.onAddSupMoney" @click="submitForm" style="margin-left:100px;width: 300px;"
                     type="primary">
            录入
          </el-button>

        </el-form>
      </div>

      <div v-if="invoiceForm.id">
    <div class="o-title" >
      <span>发票申请处理&nbsp;</span>
    </div>

    <el-form :model="invoiceForm" label-width="100px" style="margin-top: 15px;">
      <div style="display: flex;align-items: flex-start;justify-content: flex-start;width: 80vw;">
        <div style="margin-right: 35px;">

          <el-form-item label="当前状态">

            <label v-if="invState===1" style="color: green">已开票</label>
            <label v-if="invState===0" style="color: blue">处理中</label>
            <label v-if="invState===-1" style="color: orangered">拒绝</label>
          </el-form-item>


          <el-form-item label="重置状态" prop="state" >
            <el-select  :value="invoiceForm.state" clearable v-model="invoiceForm.state">
              <el-option :value="1" label="已开票"></el-option>
              <el-option :value="0" label="处理中"></el-option>
              <el-option :value="-1" label="拒绝"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="发票代码" prop="invCode">
            <el-input placeholder="请输入发票代码" v-model="invoiceForm.invCode"></el-input>
          </el-form-item>

          <el-form-item label="发票号码" prop="invNum">
            <el-input placeholder="请输入发票号码" v-model="invoiceForm.invNum"></el-input>
          </el-form-item>


          <el-form-item label="开票时间" prop="invDate">
            <el-date-picker format="yyyy-MM-dd" placeholder="请选择开票时间" v-model="invoiceForm.invDate"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>

          <el-form-item label="说明">
            <el-input placeholder="请输入备注说明" style="max-width: 400px;" type="textarea"
                      v-model="invoiceForm.editRemark"></el-input>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="发票图片">
            <upload-images v-model="invoiceForm.invImgs"></upload-images>
          </el-form-item>
        </div>
      </div>


      <el-button :loading="state.onAddSupMoney" @click="editInvoice" style="margin-left:100px;width: 300px;margin-bottom: 50px"
                 type="primary">
        保存
      </el-button>

    </el-form>
      </div>
    </div>
    </div>
</template>

<script>
  import orderInfo from "@/views/order/orderInfo"
  import {addInvoice,getInvInfo,editInv} from "@/api/invoice"
  import {getOrders} from "@/api/order"
  import {distinct} from "@/utils/tools"
  import UploadImages from "@/views/com/uploadImages"
  import channelSelect from "@/views/money/channelSelect"
  import priceShow from '@/views/com/priceShow'
  import priceInput from '@/views/com/priceInput'
  import selectNewDisInInv from '@/views/invoice/selectNewDisInInv'


  //报账页面 通过query Id得到 页面信息。展示订单列表 展示报账记录 录入计调报账 录入签单挂账
  export default {
    name: "addInvoice",
    data() {
      return {
          invState:'',
          disId:'',
        state: {
          onAddSupMoney: false,
          supTypeSelect: ''
        },
          disInfo:{},
        initData: {
          payTypeList: [],
          chargeTypeList: []
        },
          invoiceForm:{
              id:'',
              orderList:[],
              invCode:'',
              state:'',
              invNum:'',
              invDate:'',
              editTime:'',
              editName:'',
              editRemark:'',
              number:'',
              company:'',
              taxNum:'',
              price:'',
              adminName:'',
              clientRemark:'',
              createTime:'',
              remark:'',
          },
          total:0,
          currentPage: 1,
          pageSize: 10,


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
            disId:'',
            proType_1: '',
            proType_2: '',

            orderPayState: '',
            //下单日期，一个范围
            orderDate: [],


            pageNum: 1,
            pageSorted: 'desc',
            pageSize: 100000
        }
        ,
        supList: [],
        moenyHis: [],

        orderList: [],

      }
    },
    computed: {
      supTypeList() {
        return distinct(this.supList, 'roleName')
      }

    },
    components: {
      UploadImages,
      orderInfo,
        channelSelect,priceInput,priceShow,selectNewDisInInv
    },


    methods: {
        selectedOrder(val){
            this.invoiceForm.orderList=[];
            val.forEach(order=>{
                this.invoiceForm.orderList.push(order.id);
            });
        },
        selectingDis(item){
            this.queryForm.disId=item.unitId;
            this.getOrderList();

        },
      delSupPayment(id) {
        this.$confirm('此操作不可撤销', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          delSupPayment(id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getData()
          }).catch(error => {
            this.getData()
          })
        })
      },
      checkSupState(item, state) {
        checkSupState(item.id, state).then(res => {
          this.$message({type: "success", message: "改变审批状态成功"})
          item.state = state
          this.getData()
        }).catch(error => {
        })
      },
      submitForm() {

        this.state.onAddSupMoney = true
          addInvoice(this.invoiceForm).then(res => {
          this.$message({
            type: 'success',
            message: '申请发票成功！'
          });
              this.state.onAddSupMoney = false;
              this.$router.back();
        }).catch(error => {
          this.state.onAddSupMoney = false
        })

      },
        editInvoice() {
            this.state.onAddSupMoney = true
            editInv(this.invoiceForm).then(res => {
                this.$message({
                    type: 'success',
                    message: '处理发票申请成功！'
                });
                this.state.onAddSupMoney = false;
                this.$router.back();
            }).catch(error => {
                this.state.onAddSupMoney = false
            })

        },

      comArrPay(order) {
        //计算当前欠款显示 先计算订单状态。 然后判断是否为0
        if (order.state === 1) {
          return order.arrears === 0 ? '已结清' : order.arrears + '元'
        }
        return ''
      },
      getOrderList() {
        getOrders(this.queryForm).then(res => {
          this.orderList = res.list;
            this.total = res.pagination.total;
        }).catch(error => {
        })
      },
        getInvInfo(){
            getInvInfo(this.$route.query.id).then(res=>{
                console.log(res);
                this.invoiceForm=res.invInfo;
                this.disInfo=res.disInfo;
                this.orderList=res.orderList;
                this.queryForm.disId=this.disInfo.id;
                this.invState=this.invoiceForm.state;
            }).catch(err=>{

            })
        }


    },
    created() {
      if (this.$route.query.id){
          this.getInvInfo();
      }

    }
  }
</script>

<style scoped>
  .o-title {
    border-left: 7px solid #62bbc3;
    font-weight: bold;
    font-size: 19px;
    background-color: whitesmoke;
    border-radius: 3px;
    color: #333;
    margin: 25px 0;
    padding: 8px 15px;
  }

  .t-money {
    color: orangered;
  }

  .lif {
    margin: 15px;
  }

  .lif span {

    font-size: 15px;
    font-weight: bold;
    margin-right: 35px;
  }

  .el-input {
    max-width: 400px;
  }

</style>
