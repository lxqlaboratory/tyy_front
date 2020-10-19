<template>
  <div class="app-container">
    <div class="component-item" style="margin-bottom: 5px;">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="v_addAtt=true;newAttName=''">
        新增产品属性
      </el-button>
    </div>

    <el-dialog v-dialog-drag  :visible.sync="v_addAtt" title="新增产品属性">
      <label>产品属性名</label>
      <el-input v-model="newAttName" maxlength="20" placeholder="请输入产品属性名" style="width: 400px;margin-left: 15px;"></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveNewAttr">保存</el-button>
      </span>
    </el-dialog>


    <el-table
      :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      border
      fit
      highlight-current-row
      stripe
    >
      <el-table-column align="center" label="产品属性名" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.attributeName }}
        </template>
      </el-table-column>


      <el-table-column align="center" label="创建时间" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.attributeCreateTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否展示在客户端" min-width="45">
        <template slot-scope="scope">
          <el-switch
            style="display: block"
            @change="changeShowFlag(scope.row.id)"
            v-model="scope.row.attributeFlagShow"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="展示"
            inactive-text="隐藏"/>
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作" min-width="45">
        <template slot-scope="scope">
          <el-button type="danger" size="small" icon="el-icon-delete" @click="delAtt(scope.row.id)">删除</el-button>
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
    import {getAtts,delAtt,addAtt,editAtt,editFlag} from "@/api/production";

    export default {
        name: "proAtrributeList",
        data() {
            return {
                newAttName:'',
                v_addAtt:false,
                list: [],
                currentPage: 1,
                pageSize: 10
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                getAtts().then(res => {
                    this.list = res.data
                }).catch(error => {
                })
            },
            changeShowFlag(id){
                let item=this.list.find(item=>(item.id===id));
                editFlag(item.id,item.attributeFlagShow).then(res=>{
                    this.$message({
                        type:'success',
                        message:'修改成功'
                    })
                }).catch(error=>{})

            },
            saveNewAttr(){
                addAtt({attributeName:this.newAttName}).then(res=>{
                    this.$message({
                        type:'success',
                        message:'新增产品属性成功'
                    })
                    this.getList();
                    this.v_addAtt=false
                }).catch(error=>{
                    this.v_addAtt=false
                })

            },
            delAtt(id){
                this.$confirm('删除操作不可撤销，是否继续', '警告', {confirmButtonText: '确定', cancelButtonText: '取消'}).then(() => {
                    delAtt(id).then(res => {
                      if(res.re===1){
                        this.$message({type: 'success', message: '删除成功'})
                      }else{
                        this.$message({type: 'error', message: res.data})
                      }
                        this.getList();
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
