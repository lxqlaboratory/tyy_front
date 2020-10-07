<template>
  <div class="app-container">
    <div class="component-item" style="margin-bottom: 5px;">
      <el-button v-if ="$_has('LOCATIONUPDATE')" type="primary" icon="el-icon-circle-plus-outline" @click="$router.push('addNewLocation')">
        新增集合地点
      </el-button>
    </div>


    <el-table
      :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      border
      fit
      highlight-current-row
      stripe
    >

      <el-table-column align="center" label="集合地点名" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.locationName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="地点描述" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.locationContent }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="默认集合时间" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.locationTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="经纬度" min-width="45">
        <template slot-scope="scope">
          {{scope.row.locationLongitude +','+scope.row.locationLatitude}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" min-width="45">
        <template slot-scope="scope">
          {{scope.row.locationCreateTime}}
        </template>
      </el-table-column>
      <el-table-column  align="center" label="操作" min-width="45">
        <template slot-scope="scope">
          <el-button v-if ="$_has('LOCATIONUPDATE')" type="primary" size="small" icon="el-icon-edit" @click="editPoint(scope.row.id)">编辑</el-button>
          <el-button v-if ="$_has('LOCATIONUPDATE')" type="danger" size="small" icon="el-icon-delete" @click="delLocation(scope.row.id)">删除
          </el-button>
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

  import {getLocations,delLocation} from "@/api/production";

  export default {
        name: "proPoint",
        data() {
            return {
                list: [],
                currentPage: 1,
                pageSize: 10,
                isOnAdd: false
            }
        },
        created(){
            this.getList()
        },
        methods:{
            editPoint(id){
                this.$router.push({name:'addNewLocation',query:{id}})
            },
            delLocation(id){
                this.$confirm('删除操作不可撤销，是否继续', '警告', {confirmButtonText: '确定', cancelButtonText: '取消'}).then(() => {
                    delLocation(id).then(res => {
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
                getLocations().then(res=>{
                    this.list=res
                }).catch(error=>{})
            }
        }
    }
</script>

<style scoped>

</style>
