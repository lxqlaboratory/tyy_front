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
    <el-dialog v-dialog-drag  :visible.sync="v_addGroup" style="width: 100%;" title="创建团队">
      <el-form :model="groupAddForm" label-width="80px" ref="addGroup">
        <el-form-item
          :rules=" [{ required: true, message: '请输入活动名称', trigger: 'blur' },  { min: 3, max:25, message: '长度在 3 到 25 个字符', trigger: 'blur' }]"
          label="团队名"
          prop="groupName">
          <el-input placeholder="请输入团队名" v-model="groupAddForm.groupName"></el-input>
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
          <el-button type="primary" :loading="onSave" @click="onSubmit">立即创建</el-button>
          <el-button @click="v_addGroup = false" >取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog v-dialog-drag  :visible.sync="v_editPlan" title="编辑计划" width="60%">
      <el-form label-width="100px" ref="planEditForm" :model="planEditForm">
        <el-form-item label="出团日期" :rules="[ { required: true, message: '出团日期不能为空'}]" prop="travelDate">
          <el-date-picker
            v-model="planEditForm.travelDate"
            disabled
            align="right"
            type="date"
            placeholder="选择出团日期"
            style="width: 60%;"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="销售状态" prop="saleState">
          <el-switch inactive-text="暂停销售" active-text="正常销售" v-model="planEditForm.saleState"></el-switch>
        </el-form-item>

        <el-form-item label="计划人数" prop="numLimit">
          <el-input v-model.number="planEditForm.numLimit" type="number" style="width: 60%;"></el-input>
          人
        </el-form-item>

        <!--<el-form-item label="结算类型" prop="ticketType">-->
          <!--<div style="display: flex;width: 80%; justify-content: flex-start;flex-wrap: wrap;align-items: center;">-->
            <!--<el-checkbox-group v-model="planEditForm.ticketType">-->
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
              @close="planEditForm.proLocation.splice(index,1)"
              closable
              disable-transitions
              style="margin-right: 5px;"
              v-for="(item,index) in planEditForm.proLocation"
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
                <el-checkbox-group v-model="planEditForm.proLocation">
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
            <!--<el-tag-->
              <!--:key="item.id"-->
              <!--@close="planEditForm.disList.find(function(info){return info.id===item.id})!=null"-->
              <!--closable-->
              <!--disable-transitions-->
              <!--style="margin-right: 5px;"-->
              <!--v-for="(item,index) in planEditForm.disList"-->
            <!--&gt;-->
              <!--{{item.portName}}-->
            <!--</el-tag>-->
            <el-popover
              placement="right"
              trigger="click"
              width="400">
              <div
                style="display: flex;width: 80%; justify-content: flex-start;flex-wrap: wrap;align-items: center;">
                <el-checkbox-group @change="handleChargeChange" v-model="planChageList">
                  <div v-for="disTypeItem in disTypeDyList">
                    <el-checkbox-button
                      :checked="planEditForm.disList.find(function(info){return info.portId===item.id})!=null"
                      :key="item.id"
                      :label="item"
                      border size="medium"
                      style="margin-bottom: 15px;"
                      v-for="item in disTypeList.filter(item=>(item.type===disTypeItem))"
                    >{{item.roleName}}
                    </el-checkbox-button>
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

          <span style="color: gray;font-size: 13px;" v-if="planEditForm.disList.length===0">尚未有销售端口</span>
          <el-tabs style="min-width: 95%;" type="border-card" v-else>
            <el-tab-pane label="缺省结算项目" style="width: 100%;">
              <el-button @click="planEditForm.defaultCharge.push({
                    portName:'默认',
                    })" icon="el-icon-circle-plus-outline" style="margin:0 0 15px 15px;" type="primary">增加结算类型
              </el-button>
              <div
                style="width:100%;display: flex;align-items: center;justify-content: space-between;margin-bottom: 10px;"
                v-for="(item,index) in planEditForm.defaultCharge">
                <div>
                  <label>结算类型</label>
                  <el-select :value="item.ticketType" clearable v-model="item.ticketType">
                    <el-option :key="item.dataItemName" :label="item.dataItemName" :value="item.dataItemName"
                               v-for="item in ticketTypeList"></el-option>
                  </el-select>
                </div>

                <div>
                  <label>结算价<span class="tip">(同行价)</span></label>
                  <el-input style="width: 150px;" type="number" v-model="item.retPrice">
                    <span slot="append">元</span>
                  </el-input>
                  <!--<price-input v-model="item.retPrice" style="width: 150px;"></price-input>-->
                </div>
                <div>
                  <label>参考价<span class="tip">(外报价)</span></label>
                  <el-input style="width: 150px;" type="number" v-model="item.setPrice">
                    <span slot="append">元</span>
                  </el-input>
                  <!--<price-input v-model="item.setPrice" style="width: 150px;"></price-input>-->
                </div>

              </div>

              <el-form-item label="项目备注">
                <el-input placeholder="此处可填写航班信息或价格说明等，不填请留空，最多20字" v-model="planEditForm.planDes"></el-input>
              </el-form-item>

            </el-tab-pane>

            <el-tab-pane :key="disItem.id" :label="disItem.roleName" v-for="disItem in planEditForm.disList">
              <el-switch
                active-text="特殊结算策略"
                inactive-text="缺省结算策略"
                style="margin: 15px;"
                v-model="disItem.isSpecial"/>

              <div v-if="disItem.isSpecial">

                <el-button @click="disItem.planCharge.push({
                        name: '成人',
                        retPrice: 0,
                        setPrice: 0,
                        minAge:0,
                        maxAge:0
                    })" icon="el-icon-circle-plus-outline" style="margin:0 0 15px 15px;" type="primary">增加结算类型
                </el-button>


                <div
                  style="width:100%;display: flex;align-items: center;justify-content: space-between;margin-bottom: 10px;"
                  v-for="(item,index) in disItem.planCharge">
                  <div>
                    <label>结算类型</label>
                    <el-select :value="item.ticketType" clearable v-model="item.ticketType">
                      <el-option :key="item.dataItemName" :label="item.dataItemName" :value="item.dataItemName"
                                 v-for="item in ticketTypeList"></el-option>
                    </el-select>
                  </div>
                  <div>
                    <label>结算价<span class="tip">(同行价)</span></label>
                    <el-input style="width: 150px;" type="number" v-model="item.retPrice">
                      <span slot="append">元</span>
                    </el-input>
                    <!--<price-input style="width: 150px;" v-model="item.retPrice"></price-input>-->
                  </div>

                  <div>
                    <label>参考价<span class="tip">(外报价)</span></label>
                    <el-input style="width: 150px;" type="number" v-model="item.setPrice">
                      <span slot="append">元</span>
                    </el-input>
                    <!--<price-input style="width: 150px;" v-model="item.setPrice"></price-input>-->

                  </div>

                </div>
              </div>
            </el-tab-pane>

            <!--<el-tab-pane v-for="disItem in planEditForm.disList" :key="disItem.id" :label="disItem.roleName">-->
              <!--<div>-->
                <!--<el-button v-if="false" type="primary" icon="el-icon-circle-plus-outline" style="margin:0 0 15px 15px;"-->
                           <!--@click="disItem.planCharge.push({-->
                        <!--name: '成人',-->
                        <!--retPrice: 0,-->
                        <!--setPrice: 0-->
                    <!--})">增加结算类型-->
                <!--</el-button>-->


                <!--<div v-for="(item,index) in disItem.planCharge" style="display: flex;align-items: center;margin: 15px">-->
                  <!--<label style="margin-right: 15px;">结算类型</label>-->
                  <!--<el-input disabled v-model="item.name" style="width: 100px;margin-right: 25px;"></el-input>-->
                  <!--<label style="margin-right: 15px;">零售价格</label>-->
                  <!--&lt;!&ndash;                  <price-show disabled v-model.number="item.retPrice" style="width: 100px;margin-right: 25px;"></price-show>&ndash;&gt;-->
                  <!--<price-input disabled v-model="item.retPrice" style="width: 150px;margin-right: 25px;"></price-input>-->
                  <!--&lt;!&ndash;                  <el-input disabled v-model.number="item.retPrice" type="number" style="width: 100px;margin-right: 25px;"></el-input>&ndash;&gt;-->
                  <!--<label style="margin-right: 25px;" >结算价格</label>-->
                  <!--&lt;!&ndash;                  <el-input disabled v-model.number="item.setPrice" type="number" style="width: 100px;margin-right: 25px;"></el-input>&ndash;&gt;-->
                  <!--<price-input disabled v-model="item.setPrice" style="width: 150px;margin-right: 25px;padding: 0"></price-input>-->
                <!--</div>-->

              <!--</div>-->
            <!--</el-tab-pane>-->
          </el-tabs>
        </div>

      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button type="primary"
                     @click="savePlan()" :loading="onload_editPlan">保存</el-button>
          <el-button type="warning"
                     @click="v_editPlan=false">取消</el-button>
        </span>

    </el-dialog>

    <div class="filter-container">
      <div class="filter-item">
        <label>计划编号</label>
        <el-input style="margin-left: 15px; width: 300px" v-model="queryForm.planNum" maxlength="50"
                  placeholder="检索计划编号(团队编号)"></el-input>
      </div>
      <div class="filter-item">
        <label>产品编号</label>
        <el-input style="margin-left: 15px; width: 300px" v-model="queryForm.proNum" maxlength="50"
                  placeholder="检索所属产品编号"></el-input>
      </div>
      <div class="filter-item">
        <label>产品名称</label>

        <el-input style="margin-left: 15px; width: 300px" v-model="queryForm.proName" maxlength="50"
                  placeholder="检索所属产品名"></el-input>
      </div>
      <div class="filter-item">
        <label>出团日期</label>
        <el-date-picker
          v-model="queryForm.planDate"
          type="daterange"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="filter-item">
        <label>销售状态</label>
        <el-select v-model="queryForm.saleState" style="width:  180px;"
                   value="productForm.proType_1" clearable>
          <el-option :value="true" label="正常销售"></el-option>
          <el-option :value="false" label="暂停销售"></el-option>
        </el-select>


        <div class="filter-item">
          <el-button icon="el-icon-search" type="primary" style="width: 180px" @click="getList">查询</el-button>

        </div>

      </div>
    </div>

    <el-table
      style="margin-top: 15px;"
      :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      border
      fit
      highlight-current-row
      stripe
      v-loading="onLoading"
    >
      <el-table-column align="center" label="计划编号" min-width="8">
        <template slot-scope="scope">
          {{scope.row.planNum}}
        </template>
      </el-table-column>


      <el-table-column align="center" label="所属产品" min-width="8">
        <template slot-scope="scope">
          <el-button @click="toProDuct(scope.row.proId)" type="text"> {{scope.row.proName}}</el-button>

        </template>
      </el-table-column>

      <!--<el-table-column align="center" label="出团时间" min-width="8">-->
        <!--<template slot-scope="scope">-->
          <!--{{scope.row.travelDate.substr(0,10)}}-->
        <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column align="center" label="计划人数" min-width="8">
        <template slot-scope="scope">
          {{scope.row.numTourist}}
          <span style="color: orangered"> / {{scope.row.numLimit}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="已拼团订单数" min-width="4">
        <template slot-scope="scope">
          <span>  {{scope.row.surOrderNum}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="未拼团订单数" min-width="4">
        <template slot-scope="scope">
          <span style="color: orangered">  {{scope.row.noOrderNum}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="销售状态" min-width="8">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.saleState===1" type="success">正常销售</el-tag>
          <el-tag v-else type="danger">暂停销售</el-tag>
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作" min-width="20">
        <template slot-scope="scope">
          <el-button type="success" @click="toGroup(scope.row)">查看详情</el-button>
          <el-button type="primary" @click="addGro(scope.row)" >创建团队</el-button>
          <el-button type="warning" @click="editP(scope.row)">编辑</el-button>
          <el-button type="danger" @click="delPlan(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>


    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 20, 40,100]"
      :page-size="pageSize"
      :total="list.length"
      style="margin-top: 15px;"
      background
      layout="sizes, prev, pager, next"/>


  </div>

</template>

<script>
  import {editPlan, getPlans, getPlanInfo, delPlan} from "@/api/plan";
  import priceShow from '@/views/com/priceShow'
  import priceInput from '@/views/com/priceInput'
  import addNewLocation from "@/views/production/addNewLocation"
  import {getLocations ,getProTicList,getPlanTicList}from "@/api/production"
  import {addDisType, getDisType} from "@/api/distribute"
  import {distinct} from "@/utils/tools"
  import {addNewGroup} from "@/api/group"
  import {getCarList, getCarTypeList} from "@/api/tourist";
  import {getGuiderList, getGuiderType} from '@/api/guide'
  import planGroup from '@/views/plan/planGroup'

  //计划表
  export default {
    name: "planList",
    data() {
      return {
        // 当前页
        currentPage: 1,
        // 每页多少条
        pageSize: 10,
        onload_editPlan: false,
        v_editPlan: false,
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
        ticketTypeList:[],
        planEditForm: {
          ticketType:[],
          proCharge:
            [{
              id:'',
              roleCreateTime:'',
              roleDes:'',
              roleName:'',
              roleOrder:'',
              type:'',
              planCharge:
                [{name:'',
                  retPrice:'',
                  setPrice:'',
                  minAge:'',
                  maxAge:'',
                }],
              isSpecial:false,
              des:''
            }],
          defaultCharge: [
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
        isOnAdd: false,
        isAddNewType: false,
        v_addGroup:false,
        disTypeAddForm: {},

        list: [],
        total: 0,
        onLoading: false,
        queryForm: {
          planNum: '',
          proNum: '',
          proName: '',
          planDate: [],
          saleState: '',

        }
      }
    },
    created() {
      this.initPlanList()
      this.initGroup()
      if (this.$route.query.proNum)
        this.queryForm.proNum = this.$route.query.proNum

      if (this.$route.query.id) {
        this.editPlan(this.$route.query.id)
      }

      if(this.$route.query.planNum)
        this.queryForm.planNum=this.$route.query.planNum

      this.getList()
    },
    components:{priceShow,priceInput,addNewLocation},

    computed: {
      //分销商地域列表,去重拿到
      disTypeDyList() {
        return distinct(this.disTypeList, 'type')
      },
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
      toGroup(item) {
        let id = item.id
        let proId = item.proId
        let groupDate = item.travelDate
        this.$router.push({name: 'planGroup', query: {id,proId,groupDate}})
      },
      addGro(item) {
        this.groupAddForm.planId = item.id
        this.groupAddForm.groupDate = item.travelDate
        this.v_addGroup = true
        this.$router.push({name: 'planGroup', query: {id,groupDate}})
      },
      initPlanList() {
        getLocations().then(res => {
          this.locationList = res.data
        }).catch(error => {
        })
        getDisType().then(res => {
          this.disTypeList = res.data
        }).catch(error => {
        })
          this.disTypeList.forEach(item => {
              this.$set(item, 'planCharge', [
                {
                  name: '成人',
                  retPrice: 0,
                  setPrice: 0
                }
              ])
              this.$set(item, 'isSpecial', false)
            }
          )

       },
      initGroup(){
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
      },
      onSubmit(){
        // this.inGroupList.forEach(item=>{
        //   this.groupAddForm.orderList.push(item.id);
        // });
        addNewGroup(this.groupAddForm).then(res=>{
          this.$message({type: 'success', message: "创建计划团队成功！"})
          this.onSave=false
          this.v_addGroup = false
          // this.$router.back()
          this.initPlanList
        }).catch(error => {

          this.onSave=false
        })

      },

      toProDuct(id) {
        //跳转到产品详情页
        this.$router.push({name: 'AddProduction', query: {id}})
      },

      addOrder(planId) {
        this.$router.push({name: 'AddOrder', query: {planId}})
      },
      savePlan() {
        this.onload_editPlan = true
        //使用缺省策略覆盖
        for (let item of this.planEditForm.disList) {
          if (!item.isSpecial) {
            item.planCharge = this.planEditForm.defaultCharge;
          }
        }
        this.planEditForm.disListStr = JSON.stringify(this.planEditForm.disList)
        console.log("this.planEditForm.disListStr:"+this.planEditForm.disListStr)
        this.planEditForm.defalutPlanChargeStr = JSON.stringify(this.planEditForm.defaultCharge)
        console.log("this.planEditForm.defalutPlanChargeStr:"+this.planEditForm.defalutPlanChargeStr)
        this.planEditForm.ticketType=JSON.stringify(this.planEditForm.ticketType)
        // console.log(this.planEditForm)
        editPlan(this.planEditForm).then(res => {
          if(res.re===1){
            this.$message({type: 'success', message: '保存计划成功'})
            this.getList()
          }else{
            this.$message({type: 'error', message: res.data})
          }

          this.onload_editPlan = false
          this.v_editPlan = false
        }).catch(error => {
          this.onload_editPlan = false
        })
      },


      delPlan(id) {

        this.$confirm('该计划将被永久，计划下有订单将不可，请先下属订单。建议使用 “编辑-销售状态” 替代', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          delPlan(id).then(res => {
            this.$message({
              type: 'success',
              message: '成功'
            })
            this.getList()
          }).catch(error => {
            this.getList()
          })
        })
      },
      editP(item) {
        let proId = item.proId
        getProTicList(proId).then(res => {
          this.ticketTypeList = res.data
        }).catch(error => {
        })
        getPlanInfo(item.id).then(res => {
          this.v_editPlan = true
          this.planEditForm = res.data
          this.planEditForm.saleState = (this.planEditForm.saleState === 1)
          this.planEditForm.proLocation = JSON.parse(res.data.proLocation)
          this.planEditForm.disList = res.data.disList
          this.planEditForm.proCharge = JSON.parse(res.data.proCharge)
          this.planEditForm.ticketType = JSON.parse(res.data.ticketType)
          // console.log(this.planEditForm.ticketType+"---3-")
          this.planEditForm.defaultCharge = JSON.parse(res.data.defaultCharge)
          // console.log(this.planEditForm.defaultCharge+"---4--")

          this.planEditForm.disList.forEach(item => {

            if (item.isSpecial === false) {
              //如果他是默认值，则把他付为默认值
              this.planEditForm.defaultCharge = item.planCharge
            }
          })
          console.log(this.planEditForm)
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
        this.planEditForm.disList=[];
        array.forEach(item => {
          if (this.planEditForm.disList.find(function (element) {
            return element.id === item.id
          }) == null) {
            this.planEditForm.disList.push(item)
          }
        })
      },
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
        getPlans(this.queryForm).then(res => {
          this.list = res.data
          this.onLoading = false
        }).catch(error => {
          this.onLoading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
