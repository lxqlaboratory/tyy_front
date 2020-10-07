<template>
  <div class="app-container">
    <div class="component-item" style="margin-bottom: 5px;">
      <el-button  type="primary" icon="el-icon-circle-plus-outline" @click="v_addTemplate=true;templateForm={}">
        增加团队报价模版
      </el-button>
    </div>

    <el-dialog v-dialog-drag  :visible.sync="v_addTemplate" title="新增团队报价" style="width: 100%;">
      <el-form
        :model="templateForm"
        label-position="left"
        label-width="100px"
        style="width: 80%; margin-left:50px;">
        <el-form-item label="编号" prop="id" v-if="templateForm.id!=null">
          <el-input v-model="templateForm.id" disabled/>
        </el-form-item>
        <el-form-item label="模版名称" prop="name">
          <el-input v-model="templateForm.name"  maxlength="30"/>
        </el-form-item>
        <el-form-item label="内容" prop="desc">
          <el-input type="textarea" v-model="templateForm.content" :rows="10"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="v_addTemplate = false">取消</el-button>
        <el-button type="primary" @click="addNewTemplate" :loading="isOnAdd">确定</el-button>
      </div>
    </el-dialog>


    <el-table
      :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      border
      fit
      highlight-current-row
      stripe
    >
      <el-table-column align="center" label="编号" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="模版名称" min-width="95">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="模版内容" min-width="95">
        <template slot-scope="scope">
          <el-popover>
            <div style="padding: 15px;line-height: 150%;font-size: 14px;color: black;max-width: 50vw;">
              {{scope.row.content}}
            </div>
            <el-button slot="reference">点击查看</el-button>
          </el-popover>

        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="v_addTemplate=true;templateForm=list.find(item=>(item.id===scope.row.id))">编辑</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="delTemplate(scope.row.id)">删除
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

    import {addPriTemplates,delPriTemplates,getPriTemplates} from "@/api/production";

    export default {
        name: 'templateList',
        data() {
            return {
                templateForm: {},
                v_addTemplate: false,
                list: [],
                currentPage: 1,
                pageSize:10,
                isOnAdd:false
            }
        },
        created() {
            this.getList();
        },
        methods: {
            getList:function(){
                getPriTemplates().then(res => {
                    this.list = res
                }).catch(error => {

                })
            },
            addNewTemplate: function () {
                this.isOnAdd=true;
                addPriTemplates(this.templateForm).then(res => {
                    this.$message({
                        type:'success',
                        message:'添加成功'
                    })
                    this.isOnAdd=false;
                    this.v_addTemplate=false;
                    this.getList();
                }).catch(error => {
                    this.isOnAdd=false;
                })
            },
            delTemplate: function (id) {
                this.$confirm('此操作不可撤销，是否继续？','提示',{confirmButtonText:'确定',cancelButtonText:'取消'}).then(()=>{
                    delPriTemplates(id).then(res => {
                        this.getList();
                        this.$message({
                            type:'success',
                            message:'删除成功'
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
