<template>
  <div class="app-container">
    <div class="filter-container">

      <div style="display: flex;width: 80vw;justify-content: flex-start;align-items: center;flex-direction: row;">
        <div class="filter-item">
          <label>类型</label>
          <el-select v-model="queryParam.carType" clearable placeholder="选择车辆类型">
            <el-option
              v-for="item in carTypeList"
              :key="item.id"
              :value="item.id"
              :label="item.typeName"
            ></el-option>
          </el-select>
        </div>
        <div class="filter-item">
          <label>车牌号</label>
          <el-input v-model="queryParam.carNumber" placeholder="车牌号"></el-input>
        </div>
        <div class="filter-item">
          <label>司机姓名</label>
          <el-input v-model="queryParam.driverName" placeholder="司机姓名"></el-input>
        </div>
        <div class="filter-item">
          <label>联系电话</label>
          <el-input v-model="queryParam.phone" placeholder="联系电话"></el-input>
        </div>
      </div>
    </div>
    <div class="component-item" style="margin-bottom: 5px;">
      <el-button v-if="$_has('CARUPDATE')" type="primary" icon="el-icon-circle-plus-outline" @click="addNewCar">
        新增车辆
      </el-button>
    </div>

    <el-table :data="tableList"
              border
              fit
              highlight-current-row
              stripe>

      <el-table-column align="center" label="车牌号" min-width="60">
        <template slot-scope="scope">
          {{ scope.row.carNumber }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="车辆类型" min-width="45">
        <template slot-scope="scope">
          <el-tag>
            {{ carTypeList.find(item=>(item.id===scope.row.carType)).typeName}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="司机姓名" min-width="45">
        <template slot-scope="scope">
          {{scope.row.carDriver}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系电话" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.driverPhone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="说明" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.carDes }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="80">
        <template slot-scope="scope">
          <el-button v-if="$_has('CARUPDATE')" type="text" @click="carInfo(scope.row.id)">
            修改
          </el-button>
          <el-button v-if="$_has('CARUPDATE')" type="text" style="color: red" @click="deleteCar(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="currentPage"
      :total="list.length"
      :page-size="pageSize"
      style="margin-top: 15px;"
      background
      layout="prev, pager, next"/>
  </div>
</template>
<script>

    import {getCarList,getCarTypeList,delCar} from "@/api/tourist";
    export default {
        name: 'carList',
        data() {
            return {
                carTypeList: [],
                list: [],
                currentPage: 1,
                pageSize: 10,
                queryParam:{
                    carNumber:'',
                    driverName:'',
                    carType:'',
                    phone:'',

                },
            }
        },
        created() {
            this.getCarTypeList()
            this.getList()
        },
        computed: {
            tableList() {
                let tlist = this.list.filter(item => {
                    if (this.queryParam["carNumber"]){
                        if (item["carNumber"].indexOf(this.queryParam["carNumber"])===-1){
                            return false
                        }
                    }
                    console.log(item["carDriver"].indexOf(this.queryParam["driverName"])===-1)
                    if (this.queryParam["driverName"]){
                        if (item["carDriver"].indexOf(this.queryParam["driverName"])===-1){
                            return false
                        }
                    }
                    if (this.queryParam["carType"]){
                        if (item["carType"]!==this.queryParam["carType"]){
                            return false
                        }
                    }
                    if (this.queryParam["phone"]){
                        if (item["driverPhone"].indexOf(this.queryParam["phone"])===-1){
                            return false
                        }
                    }
                    return true
                })
                return tlist.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
            }
        },
        methods: {
            carInfo:function(id){
                this.$router.push({name:'addNewCar',query:{id}})
            },
            addNewCar: function () {
                this.$router.push({name:'addNewCar'})
            },
            deleteCar: function (id) {
                this.$confirm('删除操作不可撤销，是否继续', '警告', {confirmButtonText: '确定', cancelButtonText: '取消'}).then(() => {
                    delCar(id).then(res => {
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

            getList: function () {
                getCarList().then(res => {
                    this.list = res
                }).catch(error => {
                })
            },
            getCarTypeList: function () {
                getCarTypeList().then(res => {
                    this.carTypeList = res
                }).catch(error => {

                })
            }
        }
    }
</script>

<style scoped>
  el-input {
    color: black;
    background-color: #fff;
  }

</style>
