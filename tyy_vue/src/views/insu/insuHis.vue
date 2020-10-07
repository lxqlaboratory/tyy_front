<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-item">
        <el-input placeholder="检索保单号" v-model="queryForm.num"></el-input>
      </div>
      <div class="filter-item">
        <el-input placeholder="检索游客姓名" v-model="queryForm.touName"></el-input>
      </div>
      <div class="filter-item">
        <el-input placeholder="检索保险产品名" v-model="queryForm.insuName"></el-input>
      </div>
      <div class="filter-item">
        <el-input placeholder="检索保险产品编号" v-model="queryForm.insuNum"></el-input>
      </div>


      <div class="filter-item">
        <el-input placeholder="检索订单编号" v-model="queryForm.orderNum"></el-input>
      </div>

      <div class="filter-item">
        <el-input placeholder="检索团名" v-model="queryForm.groupName"></el-input>
      </div>


      <div class="filter-item">
        <el-input placeholder="检索团编号" v-model="queryForm.groupNum"></el-input>
      </div>


      <div class="filter-item">
        <el-input placeholder="检索团编号" v-model="queryForm.groupNum"></el-input>
      </div>


      <el-button @click="getList" size="medium"
                 type="primary">
        查询
      </el-button>


    </div>


    <el-table
      :data="list"
      autocapitalize="words"
      border
      highlight-current-row
      stripe
      style="margin-top: 15px;"
      v-loading="onLoading">
      <el-table-column align="center" label="保单号">
        <template slot-scope="scope">
          {{scope.row.num}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="投保人">
        <template slot-scope="scope">
          {{scope.row.touName}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="性别">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.sex===1">男</el-tag>
          <el-tag type="danger" v-else>女</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="保费">
        <template slot-scope="scope">
          <span style="color: orangered">{{scope.row.insuPrice}}</span>元
        </template>
      </el-table-column>

      <el-table-column align="center" label="保险产品">
        <template slot-scope="scope">
        {{scope.row.insuName}}
          <br/><span style="color: #20a0ff"> {{scope.row.insuNum}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="订单号">
        <template slot-scope="scope">
          {{scope.row.orderNum}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="拼团信息">
        <template slot-scope="scope">
          {{scope.row.groupName}}<br/><span style="color: #20a0ff"> {{scope.row.groupNum}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="下单时间">
        <template slot-scope="scope">
          {{scope.row.createTime}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="delInsuHis(scope.row.id)" type="danger">退保</el-button>
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
    import {delInsuHis, getInsuHisList} from "@/api/insurance";

    export default {
        name: "insuHis",
        data() {
            return {
                queryForm: {
                    //游客名
                    touName: '',
                    //保单号
                    num: '',
                    //产品名
                    insuName: '',
                    //产品编号
                    insuNum: '',

                    //订单号
                    orderNum: '',
                    //团名
                    groupName: '',
                    //团编号
                    groupNum: '',
                    //下单日期
                    insuDate: [],

                    pageNum: 1,
                    pageSorted: 'desc',
                    pageSize: 10
                },
                total: 0,
                list: [],
                onLoading: false
            }
        },
        created() {
            this.getList()
        },
        methods: {
            delInsuHis(id) {
                this.$confirm('删除操作不可撤销，是否继续', '警告', {confirmButtonText: '确定', cancelButtonText: '取消'}).then(() => {
                    delInsuHis(id).then(res => {
                        this.$message({
                                type: 'success',
                                message: '删除成功'
                            }
                        )
                        this.getList();
                    }).catch(error => {
                        this.getList();
                    })
                })
            },

            getList() {
                this.onLoading = true
                getInsuHisList(this.queryForm).then(res => {
                    console.log(res)
                    this.onLoading = false
                    this.list = res.list
                    this.total = res.pagination.total
                }).catch(error => {

                })
            }
        }
    }
</script>

<style scoped>

</style>
