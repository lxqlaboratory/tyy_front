<template>
  <div style="width: 100%">

    <el-dialog  v-dialog-drag :visible.sync="v_addTour" append-to-body  style="width: 100%;" title="添加游客">
      <label>批量游客录入</label>
      <div style="display: flex;align-items: center;justify-content: flex-start;width: 90%">
        <div style="display: flex;align-items: center">
          <el-input placeholder="请使用 空格 或者 ，或者 | 等符号分割数据类别，使用回车分割游客" style="width: 40vw" type="textarea"
                    v-model="textTourist"></el-input>
          <el-button @click="parserTourist" style="margin-left: 15px;" type="success">解析导入</el-button>
        </div>
      </div>

      <el-table :data="touristList.slice((query.currentPage - 1) * query.pageSize, query.currentPage * query.pageSize)" border
                ref="mtable"
                stripe>
        <el-table-column type="selection"></el-table-column>

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



    <el-button type="primary" @click="getData()" icon="el-icon-edit" size="mini">处理</el-button>
    <el-button @click="printOrder" icon="el-icon-printer" size="mini">打印</el-button>

    <el-dialog :close-on-click-modal="false" :visible.sync="visOrderInfo" @close="closeOrder" append-to-body
               v-dialog-drag
               width="90%">
      <el-dialog
        :visible.sync="visEditMoney"
        append-to-body
        title="账单明细"
        v-dialog-drag
        width="60%"
      >

        <div style="display: flex;align-items: flex-start;justify-content: center">
          <div style="width: 30%;height: 30vh;display: flex;flex-direction: column;justify-content: space-around">
            <div>
              <label>创建时间</label>
              <span>{{moneyForm.createTime}}</span>
            </div>
            <div>
              <label>收款金额</label>
              <span>{{moneyForm.payment}}元</span>
            </div>
            <div>
              <label>分销单位</label>
              <span>{{moneyForm.disName}}</span>
            </div>
            <!--            <div>-->
            <!--              <label>订单编号</label>-->
            <!--              <span>{{moneyForm.orderNum}}</span>-->
            <!--            </div>-->
            <div>
              <label>收款人</label>
              <span>{{moneyForm.payee}}</span>
            </div>


          </div>

          <div style="width: 30%;height: 30vh;display: flex;flex-direction: column;justify-content: space-around">
            <div>
              <label>账单编号</label>
              <span>{{moneyForm.payNum}}</span>
            </div>
            <div>
              <label>支付方式</label>
              <span>{{moneyForm.payType}}</span>
            </div>
            <div>
              <label>收款日期</label>
              <span>{{moneyForm.payTime}}</span>
            </div>
            <div>
              <label>审批人员</label>
              <span>{{moneyForm.checker}}</span>
            </div>
            <div>
              <label>审批时间</label>
              <span>{{moneyForm.createTime}}</span>
            </div>
          </div>

          <div style="width: 30%">
            <div>
              <label>收款凭证</label></div>

            <el-image :src="moneyForm.payImage" style="width: 100%;" v-if="moneyForm.payImage"></el-image>
            <span style="color: gray" v-else> 未上传</span>

          </div>
        </div>

        <div style="margin-left: 5%;margin-top: 15px;">
          <label>备注说明:</label>
          <span>{{moneyForm.remark}}</span>
        </div>


        <div
          style="display: flex;width: 100%;align-items: center;justify-content: space-around;box-sizing: border-box;padding:15px 15%">

          <el-button @click="changeMoneyState(0)" type="danger" v-if="moneyForm.checkState===1">取消审核</el-button>

          <el-button @click="changeMoneyState(1)" type="success" v-if=" moneyForm.checkState===0">审核订单</el-button>

          <edit-pay-ment :paymentid="moneyForm.id" @refreshFather="onchangemoney"
                         v-if=" moneyForm.checkState===0"></edit-pay-ment>

          <el-button @click="delMoney(moneyForm.id)" type="danger" v-if="moneyForm.checkState===0">删除账单</el-button>
        </div>


      </el-dialog>
      <div slot="title" style="display: flex;align-items: center;justify-content: space-between;padding-right: 45px;">
        <div>
          <label>订单处理</label>
        </div>
        <div
          v-if="orderForm.state===0">
          <el-button type="primary">打印订单</el-button>
          <el-button @click="changeState(orderForm.orderId,1)" type="success">审核订单</el-button>
          <el-button @click="changeState(orderForm.orderId,-1)" type="warning">拒绝订单</el-button>
          <el-button @click="deleteOrder(orderForm.orderId)" type="danger">删除订单</el-button>
        </div>
        <div style="padding:15px;display: flex;align-items: center;justify-content: flex-end"
             v-if="orderForm.state===1">
          <el-button type="primary">打印订单</el-button>
          <el-button @click="changeState(orderForm.orderId,0)" type="warning">取消审核</el-button>
        </div>
        <div style="padding:15px;display: flex;align-items: center;justify-content: flex-end"
             v-if="orderForm.orderState===-1">
          <el-button @click="deleteOrder(orderForm.orderId)" type="danger">删除订单</el-button>
        </div>
      </div>
      <div style="margin-top:-40px;display: flex;align-items: center;justify-content: flex-start;flex-wrap: wrap">
        <div class="infoItem">
          <label>订单编号:</label>
          <span>{{orderForm.orderName}}</span>
        </div>
        <div class="infoItem">
          <label>订单状态:</label>
          <el-tag type="success" v-if="orderForm.state===1">已审核</el-tag>
          <el-tag type="info" v-if="orderForm.state===0">未审核</el-tag>
          <el-tag type="primary" v-if="orderForm.state===-1">已拒绝</el-tag>
        </div>
        <div class="infoItem">
          <label>产品名称:</label>
          <span>{{orderForm.productName}}</span>
        </div>
        <div class="infoItem">
          <label>产品分类:</label>
          <span>{{orderForm.proTypeName}}</span>
        </div>
        <div class="infoItem">
          <label>出团日期:</label>
          <span v-if="orderForm.travelDate">{{orderForm.travelDate}}</span>
          <span v-else></span>
        </div>
        <div class="infoItem">
          <label>行程天数:</label>
          <span>{{orderForm.proDateNum}}天</span>
        </div>
        <div class="infoItem">
          <label>分销商:</label>
          <span>{{orderForm.disName}}</span>
        </div>
        <!--<div class="infoItem">-->
          <!--<label>分销商业务员:</label>-->
          <!--<span>{{orderForm.disContactor}}</span>-->
        <!--</div>-->
        <div class="infoItem">
          <label>业务人员:</label>
          <span>{{orderForm.workerName}}</span>
        </div>

        <div class="infoItem">
          <label>下单时间:</label>
          <span>{{orderForm.creatTime}}</span>
        </div>

        <div class="infoItem">
          <label>集合地点和时间:</label>
          <span>{{orderForm.location}}</span>
        </div>

        <!--<div class="infoItem">-->
          <!--<label>集合时间:</label>-->
          <!--<span>{{orderForm.collectTime}}</span>-->
        <!--</div>-->
      </div>

      <el-tabs type="border-card">

        <el-tab-pane label="订单结算">
          <div>
            <div
              style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;margin: 0 15px;">
              <div>
                <label>编号</label>
                <span>{{orderForm.orderNum}}</span>
              </div>

              <div
                style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;width: 40%;">
                <div>
                  <label>应收总和:</label>
                  <price-show :price="recNum"></price-show>
                </div>
                <div>
                  <label>已收总和:</label>
                  <price-show :price="paidNum"></price-show>
                </div>
                <div>
                  <label>欠款:</label>
                  <price-show :price="arrears"></price-show>
                </div>
                <div>
                  <!--<el-button @click="orderClear" type="primary">订单抹零(计入损耗)</el-button>-->
                </div>
              </div>
            </div>
            <el-table :data="paidList" border stripe>

              <el-table-column align="center" label="报账凭证">
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

              <el-table-column align="center" label="账单号">
                <template slot-scope="scope">
                  {{scope.row.payNum}}
                </template>
              </el-table-column>

              <el-table-column align="center" label="收款日期">
                <template slot-scope="scope">
                  {{scope.row.payTime}}
                </template>
              </el-table-column>

              <el-table-column align="center" label="收款金额">
                <template slot-scope="scope">
                  <price-show :price="scope.row.payment"></price-show>
                </template>
              </el-table-column>

              <el-table-column align="center" label="收款人">
                <template slot-scope="scope">
                  {{scope.row.payee}}
                </template>
              </el-table-column>

              <el-table-column align="center" label="收款方式">
                <template slot-scope="scope">
                  {{scope.row.payType}}
                </template>
              </el-table-column>

              <el-table-column align="center" label="备注说明">
                <template slot-scope="scope">
                  {{scope.row.remark}}
                </template>
              </el-table-column>

              <el-table-column align="center" label="审批状态">
                <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.checkState===1">已审批</el-tag>
                  <el-tag type="error" v-else>未审批</el-tag>
                </template>
              </el-table-column>

              <el-table-column align="center" label="账单类型">
                <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.state===0">普通账单</el-tag>
                  <el-tag type="primary" v-else>抹零账单</el-tag>
                </template>
              </el-table-column>

              <el-table-column align="center" label="审批人员">
                <template slot-scope="scope">
                  {{scope.row.checker}}
                </template>
              </el-table-column>


              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button @click="getMoneyInfo(scope.row.id)" type="primary">处理</el-button>
                </template>
              </el-table-column>


            </el-table>


            <el-divider content-position="left"><label>录入账单</label></el-divider>

            <el-form :model="moneyAddForm" ref="moneyAddForm" style="padding-left: 15px;box-sizing: border-box">
              <div style="display: flex;align-items: flex-start;justify-content: flex-start;width: 100%;">
                <div style="width: 40%;">

                  <el-form-item label="收款方式" prop="payType" required>
                    <!--                    <el-select :value="moneyAddForm.payType" placeholder="请选择收款方式" style="width: 200px"-->
                    <!--                               v-model="moneyAddForm.payType">-->
                    <!--                      <el-option :key="item.code" :label="item.description" :value="item.code"-->
                    <!--                                 v-for="item in payTypeList"></el-option>-->
                    <!--                    </el-select>-->
                    <channel-select :pay-type.sync="moneyAddForm.payType"></channel-select>
                  </el-form-item>

                  <el-form-item label="收款金额" prop="payment" required>
                        <el-input placeholder="请输入收款金额" style="width: 200px" type="number"
                                  v-model.number="moneyAddForm.payment">
                          <template slot="append">元</template>
                        </el-input>
                    <!--<price-input placeholder="请输入收款金额" style="width: 200px" v-model="moneyAddForm.payment"></price-input>-->
                  </el-form-item>
                  <el-form-item label="收款日期" prop="payTime" required>
                    <el-date-picker :picker-options="pickerOptions" align="right" format="yyyy-MM-dd"
                                    placeholder="请选择收款日期"
                                    style="width: 200px" type="date" v-model="moneyAddForm.payTime"
                                    value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="收款人" label-width="5em" prop="payee" required>
                    <el-input maxlength="8" placeholder="请输入实际收款人" style="width: 200px"
                              v-model="moneyAddForm.payee"></el-input>
                  </el-form-item>

                  <el-form-item label="备注说明" prop="remark">
                    <el-input maxlength="200" placeholder="请为账单增添备注" show-word-limit style="max-width: 75%;"
                              type="textarea" v-model="moneyAddForm.remark">
                    </el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item prop="payImage">
                    <label>入账凭证</label>
                    <upload-single-image :res-type="4" style="width: 300px;"
                                         v-model="moneyAddForm.payImage"></upload-single-image>
                  </el-form-item>
                </div>
              </div>
              <el-form-item>
                <el-button :loading="onAddMoney" @click="submitMoneyForm" type="primary">录入</el-button>
                <el-button @click="resetForm('moneyAddForm')">重置</el-button>
              </el-form-item>

            </el-form>


          </div>
        </el-tab-pane>
        <el-tab-pane label="订单信息">

          <el-divider content-position="left"><span style="font-size: 15px;color: black;font-weight:bold">结算详情</span>
          </el-divider>
          <div style="margin-left: 35px;margin-top: 30px;font-size: 15px;">
              <el-row :gutter="20">
                <el-col :span="8">
                  <label>人数合计:</label>
                  <span style="font-weight: bold;color: black">{{orderForm.tourNum}}人</span>
                </el-col>
                <el-col :span="8">
                <label>应收分销商:</label>
                <span style="color: orangered;font-weight: bold">{{orderForm.shoudPay}}元</span>
                </el-col>
                <el-col :span="8">
                  <label>实收分销商:</label>
                  <span style="color: orangered;font-weight: bold">{{orderForm.hashPay}}元</span>
                </el-col>
              </el-row>
            </div>


          <el-divider content-position="left"><span style="font-size: 15px;color: black;font-weight:bold">集合信息</span>
          </el-divider>
          <div  style="margin-left: 35px;margin-top: 30px;font-size: 15px;">
            <label>集合地点: </label>
            <el-select :value="orderForm.location" v-model="orderForm.location" @change="changeButton()">
              <el-option :key="item.id" :label="item.locationName" :value="item.id"
                         v-for="item in locationList"></el-option>
            </el-select>
          </div>

          <el-button v-bind:disabled="dis" @click="editOrder" style="margin-top: 15px;" type="success">保存订单信息</el-button>


        </el-tab-pane>
        <el-tab-pane label="费用明细">
          <el-divider content-position="left"><span style="font-size: 15px;color: black;font-weight:bold">结算详情</span>
          </el-divider>
          <el-table :data="tourMoneyList" border stripe style="margin-top: 5px;">
            <el-table-column align="center" label="类型">
            <template slot-scope="scope">
              {{scope.row.identityName}}
            </template>
          </el-table-column>
            <el-table-column align="center" label="结算价">
              <template slot-scope="scope" v-if="scope.row.chengren===1">
                <span slot="append">{{scope.row.CRretPrice}}元/人</span>
              </template>
              <template slot-scope="scope"v-else="scope.row.ertong===1">
                <span slot="append">{{scope.row.ETretPrice}}元/人</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="参考价">
              <template slot-scope="scope" v-if="scope.row.chengren===1">
                <span slot="append">{{scope.row.CRsetPrice}}元/人</span>
              </template>
              <template slot-scope="scope"v-else="scope.row.ertong===1">
                <span slot="append">{{scope.row.ETsetPrice}}元/人</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="人数">
              <template slot-scope="scope" v-if="scope.row.chengren===1">
              {{scope.row.crNum}}人
              </template>
              <template slot-scope="scope"v-else="scope.row.ertong===1">
                {{scope.row.erNum}}人
              </template>
            </el-table-column>
            <el-table-column align="center" label="实际结算价">
              <template slot-scope="scope" v-if="scope.row.chengren===1">
                {{scope.row.totalCRretPrice}}元
              </template>
              <template slot-scope="scope"v-else="scope.row.ertong===1">
                {{scope.row.totalETretPrice}}元
              </template>
            </el-table-column>
            <el-table-column align="center" label="实际总计">
              <template slot-scope="scope" v-if="scope.row.chengren===1">
                {{scope.row.totalCRsetPrice}}元
              </template>
              <template slot-scope="scope"v-else="scope.row.ertong===1">
                {{scope.row.totalETsetPrice}}元
              </template>
            </el-table-column>
          </el-table>

          <div style="margin-left: 35px;margin-top: 30px;font-size: 15px;">
            <el-row :gutter="20">
              <el-col :span="8">
                <label>人数合计:</label>
                <span style="font-weight: bold;color: black">{{orderForm.tourNum}}人</span>
              </el-col>
              <el-col :span="8">
                <label>应收分销商:</label>
                {{orderForm.shoudPay}}元
              </el-col>
            </el-row>
          </div>

        </el-tab-pane>

        <el-tab-pane label="游客列表">
          <el-button @click="toAddTour()" type="primary">
            添加游客
          </el-button>
          <el-table :data="tourList" border
                    ref="mtable"
                    stripe>
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
            <el-table-column align="center" label="操作" width="350px">
            <template slot-scope="scope">
            <div>
            <el-button @click="editTou(scope.row)" type="primary">编辑</el-button>
            <!--<el-button @click="delTou(scope.row.id)" type="danger">删除</el-button>-->
            <!--<el-button @click="editIsBlack(scope.row.id,1)" type="warning" v-if="scope.row.isBlack===0">拉黑</el-button>-->
            <!--<el-button @click="editIsBlack(scope.row.id,0)" type="success" v-if="scope.row.isBlack===1">恢复</el-button>-->
            </div>

            </template>
            </el-table-column>

          </el-table>

        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog :visible.sync="v_editTou" append-to-body title="编辑游客" v-dialog-drag width="1500px">
      <el-row :gutter="10" style="margin: 15px 0;">
        <el-col :span="2">
          <el-select :value="editForm.identity" placeholder="选择类型" v-model="editForm.identity">
            <!--<el-option :key="typeItem.id" :label="typeItem.name" :value="typeItem.name"-->
                       <!--v-for="typeItem in planChargeList"></el-option>-->
            <el-option :value="1" label="成人"></el-option>
            <el-option :value="2" label="儿童"></el-option>
            <el-option :value="3" label="老人"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-input placeholder="游客姓名" v-model="editForm.name"></el-input>
        </el-col>
        <el-col :span="2">
          <el-select :value="editForm.sex" placeholder="选择性别" v-model="editForm.sex">
            <el-option :value="1" label="男"></el-option>
            <el-option :value="0" label="女"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-input placeholder="年龄" v-model="editForm.age"></el-input>
        </el-col>
        <el-col :span="2">
          <el-select :value="editForm.cerType" placeholder="证件类型" v-model="editForm.cerType">
            <el-option :key="cerItem.code" :label="cerItem.description" :value="cerItem.code"
                       v-for="cerItem in this.cerTypeList"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="证件号码" v-model="editForm.cerNum"></el-input>
        </el-col>

        <el-col :span="3">
          <el-input placeholder="联系电话" v-model="editForm.phone"></el-input>
        </el-col>
        <el-col :span="5">
          <el-input placeholder="游客备注" v-model="editForm.remark"></el-input>
        </el-col>
        <el-col :span="5">
          <el-button @click="save"  type="primary">保存修改</el-button>
        </el-col>
      </el-row>


    </el-dialog>

  </div>
</template>

<script>
  import {
    getOrderDetail,
    getNewTouList,
    getNewTouMoneyList,
    editTouInfo,
    changeMoneyState,
    changeOrderState,
    delMoney,
    deleteOrder,
    editOrder,
    getMoneyInfo,
    getWechatOrderDetail,
    getOrderDisMoneyList,
    getPayType,
    getOrderHisList,addOrderHis,checkHis,
    getTouristOrder
  } from "@/api/order"
  import {addMoney, balancePay} from "@/api/money"
  import proTravel from "@/views/production/proTravel"
  import LocationSelect from "@/views/com/locationSelect"
  import UploadSingleImage from "@/views/com/uploadSingleImage"
  import EditPayMent from "@/views/order/editPayMent"
  import OrderToulist from "@/views/order/orderToulist"
  import channelSelect from "@/views/money/channelSelect"
  import priceShow from '@/views/com/priceShow'
  import priceInput from '@/views/com/priceInput'
  import {getCerTypes} from "@/api/tourist"
  export default {
    name: "wcOrderInfo",
    components: {OrderToulist, EditPayMent, UploadSingleImage, LocationSelect, proTravel,channelSelect,priceShow,priceInput},
    data() {
      return {
        query: {
          currentPage: 1,
          pageSize: 3
        },
        textTourist: '',
        touristList:[],
        dis:true,
        locationList:[],
        tourMoneyList:[],
        tourList:[],
        cerTypeList:[],
        //编辑游客
        editForm: {},
        v_editTou: false,
        v_contract:false,
        planChargeList: [],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }]
        },
        orderHisList:[],
        //整体订单信息
        orderForm: {
          disType: 0,
          hisList: [],
          touList: [],
          reason: '',
          proTravel: '',
          chargeInfo: [],
          serType: 0,
          proPlanCharge: '',
        },

        orderCharge:{
          orderId:this.orderId,
          price:0,
          reason:'',
          touNum:0,
        },
        //变更订单form
        editOrderForm: {
          orderId: '',
          location: '',
        },

        //录入账单 账单form
        moneyAddForm: {
          payImage: '',
          payType: '',
          payee: '',
          payment: '',
          payTime: '',
          remark: ''
        },

        //单个账单信息
        moneyForm: {
          checkState: 0,
          checkTime: '',
          checker: '',
          createTime: '',
          disName: '',
          id: '',
          orderNum: '',
          payNum: '',
          payTime: '',
          payType: '',
          payee: '',
          payment: '',
          remark: '',
          state: ''
        },


        //单个账单
        visEditMoney: false,
        //整个框架
        visOrderInfo: false,


        orderHistory: [],

        payTypeList: [],

        recNum: 0,
        paidNum: 0,
        arrears: 0,
        paidList: [],

        onAddMoney: false,

        onClearOrder: false,
        v_addTour:false,

      }
    },
    methods: {
      //解析游客字符串  直接录入后台
      parserTourist() {
        this.onLoading = true
        getTouristOrder(this.textTourist, this.orderId).then(res => {
          this.$message({
            type: "success",
            message: "解析成功",
            showClose: true,
          })
          this.v_addTour = false
          this.visOrderInfo = false
          this.getData()
          this.touristList = res.data
          this.textTourist = ''
          this.onLoading = false
        }).catch(error => {
          this.onLoading = false
        })

      },
      toAddTour(){
        this.v_addTour = true
      },
      changeButton(){
        this.dis= false
      },
      //对单个游客进行修改保存 把EDITFORM传给后台
      save() {
        this.editForm.orderId = this.orderId
        editTouInfo(this.editForm).then(res => {
          if(res.re===1){
            this.$message({
            type: "success",
            message: '修改成功！'
          })
          }else{
            this.$message({type: 'error', message: res.data})
          }

          this.v_editTou = false
          this.getData()

        }).catch(error => {
        })
      },
      //对单个游客进行修改
      editTou(tou) {
        this.editForm = JSON.parse(JSON.stringify(tou))
        this.v_editTou = true
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
        this.editOrderForm.touNum = touNum
        this.editOrderForm.price = price
      },
      checkHis(id,state){
        checkHis(id,state).then(res=>{
          this.$message({
            type:'success',
            message:'处理成功！'
          });
          this.getData();
        }).catch(err=>{

        })
      },
      addHis(){
        addOrderHis(this.orderCharge).then(res=>{
          this.$message({
            type:"success",
            message:"提交成功！"
          });
          // this.getData();
          this.orderCharge={}
        }).catch(err=>{
        })
      },
      orderClear() {
        this.onClearOrder = true
        balancePay(this.orderId).then(res => {
          this.onClearOrder = false
          this.$message({
            type: 'success',
            message: '增加抹零账单，订单抹零成功'
          })
          // this.getData()
        }).catch(error => {
          this.onClearOrder = false
        })
      },
      onchangemoney() {
        this.visEditMoney = false
        // this.getData()
      },

      submitMoneyForm() {
        this.onAddMoney = true
        this.moneyAddForm.orderId = this.orderId
        addMoney(this.moneyAddForm).then(res => {

          if(res.re===1){
            this.$message({
              type: 'success',
              message: '录入账单成功'
            })
          }else{
            this.$message({type: 'error', message: res.data})
          }

          this.onAddMoney = false
          // this.getData()
          this.resetForm('moneyAddForm')
        }).catch(error => {
          this.onAddMoney = false
        })
      },

      resetForm(formName) {
        this.$refs[formName].resetFields()
      },

      closeOrder() {
        this.$emit('refresh', {})
      },

      delMoney(id) {
        this.$confirm('此操作不可撤销，是否继续', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          delMoney(id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.visEditMoney = false
            // this.getData()
          }).catch(error => {
          })
        })
      },

      getMoneyInfo(id) {
        getMoneyInfo(id).then(res => {
          this.moneyForm = res
          this.visEditMoney = true
        }).catch(error => {
        })
      },

      changeMoneyState(state) {
        changeMoneyState(this.moneyForm.id, state).then(res => {
          this.$message({
            type: 'success',
            message: '改变账单状态成功'
          })
          this.moneyForm.checkState = state
          this.paidList.find(item => (item.id === this.moneyForm.id)).checkState = state
          // this.getData()

        }).catch(error => {
        })
      },

      deleteOrder(id) {
        this.$confirm('此操作不可撤销，是否继续', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          deleteOrder(id).then(res => {
            if(res.re===1){
              this.$message({type: 'success', message: '删除成功'})
            }else{
              this.$message({type: 'error', message: res.data})
            }
            this.visOrderInfo = false
            // this.getData()
          }).catch(error => {
          })
        })
      },

      changeState(id, state) {
        changeOrderState(id, state).then(res => {
          this.$message({type: 'success', message: '订单状态变更成功'})
          this.getData()
        }).catch(error => {
        })
      },

      editOrder() {
        //筛选出editForm
        editOrder(this.orderForm).then(res => {
          if(res.re===1){
            this.$message({
              type: 'success',
              message: '保存订单信息成功!'
            })
          }else{
            this.$message({type: 'error', message: res.data})
          }

          // this.getData()
        }).catch(error => {
        })
      },
      printOrder() {
        // window.open(process.env.VUE_APP_PRINT_URL + 'order?orderId=' + this.orderId)
        console.log("this.orderId="+this.orderId)
        let routeUrl = this.$router.resolve({
          path: "/printTry",
          query: {id:this.orderId}
        });
        window.open(routeUrl.href,'_blank');
      },
      getData() {
        getCerTypes({type: 'CERTYPE'}).then(res => {
          this.cerTypeList = res.data
        }).catch(error => {
        })
        // Promise.all([getPayType(), getOrderDisMoneyList(this.orderId), getOrderHisList(this.orderId)]).then(res => {
        //   this.payTypeList = res[0]
        //   this.recNum = res[1].recNum
        //   this.paidNum = res[1].paidNum
        //   this.arrears = res[1].arrears
        //   this.paidList = res[1].list;
        //   this.orderHisList = res[2];
        //
        this.visOrderInfo = true
        getWechatOrderDetail(this.orderId).then(res => {
            this.orderForm = res.data
            this.planId = res.data.planId
            this.editOrderForm.orderId = this.orderId
            // this.editOrderForm.location = this.orderForm.location

            getNewTouList(this.orderId).then(res => {
              this.tourList = res.data
              this.onLoading = false
            }).catch(error => {
              this.onLoading = false
            })

            getNewTouMoneyList(this.orderId).then(res => {
              this.tourMoneyList = res.data
              // this.total = res.pagination.total
              this.onLoading = false
            }).catch(error => {
              this.onLoading = false
            })

          getOrderDetail(this.planId).then(res => {
            this.locationList = JSON.parse(res.data.locationList)
          }).catch(error => {

          })

        }).catch(error => {
        })



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
  .price {
    color: red;
    font-size: 15px;
    margin-left: 8px;
  }

  .infoItem {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 33%;
    margin: 7px 0;
    padding-bottom: 3px;
    border-bottom: 1px solid whitesmoke;
  }

  .infoItem label {
    margin-right: 5px;
  }

</style>
