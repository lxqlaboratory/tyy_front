<template>
  <span>
    <el-button @click="openMap" type="primary">点击展开地图</el-button>
    <el-dialog append-to-body @close="saveAndCloseDialog"  :close-on-click-modal="false" :visible.sync="v_open" title="选择地图位置确定经纬度" v-dialog-drag>
      <div
        style="width: 100%;display: flex;flex-direction: column;align-items: center;justify-content: center;">
        <label>请点击下方地图选择集合地点，使用滚轮缩放，放大至最大时经纬度最精确!</label>
          <el-input v-model="keyword" placeholder="请输入地址"/>
        <baidu-map :center="center" :zoom="25" @click="setPoint" @ready="handler" class="bm-view" scroll-wheel-zoom>
          <bm-marker :position="locationPoint" animation="BMAP_ANIMATION_BOUNCE">
            <bm-label :content="keyword"/>
          </bm-marker>
           <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>
        </baidu-map>

      </div>
      <!--<div style="margin-top: 15px;margin-left: 80px; "><label>经度</label>-->
        <!--<el-input type.number="number" v-model="locationLongitude"></el-input>-->
      <!--</div>-->
      <!--<div style="margin-top: 15px;margin-left: 80px;  "><label>纬度</label>-->
        <!--<el-input type.number="number" v-model="locationLatitude"></el-input>-->
      <!--</div>-->
      <!--<el-button style="margin-left:80px;margin-top:15px;" @click="autoCenter" type="primary">自动定位地图中心点</el-button>-->
      <div slot="footer">
        <el-button @click="saveAndCloseDialog" type="success">确定</el-button>
      </div>
    </el-dialog>

  </span>
</template>

<script>
  export default {
    name: "selectMap",
    props: ['longitude', 'latitude','address','province','city'],
    data() {
      return {
        center: {lng: 36.6756920000, lat: 117.0600860000},
        v_open: false,
        locationLongitude: '',
        locationLatitude: '',
        locationAddress:'',
        province:"",
        city:'',
        keyword:''
      }
    },

    methods: {
      openMap() {
        if (this.latitude && this.longitude) {
          this.center.lng = this.longitude
          this.center.lat = this.latitude
          this.locationLatitude = this.latitude
          this.locationLongitude = this.longitude
        }
        this.v_open = true
      },
      autoCenter(){
        this.center.lat=this.locationLatitude
        this.center.lng=this.locationLongitude
      },
      saveAndCloseDialog() {
        this.$emit('update:longitude',this.locationLongitude)
        this.$emit('update:latitude',this.locationLatitude)
        this.$emit('update:address',this.locationAddress)
        this.$emit('update:province',this.province)
        this.$emit('update:city',this.city)
        this.v_open=false
      },
      setPoint(e) {
        this.locationLongitude = e.point.lng
        this.locationLatitude = e.point.lat
        let geocoder= new BMap.Geocoder();
        geocoder.getLocation(e.point,rs=>{
          this.locationAddress = rs.address;
          this.province = rs.addressComponents.province
          this.city = rs.addressComponents.city
        });
      },
      handler({BMap, map}) {
        this.center.lng = 117.0481537978
        this.center.lat = 36.6842121925
      },
    },
    computed: {
      locationPoint() {
        return {
          lng: this.locationLongitude,
          lat: this.locationLatitude
        }
      }
    },
  }
</script>

<style scoped>

  .bm-view {
    margin-top: 15px;
    width: 80%;
    height: 500px;
  }

</style>
