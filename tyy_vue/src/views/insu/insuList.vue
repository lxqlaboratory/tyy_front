<template>
  <div class="app-container">
    <el-dialog v-dialog-drag  title="添加保险产品" :visible.sync="v_addInsu">
      <add-insu @refresh="init()" ></add-insu>
    </el-dialog>

    <el-dialog v-dialog-drag  title="添加保险产品" :visible.sync="v_editInsu" >
      <add-insu @refresh="init()"  :editid="editId"></add-insu>
    </el-dialog>

    <div class="filter-container">
      <el-button @click="v_addInsu=true" style="margin-right: 15px;" icon="el-icon-circle-plus-outline" type="primary">
        添加保险产品
      </el-button>
      <div class="filter-item">
        <el-input v-model="queryForm.insuNum" placeholder="检索产品编号"></el-input>
      </div>
      <div class="filter-item">
        <el-input v-model="queryForm.insuName" placeholder="检索产品名称"></el-input>
      </div>
      <div class="filter-item">
        <el-input v-model="queryForm.insuCom" placeholder="检索所属保险公司"></el-input>
      </div>
    </div>

    <el-table
      :data="list"
      border
      highlight-current-row
      stripe
      style="margin-top: 15px;"
      v-loading="onLoading"
    >

      <el-table-column align="center" label="产品编号">
        <template slot-scope="scope">
          {{ scope.row.num }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="保险产品名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="保险产品单价">
        <template slot-scope="scope">
          <span style="color: orangered">{{ scope.row.price }}</span>元/人

        </template>
      </el-table-column>

      <el-table-column align="center" label="保险天数">
        <template slot-scope="scope">
          <span>{{scope.row.dateMin+' 至 '+scope.row.dateMax+' '}}</span>天
        </template>
      </el-table-column>

      <el-table-column align="center" label="保险公司">
        <template slot-scope="scope">
          <span>{{scope.row.company}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="editInsu(scope.row.id)" type="primary">编辑</el-button>
          <el-button @click="deleteInsu(scope.row.id)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>



    <el-pagination
      :current-page.sync="currentPage"
      :total="oriList.length"
      :page-size="pageSize"
      style="margin-top: 15px;"
      background
      layout="prev, pager, next"/>

  </div>
</template>

<script>
    import {getInsuList,delInsu} from "@/api/insurance";
    import addInsu from "@/views/insu/addInsu";


    export default {
        name: "insuList",
        data(){
            return {
                editId:0,
                v_editInsu:false,
                v_addInsu:false,
                onLoading:false,
                oriList:[],
                currentPage: 1,
                pageSize: 10,
                queryForm:{
                    insuNum:'',
                    insuName:'',
                    insuCom:''
                }
            }
        },
        components:{
            addInsu
        },
        mounted() {
            this.init()
        },
        computed:{
            list(){
                return this.oriList.filter(item=>{
                    let result=true
                    if(this.queryForm.insuName){
                        result&= (item.name.indexOf(this.queryForm.insuName) === 0)
                    }

                    if(this.queryForm.insuNum){
                        result&= (item.num.indexOf(this.queryForm.insuNum) === 0)
                    }
                    if(this.queryForm.insuCom){
                        result&= (item.company.indexOf(this.queryForm.insuCom) === 0)
                    }
                    return result
                }).slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
            }

        },

        methods:{
            editInsu(id){
                this.v_editInsu=true
                this.editId=id
            },

            init(){
                getInsuList().then(res=>{

                    this.oriList=res

                }).catch(error=>{})
                console.log('getInsuList')
            },

            addInsu(){
                this.$router.push()


            },
            deleteInsu: function (id) {
                this.$confirm('删除操作不可撤销，是否继续', '警告', {confirmButtonText: '确定', cancelButtonText: '取消'}).then(() => {
                    delInsu(id).then(res => {
                        this.$message({
                                type: 'success',
                                message: '删除成功'
                            }
                        )
                        this.init();
                    }).catch(error => {
                        this.init();
                    })
                })
            },
        }
    }
</script>

<style scoped>

</style>
