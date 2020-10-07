<template>
  <div>
    <el-form :model="form" label-width="150px" ref="form">
      <el-form-item :rules="[$rules.required]" label="保险产品编号" prop="num">
        <el-input placeholder="请输入保险产品编号" v-model.trim="form.num"></el-input>
      </el-form-item>
      <el-form-item :rules="[$rules.required]" label="保险名称" prop="name">
        <el-input placeholder="请输入保险产品名称" v-model.trim="form.name"></el-input>
      </el-form-item>

      <el-form-item :rules="[$rules.required]" label="保险公司" prop="company">
        <el-input placeholder="请输入保险公司名称" v-model.trim="form.company"></el-input>
      </el-form-item>


      <el-form-item :rules="[$rules.required,$rules.number]" label="最短天数" prop="dateMin">
        <el-input placeholder="请输入保险最短天数" v-model.number="form.dateMin"></el-input>
      </el-form-item>

      <el-form-item :rules="[$rules.required,$rules.number]" label="最长天数" prop="dateMax">
        <el-input placeholder="请输入保险最长天数" v-model.number="form.dateMax"></el-input>
      </el-form-item>

      <el-form-item :rules="[$rules.required,$rules.number]" label="保费单价" prop="price">
        <el-input placeholder="请输入保费单价（元/人）" v-model.number="form.price"></el-input>
      </el-form-item>


      <el-form-item :rules="[$rules.required]" label="接口绑定" prop="insuType">
        <el-select :value="form.insuType" placeholder="可选择系统已对接的保险接口或使用人工接口" style="max-width: 450px;display: block"
                   v-model="form.insuType">
          <el-option :label="item.description" :value="item.code" v-for="item in insuTypeList">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="备注信息" prop="remark">
        <el-input :autosize="{ minRows: 4 }" maxlength="500" placeholder="请输入保险备注信息,不要超过五百字" show-word-limit
                  style="max-width: 500px;" type="textarea" v-model="form.remark"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="onSave" @click="onSubmit('form')" type="primary">保存</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>


    </el-form>

  </div>
</template>

<script>
    import {getEnums} from "@/api/baseApi";
    import {addInsu, getInsu} from "@/api/insurance";

    export default {
        name: "addInsu",
        data() {
            return {
                onSave: false,
                form: {
                    id: -1,
                    num: '',
                    name: '',
                    company: '',
                    dateMin: '',
                    dateMax: '',
                    price: '',
                    insuType: '',
                    remark: ''
                },
                insuTypeList: []
            }
        },
        props: {
            editid: {
                type: Number,
                default() {
                    return -1
                }
            }
        },
        created() {
            getEnums('INSUTYPE').then(res => {
                this.insuTypeList = res
            })


            if (this.editid !== -1) {
                getInsu(this.editid).then(res => {
                    for(let index in res){
                        this.form[index]=res[index]
                    }
                }).catch(error => {
                })
            }

        },

        watch:{
            'editid':function (id) {
                if (id !== -1) {
                    getInsu(id).then(res => {
                        for(let index in res){
                            this.form[index]=res[index]
                        }
                    }).catch(error => {
                    })
                }
            }
        },


        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            onSubmit(formName) {
                this.onSave = true
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //
                        if(this.form.id===-1)
                            delete this.form.id

                        addInsu(this.form).then(res => {
                            this.$message({type: 'success', message: '保存成功'})
                            if(!this.form.id)
                                this.resetForm()
                            this.onSave = false
                        }).catch(error => {
                            this.onSave = false
                        })
                        this.$emit('refresh')

                    } else {
                        this.$message({type: 'error', message: '请填写完必要的信息!'})
                        this.onSave = false
                        return false;
                    }
                });
            }
        }

    }
</script>

<style scoped>

</style>
