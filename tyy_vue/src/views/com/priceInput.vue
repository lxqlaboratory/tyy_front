<template>
  <el-input :disabled="disabled" :placeholder="placeholder" @input.native="formatPrice" v-model="oriPrice">
    <span slot="append">元</span>
  </el-input>
</template>

<script>
  export default {
    name: "priceInput",
    props: {
      'value': {}, 'placeholder': {type: String}, 'disabled': {type: Boolean, default: false}
    },
    data() {
      return {
        oriPrice: ''
      }
    },
    created() {

    },

    watch: {
      'value': {
        handler(val, oldVal) {
          if (this.oriPrice === '' && val) {
            this.oriPrice = parseFloat(val.toString()) / 100
          }
        }
        , immediate: true
      }
    },

    methods: {
      formatPrice() {
        this.$nextTick(() => {
          this.oriPrice = this.limitFloat(this.oriPrice)
          this.refreshValue(this.oriPrice)
        })
      },
      refreshValue(val) {
        val = val.toString()
        if (val.charAt(val.length - 1) === '.')
          val = val.substr(0, val.length - 1)
        val = parseFloat(val) * 100
        this.$emit('input', parseInt(this.oriPrice * 100));
      },

      limitFloat(val) {
        let sNum = val.toString();
        if (sNum.indexOf('.') === 0)
          sNum = '0' + sNum
          sNum = sNum.replace(/[^(\d.|\-)]/g, "");
        sNum = sNum.replace(/\.{2,}/g, ".");
        sNum = sNum.replace(/\-{2,}/g, "-")
          sNum = sNum.replace("-", "$#$").replace(/\-/g, "").replace("$#$", "-")
          sNum = sNum.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
        sNum = sNum.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')

        if (sNum.indexOf(".") < 0 && sNum !== ""&&sNum.indexOf("-")<0)
          sNum = parseFloat(sNum);
        return sNum;
      }
    }
  }
</script>

<style scoped>

</style>
