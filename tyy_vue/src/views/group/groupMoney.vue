<template>
  <div class="app-container">
    <el-dialog :visible.sync="v_editSupMony" title="修改签单挂账记录">
      <el-form :model="editForm" label-width="100px" ref="editForm">
        <div style="display: flex;align-items: flex-start;justify-content: flex-start;width: 80vw;">
          <div style="margin-right: 35px;">
            <el-form-item label="项目类型" prop="pjType">
              <el-select :value="editForm.payType" placeholder="请选择项目类型" v-model="editForm.pjType">
                <el-option :key="item.code" :label="item.description" :value="item.code"
                           v-for="item in initData.chargeTypeList"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目名" prop="pjName">
              <el-input placeholder="请输入项目名" v-model="editForm.pjName"></el-input>
            </el-form-item>

            <el-form-item label="数量" prop="pjNum">
              <el-input placeholder="请输入项目数量" type="number" v-model.number="editForm.pjNum"></el-input>
            </el-form-item>

            <el-form-item label="支付方式" prop="payType">
              <!--              <el-select :value="editForm.payType" placeholder="请选择支付方式" v-model="editForm.payType">-->
              <!--                <el-option :key="item.code" :label="item.description" :value="item.code"-->
              <!--                           v-for="item in initData.payTypeList"></el-option>-->
              <!--              </el-select>-->
              <channel-select :pay-type.sync="editForm.payType"></channel-select>
            </el-form-item>

            <el-form-item label="支出金额" prop="pjAmount">
              <price-input placeholder="请输入项目总金额" v-model="editForm.pjAmount"></price-input>
            </el-form-item>

            <el-form-item label="账单时间" prop="payDate">
              <el-date-picker format="yyyy-MM-dd" placeholder="请选择账单支出时间" v-model="editForm.payDate"
                              value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>

            <el-form-item label="说明">
              <el-input placeholder="请输入备注说明" style="max-width: 400px;" type="textarea"
                        v-model="editForm.remark"></el-input>
            </el-form-item>
            <div style="width: 800px">
              <el-form-item label="报账凭证">
                <upload-images v-model="editForm.imgRids" :value="editForm.imgRids":res-type="4"></upload-images>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button @click="saveEidt" type="primary">保存修改</el-button>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </el-dialog>
    <div  style="position:fixed;top:70px;z-index:200;right: 30px;">
      <el-button type="success" v-if="groupInfo.groupState===0" @click="confirmGroup">确认</el-button>
      <el-button type="info" v-if="groupInfo.groupState===1" @click="cancelGroup">取消确认</el-button>
      <el-button type="warning" v-if="groupInfo.tieupState===1" @click="cancelGroupMoney">取消扎帐</el-button>
      <el-button type="danger" v-if="groupInfo.tieupState===0" @click="confirmGroupMoney">扎帐封存</el-button>

    </div>
    <div style="position: absolute;z-index:199;left: 70%;">
      <el-image :src="zazangImg" v-if="groupInfo.tieupState===1"></el-image>
      <el-image :src="sureImg" v-if="groupInfo.tieupState===0&&groupInfo.groupState===1"></el-image>
    </div>
    <div class="o-title" style="position: relative;">
      <span>团队信息</span>
    </div>

    <div class="lif">
      <span>团队编号：{{groupInfo.groupNum}}</span>
      <span>团队名： {{groupInfo.groupName}} </span>
      <span>总应收团款：<price-show class="t-money" :price="groupInfo.inPayment"></price-show></span>

      <span>实收团款：<price-show class="t-money" :price="groupInfo.hasPayment"></price-show></span>


      <span>已支出：<price-show class="t-money" :price="groupInfo.outPayment"></price-show></span>
      <span>毛利：<price-show class="t-money" :price="groupInfo.errPayment"></price-show></span>
    </div>

    <div class="lif">
      <span>出团日期：<span>{{groupInfo.groupDate}}</span></span>
      <span>导游：<span>{{groupInfo.guiderName}}</span></span>
      <span>团队人数：<span>{{groupInfo.touNum}}</span></span>
      <span>车辆名：<span>{{groupInfo.carNum}}</span></span>
    </div>

    <el-table :data="orderList"
              border
              fit
              show-summary
              highlight-current-row
              stripe style="margin-top: 15px;">

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
          <span>{{scope.row.groupNum}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="出团日期">
        <template slot-scope="scope">
          {{ scope.row.travelDate.substr(0,10) }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="游客数" prop="touNum">
        <template slot-scope="scope">
          <el-popover placement="right">
            <el-table
              :data="scope.row.chargeInfo"
              highlight-current-row
              stripe
            >
              <el-table-column align="center" label="类型" prop="name"></el-table-column>
              <el-table-column align="center" label="人数" prop="touNum"></el-table-column>\
              <el-table-column align="center" label="结算价"><template slot-scope="scope"><price-show :price="scope.row.realPrice"></price-show></template>
              </el-table-column>
            </el-table>


            <el-button slot="reference">{{ scope.row.touNum}}人</el-button>
          </el-popover>
        </template>
      </el-table-column>






      <el-table-column align="center" label="分销商">
        <template slot-scope="scope">
          {{ scope.row.disName}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.state===1">已审核</el-tag>
          <el-tag type="info" v-if="scope.row.state===0">未审核</el-tag>
          <el-tag type="error" v-if="scope.row.state===-1">已拒绝</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="应收款" prop="payCharge">
        <template slot-scope="scope">
          {{scope.row.payCharge}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="实收款" prop="paid">
        <template slot-scope="scope">
          {{ scope.row.paid}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="欠款" prop="arrears">
        <template slot-scope="scope">
          {{scope.row.arrears}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button @click="$router.push({name:'orderList',params:{orderNum:scope.row.orderNum}})" type="primary">
            收款
          </el-button>
        </template>
      </el-table-column>

      <!--          <el-table-column align="center" label="操作" min-width="150">-->
      <!--            <template slot-scope="scope">-->
      <!--              <order-info :order-id="scope.row.id" @refresh="getData"></order-info>-->
      <!--            </template>-->
      <!--          </el-table-column>-->

    </el-table>

    <div v-if="groupInfo.tieupState===0&&groupInfo.groupState===1">
    <div class="o-title" >
      <span>录入报账&nbsp;</span>
    </div>

    <span style="font-size: 13px; line-height: 200%;padding: 15px;">费用支出明细 （温馨提示：支出可以填"负数"，如"-3000"、"-100"等，"负数"代表该团的额外收入，如：购物店反的佣金，自费项目的提成等。请在说明中标注清楚！）</span>
    <el-form :model="jdbzForm" label-width="100px" style="margin-top: 15px;">
      <div style="display: flex;align-items: flex-start;justify-content: flex-start;width: 80vw;">
        <div style="margin-right: 35px;">
          <el-form-item label="报账类型">
            <el-switch
              active-text="签单挂账"
              active-value="qd"
              inactive-text="计调报账"
              inactive-value="jd"
              v-model="jdbzForm.bzType">
            </el-switch>

          </el-form-item>

          <el-form-item label="选择供应商" v-if="jdbzForm.bzType==='qd'">

            <el-select :value="state.supTypeSelect" @change="jdbzForm.supId=''" placeholder="请选择供应商类型"
                       v-model="state.supTypeSelect">
              <el-option :key="item" :label="item" :value="item" v-for="item in supTypeList"></el-option>
            </el-select>

            <el-select :value="jdbzForm.supId" placeholder="请选择供应商" v-model="jdbzForm.supId">
              <el-option :key="item.supId" :label="item.supName"
                         :value="item.supId"
                         v-for="item in supList.filter(item=>(item.roleName===state.supTypeSelect))"></el-option>
            </el-select>


          </el-form-item>


          <el-form-item label="项目类型" prop="payType">
            <el-select :value="jdbzForm.payType" placeholder="请选择项目类型" v-model="jdbzForm.pjType">
              <el-option :key="item.code" :label="item.description" :value="item.code"
                         v-for="item in initData.chargeTypeList"></el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="项目名" prop="pjName">
            <el-input placeholder="请输入项目名" v-model="jdbzForm.pjName"></el-input>
          </el-form-item>

          <el-form-item label="数量" prop="pjNum">
            <el-input placeholder="请输入项目数量" type="number" v-model.number="jdbzForm.pjNum"></el-input>
          </el-form-item>

          <el-form-item label="支付方式" prop="payType">
<!--            <el-select :value="jdbzForm.payType" placeholder="请选择支付方式" v-model="jdbzForm.payType">-->
<!--              <el-option :key="item.code" :label="item.description" :value="item.code"-->
<!--                         v-for="item in initData.payTypeList"></el-option>-->
<!--            </el-select>-->
            <channel-select :pay-type.sync="jdbzForm.payType"></channel-select>
          </el-form-item>

          <el-form-item label="支出金额" prop="pjAmount">
<!--            <el-input placeholder="请输入项目总金额" type="number" v-model="jdbzForm.pjAmount"></el-input>-->
            <price-input placeholder="请输入项目总金额" v-model="jdbzForm.pjAmount"></price-input>
          </el-form-item>

          <el-form-item label="账单时间" prop="payDate">
            <el-date-picker format="yyyy-MM-dd" placeholder="请选择账单支出时间" v-model="jdbzForm.payDate"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>

          <el-form-item label="说明">
            <el-input placeholder="请输入备注说明" style="max-width: 400px;" type="textarea"
                      v-model="jdbzForm.remark"></el-input>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="报账凭证">
            <upload-images v-model="jdbzForm.payImage"></upload-images>
          </el-form-item>
        </div>
      </div>


      <el-button :loading="state.onAddSupMoney" @click="submitForm" style="margin-left:100px;width: 300px;"
                 type="primary">
        录入
      </el-button>

    </el-form>
    </div>

    <div class="o-title">
      <span>报账记录</span>
    </div>
    <div>
      <el-table :data="moenyHis"
                border
                fit
                highlight-current-row
                stripe style="margin-top: 15px;">

        <el-table-column align="center" label="报账凭证">
          <template slot-scope="scope">
            <el-popover placement="right" v-if="scope.row.payImage&&scope.row.payImage.length>0">


              <div slot="reference">
                <el-image :src="scope.row.payImage[0]" style="width: 100px;height: 50px;"
                          v-if="scope.row.payImage.length===1"></el-image>
                <el-button type="text" v-else>共{{scope.row.payImage.length}}张</el-button>
              </div>

              <div style="max-width: 85vw;max-height: 75vh">
                <el-image :src="item" style="width: 350px;height: 240px;margin: 25px;"
                          v-for="item in scope.row.payImage"></el-image>
              </div>


            </el-popover>
            <span style="color:gray" v-else>未上传</span>
          </template>
        </el-table-column>


        <el-table-column align="center" label="账单号">
          <template slot-scope="scope">
            {{ scope.row.payNum}}
          </template>
        </el-table-column>

        <el-table-column align="center" label="项目类型">
          <template slot-scope="scope">
            {{ scope.row.pjType}}
          </template>
        </el-table-column>

        <el-table-column align="center" label="项目名">
          <template slot-scope="scope">
            {{ scope.row.pjName}}
          </template>
        </el-table-column>

        <el-table-column align="center" label="数量">
          <template slot-scope="scope">
            {{ scope.row.pjNum}}个
          </template>
        </el-table-column>


        <el-table-column align="center" label="总金额">
          <template slot-scope="scope">
            <price-show :price="scope.row.pjAmount"></price-show>
          </template>
        </el-table-column>


        <el-table-column align="center" label="支付方式">
          <template slot-scope="scope">
            {{ scope.row.payType}}
          </template>
        </el-table-column>


        <el-table-column align="center" label="交易日期">
          <template slot-scope="scope">
            {{ scope.row.payDate.substr(0,10)}}
          </template>
        </el-table-column>

        <el-table-column align="center" label="审批状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.state===1">已审核</el-tag>
            <el-tag type="info" v-if="scope.row.state===0">未审核</el-tag>
          </template>
        </el-table-column>


        <el-table-column align="center" label="供应商">
          <template slot-scope="scope">
            {{ scope.row.supName}}
          </template>
        </el-table-column>


        <el-table-column align="center" label="备注说明">
          <template slot-scope="scope">
            {{ scope.row.remark}}
          </template>
        </el-table-column>


        <el-table-column align="center" label="操作" min-width="150px">
          <template slot-scope="scope">
            <el-button @click="checkSupState(scope.row,1)" size="mini" type="success" v-if="scope.row.state===0&&groupInfo.groupState===1">
              审批
            </el-button>

            <el-button @click="editSupPayment(scope.row)" size="mini" type="primary" v-if="scope.row.state===0&&groupInfo.groupState===1">
              修改
            </el-button>

            <el-button @click="checkSupState(scope.row,0)" size="mini" type="warning" v-if="scope.row.state===1&&groupInfo.groupState===1">
              取消审批
            </el-button>

            <el-button @click="delSupPayment(scope.row.id)" size="mini" type="danger"
                       v-if="scope.row.state===0">删除
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

  </div>
</template>

<script>
  import orderInfo from "@/views/order/orderInfo"
  import {editSupPayment,addSupPayment, checkSupState, delSupPayment, getGroupSum, getSupPayment, getSuSup} from "@/api/money"
  import {getOrders} from "@/api/order"
  import {changeGroupState,editTieupState} from "@/api/group"

  import {getEnums} from "@/api/baseApi"
  import {distinct} from "@/utils/tools"
  import UploadImages from "@/views/com/uploadImages"
  import channelSelect from "@/views/money/channelSelect"
  import priceShow from '@/views/com/priceShow'
  import priceInput from '@/views/com/priceInput'


  //报账页面 通过query Id得到 页面信息。展示订单列表 展示报账记录 录入计调报账 录入签单挂账
  export default {
    name: "groupMoney",
    data() {
      return {
          sureImg: require('@/icons/imgs/sure.png'),
          zazangImg: require('@/icons/imgs/zazang.png'),
        state: {
          onAddSupMoney: false,
          supTypeSelect: ''
        },
          v_editSupMony:false,
        initData: {
          payTypeList: [],
          chargeTypeList: []
        },

        jdbzForm: {
          supId: '',
          bzType: 'jd',
          pjType: '',
          pjName: '',
          pjNum: '',
          payType: '',
          payDate: '',
          pjAmount: '',
          remark: '',
          payImage: ''
        },
          editForm:{
              id:'',
              supId: '',
              bzType: 'jd',
              pjType: '',
              pjName: '',
              pjNum: '',
              payType: '',
              payDate: '',
              pjAmount: '',
              remark: '',
              payImage: '',
              imgRids:''

          },

        orderQueryForm: {
          groupNum: '',
          pageNum:
            1,
          pageSorted:
            'desc',
          pageSize:
            1000
        }
        ,
        supList: [],
        moenyHis: [],

        orderList: [],

        groupInfo: {}
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
        channelSelect,priceInput,priceShow
    },


    methods: {
        cancelGroupMoney(){
            editTieupState(this.groupInfo.id,0).then(res => {
                this.$message({
                    type: 'success',
                    message: '取消扎帐成功！'
                })
                this.groupInfo.tieupState = 0
            }).catch(error => {
            })
        },
        saveEidt(){
            this.editForm.payImage=this.editForm.imgRids;
            editSupPayment(this.editForm).then(res=>{
                this.$message({
                    type:'success',
                    message:'修改成功！！'
                });
                this.v_editSupMony=false;
                this.getData();
            })
        },
        confirmGroupMoney(){
            if (this.groupInfo.groupState===1){
                editTieupState(this.groupInfo.id,1).then(res => {
                    this.$message({
                        type: 'success',
                        message: '扎帐成功！'
                    })
                    this.groupInfo.tieupState = 1
                }).catch(error => {
                })
            }else{
                this.$message({
                    type:'error',
                    message:'该团队未确认，无法扎帐！'
                })
            }
        },
        confirmGroup() {
            changeGroupState(this.groupInfo.id, 1).then(res => {
                this.$message({
                    type: 'success',
                    message: '确认团队成功！'
                })
                this.groupInfo.groupState = 1
            }).catch(error => {
            })

        },
        cancelGroup(item) {
            if (this.groupInfo.tieupState===1){
                this.$message({
                    type:'error',
                    message:'该团队已扎帐，无法取消确认'
                })
            }else{
                changeGroupState(this.groupInfo.id, 0).then(res => {
                    this.$message({
                        type: 'success',
                        message: '已取消团队确认状态，可重新编辑！'
                    })
                    this.groupInfo.groupState = 0
                }).catch(error => {
                })
            }
        },

      toProduct(proNum, proSerType) {
        if (proSerType === 1) {
          this.$router.push({name: 'ProList', params: {proNum}})
        }
        if (proSerType === 2) {
          this.$router.push({name: 'ProTeam', params: {proNum}})
        }
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
        editSupPayment(payForm){
            this.editForm = JSON.parse(JSON.stringify(payForm))
            this.v_editSupMony = true
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
        this.jdbzForm.groupId = this.$route.query.id
        addSupPayment(this.jdbzForm).then(res => {
          this.$message({
            type: 'success',
            message: '录入团队报账成功！'
          })

          this.jdbzForm = {
            supId: '',
            bzType: 'jd',
            pjType: '',
            pjName: '',
            pjNum: '',
            payType: '',
            payDate: '',
            pjAmount: '',
            remark: ''
          }
          this.state.onAddSupMoney = false
          this.getData()
        }).catch(error => {
          this.state.onAddSupMoney = false
        })

      },
      getMoneyHis() {
        let id = this.$route.query.id
        getSupPayment(id).then(res => {
          console.log(res)
          this.moenyHis = res
        }).catch(error => {
        })

      },

      init() {
        //找到项目类型
        getEnums('CHARGETYPE').then(res => {
          this.initData.chargeTypeList = res
        }).catch(error => {
        })
        //获取支付类型
        getEnums('PAYTYPE').then(res => {
          this.initData.payTypeList = res
        }).catch(error => {
        })

        getSuSup().then(res => {
          this.supList = res
          console.log(res)
        }).catch(error => {
        })

      },

      comArrPay(order) {
        //计算当前欠款显示 先计算订单状态。 然后判断是否为0
        if (order.state === 1) {
          return order.arrears === 0 ? '已结清' : order.arrears + '元'
        }
        return ''
      },
      getOrderList(groupNum) {
        this.orderQueryForm.groupNum = groupNum
        getOrders(this.orderQueryForm).then(res => {
          console.log(res)
          this.orderList = res.list

          this.orderList.forEach(item=>{
            item.chargeInfo=JSON.parse(item.chargeInfo);
            if (item.payCharge){
                item.payCharge/=100;
            }
              if (item.paid){
                  item.paid/=100;
              }
              if (item.arrears){
                  item.arrears/=100;
              }
          })


        }).catch(error => {
        })
      },
      getData() {
        let id = this.$route.query.id
        getGroupSum(id).then(res => {
          this.groupInfo = res
          this.getOrderList(this.groupInfo.groupNum)
          this.getMoneyHis()
        }).catch(error => {
        })

      }

    },
    created() {
      this.init()
      this.getData()

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
