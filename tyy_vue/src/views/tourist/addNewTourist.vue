<template>
  <div class="app-container">
    <el-button @click="rollback" type="text">返回游客列表</el-button>
    <el-form :model="touristFrom" ref="mform" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="游客姓名" prop="name">
        <el-input v-model="touristFrom.name"  maxlength="20" placeholder="必须输入游客姓名"></el-input>
      </el-form-item>
      <el-form-item label="游客性别" prop="sex" >
        <el-select v-model="touristFrom.sex" placeholder="请选择性别" >
          <el-option :value="1" label="男"></el-option>
          <el-option :value="0" label="女"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="游客手机号" prop="phone">
        <el-input v-model="touristFrom.phone"   maxlength="20" placeholder="请输入游客联系电话"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="touristFrom.age"  type="number"  maxlength="3" placeholder="请输入游客年龄"></el-input>
      </el-form-item>
      <el-form-item label="证件号码" prop="cerNum" >
        <el-col :span="11" >
        <el-select v-model="touristFrom.cerType" placeholder="必须选择证件类型">
          <el-option v-for="item in cerTypeList"  :label="item.description" :key="item.code" :value="item.code"></el-option>
        </el-select>
        </el-col>
        <el-col :span="11">
        <el-input v-model="touristFrom.cerNum"   maxlength="20" placeholder="请输入游客证件号码"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="家庭地址" prop="address">
        <el-input v-model="touristFrom.address"   maxlength="20" placeholder="请输入游客地址号码"></el-input>
      </el-form-item>

      <el-form-item label="游客微信" prop="wchat">
        <el-input v-model="touristFrom.wchat" maxlength="20" placeholder="请输入游客微信账号"></el-input>
      </el-form-item>
      <el-form-item label="游客邮箱" prop="email">
        <el-input v-model="touristFrom.email" maxlength="20" placeholder="请输入游客微信账号"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark" style="width: 60vw;">
        <el-input v-model="touristFrom.remark"   type="textarea" maxlength="200" placeholder="可输入备注"></el-input>
      </el-form-item>
      <el-form-item style="width: 80%;display: flex;flex-direction: row;justify-content: flex-start;margin: 15px;">
        <el-button  type="success" :loading="onSave" @click="submitForm('mform')" aria-label=title>{{title}}游客</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
    import {getCerTypes, addTourist, getTouInfo} from "@/api/tourist";

    export default {
        name: "addNewTou",
        data() {
            return {
                onSave:false,
                touristFrom:{
                    id:'-1',
                    name:'',
                    phone:'',
                    sex:'',
                    cerType:'',
                    cerNum:'',
                    age:'',
                    wchat:'',
                    state:1,
                    address:'',
                    email:'',
                    remark:''
                } ,
                cerTypeList:[],
                cerTypeForm:{
                    type:"CERTYPE"
                },
                rules: {
                    name: [{required: true, message: '必须输入游客姓名', trigger: 'blur'},
                        {min: 2, max: 12, message: '游客长度在1-12个字符', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '必须输入游客名称', trigger: 'blur'}
                    ],
                    cerType: [
                        {required: true, message: '必须选择证件类型', trigger: 'blur'}
                    ],
                    sex: [
                        {required: true, message: '必须选择游客性别', trigger: 'blur'}
                    ],
                    cerNum: [
                        {required: true, message: '必须输入证件号码', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, min: 8, max: 12,message: '必须输入游客手机号码', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            this.getCerTypeList()
            this.getTouInfo()
        },
        computed:{
            title: function () {
                if (this.$route.query.id){
                    return "修改"
                }else{
                    return "增加"
                }
            }
        },
        methods: {
            rollback:function(){
                this.$router.back()
            },
            getTouInfo:function(){
              if (this.$route.query.id){
                  getTouInfo(this.$route.query.id).then(res=>{
                      console.log(res)
                      this.touristFrom=res
                  })
              }
            },
            getCerTypeList: function() {
                getCerTypes(this.cerTypeForm).then(res => {
                    this.cerTypeList = res
                })
            },
            submitForm(formName) {
                this.onSave=true;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        addTourist(this.touristFrom).then(res => {
                            this.$message({type: 'success', message: "编辑游客信息成功！"})
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
