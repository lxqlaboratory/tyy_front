<template>
  <div class="app-container">
<!--    <el-dialog v-dialog-drag :visible.sync="v_payChannel" title="增加资金渠道">-->
<!--      <div class="form_info">-->
<!--        <div class="form_item">-->
<!--          <label>父渠道</label>-->

<!--        </div>-->
<!--        <div class="form_item">-->
<!--          <label>渠道名称</label>-->
<!--          <el-input :readonly="!on_edit" v-model="payChannelForm.name"></el-input>-->
<!--        </div>-->
<!--      </div>-->
<!--      <span class="dialog-footer" slot="footer">-->
<!--        <el-button @click="addPayChannel" type="primary">保存</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->
    <el-dialog v-dialog-drag  :visible.sync="v_payChannel" title="新增资金渠道" style="width: 100%;">
      <el-form
        :model="payChannelForm"
        label-position="left"
        label-width="100px"
        style="width: 80%; margin-left:50px;">
        <el-form-item label="编号" prop="id" v-if="payChannelForm.id!=null">
          <el-input v-model="payChannelForm.id" disabled/>
        </el-form-item>
        <el-form-item label="渠道" prop="desc">
          <el-select :disabled="!on_edit" :value="payChannelForm.parent" clearable placeholder="请选择父渠道"
                     v-model="payChannelForm.parent">
            <el-option
              :key="item.id"
              :label="item.name"
              :value="item.id"
              v-for="item in parentList"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道名称" prop="name">
          <el-input v-model="payChannelForm.name"  maxlength="30"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="v_payChannel = false">取消</el-button>
        <el-button type="primary" @click="addPayChannel" :loading="isOnAdd">确定</el-button>
      </div>
    </el-dialog>
    <div class="filter-container">
      <div class="filter-item">
        <label>渠道名称：</label>
        <el-input v-model="queryForm.name"></el-input>
      </div>
      <div class="filter-item">
        <label>父渠道</label>
        <el-select clearable placeholder="请选择父渠道" v-model="queryForm.parent">
          <el-option
            :key="item.id"
            :label="item.name"
            :value="item.id"
            v-for="item in parentList"

          ></el-option>
        </el-select>
      </div>
        <el-button @click="getList" type="primary">
          查询
        </el-button>
      <el-button @click="queryForm={};"  type="warning">重置</el-button>
    </div>

    <div class="component-item" style="margin-bottom: 5px;">
      <el-button @click="v_payChannel=true;payChannelForm={}" icon="el-icon-circle-plus-outline" type="primary">
        新增渠道
      </el-button>
    </div>
    <el-table :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)" border fit highlight-current-row stripe>
      <el-table-column align="center" label="渠道名称" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="父类名称" min-width="60">
        <template slot-scope="scope">
          {{ scope.row.parentName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="80">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="v_payChannel=true;payChannelForm=list.find(item=>(item.id===scope.row.id))">编辑</el-button>
          <el-button @click="delChannel(scope.row.id)" type="danger" size="small" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :total="list.length"
      background
      layout="prev, pager, next"
      style="margin-top: 15px;"/>
  </div>
</template>
<script>
    import {getPayChannels,addPayChannel,getParents,delChannel} from '@/api/money'
    export default {
        name: 'DisList',
        data() {
            return {
                on_edit: true,
                payChannelForm: {},
                v_payChannel: false,
                parentList: [],
                list: [],
                isOnAdd:false,
                currentPage: 1,
                pageSize: 10,
                queryForm: {
                    name: '',
                    parent:'',
                },

            }
        },
        created() {
            this.getList();
            this.getParentList();
        },
        methods: {
            addPayChannel: function () {
                this.isOnAdd=true;
                addPayChannel(this.payChannelForm).then(res => {
                    this.$message({
                        type: 'success',
                        message: '保存成功'
                    })
                    this.getList();
                    this.getParentList();
                    this.isOnAdd=false;
                    this.v_payChannel = false
                }).catch(error => {
                    this.isOnAdd=false;
                })
            },
            delChannel: function (id) {
                this.$confirm('删除操作不可撤销，是否继续', '警告', {confirmButtonText: '确定', cancelButtonText: '取消'}).then(() => {
                    delChannel(id).then(res => {
                        this.$message({
                                type: 'success',
                                message: '删除成功'
                            }
                        )
                        this.getList();
                        this.getParentList();
                    }).catch(error => {
                        this.getList();
                    })
                })


            },
            getList: function () {
                getPayChannels(this.queryForm).then(res => {
                    console.log(res)
                    this.list = res
                }).catch(error => {
                })
            },
            getParentList: function () {
                getParents().then(res => {
                    this.parentList = res
                }).catch(error => {
                })
            },

        }
    }
</script>

<style scoped>
  el-input {
    color: black;
    background-color: #fff;
  }

</style>
