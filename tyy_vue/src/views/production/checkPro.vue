<template>
  <div class="app-container">
    <el-dialog v-dialog-drag  :visible.sync="v_addLocation" title="自定义集合地点">
      <add-new-location @newLocation="addLocationNew"></add-new-location>
    </el-dialog>
    <el-dialog v-dialog-drag  :visible.sync="v_addDisType" style="width: 100%;" title="新增销售端口">
      <el-form
        :model="disTypeAddForm"
        label-position="left"
        label-width="100px"
        style="width: 80%; margin-left:50px;">
        <el-form-item label="类型名" prop="name">
          <el-input maxlength="20" style="width: 50%;" v-model="disTypeAddForm.roleName"/>
        </el-form-item>
        <el-form-item label="地域名" prop="name">
          <div>
            <el-switch
              active-text="新增地域"
              inactive-text="选择地域"
              v-model="isAddNewType">
            </el-switch>
          </div>
          <el-input placeholder="请输入新的地域类型" style="width: 50%;" v-if="isAddNewType"
                    v-model="disTypeAddForm.type"/>
          <el-select :value="disTypeAddForm.type" clearable placeholder="请选择地域类型" style="width: 50%;"
                     v-else v-model="disTypeAddForm.type">
            <el-option :key="item" :label="item" :value="item" v-for="item in getDisArrName()"/>
          </el-select>
        </el-form-item>
        <el-form-item label="类型备注" prop="name">
          <el-input maxlength="50" style="width: 50%;" v-model="disTypeAddForm.roleDes"/>
        </el-form-item>
        <el-form-item label="序号" prop="name">
          <el-input style="width: 50%;" type="number" v-model="disTypeAddForm.roleOrder"/>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="v_addDisType = false">取消</el-button>
        <el-button :loading="isOnAdd" @click="addNewDisType" type="primary">增加</el-button>
      </div>
    </el-dialog>
    <el-dialog v-dialogDrag :visible.sync="v_addPlan" :close-on-click-modal="false" style="width:120%;margin-left: -50px;" title="增加计划">
      <el-form :model="planAddForm" label-width="100px" ref="planAddForm">
        <el-form-item :rules="[ { required: true, message: '出团日期不能为空'}]" label="出团日期" prop="travelDate">
          <el-date-picker
            :picker-options="pickerOptions"
            align="right"
            format="yyyy-MM-dd"
            placeholder="选择出团日期"
            style="width: 60%;"
            type="dates"
            v-model="planAddForm.travelDate"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="销售状态" prop="saleState">
          <el-switch active-text="正常销售" inactive-text="暂停销售" v-model="planAddForm.saleState"></el-switch>
        </el-form-item>

        <el-form-item label="计划人数" prop="numLimit" required>
          <el-input style="width: 60%;" type="number" v-model.number="planAddForm.numLimit"></el-input>
          人
        </el-form-item>

        <!--<el-form-item label="结算类型" prop="ticketType">-->
          <!--<div style="display: flex;width: 80%; justify-content: flex-start;flex-wrap: wrap;align-items: center;">-->
            <!--<el-checkbox-group v-model="planAddForm.ticketType">-->
              <!--<el-checkbox :key="item.id" :label="item.id" border size="medium"-->
                           <!--v-for="item in ticketTypeList">{{item.dataItemName}}-->
              <!--</el-checkbox>-->


            <!--</el-checkbox-group>-->
          <!--</div>-->
        <!--</el-form-item>-->

        <el-form-item label="集合地点" prop="proLocation">
         <div style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center">
             <el-tag
              :key="item.id"
              @close="planAddForm.proLocation.splice(index,1)"
              closable
              disable-transitions
              style="margin-right: 5px;"
              v-for="(item,index) in planAddForm.proLocation"
              v-if="locationList.find(lItem=>(lItem.id===item))!=null"
            >
              <span>{{locationList.find(lItem=>(lItem.id===item)).locationName}}</span>

            </el-tag>

            <el-popover
              placement="right"
              trigger="click"
              width="400">
              <div
                style="display: flex;width: 100%; justify-content: flex-start;flex-wrap: wrap;align-items: center;">
                <el-checkbox-group v-model="planAddForm.proLocation">
                  <el-checkbox :key="item.id"
                               :label="item.id" border size="medium" style="margin: 5px;min-width: 150px;"
                               v-for="item in locationList"
                  >{{item.locationName}}
                  </el-checkbox>
                </el-checkbox-group>
                <el-button @click="v_addLocation=true" type="primary">增加集合地点</el-button>
              </div>
              <el-button slot="reference" style="margin-left: 15px;" type="primary">添加集合地点</el-button>
           </el-popover>
          </div>

        </el-form-item>

        <el-form-item label="销售端口" prop="disList">
          <div style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center">
            <el-tag
              :key="item.id"
              @close="planAddForm.disList.splice(index,1)"
              closable
              disable-transitions
              style="margin-right: 5px;"
              v-for="(item,index) in planAddForm.disList"
            >
              {{item.roleName}}
            </el-tag>
            <el-popover
              placement="right"
              trigger="click"
              width="400">
              <div
                style="display: flex;width: 80%; justify-content: flex-start;flex-wrap: wrap;align-items: center;">
                <el-checkbox-group @change="handleChargeChange" v-model="planChageList">
                  <div v-for="disTypeItem in disTypeDyList">
                    <el-checkbox-button
                      :checked="planAddForm.disList.find(function(info){return info.id===item.id})!=null"
                      :key="item.id"
                      :label="item"
                      border size="medium"
                      style="margin-bottom: 15px;"
                      v-for="item in disTypeList.filter(item=>(item.type===disTypeItem))"
                    >{{item.roleName}}
                    </el-checkbox-button>
                    <!--<el-button @click="selectedAll(disTypeItem)" circle icon="el-icon-check"></el-button>-->
                  </div>
                  <el-button @click="v_addDisType=true" type="primary">增加销售端口</el-button>
                  <el-button  @click="$router.push({path:'../distribute/disType'})" type="primary">修改端口</el-button>
                </el-checkbox-group>
              </div>
              <el-button slot="reference" style="margin-left: 15px;" type="primary">选择销售端口</el-button>
            </el-popover>
          </div>
        </el-form-item>

        <el-divider content-position="left">结算项目</el-divider>

        <div style="margin-top: 15px;">

          <span style="color: gray;font-size: 13px;" v-if="planAddForm.disList.length===0">尚未有销售端口</span>
          <el-tabs style="min-width: 95%;" type="border-card" v-else>
            <el-tab-pane label="缺省结算项目" style="width: 100%;">
              <el-button @click="planAddForm.defalutPlanCharge.push({
                    portName:'默认',

                    })" icon="el-icon-circle-plus-outline" style="margin:0 0 15px 15px;" type="primary">增加结算类型
              </el-button>
              <div
                style="width:100%;display: flex;align-items: center;justify-content: space-between;margin-bottom: 10px;"
                v-for="(item,index) in planAddForm.defalutPlanCharge">
                <div>
                  <label>结算类型</label>
                  <el-select :value="item.ticketType" clearable v-model="item.ticketType" @change="changeValue($event) ">
                    <el-option :key="item.dataItemName" :label="item.dataItemName" :value="item.dataItemName"
                               v-for="item in ticketTypeList"></el-option>
                  </el-select>
                </div>

                <div>
                  <label>结算价<span class="tip">(同行价)</span></label>

                  <el-input style="width: 150px;" type="number" v-model="item.retPrice">
                    <span slot="append">元</span>
                  </el-input>
                  <!--<el-input v-model.number="item.retPrice" style="width: 150px;"></el-input>-->
                  <!--<price-input v-model="item.retPrice" style="width: 150px;"></price-input>-->


                </div>

                <div>
                  <label>参考价<span class="tip">(外报价)</span></label>
                          <el-input style="width: 150px;" type="number" v-model="item.setPrice">
                            <span slot="append">元</span>
                          </el-input>
                  <!--<price-input v-model="item.setPrice" style="width: 150px;"></price-input>-->
                </div>

                <div style="width: 85px;">
                  <el-button @click="planAddForm.defalutPlanCharge.splice(index,1)" type="danger" v-show="index!==0">删除
                  </el-button>
                </div>
              </div>

              <el-form-item label="项目备注">
                <el-input placeholder="此处可填写航班信息或价格说明等，不填请留空，最多20字" v-model="planAddForm.planDes"></el-input>
              </el-form-item>

            </el-tab-pane>

            <el-tab-pane :key="disItem.id" :label="disItem.roleName" v-for="disItem in planAddForm.disList">
              <el-switch
                active-text="特殊结算策略"
                inactive-text="缺省结算策略"
                style="margin: 15px;"
                v-model="disItem.isSpecial"/>

              <div v-if="disItem.isSpecial">

                <el-button @click="disItem.planCharge.push({
                        name: '成人',
                        retPrice: 0,
                        setPrice: 0
                    })" icon="el-icon-circle-plus-outline" style="margin:0 0 15px 15px;" type="primary">增加结算类型
                </el-button>


                <div
                  style="width:100%;display: flex;align-items: center;justify-content: space-between;margin-bottom: 10px;"
                  v-for="(item,index) in disItem.planCharge">
                  <div>
                    <label>结算类型</label>
                    <el-select :value="item.ticketType" clearable v-model="item.ticketType" @change="changeValue($event) ">
                      <el-option :key="item.dataItemName" :label="item.dataItemName" :value="item.dataItemName"
                                 v-for="item in ticketTypeList"></el-option>
                    </el-select>
                  </div>

                  <div>
                    <label>结算价<span class="tip">(同行价)</span></label>
                    <!--                      <el-input style="width: 150px;" type="number" v-model="item.retPrice">-->
                    <!--                        <span slot="append">元</span>-->
                    <!--                      </el-input>-->
                    <price-input style="width: 150px;" v-model="item.retPrice"></price-input>
                  </div>

                  <div>
                    <label>参考价<span class="tip">(外报价)</span></label>
                    <!--                      <el-input style="width: 150px;" type="number" v-model="item.setPrice">-->
                    <!--                        <span slot="append">元</span>-->
                    <!--                      </el-input>-->
                    <price-input style="width: 150px;" v-model="item.setPrice"></price-input>

                  </div>

                  <div style="width: 85px;">
                    <el-button @click="disItem.planCharge.splice(index,1)" type="danger" v-show="index!==0">删除
                    </el-button>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

      </el-form>

      <span class="dialog-footer" slot="footer">
          <el-button :loading="onload_addPlan"
                     @click="savePlan()" type="primary">保存</el-button>
          <el-button @click="v_addPlan=false"
                     type="warning">取消</el-button>
        </span>

    </el-dialog>


    <div class="filter-container">
      <div class="filter-item">
        <label>产品类型</label>
        <el-select @change="clearType2" clearable placeholder="请选择产品一级类型"
                   style="width:  180px;" v-model="queryForm.proType_1" value="productForm.proType_1">
          <el-option :key="item.id" :label="item.proTypeName"
                     :value="item.id" v-for="item in proTypeList.filter(item=>(item.proTypeParent===0))"></el-option>
        </el-select>

        <el-select clearable placeholder="请选择产品二级类型" style="width: 48%;" v-if="proType_2_List.length!==0"
                   v-model="queryForm.proType_2" value="productForm.proType_2">
          <el-option
            :key="item.id" :label="item.proTypeName" :value="item.id" v-for="item in proType_2_List"></el-option>
        </el-select>
      </div>
      <!--      <div class="filter-item">-->
      <!--        <label>服务类型</label>-->
      <!--        <el-select :value="queryForm.serType" clearable placeholder="请选择产品服务类型" ref="resType"-->
      <!--                   style="width: 180px;" v-model="queryForm.serType">-->
      <!--          <el-option :key="item.id" :label="item.serviceName" :value="item.id"-->
      <!--                     v-for="item in serTypeList"></el-option>-->
      <!--        </el-select>-->
      <!--      </div>-->

      <div class="filter-item">
        <label>销售状态</label>
        <el-select :value="queryForm.saleState" clearable placeholder="请选择销售状态" ref="resType"
                   style="width: 180px;" v-model="queryForm.saleState">
          <el-option label="正常销售" value="1"></el-option>
          <el-option label="暂停销售" value="0"></el-option>
        </el-select>
      </div>

      <div style="width:90%;box-sizing:border-box;display: flex;align-items: center;">
        <div style="display: flex;align-items: center;">


          <div class="filter-item">
            <label>产品编号</label>
            <el-input maxlength="50" placeholder="请检索产品编号" style="margin-left: 15px; width: 300px"
                      v-model="queryForm.proNum"></el-input>
          </div>
          <div class="filter-item">
            <label>产品名</label>
            <el-input maxlength="50" placeholder="请检索产品名" style="margin-left: 15px; width: 300px"
                      v-model="queryForm.name"></el-input>
          </div>

          <div class="filter-item">
            <label>行程天数</label>
            <el-input placeholder="检索行程总天数" style="margin-left: 15px; width: 300px" type="number"
                      v-model.number="queryForm.proDateNum"></el-input>
          </div>
        </div>


      </div>

      <div class="filter-item">
        <el-button @click="getList" icon="el-icon-search" style="width: 180px" type="primary">查询</el-button>
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

      <el-table-column align="center" label="产品信息" min-width="14">
        <template slot-scope="scope">
          <el-button @click="$router.push({name:'ProInfo',query:{id:scope.row.id}})" type="text">
            【散客】{{ scope.row.name }}
          </el-button>
          <br>

          <el-button @click="editPro(scope.row.id)" style="color: orangered" type="text">【编号】 {{ scope.row.proNum }}
          </el-button>
        </template>
      </el-table-column>


      <el-table-column align="center" label="产品类别" min-width="8">
        <template slot-scope="scope">
          {{scope.row.proType}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="成团最低收客数" min-width="8">
        <template slot-scope="scope">
          {{ scope.row.minTouNum }}人
        </template>
      </el-table-column>

      <!--      <el-table-column align="center" label="服务类别" min-width="10">-->
      <!--        <template slot-scope="scope">-->
      <!--          {{scope.row.serType}}-->
      <!--        </template>-->
      <!--      </el-table-column>-->

      <el-table-column align="center" label="行程天数" min-width="6">
        <template slot-scope="scope">
          {{ scope.row.proDateNum }}天
        </template>
      </el-table-column>


      <el-table-column align="center" label="订单数量" min-width="6">
        <template slot-scope="scope">

          <el-button type="text"  @click="$router.push({name:'orderList',params:{proNum:scope.row.proNum}})"> {{ scope.row.orderNum }}个</el-button>
        </template>
      </el-table-column>




      <el-table-column align="center" label="累计收客" min-width="6">
        <template slot-scope="scope">

          <el-button type="text"  @click="$router.push({name:'touristList',params:{proNum:scope.row.proNum}})"> {{ scope.row.touristNum }}人</el-button>

        </template>
      </el-table-column>

      <el-table-column align="center" label="出团计划" min-width="8">
       <template slot-scope="scope">
          <div v-if="scope.row.planTime">

            <el-button style="color: orangered" @click="toPlanList(scope.row.proNum,scope.row.planId)" type="text">      <span style="font-size: 13px;">最近: {{ scope.row.planTime }}</span>
            </el-button>
          </div>
          <div>
            <el-button  @click="toPlanList(scope.row.proNum)" type="text">全部计划</el-button>
          </div>
          <prolist-plan :pro-num="scope.row.proNum"></prolist-plan>

        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="25">
        <template slot-scope="scope">
          <el-button @click="checkPro(scope.row)" size="mini" type="primary">产品审核</el-button>
          <el-popover style="margin: 0 10px">
            <div>
              <div>
                <el-button @click="copyProduct(scope.row.id,'sk')" size="mini" type="primary">
                  复制为散客产品
                </el-button>
              </div>
              <div style="margin-top: 5px;">
                <el-button @click="copyProduct(scope.row.id,'td')" size="mini" type="success">
                  复制为团队产品
                </el-button>
              </div>
            </div>
            <el-button size="mini" slot="reference" type="warning">产品复制
            </el-button>
          </el-popover>
          <el-button @click="delProduct(scope.row.id)" size="mini" type="danger">产品删除</el-button>

          <br/>
          <div style="margin-top: 5px;">

            <el-button @click="$router.push({name:'ProInfo',query:{id:scope.row.id}})" size="mini" type="success">
              录入订单
            </el-button>

            <el-button @click="proPlan(scope.row.id)" size="mini" type="primary">添加计划</el-button>
            <el-button @click="exportTravel(scope.row.id)" size="mini" type="warning">导出行程</el-button>
          </div>
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
  import {delProduct, getNoCheckPros, getProTye, getSerTypes,getLocations,getProTicList,checkProduct} from "@/api/production"
  import {addPlans} from "@/api/plan"
  import priceInput from '@/views/com/priceInput'
  import addNewLocation from "@/views/production/addNewLocation"
  import {addDisType, getDisType} from "@/api/distribute"
  import {distinct} from "@/utils/tools"
   import  prolistPlan from '@/views/com/prolistPlan'

  export default {
    name: "checkPro",
    data() {
      return {
        //出团日期快捷选项
        pickerOptions: {

          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '明天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '后天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 2)
              picker.$emit('pick', date)
            }
          }]
        },


        onload_addPlan: false,
        v_addPlan: false,


        proTypeList: [],
        serTypeList: [],


        autoOpenTimes:0,
        list: [],
        total: 0,
        onLoading: false,
        queryForm: {
          proNum: '',
          name: '',
          serType: '',
          proType_1: '',
          proType_2: '',
          proDateNum: '',
          saleState: '',


          pageNum: 1,
          pageSorted: 'desc',
          pageSize: 10
        },
        ticketTypeList:[],
        planAddForm: {
          ticketType:[],
          //四个下拉框
          defalutPlanCharge: [
            {
              portName:'默认',
              ticketType:'',
              retPrice: 0,
              setPrice: 0
            }
          ],
          proId: '',
          saleState: true,
          travelDate: '',
          planDes: '',
          disList: [],
          numLimit: 0,
          proLocation: [],
        },
        locationList: [],
        disTypeList: [],
        planChageList: [],
        v_addLocation: false,
        v_addDisType: false,
        disTypeAddForm: {},
        isAddNewType: false,
        isOnAdd: false,

      }
    },
      components:{priceInput,addNewLocation},
    computed: {
      proType_2_List() {
        if (this.queryForm.proType_1)
          return this.proTypeList.find(item => (item.id === this.queryForm.proType_1)).children
        return []
      },
      //分销商地域列表,去重拿到
      disTypeDyList() {
        return distinct(this.disTypeList, 'type')
      },
    },
    created() {
      if(this.$route.query.proNum){
        this.queryForm.proNum=this.$route.query.proNum
        this.autoOpenTimes=0
      }


      if(this.$route.params.proNum){
        this.queryForm.proNum=this.$route.params.proNum
        this.autoOpenTimes=0
      }




      this.queryForm.serType = 1
      this.initList()
      this.getList()
    },
    methods: {
      checkPro(item){
        let proId = item.id
        checkProduct(proId).then(res=>{
          this.$message({type: 'success', message: "产品审核成功！"})
          this.onSave=false
          // this.$router.back()
          this.getList()
        }).catch(error => {

          this.onSave=false
        })

      },
      changeValue(e) {
        //locations是v-for里面的也是datas里面的值
        let obj = {};
        obj = this.ticketTypeList.find((item) => {
          return item.id === e;
        });

        console.log(e);//获取的 id

      },
        letProOut() {
        this.$router.push({name: 'proOutput'})
      },
      addProduction() {
        //跳转到添加产品页面
        this.$router.push({name: 'AddProduction'})

      },

      //跳转到计划页面。并打开dialog修改最近的计划
      toPlanList(proNum, id) {

        if (id)
          this.$router.push({name: 'planList', query: {id, proNum}})
        else
          this.$router.push({name: 'planList', query: {proNum}})
      },
      //为单个产品增加计划
      savePlan() {
        this.onload_addPlan = true
        //使用缺省策略覆盖
        for (let item of this.planAddForm.disList) {
          if (!item.isSpecial) {
            item.planCharge = this.planAddForm.defalutPlanCharge;
          }
        }
        this.planAddForm.disListStr = JSON.stringify(this.planAddForm.disList)
        this.planAddForm.defalutPlanChargeStr = JSON.stringify(this.planAddForm.defalutPlanCharge)
        this.planAddForm.ticketType=JSON.stringify(this.planAddForm.ticketType)
        console.log("defalutPlanChargeStr"+this.planAddForm.defalutPlanChargeStr)
        console.log("disListStr"+this.planAddForm.disListStr)
        addPlans(this.planAddForm).then(res => {
          this.$message({
            type: 'success',
            message: '增加新计划成功'
          })

          this.onload_addPlan = false
          this.v_addPlan = false

          this.getList()

        }).catch(error => {
          this.onload_addPlan = false
          this.v_addPlan = false
        })
      },
      proPlan(id) {
        getProTicList(id).then(res => {
          this.ticketTypeList = res.data
        }).catch(error => {
        })
        //增加新计划
        this.planAddForm.proId = id
        this.planAddForm.disList = []
        this.planAddForm.saleState = true
        this.planAddForm.travelDate = ''
        this.planAddForm.planDes = ''
        this.planAddForm.numLimit = 0
       // this.productForm.proLocation = JSON.parse(res.proLocation),


        this.v_addPlan = true

      },
      editPro(id, proType) {
        //跳转到产品修改页
        this.$router.push({name: 'AddProduction', query: {id}})
      },
      delProduct(id) {
        this.$confirm('该产品将移入回收站，是否继续', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          delProduct(id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
          }).catch(error => {
            this.getList()
          })
        })
      },
      copyProduct(id, copyType) {
        if (copyType === 'sk')
          this.$router.push({name: 'AddProduction', query: {id, copyType}})
        if (copyType === 'td')
          this.$router.push({name: 'AddTeamProduction', query: {id, copyType}})
      },
      clearType2() {
        this.queryForm.proType_2 = ''
      },
      initList() {

        getProTye().then(res => {
          this.proTypeList = res.data
        }).catch(error => {
        })
        getSerTypes().then(res => {
          this.serTypeList = res.data
        }).catch(error => {
        })
        getLocations().then(res => {
          this.locationList = res.data
        }).catch(error => {
        })
        getDisType().then(res => {
          this.disTypeList = res.data
          this.disTypeList.forEach(item => {
            this.$set(item, 'planCharge', [
              {
                name: '成人',
                retPrice: 0,
                setPrice: 0
              }
            ])
            this.$set(item, 'isSpecial', false)
          })
        }).catch(error => {
        })

      },
      addLocationNew(location) {
        getLocations().then(res => {
          this.locationList = res.data
          this.v_addLocation = false
        }).catch(error => {
        })
      },
      handleChargeChange(array) {
        this.planAddForm.disList=[];
        array.forEach(item => {
          if (this.planAddForm.disList.find(function (element) {
            return element.id === item.id
          }) == null) {
            this.planAddForm.disList.push(item)
          }
        })
        console.log("aaaaaaa"+this.planAddForm.disList)
      },
      // selectedAll(disTypeItem) {
      //   this.disTypeList.filter(item => (item.type === disTypeItem)).forEach((info) => {
      //     if (this.planAddForm.disList.find(function (element) {
      //       return element.id === info.id
      //     }) == null) {
      //       this.planAddForm.disList.push(info)
      //       this.planChageList.push(info)
      //     }
      //   })
      // },
      addNewDisType: function () {
        this.isOnAdd = true
        addDisType(this.disTypeAddForm).then(res => {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.disTypeAddForm = {}
          this.isOnAdd = false
          this.v_addDisType = false
          getDisType().then(res => {
            this.disTypeList = res
            this.disTypeList.forEach(item => {
              this.$set(item, 'planCharge', [
                {
                  name: '成人',
                  retPrice: 0,
                  setPrice: 0
                }
              ])
              this.$set(item, 'isSpecial', false)
            })
          })

        }).catch(error => {
          this.isOnAdd = false
        })
      },
      getDisArrName() {
        return distinct(this.disTypeList, 'type')
      },


      getList() {
        this.onLoading = true
        getNoCheckPros(this.queryForm).then(res => {
          this.list = res.data
          this.onLoading = false
          //
          // if(this.$route.query.action==='open'&&this.autoOpenTimes===0){
          //   this.proPlan(this.list[0])
          //   this.autoOpenTimes++
          // }
        }).catch(error => {
          this.onLoading = false
        })
      },
      exportTravel(id) {
        window.open(process.env.VUE_APP_PRINT_URL + 'export?id=' + id)
      }
    }
  }
</script>

<style scoped>
  .filter-item {
    margin-right: 25px;
  }

</style>
