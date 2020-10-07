<template>
	<view class="container">
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">Modify</view>
			<view class="welcome">
				修改密码！
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">原密码</text>
					<input  v-model="oldpassword"
						placeholder="请输入原密码"
					/>
				</view>
				<view class="input-item">
					<text class="tit">新密码</text>
					<input 
					v-model="newpassword"
						placeholder="请输入新密码"
						placeholder-class="input-empty"
						maxlength="20"
						password 
					/>
				</view>
			</view>
			<button class="confirm-btn" @click="toModify" >修改密码</button>
		</view>
		<view class="register-section">
			解除绑定?
			<text @click="cancel">马上解除</text>
		</view>
	</view>
</template>


<script>
	import {guiderModifyPwd} from "../../api/guider/guider.js"
	import {SignOut} from "../../api/base/baseApi.js"
	export default{
		data(){
			return {
				oldpassword: '',
				newpassword: '',
				logining: false
			}
		},
		onLoad(){
			
		},
		methods:{
			toModify(){
				if(this.newpassword === ''){
					uni.showModal({
					    title: '提示',
						showCancel: false,
						confirmColor: "#000000",
					    content: '新密码不能为空',
					    success: function (res) {
					        if (res.confirm) {
						     
					        } 
					    }
					});
				}
				else{
					guiderModifyPwd({oldpassword:this.oldpassword,newpassword:this.newpassword}).then(res=>{
				    if(res.status === 0){
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
					}else{
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
			},
			cancel(){
				SignOut({}).then(res=>{
					if(res.status === 1){
						uni.showModal({
						    title: '提示',
							showCancel: false,
							confirmColor: "#000000",
						    content: '解除绑定成功',
						    success: function (res) {
						        if (res.confirm) {
							    uni.navigateBack()
						        } 
						    }
						});
					}else if(res.status === 0){
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
