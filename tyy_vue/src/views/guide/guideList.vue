<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-item">
        <label>类型</label>
        <el-select v-model="allQuery.typeId" clearable placeholder="选择导游类型">
          <el-option
            v-for="item in guiTypelist"
            :key="item.id"
            :value="item.id"
            :label="item.guiderTypeName"
          ></el-option>
        </el-select>
      </div>
      <div class="filter-item">
        <label>状态</label>
        <el-select v-model="allQuery.guiderState" clearable placeholder="选择导游审核状态">
          <el-option
            key="1"
            label="已审核"
            value="1"
          ></el-option>
          <el-option
            key="0"
            label="未审核"
            value="0"
          ></el-option>
        </el-select>
      </div>
      <div style="display: flex;width: 80vw;justify-content: flex-start;align-items: center;flex-direction: row;">
        <div class="filter-item">
          <label>账户</label>
          <el-input v-model="preQuery.guiderAccount" placeholder="导游登录账户名"></el-input>
        </div>
        <div class="filter-item">
          <label>导游名</label>
          <el-input v-model="dimQuery.guiderName" placeholder="导游姓名"></el-input>
        </div>
        <div class="filter-item">
          <label>联系电话</label>
          <el-input v-model="preQuery.guiderPhone" placeholder="导游联系电话"></el-input>
        </div>
      </div>
    </div>

    <div class="component-item" style="margin-bottom: 5px;">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addNewGuide">
        新增导游
      </el-button>
    </div>

    <el-table :data="tableList"
              border
              fit
              highlight-current-row
              stripe>
      <el-table-column
        type="selection"
        min-width="25"
      ></el-table-column>
      <el-table-column align="center" label="个人照片">
        <template slot-scope="scope">
          <el-popover placement="right" v-if="scope.row.imageList&&scope.row.imageList.length>0">

            <div slot="reference">
              <el-image :src="scope.row.imageList[0]" style="width: 100px;height: 50px;"
                        v-if="scope.row.imageList.length===1"></el-image>
              <el-button type="text" v-else>共{{scope.row.imageList.length}}张</el-button>
            </div>

            <div style="max-width: 85vw;max-height: 75vh">
              <el-image :src="item" style="width: 350px;height: 240px;margin: 25px;"
                        v-for="item in scope.row.imageList"></el-image>
            </div>

          </el-popover>
          <span style="color:gray" v-else>未上传</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="导游类型" min-width="45">
        <template slot-scope="scope">
          <el-tag>
            {{ guiTypelist.find(item=>(item.id===scope.row.typeId)).guiderTypeName}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="导游账号" min-width="60">
        <template slot-scope="scope">
          {{ scope.row.guiderAccount }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="导游姓名" min-width="45">
        <template slot-scope="scope">
          {{scope.row.guiderName}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="电话" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.guiderPhone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.guiderRemark }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="审核状态" min-width="45">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.guiderState===1" type="success">已审核</el-tag>
          <el-tag v-if="scope.row.guiderState===0" type="warning">未审核</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="80">
        <template slot-scope="scope">
          <el-button type="text">短信</el-button>
          <el-button type="text" @click="guiderInfo(scope.row.id)">
            详情
          </el-button>
          <el-button type="text" style="color: red" @click="deleteGuide(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="currentPage"
      :total="list.length"
      :page-size="pageSize"
      style="margin-top: 15px;"
      background
      layout="prev, pager, next"/>
  </div>
</template>
<script>
    import {getGuiderType, getGuiderList, delGuider} from '@/api/guide'

    export default {
        name: 'guideList',
        data() {
            return {
                guiTypelist: [],
                list: [],
                currentPage: 1,
                pageSize: 10,
                dimQuery: {
                    guiderName: ''
                },
                preQuery: {
                    guiderPhone: '',
                    guiderAccount: ''
                },
                allQuery: {
                    typeId: '',
                    guiderState: ''
                }
            }
        },
        created() {
            this.getGuideTypeList();
            this.getList();
        },
        computed: {
            tableList() {
                let tlist = this.list.filter(item => {
                    let itemResult = true
                    for (let query in this.preQuery) {
                        if (this.preQuery[query]) {
                            itemResult &= (item[query].indexOf(this.preQuery[query]) == 0)
                        }
                    }
                    for (let query in this.dimQuery) {
                        if (this.dimQuery[query]) {
                            itemResult &= (item[query].indexOf(this.dimQuery[query]) >= 0)
                        }
                    }
                    for (let query in this.allQuery) {
                        if (this.allQuery[query]) {
                            itemResult &= (item[query] == this.allQuery[query])
                        }
                    }
                    return itemResult
                })
                return tlist.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize).reverse();
            }

        },
        methods: {
            guiderInfo:function(id){
                this.$router.push({name:'guiderInfo',query:{id}})

            },
            addNewGuide: function () {
                this.$router.push('addNewGuide')
            },
            deleteGuide: function (id) {
                this.$confirm('删除操作不可撤销，是否继续', '警告', {confirmButtonText: '确定', cancelButtonText: '取消'}).then(() => {
                    delGuider(id).then(res => {
                      if(res.re===1){
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                          }
                        )
                      }else{
                        this.$message({type: 'error', message: res.data})
                      }
                        this.getList();
                    }).catch(error => {
                        this.getList();
                    })
                })
            },
            getList: function () {
                getGuiderList().then(res => {
                    this.list = res.data
                }).catch(error => {
                })
            },
            getGuideTypeList: function () {
                getGuiderType().then(res => {
                    this.guiTypelist = res.data
                }).catch(error => {

                })
            }
        }
    }
</script>

<style scoped>
  el-input {
    color: black;
    background-color: #fff;
  }

</style>
