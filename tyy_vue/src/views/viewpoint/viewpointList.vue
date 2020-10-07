<template>
  <div class="app-container">
    <el-row align="middle" type="flex">
      <el-col :span="8" class="filter-container">
        <div class="filter-item">
          <label>景点名称</label>
          <el-input v-model="queryForm.name"></el-input>
        </div>
      </el-col>

      <el-col :span="8" class="filter-container">
        <label style="margin-left:15px; ">筛选</label>
        <el-select :value="queryForm.province" clearable v-model="queryForm.province"  @change="getData">
          <el-option :key="item" :label="item" :value="item" v-for="item in typeList"></el-option>
        </el-select>
      </el-col>

      <el-col :span="8">
        <el-button @click="getData" icon="el-icon-search" style="width: 180px" type="primary">查询</el-button>
        <el-button v-if="$_has('VIEWPOINTUPDATE')" @click="$router.push({name: 'addViewpoint'})" icon="el-icon-plus" style="width: 180px" type="primary">
          新增景点
        </el-button>
      </el-col>
    </el-row>

    <div class="resource-content">
      <el-card :body-style="{ padding: '0px' }" v-for="item in list" class="resource-item">
        <el-image :src="item.cover" class="image" style="width: 100%;height: 15vh" @click="vpInfo(item.id)" />
        <div style="padding: 15px 10px 0 10px;">
          <a style="font-size: 13px;color: green"@click="vpInfo(item.id)" >{{item.name}}</a>
          <div style="display: flex;align-items: center;width: 100%;padding: 0 1px;justify-content: space-between">
            <span style="font-size: 11px;color: gray">{{item.province}} {{item.city}}  {{item.area}}</span>
            <el-button v-if="$_has('VIEWPOINTUPDATE')" type="text" class="button" @click="editVp(item.id)">修改</el-button>
            <el-button v-if="$_has('VIEWPOINTUPDATE')" type="text" style="color: red" class="button" @click="delVp(item.id)">删除</el-button>
          </div>
        </div>
      </el-card>

    </div>


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
  import {getViewpoints,delViewpoint,getViewpointsCitys} from '@/api/viewpoint'
    export default {
        name: "viewpointList",
        data(){
            return {
                total:0,
                onLoading:false,
                list:'',
                queryForm:{
                    province:'',
                    name:'',
                    pageNum:1,
                    pageSize:8
                },
              typeList:[]
            }
        },
        created() {
            this.getData();
        },
        methods:{
            delVp(id){
                delViewpoint(id).then(res=>{
                    this.getData();
                    this.$message({
                        type:'success',
                        message:'删除成功！'
                    })
                }).catch(err=>{

                })
            },
            editVp(id){
                this.$router.push({name:'addViewpoint', query: {id}})
            },
            vpInfo(id){
                this.$router.push({name: 'viewpointInfo', query: {id}})
            },
            getData(){
                this.onLoading = true
                getViewpointsCitys().then(res=>{
                 this.typeList = res
                }).catch(error => {
                }),

                getViewpoints(this.queryForm).then(res => {
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
  .resource-content{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
  }
  .resource-item{
    width: 23%;
    margin: 10px;
  }

</style>
