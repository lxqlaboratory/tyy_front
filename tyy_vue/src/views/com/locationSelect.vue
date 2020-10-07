<template>
  <div>
    <el-dialog v-dialog-drag  :visible.sync="v_addLocation" title="自定义集合地点">
      <add-new-location @newLocation="addLocationNew"></add-new-location>
    </el-dialog>
    <div style="margin-left: 35px;">
      <label>集合地点</label>
      <el-select :value="id" @change="changeLocation" v-model="id">
        <el-option :key="item.id" :label="item.locationName" :value="item.id"
                   v-for="item in locationList"></el-option>
      </el-select>
      <el-button @click="v_addLocation=true" style="margin-left: 15px;" type="primary">新增集合地点</el-button>
      <label style="margin-left: 15px;">集合时间</label>
      <el-time-picker
        @change="changeTime"
        :picker-options="{}"
        format="HH:mm"
        placeholder="选择集合时间"
        v-model="time"
        value-format="HH:mm">
      </el-time-picker>
    </div>
  </div>
</template>

<script>
  import {getLocations} from "@/api/production"
  import addNewLocation from "@/views/production/addNewLocation"

  export default {
    name: "locationSelect",
    components: {addNewLocation},
    data() {
      return {
        id:this.locationid,
        time:this.locationtime,
        locationList:[],
        v_addLocation:false
      }
    },
    created() {
      getLocations().then(res=>{
        this.locationList=res
      }).catch(error=>{})

    },
    props:['locationid','locationtime'],

    methods:{
      changeLocation(){
        this.$emit('update:locationid',this.id)
        let locationItem=this.locationList.find(item=>(item.id===this.id))
        if(locationItem&&locationItem.locationTime){
          this.time=locationItem.locationTime
          this.changeTime()
        }
      },
      changeTime(){
        this.$emit('update:locationtime',this.time)
      },

      addLocationNew(location) {
        getLocations().then(res => {
          this.locationList = res
          this.id = location.id
          this.v_addLocation=false
          this.changeLocation()
        }).catch(error => {
        })
      }
    }
  }
</script>

<style scoped>

</style>
