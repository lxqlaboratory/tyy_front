<template>
  <div class="app-container">
    <div class="component-item" style="margin-bottom: 5px;">
      <el-button type="primary" icon="el-icon-circle-plus-outline"
                 @click="v_addFServiceType=true;newProType={ carTypeName:'',typeDes:'',proTypeParent:0}">
        增加一级类目
      </el-button>
      <!--<a href="https://localhost:8080/tyy/appdri/invoice/downloadtestPdf">下载pdf</a>-->
    </div>
    <el-dialog  v-dialog-drag  :visible.sync="v_addFServiceType" title="增加类目">
      <div>
        <label>产品类目</label>
        <el-input v-model="newProType.proTypeName" maxlength="20" placeholder="请输入产品类目名"
                  style="width: 400px;margin-left: 15px;"></el-input>
      </div>
      <div style="margin-top: 25px;">
        <label>类目描述</label>
        <el-input v-model="newProType.proTypeDes" maxlength="100" placeholder="请简短介绍该分类"
                  style="width: 700px;margin-left: 15px;"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveNewServiceType">增加类目</el-button>
      </span>
    </el-dialog>



    <el-table
      :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      row-key="id"
      border
      fit
      default-expand-all
      :indent="30"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      highlight-current-row
      stripe

    >
      <el-table-column prop="proTypeName" label="分类名" min-width="45"></el-table-column>
      <el-table-column align="center" prop="proTypeDes" label="分类描述" min-width="95"></el-table-column>
      <el-table-column align="center" prop="proTypeCreateTime" label="创建时间" min-width="95"></el-table-column>

      <el-table-column min-width="150" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="v_addFServiceType=true;newProType={ carTypeName:'',typeDes:'',proTypeParent:scope.row.id}">子分类</el-button>
          <el-button :disabled="scope.row.children.length!=0" type="danger" size="small" icon="el-icon-delete"
                     @click="deleteType(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <span style="color: gray;font-size: 13px;"> Tips: 删除父类前需删除完该类下所有子类;增加一级类目请点击上方按钮</span>
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
    import {getProTyeNoLimit, delProType,addProType} from "@/api/production";


    export default {
        name: 'proTypeList',
        data() {
            return {

                newProType: {
                    proTypeName: '',
                    proTypeDes: '',
                    proTypeParent: 0
                },
                rowsKeys: [],
                v_addFServiceType: false,
                list: [],
                currentPage: 1,
                pageSize: 10,
                isOnAdd: false
            }
        },
        created() {
            this.getList()
        },
        methods: {
            saveNewServiceType:function(){
                console.log(this.newProType)
                addProType(this.newProType).then(res=>{
                    this.$message({
                        type:'success',
                        message:'增加类目成功'
                    })
                    this.getList()
                    this.v_addFServiceType=false
                }).catch(error=>{})
            },
            getList: function () {
              getProTyeNoLimit().then(res => {
                    this.list = res.data
                    this.rowsKeys = this.list.map(item => item.id)
                }).catch(error => {

                })
            }
            ,

            deleteType: function (id) {
                this.$confirm('此操作不可撤销，是否继续？', '提示', {confirmButtonText: '确定', cancelButtonText: '取消'}).then(() => {
                    delProType(id).then(res => {
                        this.getList();
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                    }).catch(error => {
                        this.getList();
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>
