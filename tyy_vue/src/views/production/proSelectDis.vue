<template>
  <div>
    <el-dialog v-dialog-drag  :visible.sync="v_selectDis" width="80vw">
      <div class="filter-container">

        <div class="filter-item">
          <label>分销商端口名</label>
          <el-select :value="query.disType" clearable placeholder="分销商端口" style="margin-right: 5px;"
                     v-model="query.disType">
            <el-option :key="item" :label="getdisTypeById(item).roleName"
                       :value="item"
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
            <span>{{getdisTypeById(scope.row.roleId).roleName}}</span>
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
            <el-button @click="selectDisbu(scope.row)" size="mini" type="primary">选择</el-button>
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
    </el-dialog>
    <div v-if="value">
      <el-button v-if="disselect" @click="v_selectDis=true" size="mini" style="margin: 5px;" type="warning">重选分销商</el-button>
      <div style="width: 100%;border: 1px solid lightgray;border-radius: 5px;padding: 3px;" >
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
      <el-button v-if="disselect" @click="v_selectDis=true" size="mini" style="margin: 5px;" type="primary">选择分销商</el-button>
    </div>

  </div>
</template>

<script>
  import {getDisList, getDisType} from "@/api/distribute"
  import {distinct} from "@/utils/tools"

  export default {
    name: "proSelectDis",
    data() {
      return {
        v_selectDis: false,


        disTypeList: [],
        query: {
          disType: '',
          disName: '',
          disContactor: '',
          disTel: '',
          disProvince: '',
          disCity: '',
          disPhone: '',
          currentPage: 1,
          pageSize: 3
        },
        disList: []
      }
    },
    props: {'value': {type: Number}, 'disselect': {type: Boolean, default: true}},
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
      selectDisbu: function (item) {
        this.$emit("input", item.id)
        this.v_selectDis = false
      },

      getdisTypeById: function (id) {
        let temp = this.disTypeList.find(item => {
          return item.id === id
        })
        if (temp)
          return temp
        else
          return {}
      }
    },

    computed: {
      selectedDis: function () {
        return this.disList.find(item => (item.id === this.value))
      },
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
          if (this.query.disPhone)
            result &= (item.disPhone === this.query.disPhone)

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

    padding-bottom: 3px;
  }

  .el-select {
    width: 150px !important;
  }

  .el-input {
    width: 150px !important;
  }

</style>
