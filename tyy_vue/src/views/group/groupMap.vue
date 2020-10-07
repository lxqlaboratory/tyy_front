<template>
  <div class="app-container">
    <div
      style="margin-top: 15px;width: 100%;display: flex;flex-direction: column;align-items: center;justify-content: center;">
    <baidu-map :scroll-wheel-zoom="true" :center="center" :zoom="12" class="bm-view" :map-click="false">
      <bm-info-window
        :position="{lng: showData.locationLongitude, lat: showData.locationLatitude}"
        :show="show"
        @close="infoWindowClose">
        <div>
          <span class="info-item-title">集合地点名称：</span>
          <span class="info-item-value" >{{showData.locationName}}</span>
        </div>
        <div style="margin-top: 15px">
          <span class="info-item-title">集合地点描述：</span>
          <span class="info-item-value" >{{showData.locationContent}}</span>
        </div>
        <div style="margin-top: 15px">
          <span class="info-item-title">游客人数：</span>
          <span class="info-item-value" >{{showData.touNum}}人</span>
        </div>
      </bm-info-window>
      <bml-marker-clusterer :average-center="true">
        <div v-for="(marker, i) of mapData" :key="i">
        <bm-marker :position="{lng: marker.locationLongitude, lat: marker.locationLatitude}" animation="BMAP_ANIMATION_BOUNCE" @click="infoWindowOpen(marker)">
        </bm-marker>
        </div>
      </bml-marker-clusterer>
    </baidu-map>
    </div>
    <div style="width:100vw;display: flex;flex-direction: row;justify-content: flex-start;align-items: center"></div>
  </div>
</template>

<script>
  import {addOrder, delOrder, getGroupMapData, sendMsg, setSeat} from "@/api/group"
  import { BmlMarkerClusterer } from 'vue-baidu-map'
  import BmMarker from 'vue-baidu-map/components/overlays/Marker'
  export default {
      name: "groupMap",
      components:{BmlMarkerClusterer,BmMarker},
      created(){
          this.getData();
      },
    data() {
      return {
          center: {lng: 116.068546, lat: 36.439256},
          mapData:[],
          show:false,
          showData:{
              locationLongitude:0,
              locationLatitude:0,
              locationName:'',
              locationContent:'',
              touNum:0,
          },

        }
    },
    activated() {
      this.getData()
    },
    created() {
      this.getData()
    },

    methods: {
        handler({BMap, map}) {
        },
        infoWindowOpen(maker){
            this.showData=maker;
            this.show=true;
            console.log(this.showData)
            console.log(this.show)

        },
        infoWindowClose(){
            this.show=false;
        },
      getData() {
        let id = this.$route.query.id;
          getGroupMapData(id).then(res => {
          console.log(res);
          this.mapData=res;
          let lng=0;
          let lat=0;
          this.mapData.forEach(data=>{
              lng+=data.locationLongitude;
              lat+=data.locationLatitude;
          });
          this.center.lat=lat/this.mapData.length;
          this.center.lng=lng/this.mapData.length;
          console.log(this.mapData)
        }).catch(error => {
          console.log(error)
        })

      },
        setPoint(info){
          console.log(info)
        }

    }
  }
</script>

<style scoped>
  .bm-view {
    margin-top: 15px;
    width: 80%;
    height: 800px;
  }
  .info-item-title {
    min-width: 500px;
    font-size: 15px;
    color: gray;
    font-weight: bold;
    margin-right: 15px;
  }

  .info-item-value {
    color: black;
    font-size: 15px;
  }

</style>
