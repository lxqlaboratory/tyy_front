<template>
  <span style="color: orangered">{{priceShow+' '}}元</span>
</template>

<script>
  export default {
    name: "priceShow",
    props: ['price'],
    computed:{
      priceShow() {
        if(this.price)
          return parseFloat(this.price.toString()) / 100
        else
          return 0
      }
    }
  }
</script>

<style scoped>

</style>
