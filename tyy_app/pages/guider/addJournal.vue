<template>
	<view style="margin-bottom: 20px;">
		<uni-section title="标题" type="line" />
		<view class="form-item">
			<view class="input-container">
				<input type="text" class="item-input" placeholder="请输入标题" v-model="title" required = "true" />
			</view>
		</view>	
		<uni-section title="内容" type="line" />
		<view class="form-item">
			<view class="input-container">
				<textarea maxlength="-1" class="text-area" placeholder="请输入内容" v-model="content" />
				</view>
		</view>
		<uni-section title="上传照片" type="line" />
		<imageupload :count="4" :length="8" :restype="8" v-model="imgRidList"></imageupload>
		
				<uni-section title="选择打卡位置" type="line" />
		<view class="adBaseView">
			<view class="adRowView" @click="dingwei">
				<view class="headView">位置</view>
				<view style="width: 70%;">{{locationName}}</view>
			</view>
						<view class="bottomLine" />
			</view>
		<button class="confirm-btn" @click="submit" >提交</button>
	</view>
</template>

<script>
	import imageupload from '../../components/upload-images.vue'
	import { addJournal } from '../../api/guider/guider.js';
	
	export default {
		data() {
			return {
				title:'',
				content:'',
				imgRidList: [],
				photo :[],
				locationAddress: '',
				locationName: '',
				locationLatitude: '',
				locationLongitude: '',
				groupId:''
			};
		},
		components: {
			imageupload
		},		
				onLoad(options){
			this.groupId = options.groupId

			
		},
		methods: {
						dingwei() {
				var that = this
				uni.chooseLocation({
					success: function(res) {
						that.locationAddress = res.address
						that.locationName = res.name
						that.locationLatitude = res.latitude
						that.locationLongitude = res.longitude
						// console.log('位置名称：' + res.name);
						// console.log('详细地址：' + res.address);
						// console.log('纬度：' + res.latitude);
						// console.log('经度：' + res.longitude);
					}
				});
			},
			submit() {
				var that = this
				for (var i = 0; i < this.imgRidList.length; i++) {
					this.photo[i] = this.imgRidList[i].rId
				}
				addJournal({groupId:this.groupId,title:this.title,content:this.content,imgRidList:this.photo,size : this.photo.length,locationLatitude:this.locationLatitude,locationName:this.locationName,locationAddress:this.locationAddress,locationLongitude:this.locationLongitude}).then(res=>{
					if(res.status==1){
							uni.showModal({
						    title: '提示',
							showCancel: false,
							confirmColor: "#000000",
						    content: res.data,
						    success: function (res) {
						        if (res.confirm) {
							     			uni.navigateTo({
							     	url: '/pages/guider/viewJournal?groupId='+that.groupId+''
							     })
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
	}
</script>

<style lang="scss">	
	.red{
		color: #f55347;
	}
	.form-item{
		padding-bottom: 10px;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		align-items: center;
		height: auto;
		color: #777777;
		border-bottom: 2px solid #FFFFFF;
		.item-title{
			width: 700rpx;
			margin-top: 10px;
		}
		.input-container{
			width: 100%;
			justify-content: center;
			align-items: center;
			display: flex;
			height: auto;
			margin-top: 8px;
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
	.sole-row-item{
		padding-bottom: 10px;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		align-items: center;
		height: auto;
		color: #777777;
		border-bottom: 2px solid #FFFFFF;
		.switch-container{
			width: 700rpx;
			margin-top: 10px;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}
		.input-container{
			width: 100%;
			justify-content: center;
			align-items: center;
			display: flex;
			height: auto;
			margin-top: 8px;
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
	.text-area{
		height: 400rpx;
		width: 700rpx;
		border-radius: 20rpx;
		border: 1px solid #C8C7CC;
		padding: 5px;
		background-color: #FFFFFF;
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
