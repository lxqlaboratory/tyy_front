<template>
  <div class="app-container">
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
  import {getUserInfo} from "@/api/user"

  export default {
    name: "managerRole",
    data(){
      return{
        roleList:{},
        checkedCities:[],
        cities:[]
      }

    },


    created() {
      getUserInfo().then(res => {
        res.userAuths=JSON.parse(res.userAuths)
        res.userAuths.forEach(item=>{
          this.$set(this.roleList,Object.keys(item)[0],item[Object.keys(item)[0]])
        })
      }).catch(error => {
        console.log(error)
      })
    }
  }
</script>

<style scoped>

</style>
