<template>
  <div>
    <div class="block">
      <span class="demonstration"></span>
      <el-cascader
        @change="handlePayType"
        v-model="payTypeValue"
        :options="channels"
        :props="{ checkStrictly: true }"
        clearable></el-cascader>
    </div>
  </div>
</template>

<script>
    import {getChannelTree} from "@/api/money";
    export default {
        name: "channelSelect",
        props:['payType'],
        data() {
            return {
                channels:[],
                payTypeValue:this.payType,
                }
            },
        created() {
        getChannelTree().then(res=>{
            res.forEach(data=>{
                let arr={};
                arr.value=data.name;

            });
            this.channels=res;
        });
        },

        methods: {
            handlePayType(){
                this.$emit('update:payType',this.payTypeValue[this.payTypeValue.length-1])
            }
        }
    }
</script>

<style scoped>

</style>
