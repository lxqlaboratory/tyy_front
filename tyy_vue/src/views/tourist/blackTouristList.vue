<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-item">
        <label>证件类型</label>
        <el-select ref="resType" v-model="queryForm.resType" :value="queryForm.cerType" style="width: 300px;"
                   placeholder="请选择证件类型" clearable>
          <el-option v-for="item in cerTypeList" :key="item.code" :value="item.code"
                     :label="item.description"></el-option>
        </el-select>
      </div>
      <div class="filter-item">
        <label>证件号码</label>
        <el-input style="margin-left: 15px; width: 300px" v-model="queryForm.cerNum" maxlength="50"
                  placeholder="请检索证件号码"></el-input>
      </div>
      <div class="filter-item">
        <label>手机号</label>
        <el-input style="margin-left: 15px; width: 300px" v-model="queryForm.phone" maxlength="50"
                  placeholder="请检索手机号码"></el-input>
      </div>


      <div class="filter-item">
        <label>游客姓名</label>
        <el-input style="margin-left: 15px; width: 300px" v-model="queryForm.name" maxlength="50"
                  placeholder="请检索姓名"></el-input>

      </div>
      <div class="filter-item">
        <label>订单编号</label>
        <el-input style="margin-left: 15px; width: 300px" v-model="queryForm.orderNum" maxlength="50"
                  placeholder="请检索订单编号"></el-input>
      </div>

      <div class="filter-item">
        <label>产品名</label>
        <el-input style="margin-left: 15px; width: 300px" v-model="queryForm.proName" maxlength="50"
                  placeholder="请检索产品名"></el-input>
      </div>

      <div class="filter-item">
        <label>产品编号</label>
        <el-input style="margin-left: 15px; width: 300px" v-model="queryForm.proNum" maxlength="50"
                  placeholder="请检索产品编号"></el-input>
      </div>


      <div class="filter-item">
        <el-button icon="el-icon-search" type="primary" @click="getList">查询</el-button>
      </div>
    </div>

    <div class="component-item" style="margin-bottom: 5px;">
      <el-button v-if="$_has('TOUUPDATE')" type="primary" icon="el-icon-circle-plus-outline" @click="addNewTourist()">
        新增游客
      </el-button>
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
      <el-table-column align="center" label="游客编号" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="游客姓名" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.name }}
          <el-tag type="info">已拉黑</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机号" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别" min-width="45">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex===1" type="success">男</el-tag>
          <el-tag v-if="scope.row.sex===0" type="warning">女</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.remark}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="拉黑时间" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作" min-width="45">
        <template slot-scope="scope">
          <div>
            <el-button v-if="$_has('TOUUPDATE')" size="mini" type="primary" @click="addNewTourist(scope.row.id)">修改游客</el-button>
            <el-button size="mini" type="success" @click="">发送短信</el-button>
          </div>
          <div style="margin-top: 5px">
            <el-button v-if="$_has('TOUUPDATE')" size="mini" type="danger" @click="delTourist(scope.row.id)">删除游客</el-button>
            <el-button size="mini" type="danger"  plain @click="eidtIsBlack(scope.row.id,1)" v-if="scope.row.isBlack===0&&$_has('TOUUPDATE')">加入黑名单</el-button>
            <el-button size="mini" type="warning" @click="eidtIsBlack(scope.row.id,0)" v-if="scope.row.isBlack===1&&$_has('TOUUPDATE')">移除黑名单</el-button>

          </div>
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
  import {getTouristList,getCerTypes,delTourist,editIsBlack} from "@/api/tourist"

  export default {
    name: "BlackTouristList",
    data() {
      return {
        onLoading: true,
        list: [],
        total: 0,
        //resTypeList: [],
        cerTypeList:[],
        isOnAdd: false,
        v_dialog_addResourceType: false,
        cerTypeForm:{
          type:"CERTYPE"
        },
        queryForm: {
          isBlack:1,
          name: '',
          phone: '',
          cerNum:'',
          cerType:'',
          orderNum:'',
          proName:'',
          proNum:'',
          pageNum: 1,
          pageSorted: 'desc',
          pageSize: 10
        }
      }
    },
    created() {
      if(this.$route.params.proNum){
        this.queryForm.proNum=this.$route.params.proNum
      }

      //this.getTypeList()
      this.getCerTypes()
      this.getList()
    },
    methods: {
      delTourist(id){
        this.$confirm('此操作不可撤销,是否继续', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          delTourist(id).then(res => {
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
      eidtIsBlack(id,isBlack){
        editIsBlack(id,isBlack).then(res=>{
          this.$message({
            type:'success',
            message: '处理成功！'
          });
          this.getList();
        })

      },
      addNewTourist: function(id) {
        this.$router.push({name:'addNewTourist',query : {id}})
      },
      getCerTypes(){
        getCerTypes(this.cerTypeForm).then(res=>{
          this.cerTypeList=res
        })
      },
      getList() {
        getTouristList(this.queryForm).then(res => {
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
