<template>
  <div v-if="selectedCode">

    <div style="padding-left:35px;width: 70%;min-height: 10vh;">

      <el-row :gutter="20">
        <el-col :span="8">
          <label>联系人:</label>
          <span>{{selectedDis.unitName}}</span>
        </el-col>

      </el-row>

    </div>

  </div>
  <div v-else>
    <!--<div class="filter-container">-->


      <!--<div class="filter-item">-->
        <!--<label>分销商名</label>-->
        <!--<el-input placeholder="检索分销商名称" v-model="query.disName"></el-input>-->
      <!--</div>-->

    <!--</div>-->

    <el-table
      :data="list.slice((query.currentPage - 1) * query.pageSize, query.currentPage * query.pageSize)"
      stripe
    >

      <el-table-column align="center" label="分销商" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.unitName }}
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作" min-width="45" prop="disTel">
        <template slot-scope="scope">
          <el-button @click="selectDisBu(scope.row)" size="mini" type="primary">选择</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page.sync="query.currentPage"
      :page-size="query.pageSize"
      :total="list.length"
      background
      layout="prev, pager, next"
      style="margin-top: 15px;"/>
  </div>

</template>

<script>
  import {showDisList,getDisCode} from "@/api/distribute"
  import {distinct} from "@/utils/tools"

  export default {
    name: "selectCode",
    data() {
      return {
        positionCodeA:'',
        positionCodeB:'',
        positionCodeC:'',
        selectedCode: '',
        disTypeList: [],
        query: {
          disType: '',
          disName: '',
          disContactor: '',
          disTel: '',
          disProvince: '',
          disCity: '',
          disPhone:'',
          currentPage: 1,
          pageSize: 3
        },
        disList: []
      }
    },
    props: ['plandisTypeList'],
    created() {
      showDisList().then(res => {
        this.disList = res.WechatUnitList
        this.positionCodeA = res.positionCodeA
      }).catch(error => {
      })
    },
    methods: {

      selectDisBu: function (item) {
        this.selectedDis = item
        getDisCode(item.unitId).then(res =>{
          this.positionCodeB = res.positionCodeB
          this.positionCodeC = res.positionCodeC

          this.$emit("selectingDis", item)
        }).then(() => {
            this.selectedDis = item
            this.$emit("selectingDis", item)
          })



        //this.$emit('selectDisId', id)
      },
    },

    computed: {
      list: function () {
        return this.disList.filter(item => {
          let result = true
          if (this.query.disProvince)
            result &= (item.disProvince === this.query.disProvince)
          if (this.query.disCity)
            result &= (item.disCity === this.query.disCity)
          if (this.query.disName)
            result &= (item.disName.indexOf(this.query.disName) !== -1)
          if (this.query.disContactor)
            result &= (item.disContactor.indexOf(this.query.disContactor) !== -1)
          if (this.query.disTel)
            result &= (item.disTel.indexOf(this.query.disTel) === 0)
          if (this.query.disType)
            result &= (item.roleId === this.query.disType)
          if(this.query.disPhone)
            result&=(item.disPhone===this.query.disPhone)

          return result
        })
      },


      cityList: function () {
        let preDisList = this.disList
        if (this.query.disProvince) {
          preDisList = this.disList.filter(item => (item.disProvince === this.query.disProvince))
        }
        return distinct(preDisList, 'disCity')
      },
      provinceList: function () {
        return distinct(this.disList, 'disProvince')
      },
      typeList: function () {
        return distinct(this.disList, 'roleId')
      }
    }

  }
</script>

<style scoped>

  .el-row {
    margin: 15px 25px 25px 25px;
    padding-bottom: 3px;
  }
  .el-select {
    width: 150px !important;
  }

  .el-input {
    width: 150px !important;
  }

</style>
