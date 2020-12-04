<template>
  <div class="app-container">
    <div class="component-item" style="margin-bottom: 5px;">
      <el-button type="primary" icon="el-icon-circle-plus-outline"
                 @click="v_addCarType=true;newCarType={}">
        增加车型
      </el-button>

      <el-dialog v-dialog-drag  :visible.sync="v_addCarType" title="增加车型">
        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <label>车型名称</label>
              <el-input v-model="newCarType.typeName" maxlength="20" placeholder="请输入车型名称"
                        style="width:60%;margin-left: 15px;"></el-input>
            </div>
            <div style="margin-top: 25px;">
              <label>总座位数</label>
              <el-input v-model.number="newCarType.seatNum" type="number" placeholder="请输入总座位数"
                        style="width:60%;margin-left: 15px;"></el-input>
            </div>

            <div style="margin-top: 25px;">
              <label>左排行数</label>
              <el-input v-model.number="newCarType.rowLeft" type="number" placeholder="请输入左排列数"
                        style="width:60%;margin-left: 15px;"></el-input>
            </div>

            <div style="margin-top: 25px;">
              <label>右排行数</label>
              <el-input v-model.number="newCarType.rowRight" type="number" placeholder="请输入右排列数"
                        style="width:60%;margin-left: 15px;"></el-input>
            </div>
            <div style="margin-top: 25px;">
              <label>左排列数</label>
              <el-input v-model.number="newCarType.columnLeft" type="number" placeholder="请输入左排行数"
                        style="width:60%;margin-left: 15px;"></el-input>
            </div>
            <div style="margin-top: 25px;">
              <label>右排列数</label>
              <el-input v-model.number="newCarType.columnRight" type="number" placeholder="请输入右排行数"
                        style="width:60%;margin-left: 15px;"></el-input>
            </div>
            <div style="margin-top: 25px;">
              <label>车型描述</label>
              <el-input v-model="newCarType.typeDes" maxlength="100" placeholder="请简短介绍该车型"
                        style="width: 80%;margin-left: 15px;"></el-input>
            </div>
          </el-col>
          <el-col span="12">
            <el-card class="box-card" style="">

              <div slot="header"
                   style="display: flex;align-items: center;justify-content: space-between;">
                <span>车辆示意图</span>
              </div>

              <el-divider content-position="center">车头</el-divider>

              <el-row :gutter="10" justify="space-around" style="flex-grow: 1" type="flex">
                <el-col :key="col"
                        :span="5"
                        v-for="col in newCarType.columnLeft">
                  <div :id="row+''+col" :key="row"
                       class="seat-item"
                       style="display: flex;flex-direction: row;justify-content: center;"
                       v-for="row in newCarType.rowLeft">
                    <el-tag type="info" style="width: 90%;height: 90%;">#{{row}}-{{col}}</el-tag>
                  </div>
                </el-col>
                <el-col :span="1">
                  过道
                </el-col>
                <el-col :key="newCarType.columnLeft+col"
                        span="5"
                        v-for="col in newCarType.columnRight">
                  <div :id="row+''+(newCarType.columnLeft+col)"
                       class="seat-item"
                       style="display: flex;flex-direction: row;justify-content: center;align-items: center"
                       v-for="row in newCarType.rowRight">
                    <el-tag @drop.prevent  type="info" style="width: 90%;height: 90%">
                      #{{row}}-{{newCarType.rowRight+col}}
                    </el-tag>
                  </div>
                </el-col>
              </el-row>

              <el-divider content-position="center">车尾</el-divider>

            </el-card>
          </el-col>
        </el-row>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="saveNewServiceType">增加车型</el-button>
            </span>

      </el-dialog>



      <el-dialog v-dialog-drag  :visible.sync="v_editCarType" title="编辑车型">
        <el-row :gutter="20">
          <el-col :span="12">
        <div>
          <label>车型名称</label>
          <el-input v-model="editCarType.typeName" maxlength="20" placeholder="请输入车型名称"
                    style="width:60%;margin-left: 15px;"></el-input>
        </div>
        <div style="margin-top: 25px;">
          <label>总座位数</label>
          <el-input v-model.number="editCarType.seatNum" type="number" placeholder="请输入总座位数"
                    style="width:60%;margin-left: 15px;"></el-input>
        </div>

        <div style="margin-top: 25px;">
          <label>左排行数</label>
          <el-input v-model.number="editCarType.rowLeft" type="number" placeholder="请输入左排列数"
                    style="width:60%;margin-left: 15px;"></el-input>
        </div>

        <div style="margin-top: 25px;">
          <label>右排行数</label>
          <el-input v-model.number="editCarType.rowRight" type="number" placeholder="请输入右排列数"
                    style="width:60%;margin-left: 15px;"></el-input>
        </div>
        <div style="margin-top: 25px;">
          <label>左排列数</label>
          <el-input v-model.number="editCarType.columnLeft" type="number" placeholder="请输入左排行数"
                    style="width:60%;margin-left: 15px;"></el-input>
        </div>
        <div style="margin-top: 25px;">
          <label>右排列数</label>
          <el-input v-model.number="editCarType.columnRight" type="number" placeholder="请输入右排行数"
                    style="width:60%;margin-left: 15px;"></el-input>
        </div>
            <div style="margin-top: 25px;">
              <label>车型描述</label>
              <el-input v-model="editCarType.typeDes" maxlength="100" placeholder="请简短介绍该车型"
                        style="width: 80%;margin-left: 15px;"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
              <el-card class="box-card" style="">

                <div slot="header"
                     style="display: flex;align-items: center;justify-content: space-between;">
                  <span>车辆示意图</span>
                </div>

                <el-divider content-position="center">车头</el-divider>

                <el-row :gutter="10" justify="space-around" style="flex-grow: 1" type="flex">
                  <el-col :key="col"
                          :span="5"
                          v-for="col in editCarType.columnLeft">
                    <div :id="row+''+col" :key="row"
                         class="seat-item"
                         style="display: flex;flex-direction: row;justify-content: center;"
                         v-for="row in editCarType.rowLeft">
                      <el-tag type="info" style="width: 90%;height: 90%;">#{{row}}-{{col}}</el-tag>
                    </div>
                  </el-col>
                  <el-col :span="1">
                    过道
                  </el-col>
                  <el-col :key="editCarType.columnLeft+col"
                          span="5"
                          v-for="col in editCarType.columnRight">
                    <div :id="row+''+(editCarType.columnLeft+col)"
                         class="seat-item"
                         style="display: flex;flex-direction: row;justify-content: center;align-items: center"
                         v-for="row in editCarType.rowRight">
                      <el-tag @drop.prevent  type="info" style="width: 90%;height: 90%">
                        #{{row}}-{{editCarType.rowRight+col}}
                      </el-tag>
                    </div>
                  </el-col>
                </el-row>

                <el-divider content-position="center">车尾</el-divider>

              </el-card>
          </el-col>
        </el-row>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editType">编辑车型</el-button>
        </span>
      </el-dialog>




      <el-table
        :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        border
        fit
        highlight-current-row
        stripe
      >
        <el-table-column align="center" prop="typeName" label="分类名" min-width="45"></el-table-column>
        <el-table-column align="center" prop="rowLeft" label="左排行数" min-width="45"></el-table-column>
        <el-table-column align="center" prop="rowRight" label="右排行数" min-width="45"></el-table-column>
        <el-table-column align="center" prop="columnLeft" label="左排列数" min-width="45"></el-table-column>
        <el-table-column align="center" prop="columnRight" label="右排列数" min-width="45"></el-table-column>
        <el-table-column align="center" prop="typeDes" label="分类描述" min-width="95"></el-table-column>
        <el-table-column align="center" prop="typeCreateTime" label="创建时间" min-width="95"></el-table-column>

        <el-table-column min-width="150" align="center" label="操作">
          <template slot-scope="scope">

            <el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="v_editCarType=true;editCarType=list.find(item=>(item.id===scope.row.id))">
              编辑
            </el-button>
            <el-button type="danger" size="small" icon="el-icon-delete"
                       @click="deleteType(scope.row.id)">删除
            </el-button>
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
  </div>
</template>

<script>

    import {getCarTypeList, delCarType, addCarType, editCarType} from "@/api/production";

    export default {
        name: "proCarType",
        data() {
            return {

                newCarType: {
                    typeName: '',
                    typeDes: '',
                    seatNum: 0,
                    rowLeft: 0,
                    rowRight: 0,
                    columnLeft: 0,
                    columnRight: 0
                },


                editCarType: {
                    typeName: '',
                    typeDes: '',
                    seatNum: 0,
                    rowLeft: 0,
                    rowRight: 0,
                    columnLeft: 0,
                    columnRight: 0
                },


                v_addCarType: false,
                v_editCarType:false,

                list: [],
                currentPage: 1,
                pageSize: 10,
                isOnAdd: false
            }
        },
        created() {
            this.getList()
        },
        methods: {
            editType:function(){
              editCarType(this.editCarType).then(res=>{
                if(res.re===1){
                  this.$message({
                    type:'success',
                    message:'保存成功'
                  })
                }else{
                  this.$message({type: 'error', message: res.data})
                }
                  this.getList()
                  this.v_editCarType=false
              })  .catch(error=>{})
            },


            saveNewServiceType: function () {
                addCarType(this.newCarType).then(res => {
                  if(res.re===1){
                    this.$message({
                      type: 'success',
                      message: '增加车型成功'
                    })
                  }else{
                    this.$message({type: 'error', message: res.data})
                  }
                    this.getList()
                    this.v_addCarType = false
                }).catch(error => {
                })
            },
            getList: function () {
                getCarTypeList().then(res => {
                    console.log(res)
                    this.list = res.data
                }).catch(error => {

                })
            }
            ,

            deleteType: function (id) {
                this.$confirm('此操作不可撤销，是否继续？', '提示', {confirmButtonText: '确定', cancelButtonText: '取消'}).then(() => {
                    delCarType(id).then(res => {
                      if(res.re===1){
                        this.$message({
                          type: 'success',
                          message: '删除成功'
                        })
                      }else{
                        this.$message({type: 'error', message: res.data})
                      }
                        this.getList();
                    }).catch(error => {
                        this.getList();
                    })
                })
            }
        }
    }
</script>

<style scoped>
  .seat-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-radius: 5px;
    min-height: 6vh;
    margin: 4px;
  }
</style>
