<template>
  <div class="app-container">
    <el-dialog v-dialog-drag  :visible.sync="v_editGroup" style="width: 100%;" title="编辑团队">
      <el-form :model="groupEditForm" label-width="80px" ref="groupEditForm">
        <el-form-item
          :rules=" [{ required: true, message: '请输入活动名称', trigger: 'blur' },  { min: 3, max:25, message: '长度在 3 到 25 个字符', trigger: 'blur' }]"
          label="团队名"
          prop="groupName">
          <el-input placeholder="请输入团队名" v-model="groupEditForm.groupName"></el-input>
        </el-form-item>
        <el-form-item
          :rules=" [{ required: true}]"
          label="出团日期"
          prop="groupDate">
          <div style="display: flex;align-items: center;justify-content: flex-start;flex-wrap: wrap;margin-left: 0px;">
            <el-date-picker placeholder="请选择出团日期" v-model="groupEditForm.groupDate"
                            value="yyyy-MM-dd" type="date"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="选择导游" required>
          <el-select :value="groupEditForm.guiderTypeId" @change="groupEditForm.guiderId=''" placeholder="筛选导游类型"
                     v-model="groupEditForm.guiderTypeId">
            <el-option :key="item.id" :label="item.guiderTypeName" :value="item.id"
                       v-for="item in initData.guiderTypeList"></el-option>
          </el-select>
          <el-select :value="groupEditForm.guiderId" placeholder="选择导游" v-model="groupEditForm.guiderId">
            <el-option :key="item.id"
                       :label="item.guiderName" :value="item.id"
                       v-for="item in initData.guiderList.filter(item=>(item.typeId===groupEditForm.guiderTypeId))"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选择车辆" required>
          <el-select :value="groupEditForm.carTypeId" @change="groupEditForm.carId=''" placeholder="筛选车型"
                     v-model="groupEditForm.carTypeId">
            <el-option :key="item.id" :label="item.typeName" :value="item.id"
                       v-for="item in initData.carTypeList"></el-option>
          </el-select>
          <el-select :value="groupEditForm.carId" placeholder="选择车辆" v-model="groupEditForm.carId">
            <el-option :key="item.id"
                       :label="item.carName" :value="item.id"
                       v-for="item in initData.carList.filter(item=>(item.carType===groupEditForm.carTypeId))"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="团队备注">
          <el-input :rules=" [ { min: 0, max:500, message: '长度小于500字符', trigger: 'blur' }]" placeholder="简单记录团队情况"
                    type="textarea"
                    v-model="groupEditForm.groupDes"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="onSave" @click="editGro">修改</el-button>
          <el-button @click="v_editGroup=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
          <el-button type="primary" :loading="onCreate" @click="onSubmit">立即创建</el-button>
          <el-button @click="v_addGroup = false" >取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row align="middle" type="flex">
      <el-col :span="16" class="filter-container">
        <div class="filter-item">
          <label>团队名</label>
          <el-input v-model="queryForm.groupName"></el-input>
        </div>

        <div class="filter-item">
          <label>团队编号</label>
          <el-input v-model="queryForm.groupNum"></el-input>
        </div>


        <div class="filter-item">
          <label>导游名</label>
          <el-input v-model="queryForm.guiderName"></el-input>
        </div>

        <div class="filter-item">
          <label>出团日期</label>
          <el-date-picker value-format="yyyy-MM-dd"
                          format="yyyy-MM-dd"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          type="daterange" v-model="queryForm.travelDate"></el-date-picker>
        </div>

        <!--<div class="filter-item">-->
          <!--<label>订单编号</label>-->
          <!--<el-input v-model="queryForm.orderName"></el-input>-->
        <!--</div>-->

        <div class="filter-item">
          <label>团队状态</label>
          <el-select :value="queryForm.groupState" clearable v-model="queryForm.groupState">
            <el-option :value="1" label="已确认"></el-option>
            <el-option :value="0" label="未确认"></el-option>
          </el-select>
        </div>

      </el-col>
      <el-col :span="8">
        <el-button @click="getData" icon="el-icon-search" style="width: 180px" type="primary">查询</el-button>
        <el-button  @click="toGro"  icon="el-icon-plus" style="width: 180px" type="primary">
          创建团队
        </el-button>
      </el-col>
    </el-row>


    <el-divider></el-divider>


    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      stripe
      style="margin-top: 15px;"
      v-loading="onLoading"
    >

      <el-table-column align="center" label="团队编号" min-width="10">
        <template slot-scope="scope">
          {{ scope.row.groupNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="团队名" min-width="10">
        <template slot-scope="scope">
          {{ scope.row.groupName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="出团日期" min-width="10">
        <template slot-scope="scope">
          {{ scope.row.travelDate.substr(0,10) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="导游名" min-width="5">
        <template slot-scope="scope">
          {{ scope.row.guiderName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单数" min-width="5">
        <template slot-scope="scope">
          {{ scope.row.orderCount }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="团队人数" min-width="5">
        <template slot-scope="scope">
          {{ scope.row.perNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="车型" min-width="5">
        <template slot-scope="scope">
          {{ scope.row.carType }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="团队状态" min-width="5">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.groupState===1">已确认</el-tag>
          <el-tag type="warning" v-else>未确认</el-tag>
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作" min-width="30">
        <template slot-scope="scope">
          <el-button @click="toGroup(scope.row.planId,scope.row.id,scope.row.groupState)" type="primary">团队订单</el-button>
          <el-button @click="cancelGroup(scope.row)" type="info" v-if="scope.row.groupState===1 && $_has('GROUPUPDATE')">取消确认</el-button>
          <el-button @click="confirmGroup(scope.row)" type="success" v-if="scope.row.groupState===0 && $_has('GROUPUPDATE')">确认团队</el-button>
          <el-button @click="printGroup(scope.row.id)" type="success" v-if="scope.row.groupState===1">打印团队单</el-button>
          <el-button type="warning" @click="toEdit(scope.row.id)" >编辑团队</el-button>
          <!--<el-button v-show="false" @click="editGroup(scope.row.id)" type="warning" v-if="scope.row.state===0 && $_has('GROUPUPDATE')">编辑</el-button>-->
          <el-button @click="delGroup(scope.row.id)" type="danger">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination
      :current-page.sync="queryForm.pageNum"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="getData"
      background
      layout="prev, pager, next"
      style="margin-top: 15px;"/>

  </div>
</template>

<script>
    import {addGroup, changeGroupState, deleteGroupInfo, editGroup, getGroupInfoHasPlanId, getAllGroups,getFilterGroups} from "@/api/group"
    import {addGro} from "@/api/group"

    import {getCarList, getCarTypeList} from "@/api/tourist";
    import {getGuiderList, getGuiderType} from '@/api/guide';

    export default {
        name: "groupNewList",
        data() {
            return {
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
              v_editGroup:false,
                initData: {
                    guiderTypeList: [],
                    guiderList: [],
                    carTypeList: [],
                    carList: []
                },

                groupForm: {
                    guiderTypeId: '',
                    guiderId: '',
                    carTypeId: '',
                    carId: '',

                    groupDes: '',
                    groupName: '',
                    travelDate: ''
                },
                //按钮按下事件
                onCreateGroup: false,

                vCreateGroup: false,

                onLoading: false,
                list: [],
                total: 0,

              groupEditForm: {
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

                queryForm: {
                    groupNum: '',
                    groupName: '',
                    travelDate: [],
                    groupState: '',
                    // orderName: '',
                    guiderName: '',
                    serType: '',

                    pageNum: 1,
                    pageSorted: 'desc',
                    pageSize: 10
                }
            }
        },
        created() {
          if(this.$route.query.groupNum)
            this.queryForm.groupNum=this.$route.query.groupNum;
          if (this.$route.name === 'groupDl'){
              this.queryForm.serType = 2;
          }
          if (this.$route.name === 'group'){
              this.queryForm.serType = 1;
          }
            this.getData();
            this.init();
        },
        methods: {
          onSubmit(){
            // this.inGroupList.forEach(item=>{
            //   this.groupAddForm.orderList.push(item.id);
            // });
            addGro(this.groupAddForm).then(res=>{
              this.$message({type: 'success', message: "创建团队成功！"})
              this.onCreate=false
              this.v_addGroup = false
              // this.$router.back()
              this.getData();
            }).catch(error => {

              this.onCreate=false
            })

          },
            //跳转到拼团页面
            toBz(id) {
                this.$router.push({name: 'groupBz', query: {id}})
            },
            groupMap(id){
                this.$router.push({name: 'groupMap', query: {id}})
            },
            toGroup(planId,id,groupState) {
                this.$router.push({name: 'groupPlanspt', query: {planId,id,groupState}})
            },
			      addGroup(){
                let serType=this.queryForm.serType;
              this.$router.push({name:'addGroup', query: {serType}})
            },
           toGro() {
              this.v_addGroup = true
            },
            printGroup(id) {
                window.open(process.env.VUE_APP_PRINT_URL+'group_1?groupId='+id);
            },

          toEdit(id) {
            getGroupInfoHasPlanId(id).then(res => {
              this.v_editGroup = true
              this.groupEditForm = res
            }).catch(error => {
            })
          },
          editGro() {
            this.onSave = true
            editGroup(this.groupEditForm).then(res => {
              this.$message({
                type: 'success',
                message: '保存计划成功'
              })
              this.onSave = false
              this.v_editGroup = false
              this.getData()
            }).catch(error => {
              this.onSave = false
            })

            },
            delGroup(id) {
                this.$confirm('此操作不可撤销', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                  deleteGroupInfo(id).then(res => {
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

            confirmGroup(item) {
                changeGroupState(item.id, 1).then(res => {
                    this.$message({
                        type: 'success',
                        message: '确认团队成功！'
                    })
                    item.groupState = 1
                }).catch(error => {
                })

            },
            cancelGroup(item) {
                changeGroupState(item.id, 0).then(res => {
                    this.$message({
                        type: 'success',
                        message: '已取消团队确认状态，可重新编辑！'
                    })
                    item.groupState = 0
                }).catch(error => {
                })
            },
            init() {
                getGuiderType().then(res => {
                    this.initData.guiderTypeList = res
                }).catch(error => {
                })
                getGuiderList().then(res => {
                    this.initData.guiderList = res
                }).catch(error => {
                })
                getCarList().then(res => {
                    this.initData.carList = res
                }).catch((error => {
                }))
                getCarTypeList().then(res => {
                    this.initData.carTypeList = res
                }).catch(error => {
                })
                this.onLoading = true
                // getAllGroups().then(res => {
                //   console.log(res)
                //   this.onLoading = false
                //   this.list = res
                //   this.total = res.pagination.total
                // }).catch(error => {
                //   this.onLoading = false
                // })
            },
            createGroup() {
                //检查是否有groupNum
                this.onCreateGroup = true
                if (this.groupForm.groupNum) {
                    editGroup(this.groupForm).then(res => {
                        this.$message({
                            type: 'success',
                            message: '保存团队修改成功'
                        })
                        this.vCreateGroup = false
                        this.onCreateGroup = false
                        this.getData()
                    }).catch(res => {
                        this.onCreateGroup = false
                    })
                } else {
                    addGroup(this.groupForm).then(res => {
                        this.$message({
                            type: 'success',
                            message: '创建团队成功'
                        })
                        this.vCreateGroup = false
                        this.onCreateGroup = false
                        this.getData()
                    }).catch(error => {
                        this.onCreateGroup = false
                    })
                }

            },
            getData() {
              this.onLoading = true
              getFilterGroups(this.queryForm).then(res => {
                console.log(res)
                this.list = res.list
                this.total = res.pagination.total
                this.onLoading = false
              }).catch(error => {
                this.onLoading = false
              })

            },

        }
    }
</script>

<style scoped>
  .addGroupDiaLog .el-input {
    max-width: 50%;
  }

</style>
