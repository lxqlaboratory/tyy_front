<template>
  <div style="font-size:13px;">
    <el-dialog :visible="v_stampSelect" @close="v_stampSelect=false">
      <stamp-select :dis-id="0" :label="'请选择印章'" @handleEvent="eidtUrlList"></stamp-select>
    </el-dialog>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" >
      <tbody>
      <tr>
        <td align="center" bgcolor="#CCCCCC">
          <table width="800" border="0" cellspacing="0" cellpadding="0" ref="print">
            <tbody>
            <tr>
              <td align="center" bgcolor="#FFFFFF" >
                <div class="previewP_main">
                  <img :src="item" border="0" @mousedown="move" :key="index" v-for="(item,index) in stampList"/>
                </div>
                <!--startprint-->
                <table width="700" border="0" cellspacing="0" cellpadding="0" v-if="!hidden_head">
                  <tbody>
                  <tr>
                    <td align="center"><img src="./printOrder/print.jpg" width="700"/></td>
                  </tr>
                  <tr>
                    <td align="center">
                      <hr/>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <table width="700" border="0" cellspacing="0" cellpadding="0">
                  <tbody>
                  <tr>
                    <td height="33" align="center" class="fontsize_22px">
                      <strong>《{{orderForm.proName}}》</strong></td>
                  </tr>
                  <tr>
                    <td height="25" align="center"><strong>旅 游 业 务 代 理 委 托 合 同</strong></td>
                  </tr>
                  </tbody>
                </table>
                <table border="1" cellspacing="0" cellpadding="0" width="700">
                  <tbody>
                  <tr>
                    <td align="center">收件单位</td>
                    <td>{{orderForm.perName}}</td>
                    <td align="center">确 认 人</td>
                    <td width="230"></td>
                  </tr>
                  <tr>
                    <td align="center">传 真 号</td>
                    <td></td>
                    <td align="center">邮箱地址</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td align="center">收 件 人</td>
                    <td></td>
                    <td align="center">联系电话</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td align="center">联系电话</td>
                    <td>&nbsp;{{orderForm.phone}}</td>
                    <td align="center">订单生成日期</td>
                    <td>&nbsp;{{orderForm.orderTime.substr(0,10)}}</td>
                  </tr>
                  <tr>
                    <td colspan="4">&nbsp;非常感谢贵社的支持，现将地接计划传真贵社，请阅知！如无疑义请盖章确认！本确认件等效合同！</td>
                  </tr>
                  </tbody>
                </table>
                <table width="700" border="0" cellspacing="0" cellpadding="0">
                  <tbody>
                  <tr>
                    <td height="3"></td>
                  </tr>
                  </tbody>
                </table>
                <!--<table width="700" border="1" cellspacing="0" cellpadding="0" id="print_xc" v-if="!hidden_travel">-->
                  <!--<tbody>-->
                  <!--<tr>-->
                    <!--<td bgcolor="#E3E3E3">&nbsp;<strong>行程安排 <span-->
                      <!--v-if="orderForm.proName">《{{orderForm.proName}}》</span></strong></td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td>-->
                      <!--<table width="700" border="0" cellspacing="0" cellpadding="0">-->
                        <!--<tbody>-->
                        <!--<tr>-->
                          <!--<td width="700">-->
                            <!--<div class="line_price1-1" style="padding-top:0px; padding-bottom:0px; text-align:left;"-->
                                 <!--v-for="(item, index) in orderForm.proTravel">-->
                              <!--<table width="100%" border="0" cellspacing="0" cellpadding="0">-->
                                <!--<tbody>-->
                                <!--<tr>-->
                                  <!--<td>-->
                                    <!--<table width="100%" border="0" cellspacing="0" cellpadding="0">-->
                                      <!--<tbody>-->
                                      <!--<tr>-->
                                        <!--<td><strong>第{{item.day}}天</strong></td>-->
                                        <!--<td><strong>区间：{{item.trip}}</strong></td>-->
                                        <!--<td><span class="fontsize_12px"-->
                                                  <!--style="float:left;margin-right:20px;text-align:left;"><strong>住宿：{{item.hotel}}</strong></span>-->
                                        <!--</td>-->
                                        <!--<td><strong>餐饮: <span v-for="meal in item.meal">{{meal}}饭 </span></strong></td>-->
                                      <!--</tr>-->
                                      <!--</tbody>-->
                                    <!--</table>-->
                                  <!--</td>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                  <!--<td>{{item.content}}</td>-->
                                <!--</tr>-->
                                <!--</tbody>-->
                              <!--</table>-->
                            <!--</div>-->
                          <!--</td>-->
                        <!--</tr>-->
                        <!--</tbody>-->
                      <!--</table>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--</tbody>-->
                <!--</table>-->
                <!--<table width="700" border="0" cellspacing="0" cellpadding="0">-->
                  <!--<tbody>-->
                  <!--<tr>-->
                    <!--<td height="3"></td>-->
                  <!--</tr>-->
                  <!--</tbody>-->
                <!--</table>-->
                <!--<table width="700" border="1" cellspacing="0" cellpadding="8">-->
                  <!--<tbody>-->
                  <!--<tr>-->
                    <!--<td align="left" bgcolor="#E3E3E3">&nbsp;<strong>服务标准</strong></td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td align="left">-->
                      <!--<div class="line_price1-1" style="line-height:15px; font-size:11px;">-->
                        <!--{{orderForm.proServer}}-->
                      <!--</div>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td align="left">-->
                      <!--<table width="700" border="0" cellspacing="0" cellpadding="0" bordercolordark="#FFFFFF"-->
                             <!--bordercolor="#8CDAFF" id="zysx2">-->
                        <!--<tbody>-->
                        <!--<tr>-->
                          <!--<td align="left" bgcolor="#E3E3E3">&nbsp;<strong>自费说明与购物安排</strong></td>-->
                        <!--</tr>-->
                        <!--<tr>-->
                          <!--<td align="left">-->
                            <!--<div class="line_price1-1" style="line-height:18px; font-size:11px;">-->
                              <!--{{orderForm.proBuy}}-->
                            <!--</div>-->
                          <!--</td>-->
                        <!--</tr>-->
                        <!--</tbody>-->
                      <!--</table>-->
                      <!--<table width="700" border="0" cellspacing="0" cellpadding="8" bordercolordark="#FFFFFF"-->
                             <!--bordercolor="#8CDAFF">-->
                        <!--<tbody>-->
                        <!--<tr>-->
                          <!--<td bgcolor="#E3E3E3"><strong style="font-size:16px;">&nbsp;出团日期：{{orderForm.travelDate.substr(0,10)}}&nbsp;&nbsp;&nbsp;</strong>-->
                          <!--</td>-->
                          <!--<td align="right" bgcolor="#E3E3E3"><strong>&nbsp;订单编号：</strong>{{orderForm.orderName}}&nbsp;-->
                          <!--</td>-->
                        <!--</tr>-->
                        <!--<tr>-->
                          <!--<td colspan="2" align="left">-->
                            <!--<table width="690" border="1" align="center" cellpadding="0" cellspacing="0"-->
                                   <!--bordercolorlight="#FFFFFF">-->
                              <!--<tbody>-->
                              <!--<tr>-->
                                <!--<td align="center"><strong>结算类型</strong></td>-->
                                <!--<td align="center"><strong>人数</strong></td>-->
                                <!--<td align="center"><strong>小计</strong></td>-->
                                <!--<td align="center"><strong>&nbsp;分销商已付<br/> </strong></td>-->
                              <!--</tr>-->
                              <!--<tr v-for="item in orderForm.chargeList">-->
                                <!--<td align="center">{{item.name}}</td>-->
                                <!--<td align="center">{{item.touNum}}人</td>-->
                                <!--<td align="center">{{item.realPrice/100}} 元</td>-->
                                <!--<td align="center">&nbsp;</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td align="center"><strong>合计</strong></td>-->
                                <!--<td align="center"><strong v-if="orderForm.touNum">{{orderForm.touNum}}</strong> 人</td>-->
                                <!--<td align="center"><strong-->
                                  <!--v-if="orderForm.chargePay">{{orderForm.chargePay/100}}</strong> 元-->
                                <!--</td>-->
                                <!--<td align="center"><strong v-if="orderForm.payment">{{orderForm.payment}} 元</strong>-->
                                <!--</td>-->
                              <!--</tr>-->
                              <!--</tbody>-->
                            <!--</table>-->
                          <!--</td>-->
                        <!--</tr>-->
                        <!--</tbody>-->
                      <!--</table>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--</tbody>-->
                <!--</table>-->
                <!--<table width="700" border="0" cellspacing="0" cellpadding="0">-->
                  <!--<tbody>-->
                  <!--<tr>-->
                    <!--<td height="3"></td>-->
                  <!--</tr>-->
                  <!--</tbody>-->
                <!--</table>-->
                <!--<table width="700" border="1" cellspacing="0" cellpadding="0" id="krmd" v-if="!hidden_tou">-->
                  <!--<tbody>-->
                  <!--<tr>-->
                    <!--<td width="113" bgcolor="#E3E3E3">&nbsp;<strong>客人名单</strong></td>-->
                    <!--<td width="531" bgcolor="#E3E3E3"><strong>集合时间地点：</strong>&nbsp;&nbsp;&nbsp;-->
                      <!--<strong>集合时间：</strong>{{orderForm.collectTime.substr(0,10)}}-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td colspan="4">-->
                      <!--<table width="100%" border="0" cellspacing="0" cellpadding="0">-->
                        <!--<tbody>-->
                        <!--<tr>-->
                          <!--<td align="center"><strong>姓名</strong></td>-->
                          <!--<td align="center"><strong>性别</strong></td>-->
                          <!--<td align="center"><strong> 证件类型</strong></td>-->
                          <!--<td align="center"><strong> 证件号码</strong></td>-->
                          <!--<td align="center"><strong>游客电话</strong></td>-->
                          <!--<td align="center"><strong>备注</strong></td>-->
                        <!--</tr>-->
                        <!--<tr v-for="item in orderForm.touList">-->
                          <!--<td align="center">{{item.name}}</td>-->
                          <!--<td align="center">{{item.sex===1?'男':'女'}}</td>-->
                          <!--<td align="center">{{item.cerType}}</td>-->
                          <!--<td align="center">{{item.cerNum}}</td>-->
                          <!--<td align="center">{{item.phone}}</td>-->
                          <!--<td align="left">&nbsp;{{item.remark}}&nbsp;</td>-->
                        <!--</tr>-->
                        <!--</tbody>-->
                      <!--</table>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--</tbody>-->
                <!--</table>-->
                <!--<table width="700" border="0" cellspacing="0" cellpadding="0">-->
                  <!--<tbody>-->
                  <!--<tr>-->
                    <!--<td height="3"></td>-->
                  <!--</tr>-->
                  <!--</tbody>-->
                <!--</table>-->
                <!--<table width="700" border="1" cellspacing="0" cellpadding="0" id="zysx" v-if="!hidden_des">-->
                  <!--<tbody>-->
                  <!--<tr>-->
                    <!--<td bgcolor="#E3E3E3">&nbsp;<strong>订单备注说明</strong></td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td align="left">-->
                      <!--<div class="line_price1-1" style="line-height:18px;">-->
                        <!--{{orderForm.orderDes}}-->
                      <!--</div>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--</tbody>-->
                <!--</table>-->
                <!--endprint-->
              </td>
            </tr>
            <tr>
              <td align="center" bgcolor="#FFFFFF">&nbsp;</td>
            </tr>
            </tbody>
          </table>
          <table width="800" border="0" cellspacing="0" cellpadding="0" class="no-print">
            <tbody>
            <tr>
              <td align="center" bgcolor="#FFFFFF">
                <el-button type="text"   @click="v_stampSelect=true">章子调用</el-button>
                <input name="xc_bt" type="checkbox" id="xc_bt" v-model="hidden_travel"/> <strong>隐藏行程安排</strong>
                <input name="p_hd" type="checkbox" id="p_hd" v-model="hidden_head"/> 隐藏页眉
                <input type="checkbox" name="krmd_b" id="krmd_b" v-model="hidden_tou"/>
                隐藏客人名单 <input type="checkbox" name="zysx_b" id="zysx_b" v-model="hidden_des"/> 隐藏备注说明&nbsp; &nbsp;
              </td>
            </tr>
            <tr>
              <td align="center" bgcolor="#FFFFFF">
                <input name="button" type="submit" id="button" value="打印订单确认件"
                       style="width:400px; height:25px; font-size:15px;" @click="print"/></td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    import {addOrder, getPrintWcOrder} from "@/api/order"
    import priceShow from '@/views/com/priceShow'
    import priceInput from '@/views/com/priceInput'
    import stampSelect from '@/views/com/stampSelect'

    export default {
        name: "printTry",
        data() {
            return {
                hidden_travel: true,
                hidden_head: false,
                hidden_tou: false,
                hidden_des: false,
                v_stampSelect: false,
                stampList: [],
                orderForm: {
                    proServer: '',
                    proBuy: '',
                    uEmail: '',
                    collectTime: '',
                    locationName: '',
                    chargeInfo: '',
                    chargePay: '',
                    uPhone: '',
                    touNum: '',
                    orderNum: '',
                    touList: '',
                    disName: '',
                    disFax: '',
                    chargeList: '',
                    proTravel: '',
                    orderTime: '',
                    disContactor: '',
                    orderDes: '',
                    travelDate: '',
                    uName: '',
                    perName:'',
                    phone: '',
                    payment: '',
                    proName: '',
                },
            }
        },

        components: {priceShow, priceInput, stampSelect},
        created() {
            this.getData()
        },

        methods: {
            print: function () {
                let element = document.getElementsByClassName("previewP_main");
                this.$print(this.$refs.print);
            },
            move(e){
                console.log(e)
                let odiv = e.target;        //获取目标元素
                // let canDrag=true;
                //阻止默认事件的方法,如果不阻止默认事件onmouseup会无法触发
                // e.preventDefault();
                //算出鼠标相对元素的位置
                let disX = e.clientX - odiv.offsetLeft;
                let disY = e.clientY - odiv.offsetTop;
                console.log(disY);
                document.onmousemove = (ee)=>{
                    //console.log("移动")
                    //鼠标按下并移动的事件
                    //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    //因为img居中对齐，所以还要减去目标元素距离body的偏移量
                    let left = ee.clientX - disX;
                    let top = ee.clientY - disY;
                    //移动当前元素
                    odiv.style.left = left + 'px';
                    odiv.style.top = top + 'px';
                };
                document.onmouseup = (eee) => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            },
            eidtUrlList(data) {
                // this.stampList=list;
                // console.log(list);
                for (let i = 0; i < data.exportNum; i++) {
                    this.stampList.push(data.exportData);
                }
                console.log(this.stampList)
                this.v_stampSelect = false;
            },
            refreshPriceAndTouNum() {
                let touNum = 0
                let price = 0
                this.planChargeList.forEach(item => {
                    if (item.touNum) {
                        touNum += parseInt(item.touNum)
                        if (item.realPrice)
                            price += parseInt(item.realPrice) * parseInt(item.touNum)
                    }

                })
                this.orderForm.touNum = touNum
                this.orderForm.price = price
            },

            selectingDis(item) {
                let tempArr
                this.orderForm.disId = item.id
                let tempDisItem = this.orderInfo.disList.find(disitem => (disitem.disTypeId === item.roleId))

                if (tempDisItem) {
                    tempArr = this.orderInfo.disList.find(disitem => (disitem.disTypeId === item.roleId)).planCharge
                } else {
                    tempArr = [{
                        name: '成人',
                        retPrice: 0,
                        setPrice: 0,
                        minAge: 18,
                        maxAge: 50
                    },
                        {
                            name: '儿童',
                            retPrice: 0,
                            setPrice: 0,
                            minAge: 1,
                            maxAge: 18
                        },
                        {
                            name: '老人',
                            retPrice: 0,
                            setPrice: 0,
                            minAge: 50,
                            maxAge: 120
                        }]
                }


                tempArr.forEach(item => {
                    item.touNum = 0
                    item.realPrice = item.retPrice
                })
                this.planChargeList = tempArr
            },


            //保存订单
            saveOrder() {

                let result = true
                let message = ""
                //检查集合地点
                if (!this.orderForm.locationId || this.orderForm.locationId <= 0) {
                    result = false
                    message += "集合地点不能为空；"
                }
                //检查分销商是否选择
                if (!this.orderForm.disId || this.orderForm.disId <= 0) {
                    result = false
                    message += "分销商未选择；"
                }
                this.orderForm.collectTime = this.orderForm.collectTime.substr(0, 5);
                console.log(this.orderForm.collectTime);
                console.log("时间：")

                if (!this.orderForm.collectTime || this.orderForm.collectTime.length !== 5) {
                    result = false
                    message += "未选择集合时间；"
                }

                this.orderForm.chargeInfo = JSON.stringify(this.planChargeList)

                if (result)
                    addOrder(this.orderForm).then(res => {
                        console.log(res)
                        this.$message({
                            type: "success",
                            message: '保存成功'
                        })
                        this.$router.push({
                            name: 'orderList',
                            params: {orderNum: res.toString(), action: 'openTouList'}
                        })
                    }).catch()
                else
                    this.$message({
                        type: 'error',
                        message: message
                    })
            },


            getData() {
              getPrintWcOrder(this.$route.query.id).then(res => {
                this.orderForm = res;
                this.orderForm.proName = res.proName
                 console.log(res);
                })
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "printOrder/css.css";
  @import "printOrder/default.css";
  @import "printOrder/style.css";
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
  .codefans_net {
    position: absolute;
    border: 1px solid #333;
  }

  .drsMoveHandle {
    height: 20px;

    border: 0px;
    cursor: move;
  }

  .dragresize {
    position: absolute;
    width: 5px;
    height: 5px;
    font-size: 1px;
    background: #EEE;
    border: 1px solid #333;
  }

  .dragresize-tl {
    top: -8px;
    left: -8px;
    cursor: nw-resize;
  }

  .dragresize-tm {
    top: -8px;
    left: 50%;
    margin-left: -4px;
    cursor: n-resize;
  }

  .dragresize-tr {
    top: -8px;
    right: -8px;
    cursor: ne-resize;
  }

  .dragresize-ml {
    top: 50%;
    margin-top: -4px;
    left: -8px;
    cursor: w-resize;
  }

  .dragresize-mr {
    top: 50%;
    margin-top: -4px;
    right: -8px;
    cursor: e-resize;
  }

  .dragresize-bl {
    bottom: -8px;
    left: -8px;
    cursor: sw-resize;
  }

  .dragresize-bm {
    bottom: -8px;
    left: 50%;
    margin-left: -4px;
    cursor: s-resize;
  }

  .dragresize-br {
    bottom: -8px;
    right: -8px;
    cursor: se-resize;
  }

  .previewP_main {

    position: absolute;
    width: 620px;
    z-index:100;
    /*left: 0;*/
    /*top: 0;*/
    //图片居中
    /*text-align: center;*/

    img {
      width: 180px;
      position: absolute;

    }
  }
</style>
