<template>
	<view>
		<uni-section title="选择打卡位置" type="line" />
		<view class="adBaseView">
			<view class="adRowView" @click="dingwei">
				<view class="headView">位置</view>
				<view style="width: 70%;">{{locationName}}</view>
			</view>
			<view class="bottomLine" />
		</view>
		<uni-section title="上传照片" type="line" />
		<imageupload :count="4" :length="8" :restype="8" v-model="imgRidList"></imageupload>
		<button class="confirm-btn" @click="submit" >提交</button>
	</view>
</template>

<script>
	import imageupload from '../../components/upload-images.vue'
	import { savePunch } from '../../api/guider/guider.js';
	
	export default {
		data() {
			return {
				locationAddress: '',
				locationName: '',
				locationLatitude: '',
				locationLongitude: '',
				imgRidList: [],
				photo :[],
			}
		},
		components: {
			imageupload
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
				for (var i = 0; i < this.imgRidList.length; i++) {
					this.photo[i] = this.imgRidList[i].rId
				}
				savePunch({locationLatitude:this.locationLatitude,locationName:this.locationName,locationAddress:this.locationAddress,locationLongitude:this.locationLongitude,imgRidList:this.photo,size : this.photo.length}).then(res=>{
					if(res.status==1){
							uni.showModal({
						    title: '提示',
							showCancel: false,
							confirmColor: "#000000",
						    content: res.data,
						    success: function (res) {
						        if (res.confirm) {
							     uni.navigateBack()
						        } 
						    }
						});
					}else{
					uni.showModal({
					    title: '提示',
						showCancel: false,
						confirmColor: "#000000",
					    content: res.data,
					    success: function (res) {
					        if (res.confirm) {
						     
					        } 
					    }
					});						
					}				
		})
	  }
	},
	}
</script>

<style lang='scss'>
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
