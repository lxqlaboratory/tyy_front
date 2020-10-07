<template>
  <div class="app-container">

    <el-dialog v-dialog-drag  :visible.sync="v_editPlan" title="编辑计划">
      <el-form label-width="100px" ref="planAddForm" :model="planEditForm">
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
        <el-divider content-position="left">结算项目</el-divider>


        <div style="margin-top: 15px;">
          <el-tabs type="border-card" style="min-width: 80%;">

            <el-tab-pane v-for="disItem in planEditForm.disList" :key="disItem.id" :label="disItem.disName">
              <div>
                <el-button v-if="false" type="primary" icon="el-icon-circle-plus-outline" style="margin:0 0 15px 15px;"
                           @click="disItem.planCharge.push({
                        name: '成人',
                        retPrice: 0,
                        setPrice: 0
                    })">增加结算类型
                </el-button>


                <div v-for="(item,index) in disItem.planCharge" style="display: flex;align-items: center;margin: 15px">
                  <label style="margin-right: 15px;">结算类型</label>
                  <el-input disabled v-model="item.name" style="width: 100px;margin-right: 25px;"></el-input>
                  <label style="margin-right: 15px;">零售价格</label>
<!--                  <price-show disabled v-model.number="item.retPrice" style="width: 100px;margin-right: 25px;"></price-show>-->
                  <price-input disabled v-model="item.retPrice" style="width: 100px;margin-right: 25px;"></price-input>
<!--                  <el-input disabled v-model.number="item.retPrice" type="number" style="width: 100px;margin-right: 25px;"></el-input>-->
                  <label style="margin-right: 15px;">结算价格</label>
<!--                  <el-input disabled v-model.number="item.setPrice" type="number" style="width: 100px;margin-right: 25px;"></el-input>-->
                  <price-input disabled v-model="item.setPrice" style="width: 100px;margin-right: 25px;"></price-input>
                </div>

              </div>
            </el-tab-pane>
          </el-tabs>

          <div style="margin:15px">
            <label style="margin-right: 15px;">结算项目备注</label>
            <el-input disabled v-model="planEditForm.planDes" style="width: 60%;"
                      placeholder="此处可填写航班信息或价格说明等，不填请留空，最多20字"></el-input>
          </div>
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
      :data="list"
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

      <el-table-column align="center" label="出团时间" min-width="8">
        <template slot-scope="scope">
          {{scope.row.travelDate.substr(0,10)}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="计划人数" min-width="8">
        <template slot-scope="scope">
          {{scope.row.numTourist}}
          <span style="color: orangered"> / {{scope.row.numLimit}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="已确认订单数" min-width="4">
        <template slot-scope="scope">
          <span>  {{scope.row.surOrderNum}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="未确认订单数" min-width="4">
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
          <el-button type="primary" @click="editPlan(scope.row.id)">详情</el-button>
          <el-button v-if ="$_has('PLANUPDATE')" type="danger" @click="delPlan(scope.row.id)">删除</el-button>
          <el-button v-if ="$_has('ORDERUPDATE')" type="success" @click="addOrder(scope.row.id)">录入订单</el-button>
        </template>
      </el-table-column>


    </el-table>

    <el-pagination
      :current-page.sync="queryForm.pageNum"
      :total="total"
      :page-size="queryForm.pageSize"
      @current-change="getList"
      style="margin-top: 15px;"
      background
      layout="prev, pager, next"/>


  </div>

</template>

<script>
    import {editPlan, getPlans, getPlanInfo, delPlan} from "@/api/plan";
    import priceShow from '@/views/com/priceShow'
    import priceInput from '@/views/com/priceInput'


    //计划表
    export default {
        name: "proPlan",
        data() {
            return {
                onload_editPlan: false,
                v_editPlan: false,

                planEditForm: {
                    proId: '',
                    saleState: true,
                    travelDate: '',
                    planDes: '',
                    disList: [],
                    numLimit: 0
                },


                list: [],
                total: 0,
                onLoading: false,
                queryForm: {
                    planNum: '',
                    proNum: '',
                    proName: '',
                    planDate: [],
                    saleState: '',


                    pageNum: 1,
                    pageSorted: 'desc',
                    pageSize: 10
                }
            }
        },
        created() {
            if (this.$route.query.proNum)
                this.queryForm.proNum = this.$route.query.proNum

            if (this.$route.query.id) {
                this.editPlan(this.$route.query.id)
            }

            if(this.$route.query.planNum)
              this.queryForm.planNum=this.$route.query.planNum

            this.getList()
        },
        components:{priceShow,priceInput},


        methods: {
            toProDuct(id) {
                //跳转到产品详情页
                this.$router.push({name: 'AddProduction', query: {id}})
            },

            addOrder(planId) {
                this.$router.push({name: 'AddOrder', query: {planId}})
            },
            savePlan() {
                this.onload_editPlan = true
                console.log(this.planEditForm)
                editPlan(this.planEditForm).then(res => {
                    this.$message({
                        type: 'success',
                        message: '保存计划成功'
                    })

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
            editPlan(id) {
                getPlanInfo(id).then(res => {
                    this.v_editPlan = true
                    this.planEditForm = res
                    this.planEditForm.saleState = (this.planEditForm.saleState === 1)
                    console.log(this.planEditForm)
                }).catch(error => {
                })


            },
            getList() {
                this.onLoading = true
                getPlans(this.queryForm).then(res => {
                    console.log(res)
                    this.list = res.list
                    this.total = res.pagination.total
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
