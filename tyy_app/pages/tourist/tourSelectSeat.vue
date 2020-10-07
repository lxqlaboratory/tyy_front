<template>
	<view> 
	 <view @click="hhh">点我扫一扫</view> 
	 </view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		methods: {
			hhh(){
				wx.scanCode({
				  success (res) {
				    console.log(res)
					console.log(res.result)
				  }
				})
			}
		}
	}
</script>

<style>
</style>
