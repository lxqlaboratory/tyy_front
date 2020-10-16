<template>
  <div class="app-container">
    <el-form :model="locationform" ref="mform" label-width="100px" class="demo-ruleForm">
      <el-form-item label="集合点名称" prop="locationName" :rules="{required:true,trigger:'blur',message:'请输入集合地点名称'}">
        <el-input v-model="locationform.locationName" maxlength="30" placeholder="请简短输入集合地点名称"/>
        <!--<el-autocomplete-->
          <!--v-model="locationform.locationName"-->
          <!--:fetch-suggestions="querySearch"-->
          <!--placeholder="请输入详细地址"-->
          <!--style="width: 100%"-->
          <!--:trigger-on-focus="false"-->
          <!--@select="handleSelect"-->
        <!--/>-->
      </el-form-item>

      <el-form-item label="集合点描述" prop="locationContent" :rules="{required:true,trigger:'blur',message:'请输入集合地点详细描述'}">
        <el-input v-model="locationform.locationContent" placeholder="请详细描述集合地点位置"/>
      </el-form-item>


      <el-form-item label="集合时间" prop="locationTime" :rules="{required:true,trigger:'blur',message:'请选择集合时间'}">
        <el-time-picker
          :picker-options="{}"
          format="HH:mm"
          placeholder="选择集合时间"
          v-model="locationform.locationTime"
          value-format="HH:mm">
        </el-time-picker>
      </el-form-item>


      <!--<el-form-item label="集合点经纬度">-->
        <!--<code>{{locationform.locationLongitude}},{{locationform.locationLatitude}}</code>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="地区" >-->
        <!--<el-input style="width: 200px" v-model="location"/>-->
      <!--</el-form-item>-->


      <div style="margin-top: 20px;">
        <label >请点击下方地图选择集合地点，使用滚轮缩放，放大至最大时经纬度最精确!</label>
        <baidu-map @click="setPoint" scroll-wheel-zoom :center="center" :zoom="20" @ready="handlerBMap" class="bm-view">
          <bm-marker dragging="true" :position="locationPoint" animation="BMAP_ANIMATION_BOUNCE" >
            <bm-label :content="locationform.locationName" :labelStyle="{color: 'red', fontSize : '20px'}" :offset="{width: -35, height: 30}"/>
          </bm-marker>
          <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
          <bm-local-search panel="false" :keyword="locationform.locationName" :auto-viewport="true" :location="location"></bm-local-search>
        </baidu-map>
      </div>

      <div style="width:100vw;display: flex;flex-direction: row;justify-content: flex-start;align-items: center"/>
      <el-form-item style="width: 80%;display: flex;flex-direction: row;justify-content: flex-start;margin-left: 1000px;">
        <el-button type="primary" @click="submitForm('mform')">保存集合地点</el-button>
        <el-button @click="resetForm('mform')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
    import {addLocation, getPointInfo, editLocation} from "@/api/production";

    export default {
        name: "addNewLocation",
        data() {
            return {
              mapLocation: {
                address: undefined,
                coordinate: undefined
              },
              location: '',
              keyword: '',
                center: {lng: 0, lat: 0},
                locationform: {
                    locationTime:'',
                    locationName: '',
                    locationContent: '',
                    locationLongitude: '',
                    locationLatitude: '',
                    provinceName:'',
                    cityName:'',
                    regionName:''
                }
            }
        },
        created() {
            this.getPointInfo()
        },
        computed: {
            locationPoint() {
                return {
                    lng: this.locationform.locationLongitude,
                    lat: this.locationform.locationLatitude
                }
            }
        },
      methods: {
        handlerBMap({ BMap, map }) {
          this.center.lng = 117.0481537978
          this.center.lat = 36.6842121925
          this.BMap = BMap
          this.map = map
          if (this.mapLocation.coordinate && this.mapLocation.coordinate.lng) {
            this.center.lng = this.mapLocation.coordinate.lng
            this.center.lat = this.mapLocation.coordinate.lat
            this.mapZoom = 15
            map.addOverlay(new this.BMap.Marker(this.mapLocation.coordinate))
          } else {
            this.center.lng = 117.0481537978
            this.center.lat = 36.6842121925
            this.mapZoom = 10
          }
        },
        getPointInfo() {
                console.log(this.$route.query.id)
                if (this.$route.query.id) {
                    getPointInfo(this.$route.query.id).then(res => {
                        this.locationform = res.data
                    }).catch(error => {
                    })
                }
            },
            setPoint(e) {
                this.locationform.locationLongitude = e.point.lng
                this.locationform.locationLatitude = e.point.lat

              // var myMarker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat));
              // var point = new BMap.Point(e.point.lng, e.point.lat);
              //   console.log("6666"+point.name)
              let geocoder= new BMap.Geocoder();  //创建地址解析器的实例
              geocoder.getLocation(e.point,rs=>{
                this.locationform.locationContent = rs.address;
                this.locationform.provinceName = rs.addressComponents.province
                this.locationform.cityName = rs.addressComponents.city
                this.locationform.regionName = rs.addressComponents.district
              });
            },
            handler({BMap, map}) {
                this.center.lng = 117.0481537978
                this.center.lat = 36.6842121925
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if ((!this.locationform.locationLongitude) || (!this.locationform.locationLatitude)) {
                        this.$message({
                            type: 'error',
                            message: '请选择地图定位点'
                        })
                        return false;
                    }
                    if (valid) {
                        if (this.$route.query.id) {
                            editLocation(this.locationform).then(res => {
                              if(res.re===1){
                                this.$message({type: 'success', message: '保存成功'})
                                this.$router.push({path:'proPoint'})
                              }else{
                                this.$message({type: 'error', message: res.data})
                              }


                            }).catch(error => {
                            })
                        } else {
                            addLocation(this.locationform).then(res => {
                              if(res.re===1){
                                this.$message({type: 'success', message: '保存成功'})
                                this.$emit("newLocation",res)
                                this.$router.push({path:'proPoint'})
                              }else{
                                this.$message({type: 'error', message: res.data})
                              }
                            }).catch(error => {
                            })
                        }
                    } else {
                        return false
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
            }
        }
    }
</script>

<style scoped>

  .bm-view {
    margin-top: 15px;
    width: 80%;
    height: 500px;
  }
  .app-container{
    padding-bottom: 620px;
  }
</style>
