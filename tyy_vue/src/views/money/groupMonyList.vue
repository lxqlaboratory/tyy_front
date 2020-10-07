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
        <div class="filter-item">
          <label>扎帐状态</label>
          <el-select :value="queryForm.tieupState" clearable v-model="queryForm.tieupState">
            <el-option :value="1" label="已扎帐"></el-option>
            <el-option :value="0" label="未扎帐"></el-option>
          </el-select>
        </div>

      </el-col>
      <el-col :span="8">
        <el-button @click="getData" icon="el-icon-search" style="width: 180px" type="primary">查询</el-button>
        <el-button  @click="addGroup" icon="el-icon-plus" style="width: 180px" type="primary">
          创建
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
          {{ scope.row.groupDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="导游名" min-width="5">
        <template slot-scope="scope">
          {{ scope.row.guiderName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="团队人数" min-width="5">
        <template slot-scope="scope">
          {{ scope.row.touNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="总应收团款" min-width="5">
        <template slot-scope="scope">
          <price-show :price="scope.row.inPayment"></price-show>
        </template>
      </el-table-column>
      <el-table-column align="center" label="实收团款" min-width="5">
        <template slot-scope="scope">
          <price-show :price="scope.row.hasPayment"></price-show>
        </template>
      </el-table-column>
      <el-table-column align="center" label="已支出" min-width="5">
        <template slot-scope="scope">
          <price-show :price="scope.row.outPayment"></price-show>
        </template>
      </el-table-column>
      <el-table-column align="center" label="毛利" min-width="5">
        <template slot-scope="scope">
          <price-show :price="scope.row.errPayment"></price-show>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作人" min-width="5">
        <template slot-scope="scope">
          {{ scope.row.adminName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="团队状态" min-width="5">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.groupState===1">已确认</el-tag>
          <el-tag type="warning" v-else>未确认</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="扎帐状态" min-width="5">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.tieupState===1">已扎帐</el-tag>
          <el-tag type="warning" v-else>未扎帐</el-tag>
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作" min-width="30">
        <template slot-scope="scope">
          <svg-icon icon-class="money" style="color:green"/>
          <el-button v-if="$_has('PAYUPDATE')" @click="toBz(scope.row.id)" type="text" style="color: green">计调报账</el-button>
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
    import {addGroup, changeGroupState, delGroup, editGroup, getGroupInfo, getGroupMonyList} from "@/api/group"


    import {getCarList, getCarTypeList} from "@/api/tourist";
    import {getGuiderList, getGuiderType} from '@/api/guide';

    export default {
        name: "groupMonyList",
        data() {
            return {
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

                onLoading: false,
                list: [],
                total: 0,


                queryForm: {
                    groupNum: '',
                    groupName: '',
                    groupDate: [],
                    groupState: '',
                    tieupState: '',
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
            this.queryForm.groupNum=this.$route.query.groupNum;
          this.getData();
        },
        methods: {
            //跳转到拼团页面
            toBz(id) {
                this.$router.push({name: 'groupBz', query: {id}})
            },
            getData() {
                this.onLoading = true
                getGroupMonyList(this.queryForm).then(res => {
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
