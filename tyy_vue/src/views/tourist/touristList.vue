<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-item">
        <label>证件号码</label>
        <el-input maxlength="50" placeholder="请检索证件号码" style="margin-left: 15px; width: 300px"
                  v-model="queryForm.cerNum"></el-input>
      </div>
      <div class="filter-item">
        <label>手机号</label>
        <el-input maxlength="50" placeholder="请检索手机号码" style="margin-left: 15px; width: 300px"
                  v-model="queryForm.phone"></el-input>
      </div>


      <div class="filter-item">
        <label>游客姓名</label>
        <el-input maxlength="50" placeholder="请检索姓名" style="margin-left: 15px; width: 300px"
                  v-model="queryForm.name"></el-input>

      </div>

      <div class="filter-item">
        <el-button @click="getList" icon="el-icon-search" type="primary">查询</el-button>
      </div>
    </div>

    <div class="component-item" style="margin-bottom: 5px;">
      <el-button @click="addNewTourist()" icon="el-icon-circle-plus-outline" type="primary">
        新增游客
      </el-button>
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
      <el-table-column width="100px" align="center" label="游客编号" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="游客姓名" min-width="45">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.isBlack===1">黑名单</el-tag>
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机号" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column width="120px"  align="center" label="性别" min-width="45">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.sex===1">男</el-tag>
          <el-tag type="warning" v-if="scope.row.sex===0">女</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="游客住址" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.address}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="保存时间" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作" min-width="45">
        <template slot-scope="scope">
          <div>
            <el-button @click="addNewTourist(scope.row.id)" size="mini" type="primary">修改游客</el-button>
            <el-button @click="" size="mini" type="success">发送短信</el-button>
          </div>
          <div style="margin-top: 5px">
            <el-button @click="delTourist(scope.row.id)" plain size="mini" type="danger">删除游客</el-button>
            <!--<el-button  @click="eidtIsBlack(scope.row.id,1)" size="mini" type="danger" v-if="scope.row.isBlack===0">-->
              <!--加入黑名单-->
            <!--</el-button>-->
            <!--<el-button @click="eidtIsBlack(scope.row.id,0)" size="mini" type="warning" v-if="scope.row.isBlack===1">-->
              <!--移除黑名单-->
            <!--</el-button>-->

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
  import {delTourist, editIsBlack, getCerTypes, getTouristList} from "@/api/tourist"

  export default {
    name: "touristList",
    data() {
      return {
        onLoading: true,
        list: [],
        total: 0,
        //resTypeList: [],
        cerTypeList: [],
        isOnAdd: false,
        v_dialog_addResourceType: false,
        cerTypeForm: {
          type: "CERTYPE"
        },
        queryForm: {
          name: '',
          phone: '',
          cerNum: '',
          cerType: '',
          orderNum: '',
          proName: '',
          proNum: '',
          groupName: '',
          groupNum: '',
          pageNum: 1,
          pageSorted: 'desc',
          pageSize: 10
        }
      }
    },
    created() {
      if (this.$route.params.proNum) {
        this.queryForm.proNum = this.$route.params.proNum
      }

      //this.getTypeList()
      this.getCerTypes()
      this.getList()
    },
    methods: {
      delTourist(id) {
        this.$confirm('此操作不可撤销,是否继续', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          delTourist(id).then(res => {
            if(res.re===1){
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            }else{
              this.$message({type: 'error', message: res.data})
            }
            this.getList()
          }).catch(error => {
            this.getList()
          })
        })
      },
      eidtIsBlack(id, isBlack) {
        editIsBlack(id, isBlack).then(res => {
          this.$message({
            type: 'success',
            message: '处理成功！'
          })
          this.getList()
        })

      },
      addNewTourist: function (id) {
        this.$router.push({name: 'addNewTourist', query: {id}})
      },
      getCerTypes() {
        getCerTypes(this.cerTypeForm).then(res => {
          this.cerTypeList = res.data
        })
      },
      getList() {
        getTouristList(this.queryForm).then(res => {
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
