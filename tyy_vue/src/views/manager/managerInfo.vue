<template>
  <div class="app-container">
    <el-dialog
      v-dialog-drag
      :visible.sync="changePassword"
      title="修改密码"
      width="35vw"
    >
      <el-input :maxlength="20" placeholder="请输入新密码 (至少6位)" v-model="mpassword"></el-input>
      <span class="dialog-footer" slot="footer">
          <el-button @click="savePassword(managerform.id,mpassword)"
                     type="primary">保存</el-button>
          <el-button @click="mpassword='';changePassword=false"
                     type="warning">取消</el-button>
        </span>
    </el-dialog>

    <el-button @click="rollback" type="text">返回管理员列表</el-button>
    <el-form :model="managerform" :rules="rules" class="demo-ruleForm" label-width="100px" ref="mform">
      <el-form-item label="管理员账号" prop="userAccount">
        <el-input disabled maxlength="20" placeholder="请输入管理员账户登录名" v-model="managerform.userAccount"></el-input>
      </el-form-item>

      <el-form-item label="管理员类型" prop="roleId">
        <el-select :disabled="!on_edit" placeholder="请选择管理员类型" v-model="managerform.roleId">
          <el-option :key="item.id" :label="item.roleName" :value="item.id" v-for="item in rolesList"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="管理员姓名" prop="userName">
        <el-input :disabled="!on_edit" maxlength="20" placeholder="必须输入管理员姓名" v-model="managerform.userName"></el-input>
      </el-form-item>

      <el-form-item label="管理员电话" prop="userPhone">
        <el-input :disabled="!on_edit" maxlength="20" placeholder="请输入管理员电话" v-model="managerform.userPhone"></el-input>
      </el-form-item>

      <el-form-item label="管理员QQ" prop="userQq">
        <el-input :disabled="!on_edit" maxlength="20" placeholder="请输入管理员QQ号码" v-model="managerform.userQq"></el-input>
      </el-form-item>

      <el-form-item label="管理员微信" prop="userWechat">
        <el-input :disabled="!on_edit" maxlength="20" placeholder="请输入管理员微信号码"
                  v-model="managerform.userWechat"></el-input>
      </el-form-item>

      <el-form-item label="审核状态" prop="userState">
        <el-select :disabled="!on_edit" v-model="managerform.userState">
          <el-option :value="1" label="已审核"></el-option>
          <el-option :value="0" label="未审核"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="创建时间" prop="userCreateTime">
        <el-input disabled placeholder="管理员账户创建时间" v-model="managerform.userCreateTime"></el-input>
      </el-form-item>
      <el-form-item label="所属领导" prop="userCreateTime">
        <el-select :disabled="!on_edit" v-model="managerform.userSuper" placeholder="请选择">
          <el-option
            :key="0"
            label="最高领导"
            :value="0">
          </el-option>
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.userName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="管理员备注" prop="userDes" style="width: 60vw;">
        <el-input :disabled="!on_edit" maxlength="200" placeholder="可输入管理员备注" type="textarea"
                  v-model="managerform.userDes"></el-input>
      </el-form-item>

      <el-form-item style="width: 80%;display: flex;flex-direction: row;justify-content: flex-start;margin: 15px;">
        <el-button @click="on_edit=true" type="warning" v-if="!on_edit&&$_has('MANAGEUPDATE')">修改管理员信息</el-button>
        <el-button @click="changePassword=true" type="danger" v-if="!on_edit&&$_has('MANAGEUPDATE')">修改密码</el-button>
        <el-button @click="cancelSubmit" type="primary" v-if="on_edit">取消修改</el-button>
        <el-button @click="submitForm('mform')" type="success" v-if="on_edit&&$_has('MANAGEUPDATE')">保存修改</el-button>
      </el-form-item>




    </el-form>

  </div>
</template>

<script>
    import {changePwd, editUser, getRoles, getUserById,getUsers} from "@/api/manager";

    export default {
        name: "addNewDis",
        data() {
            return {


                changePassword: false,
                on_edit: false,
                mpassword: '',
                managerform: {
                    roleId: '',
                    userAccount: '',
                    userPwd: '',
                    userName: '',
                    userState: '',
                    userPhone: '',
                    userQq: '',
                    userWechat: '',
                    userEmail: '',
                    userAuths: '',
                    userDes: '',
                    userCreateTime: '',
                    userSuper:'',
                },
                userList:[],
                rolesList: [],
                rules: {
                    userName: [
                        {required: true, message: '必须输入管理员名称', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            this.getUserById()
            this.getRoles()
            this.getUsers()
        },
        methods: {
            savePassword: function (id, password) {
                changePwd(id, password).then(res => {
                    this.$message({
                        type: 'success',
                        message: '修改密码成功'
                    })
                    this.changePassword = false
                    this.mpassword = ''
                }).catch(error => {
                    this.changePassword = false
                    this.mpassword = ''
                })
            },
            getUsers: function () {
                getUsers().then(res => {
                    this.userList=res
                }).catch(error => {
                })
            },
            rollback: function () {
                this.$router.back();
            },
            cancelSubmit: function () {
                this.getUserById();
                this.on_edit = false;
            },
            getUserById: function () {
                getUserById(this.$route.query.id).then(res => {
                    let AuthList = JSON.parse(res.userAuths)
                    console.log(AuthList)
                    this.managerform = res
                }).catch(error => {

                })
            },
            getRoles() {
                getRoles().then(res => {
                    this.rolesList = res
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        editUser(this.managerform).then(res => {
                            this.$message({type: 'success', message: '修改成功'})
                            this.on_edit = false;
                        }).catch(error => {
                        })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .el-input {
    width: 22vw;
    margin-right: 4vw;
  }

  /deep/ .el-input.is-disabled .el-input__inner, .el-textarea.is-disabled .el-textarea__inner, .el-checkbox__input.is-disabled + .el-checkbox__label {
    color: #1f2d3d;
  }

  .el-select {
    width: 22vw;
    margin-right: 4vw;
  }

  .demo-ruleForm {
    padding: 0 5vw 0 5vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }

</style>
