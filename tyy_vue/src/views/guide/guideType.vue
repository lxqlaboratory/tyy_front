<template>
  <div class="app-container">
    <div class="component-item" style="margin-bottom: 5px;">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="v_addGuideType=true;guideTypeAddForm={};">
        新增导游类型
      </el-button>
    </div>

    <el-dialog v-dialog-drag  :visible.sync="v_addGuideType" title="新增导游类型" style="width: 100%;">
      <el-form
        :model="guideTypeAddForm"
        label-position="left"
        label-width="100px"
        style="width: 80%; margin-left:50px;">
        <el-form-item label="类型名" prop="name">
          <el-input v-model="guideTypeAddForm.guiderTypeName" style="width: 50%;" maxlength="20"/>
        </el-form-item>
        <el-form-item label="序号" prop="name">
          <el-input v-model="guideTypeAddForm.guiderTypeOrder" style="width: 50%;" type="number"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="v_addGuideType = false">取消</el-button>
        <el-button type="primary" @click="addNewGuide" :loading="isOnAdd">增加</el-button>
      </div>

    </el-dialog>

    <el-dialog v-dialog-drag  :visible.sync="v_editGuideType" title="编辑导游类型" style="width: 100%;">
      <el-form
        :model="guideTypeEditForm"
        label-position="left"
        label-width="100px"
        style="width: 80%; margin-left:50px;">
        <el-form-item label="类型名" prop="name">
          <el-input v-model="guideTypeEditForm.guiderTypeName" style="width: 50%;" maxlength="20"/>
        </el-form-item>
        <el-form-item label="序号" prop="name">
          <el-input v-model="guideTypeEditForm.guiderTypeOrder" style="width: 50%;" type="number"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="v_editGuideType = false;getList()">取消</el-button>
        <el-button type="primary" @click="ediDisType" >保存</el-button>
      </div>

    </el-dialog>

    <el-table
      :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      border
      fit
      highlight-current-row
      stripe
    >
      <el-table-column align="center" label="排序序号" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.guiderTypeOrder }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型名" min-width="95">
        <template slot-scope="scope">
          {{ scope.row.guiderTypeName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" min-width="95">
        <template slot-scope="scope">
          {{ scope.row.guiderCreateTime }}
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="v_editGuideType=true;guideTypeEditForm=list.find(item=>(item.id===scope.row.id))">编辑</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteGuideType(scope.row.id)">删除
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
    import {getGuiderType,addGuiderType,delGuiderType,editGuiderType} from '@/api/guide'

    export default {
        name: 'GuideType',
        data() {
            return {
                guideTypeAddForm: {},
                guideTypeEditForm: {},
                v_addGuideType: false,
                v_editGuideType:false,
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
                getGuiderType().then(res => {
                    this.list = res.data
                }).catch(error => {

                })
            },
            addNewGuide: function () {
                this.isOnAdd=true;
                addGuiderType(this.guideTypeAddForm).then(res => {
                  if(res.re===1){
                    this.$message({
                      type:'success',
                      message:'添加成功'
                    })
                  }else{
                    this.$message({type: 'error', message: res.data})
                  }

                    this.isOnAdd=false;
                    this.v_addGuideType=false;
                    this.getList();
                }).catch(error => {
                    this.isOnAdd=false;
                })
            },
            ediDisType:function(){
                editGuiderType(this.guideTypeEditForm).then(res=>{
                  if(res.re===1){
                    this.$message({
                      type:'success',
                      message:'保存成功'
                    })
                  }else{
                    this.$message({type: 'error', message: res.data})
                  }
                    this.v_editGuideType=false
                    this.getList()
                }).catch(error=>{

                    this.v_editGuideType=false
                })
            },
            deleteGuideType: function (id) {
                this.$confirm('此操作不可撤销，是否继续？','提示',{confirmButtonText:'确定',cancelButtonText:'取消'}).then(()=>{
                    delGuiderType(id).then(res => {
                        this.getList();
                      if(res.re===1){
                        this.$message({
                          type:'success',
                          message:'删除成功'
                        })
                      }else{
                        this.$message({type: 'error', message: res.data})
                      }

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
