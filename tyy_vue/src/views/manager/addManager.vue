<template>
  <div class="app-container">


    <el-button @click="rollback" type="text">返回管理员列表</el-button>
    <el-form :model="managerform" ref="mform" :rules="rules" label-width="100px" class="demo-ruleForm">

      <el-form-item label="管理员账号" prop="userAccount">
        <el-input v-model="managerform.userAccount"  maxlength="20" placeholder="请输入管理员账户登录名"></el-input>
      </el-form-item>

      <el-form-item label="管理员密码" prop="userPwd">
        <el-input v-model="managerform.userPwd"  maxlength="20" placeholder="请输入管理员账户密码"></el-input>
      </el-form-item>

      <el-form-item label="管理员类型" prop="roleId">
        <el-select v-model="managerform.roleId"  placeholder="请选择管理员类型">
          <el-option v-for="item in rolesList" :label="item.roleName" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="管理员姓名" prop="userName">
        <el-input v-model="managerform.userName"  maxlength="20" placeholder="必须输入管理员姓名"></el-input>
      </el-form-item>

      <el-form-item label="管理员电话" prop="userPhone">
        <el-input v-model="managerform.userPhone"  maxlength="20" placeholder="请输入管理员电话"></el-input>
      </el-form-item>

      <el-form-item label="管理员QQ" prop="userQq">
        <el-input v-model="managerform.userQq"  maxlength="20" placeholder="请输入管理员QQ号码"></el-input>
      </el-form-item>

      <el-form-item label="管理员微信" prop="userWechat">
        <el-input v-model="managerform.userWechat"  maxlength="20" placeholder="请输入管理员微信号码"></el-input>
      </el-form-item>


      <el-form-item label="管理员邮箱" prop="userEmail">
        <el-input v-model="managerform.userEmail"  maxlength="20" placeholder="请输入管理员邮箱账号"></el-input>
      </el-form-item>

      <el-form-item label="审核状态" prop="userState">
        <el-select v-model="managerform.userState" >
          <el-option :value="1" label="已审核"></el-option>
          <el-option :value="0" label="未审核"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属领导" prop="userCreateTime">
        <el-select  v-model="managerform.userSuper" placeholder="请选择">
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
        <el-input v-model="managerform.userDes"  type="textarea" maxlength="200" placeholder="可输入管理员备注"></el-input>
      </el-form-item>

      <el-form-item style="width: 80%;display: flex;flex-direction: row;justify-content: flex-start;margin: 15px;">
        <el-button  type="success" @click="submitForm('mform')" :loading="on_saving">新增管理员账号</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
    import {getRoles,addUser,getUsers} from "@/api/manager";
    export default {
        name: "addNewDis",
        data() {
            return {
                changePassword:false,
                on_saving:false,
                mpassword:'',
                managerform:{
                    roleId:'',
                    userAccount:'',
                    userPwd:'',
                    userName:'',
                    userState:1,
                    userPhone:'',
                    userQq:'',
                    userWechat:'',
                    userEmail:'',
                    userAuths:'',
                    userDes:'',
                    userCreateTime:'',
                    userSuper: '',
                } ,
                userList:[],
                rolesList:[],
                rules: {
                    userName: [
                        {required: true, message: '必须输入管理员名称', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {

            this.getRoles()
            this.getUsers()
        },
        methods: {
            getUsers: function () {
                getUsers().then(res => {
                    this.userList=res
                }).catch(error => {
                })
            },
            rollback:function(){
                this.$router.back();
            },

            getRoles() {
                getRoles().then(res => {
                    this.rolesList = res
                })
            },
            submitForm(formName) {
                this.on_saving=true
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        addUser(this.managerform).then(res => {
                            this.$message({type: 'success', message: '保存成功'})
                            this.$router.back()
                            this.on_saving=false
                        }).catch(error => {
                            this.on_saving=false
                        })
                    } else {
                        this.on_saving=false
                        return false;
                    }
                });
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped  >
  .el-input {
    width: 22vw;
    margin-right: 4vw;
  }
  /deep/.el-input.is-disabled .el-input__inner,.el-textarea.is-disabled .el-textarea__inner,.el-checkbox__input.is-disabled+.el-checkbox__label{
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
