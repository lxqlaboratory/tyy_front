<template>
  <div class="app-container">
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
        <label>服务类型</label>
        <el-select :value="queryForm.serType" clearable placeholder="请选择产品服务类型" ref="resType"
                   style="width: 180px;" v-model="queryForm.serType">
          <el-option :key="item.id" :label="item.serviceName" :value="item.id"
                     v-for="item in serTypeList"></el-option>
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

        <div class="filter-item">
          <el-button @click="getList" icon="el-icon-search" style="width: 180px" type="primary">查询</el-button>
        </div>


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

      <el-table-column align="center" label="产品编号" min-width="10">
        <template slot-scope="scope">
          {{ scope.row.proNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="产品名称" min-width="18">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="产品类别" min-width="8">
        <template slot-scope="scope">
          {{scope.row.proType}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="服务类别" min-width="10">
        <template slot-scope="scope">
          {{scope.row.serType}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="行程天数" min-width="6">
        <template slot-scope="scope">
          {{ scope.row.proDateNum }}
        </template>
      </el-table-column>


      <el-table-column align="center" label="订单数量" min-width="6">
        <template slot-scope="scope">
          {{ scope.row.orderNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="累计收客" min-width="6">
        <template slot-scope="scope">
          {{ scope.row.touristNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="最近计划" min-width="8">
        <template slot-scope="scope">
          {{ scope.row.proDateNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="25">
        <template slot-scope="scope">
          <el-button @click="proInfo(scope.row.id)" type="primary">详情</el-button>
          <el-button v-if ="$_has('PROUPDATE')" @click="reProduct(scope.row.id)" type="success">还原</el-button>
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
    import {copyProduct, getDelPros, getProTye, getSerTypes, reProduct} from "@/api/production";

    export default {
        name: "proList",
        data() {
            return {


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


                    pageNum: 1,
                    pageSorted: 'desc',
                    pageSize: 10
                }
            }
        },
        computed: {
            proType_2_List() {
                if (this.queryForm.proType_1)
                    return this.proTypeList.find(item => (item.id === this.queryForm.proType_1)).children
                return []
            }
        },

        created() {
            this.initList()
            this.getList()
        },
        methods: {
            proPlan(id) {
                //跳转到产品计划页面
            },
            proInfo(id) {
                //跳转到产品详情页
                this.$router.push({name: 'AddProduction', query: {id}})

            },
            reProduct(id) {
                this.$confirm('该产品还原回产品列表', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    reProduct(id).then(res => {
                        this.$message({
                            type: 'success',
                            message: '还原成功'
                        })
                        this.getList()
                    }).catch(error => {
                        this.getList()
                    })
                })
            },
            copyProduct(id) {
                console.log(id)
                copyProduct(id).then(res => {
                    this.$message({
                        type: 'success',
                        message: '复制成功,列表第一条为复制的记录'
                    })
                    this.getList()
                }).catch(error => {
                })
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
                getDelPros(this.queryForm).then(res => {
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
  .filter-item {
    margin-right: 25px;
  }

</style>
