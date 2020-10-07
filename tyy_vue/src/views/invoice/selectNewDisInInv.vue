<template>
  <div v-if="selectedDis">

    <div style="padding-left:35px;width: 70%;min-height: 10vh;">
      <el-row :gutter="20">
        <el-col :span="8">
          <label>分销商名:</label>
          <span>{{selectedDis.unitName}}</span>
        </el-col>
        <!--<el-col :span="8">-->
          <!--<label>分销商地址:</label>-->
          <!--<span>{{selectedDis.disProvince}}-{{selectedDis.disCity}}</span>-->
        <!--</el-col>-->
        <!--<el-col :span="8">-->
          <!--<label>分销商电话:</label>-->
          <!--<span>{{selectedDis.disTel}}</span>-->
        <!--</el-col>-->

      </el-row>
      <!--<el-row :gutter="20">-->
        <!--<el-col :span="8">-->
          <!--<label>联系人:</label>-->
          <!--<span>{{selectedDis.disContactor}}</span>-->
        <!--</el-col>-->
        <!--<el-col :span="8">-->
          <!--<label>联系人手机号:</label>-->
          <!--<span>{{selectedDis.disPhone}}</span>-->
        <!--</el-col>-->
        <!--<el-col :span="8">-->
          <!--<label>联系人微信:</label>-->
          <!--<span>{{selectedDis.disWechat}}</span>-->
        <!--</el-col>-->
      <!--</el-row>-->

    </div>

  </div>
  <div v-else>
    <div>
      <div class="filter-container">
        <div class="filter-item">
          <label>分销商省份</label>
          <el-input style="margin-left: 15px; width: 300px" v-model="orderForm.province" maxlength="50"
                    placeholder="检索省份"></el-input>
        </div>
        <div class="filter-item">
          <label>分销商城市</label>
          <el-input style="margin-left: 15px; width: 300px" v-model="orderForm.city" maxlength="50"
                    placeholder="检索城市"></el-input>
        </div>
        <div class="filter-item">
          <label>分销商区(县)</label>
          <el-input style="margin-left: 15px; width: 300px" v-model="orderForm.region" maxlength="50"
                    placeholder="检索区域"></el-input>
        </div>
        <div class="filter-item">
          <label>分销商名称</label>
          <el-input style="margin-left: 15px; width: 300px" v-model="orderForm.unitName" maxlength="50"
                    placeholder="检索名称"></el-input>
        </div>
        <div class="filter-item">
          <el-button icon="el-icon-search" type="primary" style="width: 180px" @click="getList">查询</el-button>
        </div>
      </div>
      <el-divider></el-divider>
      <el-table
        :data="list.slice((query.currentPage - 1) * query.pageSize, query.currentPage * query.pageSize)"
        stripe
        highlight-current-row>

        <el-table-column align="center" label="所属省" min-width="45">
          <template slot-scope="scope">
            {{ scope.row.province }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="所属市" min-width="45">
          <template slot-scope="scope">
            {{ scope.row.city }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="所属区" min-width="45">
          <template slot-scope="scope">
            {{ scope.row.region }}
          </template>
        </el-table-column>
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

  </div>

</template>

<script>
  import {getDisList, getDisType,showDisList} from "@/api/distribute"
  import {distinct} from "@/utils/tools"

  export default {
    name: "selectDisByInv",
    data() {
      return {
        disList:[],
        orderForm: {
          unitId:'',
          unitName:'',
          province:'',
          city:'',
          region:'',

        },
        selectedDis: '',
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
      }
    },
    props: ['disInfo'],
      watch:{
          disInfo:{
              immediate:true,
              handler:function (val) {
                  if (val.id){
                      this.selectedDis=val;
                  }
              }
          }
      },
    created() {
      this.getList()

          // getDisType().then(res => {
          //     this.disTypeList = res
          // }).catch(e => {
          // })
          // getDisList().then(res => {
          //     this.disList = res
          // }).catch(error => {
          // })
    },
    methods: {

      getList() {
        this.onLoading = true
        showDisList(this.orderForm).then(res => {
          this.disList = res.WechatUnitList
          this.total = res.pagination.total
          this.onLoading = false
        }).catch(error => {
          this.onLoading = false
        })
      },
      selectDisBu: function (item) {
          this.selectedDis = item
          this.$emit("selectingDis", item)
        //this.$emit('selectDisId', id)
      },
      getdisTypeById: function (id) {
        let resulta = this.disTypeList.find(item => {
          return item.id === id
        })
          return resulta
      }
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
