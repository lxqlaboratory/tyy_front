<template>
  <div class="app-container">
    <div class="component-item" style="margin-bottom: 5px;">
      <el-button v-if="$_has('MANAGEUPDATE')" type="primary" icon="el-icon-circle-plus-outline" @click="addNewManager">
        新增管理员
      </el-button>
    </div>

    <el-table :data="tableList"
              border
              fit
              highlight-current-row
              stripe>

      <el-table-column align="center" label="管理员账号" min-width="60">
        <template slot-scope="scope">
          {{ scope.row.userAccount }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="管理员类型" min-width="45">
        <template slot-scope="scope">
          <el-tag>
            {{ roleslist.find(item=>(item.id===scope.row.roleId)).roleName}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="管理员姓名" min-width="45">
        <template slot-scope="scope">
          {{scope.row.userName}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="当前状态" min-width="45">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.userState===1" type="success">已审核</el-tag>
          <el-tag v-if="scope.row.userState===0" type="warning">未审核</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="联系电话" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.userPhone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="说明" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.userDes }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="80">
        <template slot-scope="scope">
          <el-button  type="text" @click="managerInfo(scope.row.id)">
            详情
          </el-button>
          <el-button v-if="$_has('MANAGEUPDATE')" type="text" style="color: red" @click="deleteUser(scope.row.id)">删除</el-button>
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

    import {getRoles,delUser,getUsers} from "@/api/manager";


    export default {
        name: 'guideList',
        data() {
            return {
                roleslist: [],
                list: [],
                currentPage: 1,
                pageSize: 10,
            }
        },
        created() {
            this.getUserRolesList();
            this.getList();
        },
        computed: {
            tableList() {
                return this.list.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize).reverse();
            }
        },
        methods: {
            managerInfo:function(id){

                this.$router.push({name:'managerInfo',query:{id}})
            },
            addNewManager: function () {
                this.$router.push('addManager')
            },
            deleteUser: function (id) {
                this.$confirm('删除操作不可撤销，是否继续', '警告', {confirmButtonText: '确定', cancelButtonText: '取消'}).then(() => {
                    delUser(id).then(res => {
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
                getUsers().then(res => {
                    this.list = res
                }).catch(error => {
                })
            },
            getUserRolesList: function () {
                getRoles().then(res => {
                    this.roleslist = res
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
