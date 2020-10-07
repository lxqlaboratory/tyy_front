<template>
	<view class="form-item">
		<view style="display : flex ; flex-flow : row;">
			<view class="item-title" style="width: 300upx;color: blue; margin-left: 10upx;" @click="addTourist()">新增单个游客</view>
			<view class="item-title" style="width: 300upx;color: red;text-align: right;" @click="addTouristMore()">新增多个游客</view>
		</view>
		<uni-section title="游客列表" type="line" />
		<view class="item-t" v-for="(item, index) in tourList" :key="index">
			<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;">
				<view style="margin-bottom: 3px;">
					<text>姓名:{{ item.name }}</text>
				</view>
				<view style="margin-bottom: 3px;">手机号:{{ item.phone }}</view>
				<view style="margin-bottom: 3px;">身份证号:{{ item.cerNum }}</view>
				<view style="margin-bottom: 3px;">性别:{{item.sex>0?'男':'女'}}</view>
				<view style="margin-bottom: 3px;">年龄:{{ item.age }}</view>
				<view style="margin-bottom: 3px;">关系:{{ item.relateNode }}</view>
			</view>
			<view style="display: flex;flex-direction: column;justify-content: left;">
				<view style="color: red;" @click="modify(item)">修改</view>
				<view style="color: #39B54A;" @click="del(item,index)">删除</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import { viewTourist, delTourist } from '../../api/tour/tour.js';

export default {
	data() {
		return {
			tourList: [],
			productId:'',
		};
	},
	onLoad: function(option) {
		this.productId = option.productId;
		viewTourist()
			.then(res => {
				this.tourList = res.data;
			})
			.catch(err => {});
	},
	methods: {
		refreshRequest(){
			this.tourList = []
					viewTourist()
				.then(res => {
					this.tourList = res.data;
				})
				.catch(err => {});
			},

		// 	 radioChange: function(e) {
		// 		 this.sex = e.detail.value
		//           },
		//
		modify: function(item) {
						uni.navigateTo({
				url:
					'/pages/tourist/modifyTourist?id=' +
					item.id +
					'&name=' +
					item.name +
					'&phone=' +
					item.phone +
					'&cerNum=' +
					item.cerNum +		
					'&sex=' +
					item.sex +
					'&age=' +
					item.age +
					'&relatenode=' +
					item.relatenode +									
					' '
			});
			
			
		},
		addTourist:function(){
									uni.navigateTo({
				url:
					'/pages/tourist/addTourist?productId='+this.productId+''
					
			});
		},
		addTouristMore:function(){
									uni.navigateTo({
				url:
					'/pages/tourist/addMoreTour?productId='+this.productId+''
					
			});
		},
		del: function(item,index) {
			var that = this
			uni.showModal({
				title: '提示',
				content: '是否删除该游客',
				success: function(res) {
					if (res.cancel) {
					} else if (res.confirm) {
						delTourist({ touristId: item.id }).then(res => {
							if (res.status == 1) {
						that.tourList.splice(index,1);
								uni.showModal({
									title: '提示',
									showCancel: false,
									confirmColor: '#000000',
									content: res.data,
									success: function(res) {}
								});
							} else {
								uni.showModal({
									title: '提示',
									showCancel: false,
									confirmColor: '#000000',
									content: '删除失败'
								});
							}
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.red {
	color: #f55347;
}
.form-item {
	padding-bottom: 10px;
	display: flex;
	flex-direction: column;
	font-size: 14px;
	align-items: left;
	height: auto;
	background-color: white;
	.item-title {
		margin-top: 10px;
	}
}
.item-t {
	padding: 15px;
	margin-left: 10upx;
	margin-right: 10upx;
	border: 2px solid DarkGray;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
</style>
