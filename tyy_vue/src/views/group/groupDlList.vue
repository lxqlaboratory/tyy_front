<template>
  <div class="app-container">

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
          <el-date-picker end-placeholder="结束日期" range-separator="-"
                          start-placeholder="开始日期"
                          type="daterange" v-model="queryForm.groupDate"></el-date-picker>
        </div>


        <div class="filter-item">
          <label>订单编号</label>
          <el-input v-model="queryForm.orderNum"></el-input>
        </div>

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
        <el-button v-if ="$_has('GROUPUPDATE')" @click="addGroup" icon="el-icon-plus" style="width: 180px" type="primary">
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
          <el-button @click="toGroup(scope.row.id)" type="primary">团队信息</el-button>
          <el-button  @click="cancelGroup(scope.row)" type="info" v-if="scope.row.groupState===1 && $_has('GROUPUPDATE')">取消确认</el-button>
          <el-button @click="confirmGroup(scope.row)" type="success" v-if="scope.row.groupState===0 && $_has('GROUPUPDATE')">确认团队</el-button>
          <el-button @click="toBz(scope.row.id)"  v-if="scope.row.groupState===1 && $_has('PAYUPDATE')" type="warning">报账</el-button>
          <el-button @click="printGroup(scope.row.id)" type="success" v-if="scope.row.groupState===1">打印团队单</el-button>

          <el-button v-show="false" @click="editGroup(scope.row.id)" type="warning" v-if="scope.row.groupState===0">编辑</el-button>
          <el-button @click="delGroup(scope.row.id)" type="danger" v-if="scope.row.groupState===0 && $_has('GROUPUPDATE')">删除</el-button>
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
  import {addGroup, changeGroupState, delGroup, editGroup, getGroupInfo, getGroupList} from "@/api/group"


  import {getCarList, getCarTypeList} from "@/api/tourist";
  import {getGuiderList, getGuiderType} from '@/api/guide';

  export default {
    name: "groupDlList",
    data() {
      return {
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
          groupDate: ''
        },
        //按钮按下事件
        onCreateGroup: false,

        vCreateGroup: false,

        onLoading: false,
        list: [],
        total: 0,


        queryForm: {
          groupNum: '',
          groupName: '',
          groupDate: [],
          groupState: '',
          orderNum: '',
          guiderName: '',

          pageNum: 1,
          pageSorted: 'desc',
          pageSize: 10
        }
      }
    },
    created() {
      if(this.$route.query.groupNum)
        this.queryForm.groupNum=this.$route.query.groupNum

      this.getData()
      this.init()
    },
    methods: {
      //跳转到拼团页面
      toBz(id) {
        this.$router.push({name: 'groupBz', query: {id}})
      },
      toGroup(id) {
        this.$router.push({name: 'grouppt', query: {id}})
      },
      addGroup(){
        this.$router.push({name:'addGroup'})},

      printGroup(id) {
        window.open(process.env.VUE_APP_PRINT_URL+'group_1?groupId='+id);
      },
      editGroup(id) {
        //请求要修改的groupItem
        //给groupForm赋值
        //打开dialog
        getGroupInfo(id).then(res => {
          this.groupForm.id = res.id
          this.groupForm.groupDes = res.groupDes
          this.groupForm.groupDate = res.groupDate
          this.groupForm.guiderId = res.guiderId
          this.groupForm.carTypeId = res.carTypeId
          this.groupForm.carId = res.carId
          this.groupForm.groupName = res.groupName
          this.groupForm.guiderTypeId = res.guiderTypeId
          this.groupForm.groupNum = res.groupNum
          this.vCreateGroup = true
        }).catch(error => {
        })

      },
      delGroup(id) {
        this.$confirm('此操作不可撤销', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          delGroup(id).then(res => {
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
        getGroupList(this.queryForm).then(res => {
          console.log(res)
          this.onLoading = false
          this.list = res.list
          this.total = res.pagination.total
        }).catch(error => {
          this.onLoading = false
        })

      }
    }
  }
</script>

<style scoped>
  .addGroupDiaLog .el-input {
    max-width: 50%;
  }

</style>
