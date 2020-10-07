<template>
	<view>
		<uni-section title="团队列表" type="line"></uni-section>
		<uni-swipe-action>
			<uni-swipe-action-item v-for="(item,index) in groupList" :options="options2" :key="item.groupId"  @click="swipeClick($event,index,item.groupId)">
				<text class="cont">{{item.groupNum}}-{{item.groupName}}</text>
			</uni-swipe-action-item>
		</uni-swipe-action>
	</view>
</template>

<script>

	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/wxcomponts/uni-swipe-action-item/uni-swipe-action-item.vue'
	import {
		getPlanGroups
	} from '../../api/group/group.js';
	import {
		deleteGroups
	} from '../../api/group/group.js';
	export default {
		 components: {
		 uniSection,
		 uniSwipeAction,
		 uniSwipeActionItem
		 },
		 data() {
		 		return {
		 			planId: '2',
		 			showdetail: false,
		 			projectId: '',
		 			list: [],
					options2: [{
						text: '拼团',
						style: {
							backgroundColor: '#7acfa6'
						}
					}, 
					{
						text: '编辑',
						style: {
							backgroundColor: 'Magenta'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: 'rgb(255,58,49)'
						}
					}],
		 			instanceId: '',
		 			instanceName: '',
		 			retType: '',
		 			groupList: []
		 		}
		 	},
		 	onLoad(options) {
		 		this.planId = options.planId
		 		getPlanGroups({planId: this.planId}).then(res => {
		 						this.groupList = res.data
		 						
		 						
		 					}).catch(err => {
		 						
		 					})
		 	},
		 	methods:{
		 	
		 		submit(){
		 			uni.navigateTo({
		 				url:'./onlyTianjia?projectId='+this.projectId+''
		 			})
		 		},
				swipeClick(e, index,groupId) {
					let {
						content
					} = e
					if (content.text === '删除') {
						uni.showModal({
							title: '提示',
							content: '是否删除',
							success: (res) => {
								if (res.confirm) {
									
									deleteGroups({groupId:groupId}).then(res => {
													 
														 this.groupList.splice(index,1);
													
												
												}).catch(err => {
													
												})
								} else  {
									uni.showToast({
										title: `已取消操作`,
										icon: 'none'
									})
								}
							}
						});
					} else if (content.text === '拼团') {
						uni.navigateTo({
							url:'./groupPintuan?groupId='+groupId+'&&planId='+this.planId+''
						})
						
					}else if (content.text === '编辑') {
						uni.navigateTo({
							url:'./groupDetail?groupId='+groupId+'&&planId='+this.planId+''
						})
						
					}
							
				}
							
		 	}
		 }
</script>

<style>
	.cont {
		flex: 1;
		height: 45px;
		line-height: 45px;
		padding: 0 15px;
		position: relative;
		background-color: #fff;
		font-size: 15px;
		border-bottom-color: #F5F5F5;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}
	
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}
	
	/* #endif */
	
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}
	
	view {
		font-size: 14px;
		line-height: inherit;
	}
	
	.example {
		padding: 0 15px 15px;
	}
	
	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}
	
	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}
	
	/* #endif */
	.example {
		padding: 0 15px;
	}
	
	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}
	
	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}
	
	
	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}
	
	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}
	
	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}
	
	.word-btn--hover {
		background-color: #4ca2ff;
	}
	
	
	
	.search-result {
		margin-top: 10px;
		margin-bottom: 20px;
		text-align: center;
	}
	
	.search-result-text {
		text-align: center;
		font-size: 14px;
	}
	
	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 0px;
	}
</style>
