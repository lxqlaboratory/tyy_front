<template>
  <div class="app-container">
    <div class="component-item" style="margin-bottom: 5px;">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="v_addDisType=true;disTypeAddForm={};">
        新增供应商类型
      </el-button>
    </div>

    <el-dialog v-dialog-drag  :visible.sync="v_addDisType" title="新增供应商类型" style="width: 100%;">
      <el-form
        :model="disTypeAddForm"
        label-position="left"
        label-width="100px"
        style="width: 80%; margin-left:50px;"
      >
        <el-form-item label="类型名" prop="name">
          <el-input v-model="disTypeAddForm.roleName" style="width: 50%;" maxlength="20" />
        </el-form-item>
        <el-form-item label="序号" prop="name">
          <el-input v-model="disTypeAddForm.roleOrder" style="width: 50%;" type="number" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="v_addDisType = false">取消</el-button>
        <el-button type="primary" :loading="isOnAdd" @click="addNewSupType">增加</el-button>
      </div>

    </el-dialog>

    <el-dialog v-dialog-drag  :visible.sync="v_editDisType" title="编辑供应商类型" style="width: 100%;">
      <el-form
        :model="disTypeEditForm"
        label-position="left"
        label-width="100px"
        style="width: 80%; margin-left:50px;"
      >
        <el-form-item label="类型名" prop="name">
          <el-input v-model="disTypeEditForm.roleName" style="width: 50%;" maxlength="20" />
        </el-form-item>
        <el-form-item label="序号" prop="name">
          <el-input v-model="disTypeEditForm.roleOrder" style="width: 50%;" type="number" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="v_editDisType = false">取消</el-button>
        <el-button type="primary" @click="ediSupType">保存</el-button>
      </div>

    </el-dialog>

    <el-table
      :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      border
      fit
      highlight-current-row
      stripe
    >
      <el-table-column align="center" label="排序序号" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.roleOrder }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型名" min-width="95">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" min-width="95">
        <template slot-scope="scope">
          {{ scope.row.roleCreateTime }}
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center" label="操作">
        <template slot-scope="scope">
          <el-button  type="primary" size="small" icon="el-icon-edit" @click="v_editDisType=true;disTypeEditForm=list.find(item=>(item.id===scope.row.id))">编辑</el-button>
          <el-button  type="danger" size="small" icon="el-icon-delete" @click="deleteSupType(scope.row.id)">删除
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
      layout="prev, pager, next"
    />
  </div>
</template>

<script>
import { getSupType, addSupType, delSupType, editSupType } from '@/api/support'
export default {
  name: 'SupType',
  data() {
    return {
      disTypeAddForm: {},
      disTypeEditForm: {},
      v_addDisType: false,
      v_editDisType: false,
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
    getList: function() {
      getSupType().then(res => {
        this.list = res.data
      }).catch(error => {

      })
    },
    addNewSupType: function() {
      this.isOnAdd = true
      addSupType(this.disTypeAddForm).then(res => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.isOnAdd = false
        this.v_addDisType = false
        this.getList()
      }).catch(error => {
        this.isOnAdd = false
      })
    },
    deleteSupType: function(id) {
      this.$confirm('此操作不可撤销，是否继续？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消' }).then(() => {
        delSupType(id).then(res => {
          this.getList()
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }).catch(error => {
          this.getList()
        })
      })
    },
    ediSupType: function() {
      editSupType(this.disTypeEditForm).then(res => {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.v_editDisType = false
      }).catch(error => {
        this.v_editDisType = false
      })
    }
  }
}
</script>

<style scoped>

</style>
