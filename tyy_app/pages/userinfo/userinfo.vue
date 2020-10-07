<template>
	<view>
		<uni-section title="基本信息完善" type="line"/>
	  <view class="adBaseView">
		<view class="adRowView">
			<view class="headView">姓名</view>
			<view style="width: 70%;"><input  class="input" v-model="name" placeholder="请输入姓名" /></view>
		</view>
		<view class="bottomLine"/>
	 </view>
			<view class="adBaseView">
					<view class="adRowView">
						<view class="headView">QQ</view>
						<view style="width: 70%;"><input  class="input" v-model="QQ" placeholder="请输入QQ" /></view>
					</view>
					<view class="bottomLine"/>
			</view>
				
		<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">微信</view>
					<view style="width: 70%;"><input  class="input" v-model="wechat" placeholder="请输入微信" /></view>
				</view>
				<view class="bottomLine"/>
		</view>
		<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">电话</view>
					<view style="width: 70%;"><input  class="input" v-model="phone" placeholder="请输入手机号" /></view>
				</view>
				<view class="bottomLine"/>
		</view>
		<button type="primary" @click="submit">保存修改</button>
	</view>
</template>

<script>
	import {guiderBaseInfoInit} from "../../api/guider/guider.js"
	import {updateGuiderBaseInfo} from "../../api/guider/guider.js"
	export default {
		data() {
			return {
				name: '',
				QQ: '',
				wechat: '',
				phone: ''
			};
		},
		onLoad() {
			guiderBaseInfoInit().then(res=>{
				if(res.status === 1){
				this.name = res.data.name
				this.QQ = res.data.QQ
				this.wechat = res.data.wechat
				this.phone = res.data.phone
			}
		})
		},
		methods:{
			submit(){
				updateGuiderBaseInfo({name:this.name,QQ:this.QQ,wechat:this.wechat,phone:this.phone}).then(res=>{
					if(res.status === 1){
						uni.showModal({
						    title: '提示',
							showCancel: false,
							confirmColor: "#000000",
						    content: '修改成功',
						    success: function (res) {
						        if (res.confirm) {
							        uni.navigateBack()
						        } 
						    }
						});
						}
					})
					
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
	}
    .input{
    	text-align: right !important;
    	font-size: 28upx !important;
    }
    .input-text{
    	text-align: right !important;
    	font-size: 28upx !important;
    	color: rgb(128, 128, 128);
    }

</style>
