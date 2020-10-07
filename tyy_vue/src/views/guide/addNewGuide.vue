<template>
  <div class="app-container">


    <el-button @click="rollback" type="text">返回导游列表</el-button>
    <el-form :model="guiderform" ref="mform" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="导游账号" prop="guiderAccount">
        <el-input v-model="guiderform.guiderAccount"  maxlength="20" placeholder="必须输入导游账户登录名"></el-input>
      </el-form-item>
      <el-form-item label="导游类型" prop="typeId" >
        <el-select v-model="guiderform.typeId" placeholder="必须选择导游类型">
          <el-option v-for="item in guiderTypeList"  :label="item.guiderTypeName" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="初始密码" prop="guiderPwd">
        <el-input v-model="guiderform.guiderPwd"  maxlength="20" placeholder="必须输入导游账户登录密码"></el-input>
      </el-form-item>

      <el-form-item label="导游姓名" prop="guiderName">
        <el-input v-model="guiderform.guiderName"   maxlength="20" placeholder="必须输入导游姓名"></el-input>
      </el-form-item>

      <el-form-item label="导游电话" prop="guiderPhone">
        <el-input v-model="guiderform.guiderPhone"   maxlength="20" placeholder="请输入导游联系电话"></el-input>
      </el-form-item>

      <el-form-item label="导游QQ" prop="guiderQq">
        <el-input v-model="guiderform.guiderQq"   maxlength="20" placeholder="请输入导游QQ号码"></el-input>
      </el-form-item>

      <el-form-item label="导游微信" prop="guiderWechat">
        <el-input v-model="guiderform.guiderWechat"   maxlength="20" placeholder="请输入导游微信账号"></el-input>
      </el-form-item>

      <el-form-item label="审核状态" prop="guiderState" >
        <el-select v-model="guiderform.guiderState" placeholder="请选择导游审核状态" >
          <el-option :value="1" label="已审核"></el-option>
          <el-option :value="0" label="未审核"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="导游备注" prop="guiderRemark" style="width: 60vw;">
        <el-input v-model="guiderform.guiderRemark"   type="textarea" maxlength="200" placeholder="可输入导游备注"></el-input>
      </el-form-item>
      <el-form-item label="个人照片" prop="images" style="width: 80%;">
        <upload-images v-model="guiderform.images" :value="guiderform.images" :res-type="5"></upload-images>
      </el-form-item>
      <el-form-item style="width: 80%;display: flex;flex-direction: row;justify-content: flex-start;margin: 15px;">
        <el-button  type="success" :loading="onSave" @click="submitForm('mform')">新增导游</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
    import {getGuiderType,addGuider} from "@/api/guide";
    import UploadImages from "@/views/com/uploadImages"
    export default {
        name: "addNewDis",
        data() {
            return {
                onSave:false,
                guiderform:{
                    id:'',
                    typeId:'',
                    guiderAccount:'',
                    guiderPwd:'',
                    guiderName:'',
                    guiderTel:'',
                    guiderPhone:'',
                    guiderQq:'',
                    guiderWechat:'',
                    guiderState:1,
                    guiderCreateTime:'',
                    guiderRemark:'',
                    images:'[]',
                } ,
                guiderTypeList:[],
                rules: {
                    guiderAccount: [{required: true, message: '必须输入账户名', trigger: 'blur'},
                        {min: 2, max: 12, message: '账户名长度在2-12个字符', trigger: 'blur'}
                    ],
                    guiderName: [
                        {required: true, message: '必须输入导游名称', trigger: 'blur'}
                    ],
                    guiderPwd: [
                        {required: true, message: '必须输入初始密码', trigger: 'blur'}
                    ],
                    typeId: [
                        {required: true, message: '必须选择导游类型', trigger: 'blur'}
                    ],
                    guiderPhone: [
                        {required: true, message: '必须输入导游手机号码', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            this.getGuiderTypeList()
        },
        components:{UploadImages},
        methods: {
            rollback:function(){
                this.$router.back();
            },
            getGuiderTypeList() {
                getGuiderType().then(res => {
                    this.guiderTypeList = res
                })
            },
            submitForm(formName) {
                this.onSave=true;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        addGuider(this.guiderform).then(res => {
                            this.$message({type: 'success', message: '新增导游成功'})
                            this.onSave=false
                            this.$router.back()
                        }).catch(error => {
                            this.onSave=false
                        })
                    } else {
                        this.onSave=false
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

  /deep/.el-input.is- .el-input__inner,.el-textarea.is- .el-textarea__inner,.el-checkbox__input.is-+.el-checkbox__label{
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
