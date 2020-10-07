<template>
	<view style="margin-bottom: 20px;">
		<uni-section title="账号(密码默认为1)" type="line" />
		<view class="form-item">
			<view class="input-container">
				<input type="text" class="item-input" placeholder="请输入账号" v-model="userName" required = "true" />
			</view>
		</view>			
		<uni-section title="姓名" type="line" />
		<view class="form-item">
			<view class="input-container">
				<input type="text" class="item-input" placeholder="请输入姓名" v-model="name" required = "true" />
			</view>
		</view>	
		<uni-section title="手机号" type="line" />
		<view class="form-item">
			<view class="input-container">
				<input type="text" class="item-input" placeholder="请输入手机号" v-model="phone" required = "true" />
			</view>
		</view>	
		<uni-section title="身份证号" type="line" />
		<view class="form-item">
			<view class="input-container">
				<input type="text" class="item-input" placeholder="请输入身份证号" v-model="cerNum" required = "true" />
			</view>
		</view>		
		<button class="confirm-btn" @click="submit" >提交</button>
	</view>
</template>

<script>
		import {
				addStaff
	} from '../../api/tour/tour.js';
	export default {
		data() {
			return {
				name:'',
				phone:'',
				cerNum:'',
				userName:''
			};
		},	

		methods: {
			submit: function(){
				var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
				var idCardReg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
				if (this.name === '') {
							  uni.showModal({
							      title: '提示',
							  	showCancel: false,
							  	confirmColor: "#000000",
							      content: '姓名不能为空',
							      success: function (res) {
							          if (res.confirm) {
							  	     
							          } 
							      }
							  });						
				} else if (!myreg.test(this.phone||!this.phone)) {
				//        wx.showToast({
				//      title: '手机号有误！',
				//      icon: 'none',
				//      duration: 1500
				//     })
							  uni.showModal({
							      title: '提示',
							  	showCancel: false,
							  	confirmColor: "#000000",
							      content: '手机号有误',
							      success: function (res) {
							          if (res.confirm) {
							  	     
							          } 
							      }
							  });				
				 }else if (!this.cerNum || !idCardReg.test(this.cerNum)){
							  uni.showModal({
							      title: '提示',
							  	showCancel: false,
							  	confirmColor: "#000000",
							      content: '身份证号有误',
							      success: function (res) {
							          if (res.confirm) {
							  	     
							          } 
							      }
							  });
				}else if ( this.userName== '') {
						uni.showModal({
					    title: '提示',
						showCancel: false,
						confirmColor: "#000000",
					    content: '用户名不能为空',
					    success: function (res) {
					        if (res.confirm) {
						     
					        } 
					    }
					});	
				}else{
				 addStaff({name:this.name,userName:this.userName,phone:this.phone,cerNum:this.cerNum}).then(res=>{
							 	if(res.status === 1){
							 		uni.showModal({
							 		    title: '提示',
							 			showCancel: false,
							 			confirmColor: "#000000",
							 		    content: '添加成功',
							success: function(res) {
							 		        if (res.confirm) {
							 		        } 
							}
							 		});
							 		}else{
									uni.showModal({
								    title: '提示',
									showCancel: false,
									confirmColor: "#000000",
								    content: res.errMessage,
								    success: function (res) {
								        if (res.confirm) {
									     
								        } 
								    }
								});				
									}
							 	})
						 }
				}
	},
	}
</script>

<style lang="scss">	
	.form-item{
		padding-bottom: 10px;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		align-items: left;
		height: auto;
		color: #777777;
		border-bottom: 2px solid #FFFFFF;
		.input-container{
			width: 100%;
			justify-content: center;
			align-items: center;
			display: flex;
			height: auto;
			flex-direction: row;
			flex-wrap: wrap;			
			margin-top: 10px;
			.item-input{
				width: 700rpx;
				border-radius: 20rpx;
				border: 1px solid #C8C7CC;
				padding: 5px;
				height: auto;
				background-color: #FFFFFF;
			}
		}
	}	
	.confirm-btn{
	width: 630upx;
	height: 76upx;
	line-height: 76upx;
	border-radius: 50px;
	margin-top: 120upx;
	background: $uni-color-primary;
	color: #fff;
	font-size: $font-lg;
	&:after{
		border-radius: 100px;
	}
	}
</style>
