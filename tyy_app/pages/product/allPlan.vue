<template>
	<view class="container">
		<drag-button :isDock="true" :existTabBar="false" firstText="添 加" secondText="计 划" @btnClick="navigateAddPlan" />
		<uni-section title="计划列表" type="line" />
			<uni-swipe-action>
				<uni-swipe-action-item v-for="(item,index) in list" :options="options1" :key=item.id @click="dealPlan($event,item.id,item.proId)">
					<view class="detail-container">
						<view class="detail-row">
							<text>所属产品</text>
							<text>{{item.proName}}</text>
						</view>
						<view class="detail-row">
							<text>计划编号</text>
							<text>{{item.planNum}}</text>
						</view>
						<view class="detail-row">
							<text>出团时间</text>
							<text>{{item.travelDate}}</text>
						</view>
						<view class="detail-row">
							<view>
								<text>计划人数</text>
							</view>
							<view>
								<text>{{item.numTourist}}/</text>
								<text style="color: #ED1C24;">{{item.numLimit}}</text>
								<text>人</text>
							</view>
							
							
						</view>
						<view class="detail-row">
							<text>已确认订单数</text>
							<text>{{item.surOrderNum}}</text>
						</view>
						<view class="detail-row">
							<text>未确认订单数</text>
							<text style="color: #ED1C24;">{{item.noOrderNum}}</text>
						</view>
						<view v-if="item.saleState==1" class="detail-row">
							<text>销售状态</text>
							<text style="color: #39B54A;">正常销售</text>
						</view>
						<view v-if="item.saleState==0" class="detail-row">
							<text>销售状态</text>
							<text style="color: #ED1C24;">暂停销售</text>
						</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		<view style="background-color: #FFFFFF;">
			<paging :total="total" activecolor="#ffffff" background="#dedede" activebackground="#00BFFF" :pageSize='10' :footer="false" :current="current" @changes="pageChange"></paging>
		</view>
		
	</view>
</template>

<script>
	import {
		getAllPlan,
		deletePlan
	} from '../../api/product/plan.js';
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
					text: "删除",
					style: {
						backgroundColor: '#F37B1D',
					}
				},
				{
					text: "订单",
					style: {
						backgroundColor: 'orange',
					}
				},
				{
					text: "团队",
					style: {
						backgroundColor: ' #00aaff',
					}
				},
				{
					text: "创团",
					style: {
						backgroundColor: ' DeepPink',
					}
				}
				],
				list: [],
				total:1,
				current:1,
				numberOfElements:10
			};
		},
		onShow() {
			uni.showLoading({
			    title: '加载中',
				mask:'true'
			});
			getAllPlan({
				pageNum: 1,
				pageSize: 10,
				pageSorted: "desc",
				planDate: [],
				planNum: "",
				proName: "",
				proNum: "",
				saleState: "",
			}).then(res => {
				console.log(res)
				this.list = res.data.content;
				this.total=res.data.totalElements
				this.numberOfElements=res.data.numberOfElements
				uni.hideLoading();
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 0
				});
			});
		},
		methods: {
			pageChange(index){
				this.current=index
				uni.showLoading({
				    title: '加载中',
					mask:'true'
				});
				getAllPlan({
					pageNum: index,
					pageSize: 10,
					pageSorted: "desc",
					planDate: [],
					planNum: "",
					proName: "",
					proNum: "",
					saleState: "",
				}).then(res => {
					console.log(res)
					this.list = res.data.content;
					this.total=res.data.totalElements
					this.numberOfElements=res.data.numberOfElements
					uni.hideLoading();
					uni.pageScrollTo({
					    scrollTop: 0,
					    duration: 0
					});
				});
			},
			navigateAddPlan() {
				uni.navigateTo({
					url: './addPlan'
			
				});
			},
	
	
			dealPlan: function(e, planId,proId) {
				console.log(planId)
				
				if (e.content.text == "团队") {
					uni.navigateTo({
						url:'../group/manageGroup?planId='+planId+''
					
					});
				}
				else if (e.content.text == "创团") {
					uni.navigateTo({
						url:'../group/addgroup?planId=' + planId + ''
					
					});
				}
				else if (e.content.text == "编辑") {
					uni.navigateTo({
						url: './editPlan?planId=' + planId + '&type=' + 0 +'&productId='+proId+''
					
					});
				}
				else if (e.content.text == "删除") {
					uni.showModal({
						title: '提示',
						content: '该计划将被永久删除，计划下有订单将不可删除，请删除先下属订单。建议使用 “编辑-销售状态” 替代',
						success: confirmRes => {
							if (confirmRes.confirm) {
								uni.showLoading({
								    title: '加载中',
									mask:'true'
								});
								deletePlan({
									id: planId
								}).then(res => {
									console.log(res)
									if (res.status == '1') {
										if(this.numberOfElements==1){
											this.current=this.current-1
										}
										getAllPlan({
											pageNum: this.current,
											pageSize: 10,
											pageSorted: "desc",
											planDate: [],
											planNum: "",
											proName: "",
											proNum: "",
											saleState: "",
										}).then(res => {
											console.log(res)
											this.list = res.data.content;
											this.total=res.data.totalElements
											this.numberOfElements=res.data.numberOfElements
											uni.hideLoading();
											uni.showModal({
												showCancel: false,
												title: '提示',
												content: '删除成功'
											});
										});
									} else {
										uni.hideLoading();
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
	
		}
	}
</script>
	
<style lang="scss">
	.container {
		height: auto;
		margin-bottom: 10px;
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
