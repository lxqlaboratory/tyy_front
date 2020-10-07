<template>
  <div class="app-container">

    <div style="width: 100%;" class="proOutputContain">
      <div style="flex-grow: 1">
        <el-date-picker :picker-options="pickerOptions" @change="changeDate" align="right" clearable format="yyyy-MM-dd"
                        placeholder="请筛选计划的最远日期" type="datetime" v-model="queryForm.proDate"
                        value-format="yyyy-MM-dd"></el-date-picker>
        <span style="color: gray;font-size: 13px;padding: 5px;">仅显示近期有团队计划的产品</span>


        <el-transfer
          :button-texts="['取消', '导出']"
          :data="data"
          :props="{ key: 'id',label: 'sLabel'}"

          :titles="['近期计划产品', '已选择的导出']"
          @change="handleChange"
          style="text-align: left; display: inline-block;margin-top: 15px;"
          v-model="proList">
          <span slot-scope="{ option }">{{ option.proName +" "}}  <span style="color: orangered">{{ option.sLabel }}</span></span>
        </el-transfer>


      </div>
      <div >
        <tinymce  :width="600" :height="800"  v-model="proOutputStr"/>
      </div>
    </div>
  </div>

</template>

<script>
    import {parseTime} from "@/utils/index";
    import {getRecentPlanPro} from '@/api/production'
    import Tinymce from '@/components/Tinymce'
    import priceShow from '@/views/com/priceShow'

    export default {
        name: "proOutput",
        components: {Tinymce,priceShow},
        data() {

            return {
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    },
                    shortcuts: [{
                        text: '一周内',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '两周内',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 14);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一月内',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                data: [],
                proList: [],
                queryForm: {
                    proDate: ''
                },
                proOutputStr:''
            }
        },

        methods: {
            //得到可供选择的产品
            getProList() {
                getRecentPlanPro().then(res => {
                    res.forEach(item => {
                        item.sLabel = ""
                        item.proPlan.forEach(planItem => {
                            item.sLabel += planItem+"/"
                        })
                        item.proPrice=JSON.parse(item.proPrice)
                    })
                    console.log(res)



                    console.log(res)
                    this.data=res
                }).catch(error => {})
            },
            handleChange(value, direction, movedKeys) {
            },
            changeDate() {
                this.getProList()
            },
        },
        watch:{
            'proList':function (idList) {
                //重新构造tinymce编辑器中内容

            }
        },
        computed: {},
        created() {
            let thisDate = parseTime(new Date(), '{y}-{m}-{d}');
            this.getProList()


        }
    }
</script>

<style scoped>
  .proOutputContain {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
  /deep/.el-transfer{
    width:100% !important; ;
    min-height: 80vh !important;

  }
  /deep/.el-transfer-panel{
    width: 40% !important;
    min-height: 80vh !important;
  }
  /deep/ .el-transfer-panel__body{
    height: 80vh!important;
  }
  /deep/ .el-transfer-panel__list {
    height: 100% !important;
  }



</style>
