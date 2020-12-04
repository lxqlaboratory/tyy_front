<template>
  <div class="app-container">
    <el-button @click="rollback" type="text">返回车辆列表</el-button>
    <el-form :model="carForm" ref="mform" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="车辆名字" prop="carName">
        <el-input v-model="carForm.carName"  maxlength="20" placeholder="请输入车辆姓名"></el-input>
      </el-form-item>
      <el-form-item label="司机姓名" prop="carDriver">
        <el-input v-model="carForm.carDriver"   maxlength="20" placeholder="请输入司机姓名"></el-input>
      </el-form-item>

      <el-form-item label="司机手机号" prop="driverPhone">
        <el-input v-model="carForm.driverPhone"   maxlength="20" placeholder="请输入司机联系电话"></el-input>
      </el-form-item>
      <el-form-item label="车辆类型" prop="carType">
        <el-select v-model="carForm.carType" placeholder="必须选择车辆类型">
          <el-option v-for="item in carTypeList"  :label="item.typeName" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属供应商" prop="supId">
        <el-select v-model="carForm.supId" placeholder="必须选择车辆所属供应商">
          <el-option v-for="item in supList"  :label="item.supName" :key="item.id" :value="item.id"></el-option>
        </el-select>      </el-form-item>
      <el-form-item label="车牌号" prop="carNumber">
        <el-input v-model="carForm.carNumber"   maxlength="20" placeholder="请输入车牌号码"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="carDes" style="width: 60vw;">
        <el-input v-model="carForm.carDes"   type="textarea" maxlength="200" placeholder="可输入车辆备注"></el-input>
      </el-form-item>
      <el-form-item style="width: 80%;display: flex;flex-direction: row;justify-content: flex-start;margin: 15px;">
        <el-button  type="success" :loading="onSave" @click="submitForm('mform')" aria-label=title>{{title}}车辆</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
    import {getCarTypeList,addCar,getCarInfo} from "@/api/tourist";
    import {getSupInfo} from "@/api/support"

    export default {
        name: "addNewCar",
        data() {
            return {
                onSave:false,
                carForm:{
                    id:'-1',
                    carName:'',
                    carType:'',
                    supId:'',
                    carNumber:'',
                    carDriver:'',
                    carDes:'',
                    driverPhone:'',
                    carState:1,
                } ,
                carTypeList:[],
                supList:[],
                rules: {
                    carNumber: [{required: true, message: '必须输入车牌号', trigger: 'blur'},
                        {min: 4, max: 8, message: '车牌号长度为4-8', trigger: 'blur'}
                    ],
                    supId: [
                        {required: true, message: '必须选择所属供应商', trigger: 'blur'}
                    ],
                    carType: [
                        {required: true, message: '必须选择车辆类型', trigger: 'blur'}
                    ],
                    carDriver: [
                        {required: true, message: '必须输入司机姓名', trigger: 'blur'}
                    ],
                    driverPhone: [
                        {required: true, min: 8, max: 12,message: '必须输入司机手机号码', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            this.getCarTypeList()
            this.getCarInfo()
            this.getSupList()
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
            getCarInfo:function(){
              if (this.$route.query.id){
                  getCarInfo(this.$route.query.id).then(res=>{
                      console.log(res)
                      this.carForm=res.data
                  })
              }
            },
            getSupList:function(){
                getSupInfo().then(res=>{
                    this.supList=res.data
                })

            },
            getCarTypeList: function() {
                getCarTypeList().then(res => {
                    this.carTypeList = res.data
                })
            },
            submitForm(formName) {
                this.onSave=true;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        addCar(this.carForm).then(res => {
                            this.$message({type: 'success', message: "编辑车辆信息成功！"})
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
