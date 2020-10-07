<template>
  <div class="app-container">
    <el-button @click="rollback" type="text">返回景点列表</el-button>
    <el-tabs type="border-card">
      <!--<el-tab-pane label="基本信息">-->
        <div style="margin: 15px;">
          <el-form>
            <el-form-item label="景点名称: ">
              <el-input style="width: 100%;"  v-model="viewpointForm.name"></el-input>
            </el-form-item>
            <el-form-item label="参考票价:">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <el-input rows="10" type="textarea" style="width: 70%;" v-model="viewpointForm.tickey"></el-input>
            </el-form-item>
            <el-form-item  required label="地区:">
              <v-distpicker :province="viewpointForm.province" :city="viewpointForm.city" :area="viewpointForm.area" @selected="onSelected"/>
            </el-form-item>
            <!--<el-form-item label="集合点经纬度">-->
              <!--<code>{{viewpointForm.longitude}},{{viewpointForm.latitude}}</code>-->
            <!--</el-form-item>-->


            <div>
              <label>请点击下方地图选择集合地点，使用滚轮缩放，放大至最大时经纬度最精确!</label>
              <baidu-map @click="setPoint" scroll-wheel-zoom :center="center" :zoom="20" @ready="handler" class="bm-view">
                <bm-marker :position="locationPoint" animation="BMAP_ANIMATION_BOUNCE">
                  <bm-label :content="viewpointForm.name"/>
                </bm-marker>
                <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
                <bm-local-search :panel="false" :keyword="viewpointForm.name" :auto-viewport="true" :location="location"></bm-local-search>
              </baidu-map>
            </div>
            <div style="width:100vw;display: flex;flex-direction: row;justify-content: flex-start;align-items: center"/>
           <br/>
            <el-form-item label="封面图像选择">
              <div>
                <image-upload @addImage="addImage"></image-upload>
                <div
                  style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center;flex-wrap: wrap">
                  <el-card :body-style="{ padding: '0px' }" :key="viewpointForm.cover"
                           style="width: 15vw;height: 30vh;margin:15px 15px 15px 0"
                           v-if="viewpointForm.cover!==0">
                    <el-image :src="viewpointForm.coverRes.url" fit="contain" style="width: 15vw;height: 20vh"/>
                    <div style="padding: 8px;">
                      <span style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;max-width: 6vw">{{viewpointForm.coverRes.fname}}</span>
                      <div class="bottom clearfix">
                        <time class="time" v-if="viewpointForm.coverRes">{{ viewpointForm.coverRes.fSize/1000 }} KB</time>
                        <el-button @click="delCoverImg" class="button" style="color: orangered;float: right" type="text">删除
                        </el-button>
                      </div>
                    </div>
                  </el-card>
                </div>
              </div>

            </el-form-item>
            <el-form-item label="景点图库">
              <div>
                <image-upload @addImage="addImages"></image-upload>
                <div
                  style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center;flex-wrap: wrap">
                  <el-card
                    :body-style="{ padding: '0px' }"
                    :key="item.rId"
                    style="width: 15vw;height: 30vh;margin:15px 15px 15px 0"
                    v-for="(item,index) in viewpointForm.imgsList">
                    <el-image :src="item.url" fit="contain" style="width: 15vw;height: 20vh"/>
                    <div style="padding: 8px;">
                      <span style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;max-width: 6vw">{{item.fname}}</span>
                      <div class="bottom clearfix">
                        <time class="time">{{ item.fSize/1000 }} KB</time>
                        <el-button @click="delIndexImage(index)" class="button" style="color: orangered;float: right" type="text">删除
                        </el-button>
                      </div>
                    </div>
                  </el-card>
                </div>
              </div>
            </el-form-item>

            <tinymce :height="300" v-model="viewpointForm.remark"/>
          </el-form>
        </div>
    </el-tabs>
    <el-button type="primary" style="float: left;margin-top: 15px;margin-left: 15px" @click="editViewpoint">保存</el-button>

  </div>
</template>

<script>
    import {getCarTypeList,addCar,getCarInfo} from "@/api/tourist";
    import {getSupInfo} from "@/api/support"
    import {getViewpoint,addViewpoint,editViewpoint} from "@/api/viewpoint"
    import imageUpload from "@/views/com/MitilImageUpload"
    import Tinymce from '@/components/Tinymce'

    export default {
        name: "addNewCar",
        data() {
            return {
                onSave:false,
                center: {lng: 0, lat: 0},
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
                    imgsList:[],
                    longitude:'',
                    latitude:'',
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
        computed: {
            locationPoint() {
                return {
                    lng: this.viewpointForm.longitude,
                    lat: this.viewpointForm.latitude
                }
            }
        },
        created() {
            this.getViewpointInfo();
        },
        components:{imageUpload,Tinymce},
        methods: {
            handler({BMap, map}) {
                this.center.lng = 117.0481537978
                this.center.lat = 36.6842121925
            },
            setPoint(e) {
                this.viewpointForm.longitude = e.point.lng
                this.viewpointForm.latitude = e.point.lat
                let geocoder= new BMap.Geocoder();  //创建地址解析器的实例
                geocoder.getLocation(e.point,rs=>{
                  console.log(rs.addressComponents)
                  this.viewpointForm.province = rs.addressComponents.province;
                  this.viewpointForm.city = rs.addressComponents.city;
                  this.viewpointForm.area = rs.addressComponents.district;
                });
            },
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
            editViewpoint(){
                console.log(this.viewpointForm)
                this.onSave=true;
                let images = []
                for (let item of this.viewpointForm.imgsList) {
                    images.push(item.rId)
                }
                this.viewpointForm.images=JSON.stringify(images);
                editViewpoint(this.viewpointForm).then(res=>{
                    this.viewpointForm.id=res.id;
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
  .bm-view {
    margin-top: 15px;
    width: 80%;
    height: 500px;
  }
</style>
