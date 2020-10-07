<template>
    <div style="min-width: 50%;margin-top:20px;display: flex;flex-direction: row;align-items: center;justify-content: center;">
      <div style="color: black;margin-right: 15px;">{{title}}:</div>
      <div style="color: #2b2f3a">{{value}}</div>
    </div>
</template>

<script>
    export default {
        name: "infoRow",
        props:{
            title:{
                type:String,
                default:'无'
            },
            value:{
                type:String,
                default:''
            }
        }
    }
</script>

<style scoped>

</style>
