<template>
	<view class="container">
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">Modify</view>
			<view class="welcome">
				用户注册！
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">手机号</text>
					<input  v-model="username"
						placeholder="请输入手机号"
					/>
				</view>
				<view class="input-item">
					<text class="tit">新密码</text>
					<input 
					v-model="password"
						placeholder="请输入新密码"
						placeholder-class="input-empty"
						maxlength="20"
						password 
					/>
				</view>
				<view class="input-item">
					<text class="tit">确认密码</text>
					<input 
					v-model="confirmpassword"
						placeholder="请输入确认新密码"
						placeholder-class="input-empty"
						maxlength="20"
						password 
					/>
				</view>
				<view class="input-item">
					<text class="tit">姓名</text>
					<input  v-model="pername"
						placeholder="请输入姓名"
					/>
				</view>
				<view class="input-item">
					<text class="tit">身份证号</text>
					<input  v-model="peridcard"
						placeholder="请输入身份证号"
					/>
				</view>
			</view>
			<button class="confirm-btn" @click="toSign" >立即注册</button>
			<button open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">获取手机号子</button> 
		</view>
	</view>
</template>

<script>
	import {signyk} from "../../api/base/baseApi.js"
	export default{
		data(){
			return {
				username: '',
				password: '',
				pername: '',
				peridcard: '',
				confirmpassword: ''
			}
		},
		onLoad(){
			
		},
		methods:{
			onGetPhoneNumber(e) {  
			                console.log("onGetPhoneNumber", e);  
			                console.log(e.detail.errMsg);  
			                console.log(e.detail.iv);  
			                console.log(e.detail.encryptedData);  
			                uni.showModal({  
			                    title: "onGetPhoneNumber",  
			                    content: e.detail.errMsg  
			                })  
			            }  ,
			toSign(){
				if(this.password === '' || this.confirmpassword === ''|| this.username === '' ){
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
					if(this.password!= this.confirmpassword){
						uni.showModal({
						    title: '提示',
							showCancel: false,
							confirmColor: "#000000",
						    content: '两次密码不一致',
						    success: function (res) {
						        if (res.confirm) {
							     
						        } 
						    }
						});
					}else{
						var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
						 if (!myreg.test(this.username)) {
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
							signyk({username:this.username,password:this.password,pername:this.pername,peridcard:this.peridcard}).then(res=>{
							    console.log(res)
									uni.showModal({
									    title: '提示',
										showCancel: false,
										confirmColor: "#000000",
									    content: '注册成功',
									    success: function (res) {
									        if (res.confirm) {
										     uni.navigateBack()
									        } 
									    }
									});
								
							})
							}
							
						}
					}
				}
				
			}
		}
		}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		padding-top: 115px;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}	
	}

	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}
	.register-section{
		position:absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
</style>

