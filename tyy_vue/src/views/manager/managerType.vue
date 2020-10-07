<template>
  <div class="app-container">
    <div class="component-item" style="margin-bottom: 5px;">
      <el-button v-if="$_has('ROLEUPDATE')" type="primary" icon="el-icon-circle-plus-outline" @click="v_addManagerType=true;ManagerTypeAddForm={};">
        新增管理组
      </el-button>
    </div>
    <el-dialog v-dialog-drag  :visible.sync="v_addManagerType" title="添加管理组" style="width: 100%;">
      <el-form
        :model="ManagerTypeAddForm"
        label-position="left"
        label-width="100px"
        style="width: 80%; margin-left:50px;">
        <el-form-item label="类型名" prop="name">
          <el-input v-model="ManagerTypeAddForm.roleName" style="width: 50%;" maxlength="20"/>
        </el-form-item>
        <el-form-item label="序号" prop="name">
          <el-input v-model="ManagerTypeAddForm.roleOrder" style="width: 50%;" type="number"/>
        </el-form-item>
        <el-form-item label="权限" prop="auth">
          <el-cascader-panel :options="authArray" :props="{ multiple: true }" v-model="ManagerTypeAddForm.auths"></el-cascader-panel>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="v_addManagerType = false">取消</el-button>
        <el-button type="primary" @click="addNewManagerType" :loading="isOnAdd">增加</el-button>
      </div>

    </el-dialog>

    <el-dialog v-dialog-drag :visible.sync="v_editManagerType" title="编辑管理组" style="width: 100%;">
      <el-form
        :model="ManagerTypeEditForm"
        label-position="left"
        label-width="100px"
        style="width: 80%; margin-left:50px;">
        <el-form-item label="类型名" prop="name">
          <el-input v-model="ManagerTypeEditForm.roleName" style="width: 50%;" maxlength="20"/>
        </el-form-item>
        <el-form-item label="序号" prop="name">
          <el-input v-model="ManagerTypeEditForm.roleOrder" style="width: 50%;" type="number"/>
        </el-form-item>
        <el-form-item label="权限" prop="auth">
          <el-cascader-panel :options="authArray" :props="{ multiple: true }" v-model="ManagerTypeEditForm.auths"></el-cascader-panel>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="v_editManagerType = false;getList()">取消</el-button>
        <el-button type="primary" @click="ediManagerType" >保存</el-button>
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
          {{ scope.row.roleOrder }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="管理组名" min-width="95">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" min-width="95">
        <template slot-scope="scope">
          {{ scope.row.roleCreateTime }}
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="$_has('ROLEUPDATE')" type="primary" size="small" icon="el-icon-edit" @click="v_editManagerType=true;ManagerTypeEditForm=list.find(item=>(item.id===scope.row.id))">编辑</el-button>
            <el-button v-if="$_has('ROLEUPDATE')" type="danger" size="small" icon="el-icon-delete" @click="deleteManagerType(scope.row.id)">删除

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

    import {getRoles,delRole,editRoles,addRole,editAuth,getAllAuths} from "@/api/manager";

    export default {
        name: 'GuideType',
        data() {
            return {
                ManagerTypeAddForm: {},
                ManagerTypeEditForm: {},
                authEditForm:{
                    id:'',
                    auths:[],
                },
                v_addManagerType: false,
                v_editAuth:false,
                v_editManagerType:false,
                auths:[],

                list: [],
                currentPage: 1,
                pageSize:10,
                isOnAdd:false,
                authArray:[],
            }
        },
        created() {
            this.getList();
            this.getAllAuthsInfo();
        },
        methods: {
            getAllAuthsInfo:function(){
                getAllAuths().then(res => {
                    this.authArray=res;
                    console.log(res)
                }).catch(error => {

                })
            },
            getList:function(){
                getRoles().then(res => {
                    this.list = res;
                    this.list.forEach((value, index, array) => {
                        if (value.auths){
                            array[index].auths=JSON.parse(value.auths);
                        }
                    });
                    console.log(this.list)
                }).catch(error => {

                })
            },
            addNewManagerType: function () {
                this.isOnAdd=true;
                let authArr=[];
                this.ManagerTypeAddForm.auths.forEach(auth=>{
                    if (authArr.indexOf(auth[0])===-1){
                        authArr.push(auth[0]);
                    }
                    if (authArr.indexOf(auth[1])===-1){
                        authArr.push(auth[1]);
                    }

                });
                this.ManagerTypeAddForm.auths=authArr;
                addRole(this.ManagerTypeAddForm).then(res => {
                    this.$message({
                        type:'success',
                        message:'添加成功'
                    })
                    this.isOnAdd=false;
                    this.v_addManagerType=false;
                    this.getList();
                }).catch(error => {
                    this.isOnAdd=false;
                })
            },
            ediManagerType:function(){
                let authArr=[];
                this.ManagerTypeEditForm.auths.forEach(auth=>{
                    if (authArr.indexOf(auth[0])===-1){
                        authArr.push(auth[0]);
                    }
                    if (authArr.indexOf(auth[1])===-1){
                        authArr.push(auth[1]);
                    }

                });
                this.ManagerTypeEditForm.auths=authArr;
                editRoles(this.ManagerTypeEditForm).then(res=>{
                    this.$message({
                        type:'success',
                        message:'保存成功'
                    })
                    this.v_editManagerType=false
                    this.getList()
                }).catch(error=>{
                    this.v_editManagerType=false
                })
            },
            editAuths:function(){
                editAuth(this.authEditForm).then(res=>{
                    this.$message({
                        type:'success',
                        message:'设置成功'
                    })
                    this.v_editAuth=false
                    this.getList()
                }).catch(error=>{
                    this.v_editAuth=false
                })
            },
            deleteManagerType: function (id) {
                this.$confirm('此操作不可撤销，是否继续？','提示',{confirmButtonText:'确定',cancelButtonText:'取消'}).then(()=>{
                    delRole(id).then(res => {
                        this.getList();
                        this.$message({
                            type:'success',
                            message:'删除成功'
                        })
                    }).catch(error => {
                        this.getList();
                    })
                })
            },
            addAuth(auth,value){
                console.log(value)
                if (this.auths.indexOf(value)>-1){
                    if (this.auths.indexOf(auth.label === -1)){
                        this.auths.push(auth)
                    }
                }

            },
        }
    }
</script>

<style scoped>

</style>
