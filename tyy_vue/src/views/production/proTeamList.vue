<template>
  <div class="app-container">
    <el-dialog v-dialog-drag  :close-on-click-modal="false" :visible.sync="v_editVisitRecord" title="回访记录" width="80vw">
      <div>
        <el-dialog v-dialog-drag  :visible.sync="v_editVisitRecord_item" append-to-body title="编辑回访记录" width="60vw">
          <el-input :autosize="{ minRows: 4}" placeholder="请输入本次回访记录"
                    type="textarea"
                    v-model="tempChangeDt">


          </el-input>
          <span class="dialog-footer" slot="footer">
             <el-button @click="v_editVisitRecord_item = false">取 消</el-button>
            <el-button @click="saveChange" type="primary">确 定</el-button>
          </span>

        </el-dialog>


        <el-button @click="addVisit" type="primary">新增回访记录</el-button>
        <el-table :data="visitRecord" fit highlight-current-row stripe>
          <el-table-column label="编号" min-width="5" prop="id"></el-table-column>
          <el-table-column label="时间" min-width="10" prop="date"></el-table-column>
          <el-table-column label="内容" min-width="50" prop="content"></el-table-column>
          <el-table-column label="操作" min-width="10">
            <template slot-scope="scope">
              <el-button @click="editVisit(scope.row.id)" type="text">编辑</el-button>
              <el-button @click="delVisit(scope.row.id)" style="color: orangered" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <el-dialog v-dialog-drag  :visible.sync="v_addPlan" title="增加计划">
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


        <el-form-item label="计划人数" prop="numLimit" required>
          <el-input style="width: 60%;" type="number" v-model.number="planAddForm.numLimit"></el-input>
          人
        </el-form-item>
        <el-divider content-position="left">结算项目</el-divider>


        <div style="margin-top: 15px;">
          <el-tabs style="min-width: 80%;" type="border-card">

            <el-tab-pane :key="disItem.id" :label="disItem.roleName" v-for="disItem in planAddForm.disList">
              <div>
                <el-button @click="disItem.planCharge.push({
                        name: '成人',
                        retPrice: 0,
                        setPrice: 0
                    })" icon="el-icon-circle-plus-outline" style="margin:0 0 15px 15px;" type="primary">增加结算类型
                </el-button>

                <div style="display: flex;align-items: center;margin: 15px" v-for="(item,index) in disItem.planCharge">

                  <label style="margin-right: 15px;">结算类型</label>
                  <el-input style="width: 100px;margin-right: 25px;" v-model="item.name"></el-input>
                  <label style="margin-right: 15px;">零售价格</label>
<!--                  <el-input style="width: 100px;margin-right: 25px;" type="number"-->
<!--                            v-model.number="item.retPrice"></el-input>-->
                  <price-input style="width: 100px;margin-right: 25px;" v-model="item.retPrice"></price-input>
                  <label style="margin-right: 15px;">结算价格</label>
<!--                  <el-input style="width: 100px;margin-right: 25px;" type="number"-->
<!--                            v-model.number="item.setPrice"></el-input>-->
                  <price-input style="width: 100px;margin-right: 25px;" v-model="item.setPrice"></price-input>

                  <el-button @click="disItem.planCharge.splice(index,1)" type="danger" v-if="index!==0">删除</el-button>
                </div>

              </div>
            </el-tab-pane>


          </el-tabs>
          <div style="margin:15px">
            <label style="margin-right: 15px;">结算项目备注</label>
            <el-input placeholder="此处可填写航班信息或价格说明等，不填请留空，最多20字" style="width: 60%;"
                      v-model="planAddForm.planDes"></el-input>
          </div>
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
      <div class="filter-item">
        <label>成团状态</label>
        <el-select :value="queryForm.saleState" clearable v-model="queryForm.saleState">
          <el-option :value="1" label="正常"></el-option>
          <el-option :value="0" label="失败"></el-option>
        </el-select>

      </div>
      <div class="filter-item">
        <label>出行日期</label>
        <div class="block">
          <el-date-picker
            :picker-options="pickerOptions"
            align="right"
            end-placeholder="结束日期"
            range-separator="-"
            start-placeholder="开始日期"
            type="daterange"
            unlink-panels
            v-model="queryForm.travelDate"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
      </div>
      <!--      <div class="filter-item">-->
      <!--        <label>服务类型</label>-->
      <!--        <el-select :value="queryForm.serType" clearable placeholder="请选择产品服务类型" ref="resType"-->
      <!--                   style="width: 180px;" v-model="queryForm.serType">-->
      <!--          <el-option :key="item.id" :label="item.serviceName" :value="item.id"-->
      <!--                     v-for="item in serTypeList"></el-option>-->
      <!--        </el-select>-->
      <!--      </div>-->


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


      <el-table-column align="center" label="产品信息" min-width="10">
        <template slot-scope="scope">
          <div style="font-size: 13px;!important;">
            <el-button @click="$router.push({name:'ProTeamInfo',query:{id:scope.row.id}})"
                       style="font-size: 13px;!important;" type="text"
            >
              【团队】{{ scope.row.name }}
            </el-button>

            <br>
            <el-button @click="editPro(scope.row.id)" style="color: orangered;font-size: 13px;!important;" type="text"
            >
              【编号】{{ scope.row.proNum }}
            </el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="产品类别" min-width="6">
        <template slot-scope="scope">
          {{scope.row.proType}}
        </template>
      </el-table-column>

      <!--      <el-table-column align="center" label="服务类别" min-width="10">-->
      <!--        <template slot-scope="scope">-->
      <!--          {{scope.row.serType}}-->
      <!--        </template>-->
      <!--      </el-table-column>-->


      <el-table-column align="center" label="出发日期" min-width="6">
        <template slot-scope="scope">
          {{ scope.row.travelDate }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="来源分销商" min-width="6">
        <template slot-scope="scope">
          {{ scope.row.disName }}
        </template>
      </el-table-column>


      <el-table-column align="center" label="行程天数" min-width="4">
        <template slot-scope="scope">
          {{ scope.row.proDateNum }}天
        </template>
      </el-table-column>
      <el-table-column align="center" label="预收客数" min-width="4">
        <template slot-scope="scope">
          {{ scope.row.touNum }}人
        </template>
      </el-table-column>


      <el-table-column align="center" label="发布者" min-width="4">
        <template slot-scope="scope">
          {{ scope.row.proUser}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="核团用时" min-width="4">
        <template slot-scope="scope">
          {{ getmmTime(scope.row.proTime)}}
        </template>
      </el-table-column>

      <!--      <el-table-column align="center" label="出团计划" min-width="8">-->
      <!--        <template slot-scope="scope">-->
      <!--          <div v-if="scope.row.planTime">-->
      <!--            <el-button @click="toPlanList(scope.row.proNum,scope.row.planId)" type="text">{{ scope.row.planTime }}-->
      <!--            </el-button>-->
      <!--          </div>-->
      <!--          <div>-->
      <!--            <el-button @click="toPlanList(scope.row.proNum)" type="text">全部计划</el-button>-->
      <!--          </div>-->
      <!--        </template>-->
      <!--      </el-table-column>-->

      <el-table-column align="center" label="操作" min-width="22" fixed="right">
        <template slot-scope="scope">
          <div  v-if="scope.row.saleState===0">
            <el-button v-if ="$_has('PROUPDATE')" @click="editState(scope.row.id,1)" size="mini" type="primary">恢复产品
            </el-button>
            <el-button @click="openVisitRecord(scope.row.id)" size="mini" type="primary">回访记录</el-button>
          </div>

          <div v-if="scope.row.saleState===1">

            <el-button v-if ="$_has('PROUPDATE')" @click="editPro(scope.row.id)" size="mini" type="primary">编辑产品</el-button>
            <el-button v-if ="$_has('PROUPDATE')" @click="copyProduct(scope.row.id)" size="mini" type="warning">复制产品</el-button>
            <el-button v-if ="$_has('PROUPDATE')" @click="delProduct(scope.row.id)" size="mini" type="danger">删除产品</el-button>
            <el-button v-if ="$_has('PROUPDATE')" @click="editState(scope.row.id,0)" size="mini" type="info">成团失败</el-button>
            <br/>
            <div style="margin-top: 5px;">
              <el-button @click="openVisitRecord(scope.row.id)" size="mini" type="primary">回访记录</el-button>
              <el-popover style="margin:0 10px;">
                <div style="padding: 15px;">
                  <div style="line-height: 150%;font-size: 14px;color: black;max-width: 50vw;">
                    <label>预估毛利:</label>
                    {{ scope.row.proFit }}元
                  </div>


                  <div style="line-height: 150%;font-size: 14px;color: black;max-width: 50vw;">
                    <label>报价信息</label>
                    {{scope.row.proPriStan}}
                  </div>

                  <div style="line-height: 150%;font-size: 14px;color: black;max-width: 50vw;">
                    <label>对外报价</label>
                    {{scope.row.proOutPrice}}
                  </div>
                </div>
                <el-button size="mini" slot="reference" type="danger">团队报价</el-button>
              </el-popover>
              <el-button v-if ="$_has('ORDERUPDATE')" @click="addOrder(scope.row.id,scope.row.planId)" size="mini" type="success">
                录入订单
              </el-button>

              <el-button @click="exportTravel(scope.row.id)" size="mini" type="warning">导出行程</el-button>

            </div>
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
  import {
    delProduct,
    editProSaleState,
    getOrderNumByPro,
    getPros,
    getProTye,
    getSerTypes,
    getVisitRecord,
    setVisitRecord
  } from "@/api/production"
  import {getmmssTime} from "@/utils/tools"
  import {addPlans} from "@/api/plan"
  import {parseTime} from "@/utils/index"
  import priceInput from '@/views/com/priceInput'

  export default {
    name: "proList",
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


        tempChangeDt: '',

        onload_addPlan: false,
        v_addPlan: false,
        v_editVisitRecord: false,
        v_editVisitRecord_item: false,


        id_editVisitRecord: -1,
        editVisitRecord_item: {},

        visitRecord: [],


        proTypeList: [],
        serTypeList: [],


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
          travelDate: [],


          pageNum: 1,
          pageSorted: 'desc',
          pageSize: 10
        },

        planAddForm: {
          proId: '',
          saleState: true,
          travelDate: '',
          planDes: '',
          disList: [],
          numLimit: 0
        }

      }
    },
      components:{priceInput},
    computed: {
      proType_2_List() {
        if (this.queryForm.proType_1)
          return this.proTypeList.find(item => (item.id === this.queryForm.proType_1)).children
        return []
      }
    },

    created() {
      if (this.$route.query.proNum) {
        this.queryForm.proNum = this.$route.query.proNum
      }
      this.queryForm.serType = 2
      this.initList()
      this.getList()
    },
    methods: {
      saveChange() {
        this.editVisitRecord_item.content = this.tempChangeDt
        setVisitRecord(this.id_editVisitRecord, JSON.stringify(this.visitRecord)).then(res => {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.v_editVisitRecord_item = false
          this.editVisitRecord_item = {}
        }).catch(e => {
        })
      },

      delVisit(id) {
        let index = this.visitRecord.findIndex(item => {
          if (item.id === id) {
            return true
          }
        })
        this.visitRecord.splice(index, 1)
        this.saveRecordchange()

      },
      addVisit() {
        let date = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}')
        let id = 1
        if (this.visitRecord.length > 0) {
          id = this.visitRecord[this.visitRecord.length - 1].id + 1
        }

        this.visitRecord.push({
          id,
          content: '',
          date
        })
        this.editVisit(id)
        this.saveRecordchange()
      },
      saveRecordchange() {
        setVisitRecord(this.id_editVisitRecord, JSON.stringify(this.visitRecord)).then(res => {
        }).catch(e => {
        })
      },
      editVisit(id) {
        this.v_editVisitRecord_item = true
        this.editVisitRecord_item = this.visitRecord.find(item => (item.id === id))
        this.tempChangeDt = this.visitRecord.find(item => (item.id === id)).content

      },


      openVisitRecord(id) {
        getVisitRecord(id).then(res => {
          this.id_editVisitRecord = id
          this.v_editVisitRecord = true

          this.visitRecord = []
          try {
            let temp = JSON.parse(res)
            if (temp instanceof Array)
              this.visitRecord = temp
          } catch (e) {

          }
        }).catch()


      },
      getmmTime(val) {
        return getmmssTime(val)
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
          this.$router.push({name: 'ProPlan', query: {id, proNum}})
        else
          this.$router.push({name: 'ProPlan', query: {proNum}})

      },
      //为单个产品增加计划
      savePlan() {
        this.onload_addPlan = true
        addPlans(this.planAddForm).then(res => {
          this.$message({
            type: 'success',
            message: '增加新计划成功'
          })

          this.onload_addPlan = false
          this.v_addPlan = false
        }).catch(error => {
          this.onload_addPlan = false
          this.v_addPlan = false
        })
      },
      proPlan(item) {
        //增加新计划
        this.planAddForm.proId = item.id
        this.planAddForm.disList = JSON.parse(item.disList)
        this.planAddForm.saleState = true
        this.planAddForm.travelDate = ''
        this.planAddForm.planDes = ''
        this.planAddForm.numLimit = 0

        this.v_addPlan = true

      },
      editPro(id) {
        //跳转到产品修改页
        this.$router.push({name: 'AddTeamProduction', query: {id}})

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
      copyProduct(id) {
        this.$router.push({name: 'AddTeamProduction', query: {id, copyType: 'td'}})
      },
      clearType2() {
        this.queryForm.proType_2 = ''
      },
      initList() {
        getProTye().then(res => {
          this.proTypeList = res
        }).catch(error => {
        })
        getSerTypes().then(res => {
          this.serTypeList = res
        }).catch(error => {
        })
      },
      getList() {
        this.onLoading = true
        getPros(this.queryForm).then(res => {
          console.log(res)
          this.list = res.list
          this.total = res.pagination.total
          this.onLoading = false
        }).catch(error => {
          this.onLoading = false
        })
      },
      exportTravel(id) {
        window.open(process.env.VUE_APP_PRINT_URL + 'export?id=' + id)
      },
      editState(id, saleState) {
        editProSaleState({id, saleState}).then(res => {
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
          let index = this.list.findIndex((pro) => pro.id === id)
          this.getList()
        })
      },

      addOrder(id, planId) {
        getOrderNumByPro(id).then(res => {
          if (res > 0) {
            this.$message({
              type: "error",
              message: '该产品已存在订单，请勿重复增加！'
            })
          }
          if (res == 0) {
            this.$router.push({name: 'AddOrder', query: {planId: planId}})
          }
        })

      }
    },


  }
</script>

<style scoped>
  .filter-item {
    margin-right: 25px;
  }

</style>
