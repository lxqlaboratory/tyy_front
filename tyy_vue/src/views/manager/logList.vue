<template>

  <div class="app-container">
    <div class="filter-container">
      <div class="filter-item">
        <div class="filter-item">
          <label>用户身份</label>
          <el-select v-model="queryForm.userRole" placeholder="请选择操作身份" clearable>
            <el-option v-for="item in rolesList" :key="item.id" :value="item.id" :label="item.roleName"></el-option>
          </el-select>
        </div>
        <div class="filter-item">
          <label>操作人</label>
          <el-input v-model="queryForm.userName"></el-input>
        </div>

        <div class="filter-item">
          <label>关键词</label>
          <el-input v-model="queryForm.keyWords"></el-input>
        </div>

        <div class="filter-item">
          <label>日期</label>
          <el-date-picker
            v-model="queryForm.sTime"
            type="daterange"
            align="right"
            unlink-panels
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>

      </div>
      <el-button icon="el-icon-search" type="primary" @click="searchLog">查询</el-button>
    </div>

    <div>
      <el-table :data="tableList"
                border
                fit
                highlight-current-row
                stripe
                v-loading="onLoading"
      >
        <el-table-column align="center" label="事件类型" min-width="45">
          <template slot-scope="scope">
            {{ scope.row.logName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="用户身份" min-width="60">
          <template slot-scope="scope">
            {{scope.row.roleName}}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作人" min-width="45">
          <template slot-scope="scope">
            {{ scope.row.userName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作内容" min-width="45">
          <template slot-scope="scope">
            <el-popover>
              <div style="padding: 15px;line-height: 150%;font-size: 14px;color: black;max-width: 50vw;">
                {{scope.row.logContent}}
              </div>
              <el-button slot="reference">点击查看</el-button>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作时间" min-width="45">
          <template slot-scope="scope">
            {{ scope.row.logCreateTime }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="IP地址" min-width="45">
          <template slot-scope="scope">
            {{ scope.row.logIpdress }}
          </template>
        </el-table-column>


        <el-table-column align="center" label="操作" min-width="45">
          <template slot-scope="scope">
            <el-button type="text" style="color: red" @click="delLog(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :current-page.sync="queryForm.pageNum"
        :total="total"
        :page-size="queryForm.pageSize"
        @current-change="getList"
        style="margin-top: 15px;"
        background
        layout="prev, pager, next"/>


      <div style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center;width: 100%;">
        <label style="margin-right: 15px;">当前总计{{total}}条符合要求的记录</label>
        <el-select placeholder="请选择批量删除的时段" style="margin-right: 15px;" v-model="plt">
          <el-option label="一个月之前" :value="1"></el-option>
          <el-option label="六个月之前" :value="6"></el-option>
          <el-option label="一年之前" :value="12"></el-option>
        </el-select>
        <el-button type="danger" @click="pldel">批量删除</el-button>

      </div>

    </div>
  </div>
</template>

<script>
    import {getLogList,delLog,pldelLog} from "@/api/log";
    import {getRoles} from "@/api/manager";

    export default {
        name: "logList",
        data() {
            return {
                plt:1,
                total:0,
                onLoading:false,
                tableList:[],
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                queryForm: {
                    logName: '',
                    userRole: '',
                    userName: '',
                    keyWords: '',
                    sTime: [],
                    pageNum:1,
                    pageSorted:'esc',
                    pageSize:10
                },
                rolesList: []
            }
        },
        created() {
            this.getRolesList()
            this.getList()
        },

        methods: {
            pldel(){
                this.$confirm('删除操作不可撤销，是否继续','警告',{confirmButtonText:'确定',cancelButtonText:'取消'}).then(()=>{
                    pldelLog(this.plt).then(res => {
                        this.$message({
                                type: 'success',
                                message: '删除成功'
                            }
                        )
                        this.getList();
                    }).catch(error => {
                        this.getList();
                    })
                })
            },
            delLog(id){
                this.$confirm('删除操作不可撤销，是否继续','警告',{confirmButtonText:'确定',cancelButtonText:'取消'}).then(()=>{
                    delLog(id).then(res => {
                        this.$message({
                                type: 'success',
                                message: '删除成功'
                            }
                        )
                        this.getList();
                    }).catch(error => {
                        this.getList();
                    })
                })
            },
            searchLog(){
                this.queryForm.pageNum=1
                this.getList()
            },
            getList(){
                this.onLoading=true
                getLogList(this.queryForm).then(res=>{
                    this.tableList=res.list
                    this.total=res.pagination.total
                    this.onLoading=false
                }).catch(error=>{
                    this.onLoading=false
                })
            },
            getRolesList() {
                getRoles().then(res => {
                    console.log(res)
                    this.rolesList = res
                }).catch(error => {
                })
            }
        }
    }
</script>

<style scoped>

</style>
