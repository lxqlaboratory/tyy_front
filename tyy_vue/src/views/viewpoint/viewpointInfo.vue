<template>
  <div class="app-container">
    <el-button @click="rollback" type="text">返回景点列表</el-button>
    <el-divider></el-divider>
    <div class="o-title">
      景点信息
    </div>
    <div class="p-info">
      <el-image height="300" style="width: 40%;height: 300px;border-radius: 5px;" :src="viewpointForm.coverRes.url">
      </el-image>

      <div class="info-content">
        <div class="info-item">
          <span class="info-item-title">景点名称:</span>
          <span class="info-item-value">{{viewpointForm.name}}</span>
        </div>
        <div class="info-item">
          <span class="info-item-title">地区:</span>
          <span class="info-item-value">{{viewpointForm.province}}-{{viewpointForm.city}}-{{viewpointForm.area}}</span>
        </div>
        <div class="info-item">
          <span class="info-item-title">参考票价:</span>
          <span class="info-item-value">{{viewpointForm.tickey}}</span>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="o-title">
      景点图库
    </div>
    <div class="resource-content">
      <el-card :body-style="{ padding: '0px' }" v-for="item in viewpointForm.imgsList" class="resource-item">
        <el-image :src="item.url" class="image" style="width: 100%;height: 30vh"/>
        <div style="padding: 15px 10px 0 10px;">
          <a style="font-size: 13px;color: green">{{item.name}}</a>
          <div style="display: flex;align-items: center;width: 100%;padding: 0 1px;justify-content: space-between">
            <span style="font-size: 11px;color: gray">{{item.province}} {{item.city}}  {{item.area}}</span>
          </div>
        </div>
      </el-card>

    </div>

  </div>
</template>

<script>
    import {getCarTypeList,addCar,getCarInfo} from "@/api/tourist";
    import {getSupInfo} from "@/api/support"
    import {getViewpoint,addViewpoint,editViewpoint} from "@/api/viewpoint"
    import imageUpload from "@/components/uploadComponents/imageUpload"
    import Tinymce from '@/components/Tinymce'

    export default {
        name: "addNewCar",
        data() {
            return {
                onSave:false,
                viewpointForm:{
                    id:-1,
                    name:'',
                    tickey:'',
                    province:'',
                    city:'',
                    area:'',
                    carDes:'',
                    cover:0,
                    coverRes:'',
                    remark:'',
                    images:'',
                    imgsList:[]
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
            this.getViewpointInfo();
        },
        components:{imageUpload,Tinymce},
        methods: {
            delCoverImg(){
                this.viewpointForm.cover=0;
                this.viewpointForm.coverRes={};
            },
            addImage(imageForm) {
                this.viewpointForm.cover=imageForm.rId;
                this.viewpointForm.coverRes=imageForm;
            },
            addImages(imageForm) {
                this.viewpointForm.imgsList.push(imageForm);
            },
            delIndexImage(index) {
                this.viewpointForm.imgsList.splice(index, 1)
            },
            handleCheckTab(index){
                console.log(index);
                if (index == 0){
                    return true
                }
                if (this.viewpointForm.id === -1){
                    this.$message({
                        type: "warning",
                        message:'请先保存景点基本信息！'
                    });
                    return false
                }
                return true
            },
            commitInfo(){
              if (this.viewpointForm.id===-1){
                  this.onSave=true;
                  addViewpoint(this.viewpointForm).then(res=>{
                      this.viewpointForm.id=res.id;
                      this.$message({
                          type: 'success',
                          message:"添加景点成功！"
                      })
                  }).catch(error => {
                      this.onSave=false
                  })
              }else{
                  this.editViewpoint();
              }
            },
            editViewpoint(){
                console.log(this.viewpointForm)
                this.onSave=true;
                let images = []
                for (let item of this.viewpointForm.imgsList) {
                    images.push(item.rId)
                }
                this.viewpointForm.images=JSON.stringify(images);
                editViewpoint(this.viewpointForm).then(res=>{
                    this.$message({
                        type:'success',
                        message:"操作成功！"
                    })
                }).catch(error => {
                    this.onSave=false
                })
            },
            onSelected(data){
                this.viewpointForm.province=data.province.value;
                this.viewpointForm.city=data.city.value;
                this.viewpointForm.area=data.area.value;
            },
            rollback:function(){
                this.$router.back()
            },
            getViewpointInfo:function(){
              if (this.$route.query.id){
                  getViewpoint(this.$route.query.id).then(res=>{
                      console.log(res)
                      this.viewpointForm=res
                  })
              }
            },
            getSupList:function(){
                getSupInfo().then(res=>{
                    this.supList=res
                })

            },
            getCarTypeList: function() {
                getCarTypeList().then(res => {
                    this.carTypeList = res
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

<style lang="scss" scoped>
  .pro-info-content {
    margin: 15px;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 15px;
    line-height: 200%;
    color: black;
    font-size: 14px;
    text-indent: 1em;
    label{
      margin-right: 5px;
    }
  }

  .head {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .o-title {
    font-weight: bold;
    font-size: 19px;
    background-color: whitesmoke;
    border-radius: 3px;
    color: #333;
    border-left: 7px solid #62bbc3;
    margin: 10px 0 25px 0;
    padding: 8px 15px;
  }

  .p-info {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;

    .info-content {
      width: 58%;
      align-items: center;
      align-content: flex-start;
      justify-content: flex-start;

      .info-item {
        margin: 30px 0;
        width: 33%;
        margin-left: 100px;

        text-align: left;
        line-height: 150%;

        .info-item-title {
          font-size: 15px;
          color: gray;
          font-weight: bold;
          margin-right: 15px;
        }

        .info-item-value {
          color: black;
          font-size: 15px;
        }
      }
    }
  }
  .resource-content{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
  }
  .resource-item{
    width: 23%;
    margin: 10px;
  }

</style>
