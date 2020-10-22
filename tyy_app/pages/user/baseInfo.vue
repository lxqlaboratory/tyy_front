<template>
	<view>
		<uni-section title="个人基本信息" type="line"/>
		<view  class="record-item" >
			<view class="f1">
				<view class="condition">温馨提示</view>
				<view class="date">修改手机号时要获取验证码</view>
			</view>
			<view class="f1">
		<view class="address">请填写准确信息</view>
		</view>
		</view>
	  <view class="adBaseView">
		<view class="adRowView">
			<view class="headView">姓名</view>
			<view style="width: 70%;"><input  class="input" v-model="pername" placeholder="请输入姓名" /></view>
		</view>
		<view class="bottomLine"/>
	 </view>
			<view class="adBaseView">
					<view class="adRowView">
						<view class="headView">身份证号</view>
						<view style="width: 70%;"><input  class="input" v-model="peridcard" placeholder="请输入身份证号" /></view>
					</view>
					<view class="bottomLine"/>
			</view>
				
		<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">手机号</view>
					<view style="width: 50%;"><input  class="input" v-model="phone" placeholder="请输入手机号" /></view>
					<button  class="hhaha" @click="yzm">获取验证码</button>
				</view>
				<view class="bottomLine"/>
		</view>
		<one-input v-model="realC" @finish="finishedOne" v-if="yanzheng"></one-input>
		<button type="primary" class="buu"  @click="submit1">提交</button>
		
		<text class="mix-btn" @click="cancel">解除绑定</text>
	</view>
</template>

<script>
	import {SignOut} from "../../api/base/baseApi.js"
	import {CCCCCCCCCCCCCCCCC} from "../../api/base/baseApi.js"
	import {baseInfoInit} from "../../api/base/baseApi.js"
	import {sendCodePhone} from "../../api/base/baseApi.js"
	import {changePersonBase} from "../../api/base/baseApi.js"
	import oneInput from '@/components/myp-one.vue'
	
	export default {
		data() {
			return {
				password: '',
				phone: '',
				realC: '',
				code:'',
				yanzheng: false,
				peridcard: '',
				pername: ''
			};
		},
		components:{
			oneInput
		},
		onShow() {
			this.yanzheng = false
			baseInfoInit().then(res=>{
				if(res.re === 1){
				this.phone = res.data.phone
				this.peridcard = res.data.peridcard
				this.pername = res.data.pername
			}
		})
		},
		methods:{
             yzm(){
				var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
				 if (!myreg.test(this.phone)) {
				       wx.showToast({
				     title: '手机号有误！',
				     icon: 'none',
				     duration: 1500
				    })
				 }else{
					sendCodePhone({phone:this.phone}).then(res=>{
							this.yanzheng = true
							this.code = res.data
					})
				}
				
			 },
			 aaa(){
				 CCCCCCCCCCCCCCCCC().then(res=>{
					 })
			 },
			 cancel(){
			 	SignOut({}).then(res=>{
			 		if(res.re === 1){
			 			uni.showModal({
			 			    title: '提示',
			 				showCancel: false,
			 				confirmColor: "#000000",
			 			    content: '解除绑定成功',
			 			    success: function (res) {
			 			        if (res.confirm) {
			 				       uni.switchTab({  
			 						   url:'../index/index'
			 					   })
			 			        } 
			 			    }
			 			});
			 		}else if(res.re === -1){
			 			uni.showModal({
			 			    title: '提示',
			 				showCancel: false,
			 				confirmColor: "#000000",
			 			    content: '用户未绑定',
			 			    success: function (res) {
			 			        if (res.confirm) {
			 				       
			 			        } 
			 			    }
			 			});
			 		}
			 	}).catch(error=>{
			 		
			 	}) 
			 },
			 
			finishedOne() {
			                console.log(this.test)
			            },
			submit1(){
				if(this.realC === this.code){
				var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
				 if (!myreg.test(this.phone)) {
				       wx.showToast({
				     title: '手机号有误！',
				     icon: 'none',
				     duration: 1500
				    })
				 }else{
					
					 var idCardReg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
					 if (!this.peridcard || !idCardReg.test(this.peridcard)) {
					   wx.showToast({
					        title: '您输入的身份证号格式有误！',
					        icon: 'none',
					        duration: 1500
					       })
						
					  }else{
							  
						  if( this.pername === ''|| this.peridcard === '' ){
							  
							  uni.showModal({
							      title: '提示',
							  	showCancel: false,
							  	confirmColor: "#000000",
							      content: '不能为空',
							      success: function (res) {
							          if (res.confirm) {
							  	     
							          } 
							      }
							  });
						  }else{
							 changePersonBase({pername:this.pername,phone:this.phone,peridcard:this.peridcard}).then(res=>{
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
				}
				else{
					uni.showModal({
					    title: '提示',
						showCancel: false,
						confirmColor: "#000000",
					    content: '验证码错误',
					    success: function (res) {
					        if (res.confirm) {
						    
					        } 
					    }
					});
				}
				
				
					
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
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
.record-item{
	  margin: 5upx 15upx;
	  padding: 15upx;
	  background-color: white;
	  border:1upx solid gainsboro;
	  border-radius: 8upx;
	  box-shadow: 1upx 1upx 2upx #333333; 
	}
	.f1{
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	}
	.condition{
	  font-size: 30upx;
	  color: black;
	  font-weight: bold;
	}
	.date{
	  font-size: 25upx;
	}
	.date2{
	  font-size: 20upx;
	}
	.address{
	  margin-top: 5upx;
	  font-size: 30upx;
	}
	.buu{
		 margin-top: 15upx;
		 width: 50%;
	}
	.hhaha{
		width: 30%;
		 font-size: 28upx;
		margin-left: 10upx;
	}
</style>
