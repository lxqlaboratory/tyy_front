<template>
	<view class="container">
		<uni-section title="产品列表" type="line" />
		<uni-swipe-action>
			<uni-swipe-action-item v-for="(item,index) in list" :options="options1" :key=item.id @click="dealProduct($event,item.id)">
				<view class="detail-container">
					<view class="detail-row">
						<text>产品名称</text>
						<text>{{item.name}}</text>
					</view>
					<view class="detail-row">
						<text>产品编号</text>
						<text>{{item.proNum}}</text>
					</view>
					<view class="detail-row">
						<text>产品类别</text>
						<text>{{item.proType}}</text>
					</view>
					<view class="detail-row">
						<text>最低收客人数</text>
						<text>{{item.minTouNum}}人</text>
					</view>
					<view class="detail-row">
						<text>行程天数</text>
						<text>{{item.proDateNum}}天</text>
					</view>
					<view class="detail-row">
						<text>订单数量</text>
						<text>{{item.orderNum}}个</text>
					</view>
					<view class="detail-row">
						<text>累计收客</text>
						<text>{{item.touristNum}}人</text>
					</view>
					<!-- <view class="detail-row" style="margin-top: 10px;justify-content: space-between;width:100%">
						<view class="opertion-button" style="background-color: #39B54A;" @click="editProduct(item.id)"><text>产品编辑</text></view>
						<view class="opertion-button" style="background-color: #00aaff;" @click="copyProduct(item.id)"><text>产品复制</text></view>
						<view class="opertion-button" style="background-color: #ED1C24;" @click="delProduct(item.id)"><text>产品删除</text></view>
						<view class="opertion-button" style="background-color: #F37B1D;" @click="addPlan(item.id)"><text>添加计划</text></view>

					</view> -->
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>

	</view>
</template>


<script>
	import {
		getPersonalProduct,
		deleteProduct,
	} from '../../api/product/product.js';
	export default {
		data() {
			return {
				options1: [
				{
					text: "编辑",
					style: {
						backgroundColor: '#39B54A',
					}
				},
				{
					text: "复制",
					style: {
						backgroundColor: '#00aaff',
					}
				},
				{
					text: "删除",
					style: {
						backgroundColor: 'red',
					}
				},
				{
					text: "计划",
					style: {
						backgroundColor: ' #F37B1D',
					}
				},
				],
				list: []
			};
		},
		onShow() {
			getPersonalProduct({
				serType: 1
			}).then(res => {
				console.log(res)
				this.list = res.data;
			});
		},
		methods: {
			dealProduct: function(e, productId) {
				console.log(e)
				
				if (e.content.text == "编辑") {
					uni.navigateTo({
						url: './addProduct?productId=' + productId + '&type=' + 1
					
					});
				}
				else if (e.content.text == "复制") {
					uni.navigateTo({
						url: './addProduct?productId=' + productId + '&type=' + 0
					
					});
				}
				else if (e.content.text == "删除") {
					uni.showModal({
						title: '提示',
						content: '确定删除该产品吗？',
						success: confirmRes => {
							if (confirmRes.confirm) {
								deleteProduct({
									id: productId
								}).then(res => {
									console.log(res)
									if (res.status == '1') {
										uni.showModal({
											showCancel: false,
											title: '提示',
											content: '删除成功'
										});
										getPersonalProduct({
											serType: 1
										}).then(res => {
											console.log(res)
											this.list = res.data;
										});
									} else {
										uni.showModal({
											showCancel: false,
											title: '提示',
											content: res.errMessage
										});
									}
								}).catch(err => {
					
								})
							}
						}
					});
				}
				else {
					uni.navigateTo({
						url: './productPlan?productId=' + productId
					
					});
				}
			
			
			},
			editProduct(productId) {
				uni.navigateTo({
					url: './addProduct?productId=' + productId + '&type=' + 1

				});
			},

			copyProduct(productId) {
				uni.navigateTo({
					url: './addProduct?productId=' + productId + '&type=' + 0

				});
			},

			addPlan(productId) {
				uni.navigateTo({
					url: './productPlan?productId=' + productId

				});
			},

			delProduct(productId) {
				uni.showModal({
					title: '提示',
					content: '确定删除该产品吗？',
					success: confirmRes => {
						if (confirmRes.confirm) {
							deleteProduct({
								id: productId
							}).then(res => {
								console.log(res)
								if (res.status == '1') {
									uni.showModal({
										showCancel: false,
										title: '提示',
										content: '删除成功'
									});
									getPersonalProduct({
										serType: 1
									}).then(res => {
										console.log(res)
										this.list = res.data;
									});
								} else {
									uni.showModal({
										showCancel: false,
										title: '提示',
										content: res.errMessage
									});
								}
							}).catch(err => {

							})
						}
					}
				});

			}

		}
	}
</script>

<style lang="scss">
	.container {
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		// width: 750rpx;
		height: auto;

		.detail-container {
			width: 100%;
			height: auto;
			padding: 10px;
			display: flex;
			flex-direction: column;
			align-items: center;
			// margin-bottom: 5px;
			background-color: #FFFFFF;
			border-bottom: 5px solid #b8b8b8;
			.detail-row {
				min-width: 600rpx;
				width: auto;
				height: auto;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 5px;

				.opertion-button {
					padding: 5px 10px 5px 10px;
					border-radius: 5px;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
