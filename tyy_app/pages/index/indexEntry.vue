<template>
	<view>
		<view class="main-core">

			<view class="main-core-item" v-for="item in list" >
				<view @click="swtich(item.cmd)">
					<image class="core-item-icon" src="../../static/temp/c3.png"></image>
					<text class="core-item-name">{{item.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	import {
		getUniappMenuList
	} from '../../api/base/baseApi.js'
	export default {
		data() {
			return {
				texta: '',
				list: []
			}
		},
		onShow() {
			getUniappMenuList({}).then(res => {
				this.list = res.data
			}).catch(err => {

			})
		},
		methods: {
			swtich(url) {
				uni.navigateTo({
					url: '..' + url
				})
			}
		}
	}
</script>

<style scoped>
	.main-core{
	  background-color: white;
	  display: flex;
	  flex-flow: row wrap;
	  align-content: flex-start;
	  height: 18%;
	  overflow: hidden;
	  
	}
	.main-core-item{
	  display: flex;
	  flex-flow: column wrap;
	  justify-content: center;
	  align-items: center;
	  box-sizing: border-box;
	  width: 20%;
	  height: 170upx;
	}
	.core-item-icon{
	  display: block;
	  width: 85upx;
	  height: 85upx;
	  margin: 15upx auto;
	}
	.core-item-name{
	  display: block;
	
	  font-size: 20upx;
	}
	
	.title{
		     position: relative;
	padding-bottom: 10upx;
		    text-align: center;
		    background-color: #C8C7CC;
			
	}
	.text{
		font-weight: 500;
		font-size: 30upx;
	     
	}
</style>
