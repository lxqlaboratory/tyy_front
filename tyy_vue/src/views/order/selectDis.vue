<template>
  <div v-if="selectedDis">

    <div style="padding-left:35px;width: 70%;min-height: 10vh;">
      <el-row :gutter="20">
        <el-col :span="8">
          <label>分销商名:</label>
          <span>{{selectedDis.disName}}</span>
        </el-col>
        <el-col :span="8">
          <label>分销商地址:</label>
          <span>{{selectedDis.disProvince}}-{{selectedDis.disCity}}</span>
        </el-col>
        <el-col :span="8">
          <label>分销商电话:</label>
          <span>{{selectedDis.disTel}}</span>
        </el-col>


      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <label>联系人:</label>
          <span>{{selectedDis.disContactor}}</span>
        </el-col>
        <el-col :span="8">
          <label>联系人手机号:</label>
          <span>{{selectedDis.disPhone}}</span>
        </el-col>
        <el-col :span="8">
          <label>联系人微信:</label>
          <span>{{selectedDis.disWechat}}</span>
        </el-col>
      </el-row>

    </div>

  </div>
  <div v-else>
    <div class="filter-container">

      <div class="filter-item">
        <label>分销商端口名</label>
        <el-select :value="query.disType" clearable placeholder="分销商端口" style="margin-right: 5px;"
                   v-model="query.disType">
          <el-option :key="item" :label="getdisTypeById(item).roleName"
                     :style="{color:getdisTypeById(item).isInplanDisList?'black':'red'}" :value="item"
                     v-for="item in typeList"></el-option>
        </el-select>
      </div>
      <div class="filter-item">
        <label>分销商地域</label>
        <el-select :value="query.disProvince" clearable placeholder="分销商省份" style="margin-right: 5px;"
                   v-model="query.disProvince">
          <el-option :key="item" :label="item" :value="item" v-for="item in provinceList"></el-option>
        </el-select>

        <el-select :value="query.disCity" clearable placeholder="分销商城市" v-model="query.disCity">
          <el-option :key="item" :label="item" :value="item" v-for="item in cityList"></el-option>
        </el-select>

      </div>



      <div class="filter-item">
        <label>分销商名</label>
        <el-input placeholder="检索分销商名称" v-model="query.disName"></el-input>
      </div>

      <div class="filter-item">
        <label>分销商电话</label>
        <el-input placeholder="检索分销商电话" v-model="query.disTel"></el-input>
      </div>

      <div class="filter-item">
        <label>分销商联系人</label>
        <el-input placeholder="检索分销商联系人" v-model="query.disContactor"></el-input>
      </div>

      <div class="filter-item">
        <label>联系人手机</label>
        <el-input placeholder="检索联系人手机号" v-model="query.disPhone"></el-input>
      </div>
    </div>

    <el-table
      :data="list.slice((query.currentPage - 1) * query.pageSize, query.currentPage * query.pageSize)"
      stripe
    >

      <el-table-column align="center" label="地域" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.disProvince }}-{{scope.row.disCity}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="端口名" min-width="45">
        <template slot-scope="scope">
          <span
            v-if="getdisTypeById(scope.row.roleId).isInplanDisList">{{getdisTypeById(scope.row.roleId).roleName}}</span>
          <span style="color: red" v-else>{{getdisTypeById(scope.row.roleId).roleName}}</span>

        </template>
      </el-table-column>

      <el-table-column align="center" label="分销商名" min-width="45" prop="disName">
      </el-table-column>
      <el-table-column align="center" label="联系人名" min-width="45" prop="disContactor">
      </el-table-column>
      <el-table-column align="center" label="分销商电话" min-width="45" prop="disTel">
      </el-table-column>

      <el-table-column align="center" label="联系人手机号" min-width="45" prop="disPhone">
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

    <div style="color: gray;padding: 15px;font-size: 13px;">不在预设端口列表中的分销商 端口名将标为红色，若选择该分销商，需要选择其他端口策略作为结算策略</div>
  </div>

</template>

<script>
  import {getDisList, getDisType} from "@/api/distribute"
  import {distinct} from "@/utils/tools"

  export default {
    name: "selectDis",
    data() {
      return {
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
        disList: []
      }
    },
    props: ['plandisTypeList'],
    created() {
      getDisType().then(res => {
        this.disTypeList = res
      }).catch(e => {
      })
      getDisList().then(res => {
        this.disList = res
      }).catch(error => {
      })
    },
    methods: {

      selectDisBu: function (item) {
        if (this.getdisTypeById(item.roleId).isInplanDisList) {
          this.selectedDis = item
          this.$emit("selectingDis", item)
        } else {
          this.$confirm('此分销商不在预设分销端口内，将使用默认结算策略，是否仍要选择', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.selectedDis = item
            this.$emit("selectingDis", item)
          })
        }


        //this.$emit('selectDisId', id)
      },
      getdisTypeById: function (id) {
        let resulta = this.disTypeList.find(item => {
          return item.id === id
        })

        resulta.isInplanDisList = Boolean(this.plandisTypeList.find(item => (item.disTypeId === id)))
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
