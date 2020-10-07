<template>
  <div class="app-container">
    <!--<div class="component-item" style="margin-bottom: 5px;">-->
      <!--<el-button v-if="$_has('ROLEUPDATE')" type="primary" icon="el-icon-circle-plus-outline" @click="v_addManagerType=true;ManagerTypeAddForm={};">-->
        <!--新增管理组-->
      <!--</el-button>-->
    <!--</div>-->
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

    <el-dialog v-dialog-drag :visible.sync="v_editPer" title="调整分成" style="width: 100%;">

      <el-form label-width="100px" ref="planEditForm" :model="editForm">

        <el-form-item label="分成" prop="saleState">
          <el-input v-model.number="editForm.percentage" type="number" style="width: 60%;"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="v_editPer = false;getList()">取消</el-button>
        <el-button type="primary" :loading="onload_editPer" @click="save()" >保存</el-button>
      </div>
    </el-dialog>

    <el-table
      :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      border
      fit
      highlight-current-row
      stripe
    >
      <el-table-column align="center" label="编码" min-width="8">
        <template slot-scope="scope">
          {{scope.row.positionCode}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名" min-width="8">
        <template slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="业务员姓名" min-width="8">
        <template slot-scope="scope">
          {{scope.row.perName}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="电话" min-width="8">
        <template slot-scope="scope">
          {{scope.row.phone}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="角色" min-width="8">
        <template slot-scope="scope">
          {{scope.row.positionName}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="分成" min-width="8">
        <template slot-scope="scope">
          {{scope.row.percentage}}%
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" min-width="8">
        <template slot-scope="scope">
          <el-button @click="editPercentage(scope.row)"size="mini" type="primary">编辑</el-button>
          <el-button @click="$router.push({name:'SecDisOrderList',query:{id:scope.row.adminId}})" size="mini" type="primary">查看订单</el-button>
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

    import {showSecDisList,getOneSecDisInfo,editPer} from "@/api/distribute"
    export default {
        name: 'disUserList',
        data() {
            return {
              editForm: {
                percentage:'',
                positionId:''
              },
              v_editPer:false,
              onload_editPer:false,
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
        },
        methods: {
          save(){
            this.onload_editPer = true
            editPer(this.editForm).then(res => {
              this.$message({
                type: 'success',
                message: '修改成功'
              })

              this.onload_editPer = false
              this.v_editPer = false
              this.getList()
            }).catch(error => {
              this.onload_editPer = false
            })
          },
          editPercentage(item) {
            this.v_editPer = true
            let positionId = item.positionId
            getOneSecDisInfo(positionId).then(res => {
              this.editForm.positionId = res.positionId
              this.editForm.percentage = res.percentage
            }).catch(error => {

            })
          },
            getList:function(){
              this.onLoading = true
              showSecDisList().then(res=>{
                this.list = res.yewuyuanList

                this.onLoading = false
              }).catch(error => {
                this.onLoading = false
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

        }
    }
</script>

<style scoped>

</style>
