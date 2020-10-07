<template>
<view>
	   	<uni-section title="添加多个游客" type="line" />
	            <view class="uni-textarea">
	                <textarea placeholder-style="color:#F76260" placeholder="格式:姓名 身份证号 手机号" maxlength="600" style="height: 700upx;" @input="getInput" />
	            </view>
					<button class="confirm-btn" @click="submit" >提交</button>
				</view>
</template>

<script>
	import {
				addTouristTWO
	} from '../../api/group/group.js';
	export default {
		data() {
			return {
				tourists:'',
				phone:'',
				cerNum:'',
				age:'',
				sex:'',
				productId: '',
				relatenode:''
			};
		},	
		onLoad(option) {
			this.productId = option.productId;
		},
		methods: {
			getInput(e){
				console.log(e)
				this.tourists = e.detail.value
			},
			 radioChange: function(e) {
				 this.sex = e.detail.value
	        },
			submit(){
				 addTouristTWO({tourists:this.tourists}).then(res=>{
					 if(res.data === '输入格式错误'){
						 uni.showModal({
						     title: '提示',
						 	showCancel: false,
						 	confirmColor: "#000000",
						     content: '输入格式错误',
						     success: function (res) {
						         if (res.confirm) {
						 	     
						         } 
						     }
						 });		
					 }else if(res.data === '添加成功'){
						let pages = getCurrentPages(); // 当前页面
						let beforePage = pages[pages.length - 2]; // 前一个页面
						console.log("beforePage",beforePage);
						console.log(pages);
						uni.navigateBack({
							delta: 1,
						    success: function() {
						        beforePage.$vm.refreshRequest(); // 执行前一个页面的刷新
						    }
						});
					 }
					 })
			}
			}
			}
</script>

<style lang="scss">
	.uni-textarea{
		display: flex;
		justify-content: center;
		align-content: center;
		height: 750upx;
		overflow: hidden;
		border: 5upx solid #023C41;
		margin-top: 16upx;
		margin-left: 16upx;
		border-radius: 16upx;
		margin-bottom: 16upx;
		margin-right: 16upx;
		background-color: white;
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
