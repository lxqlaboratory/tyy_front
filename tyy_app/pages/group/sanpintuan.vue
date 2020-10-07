<template>
	<view>
		<uni-section title="请选择团队" type="line"></uni-section>
		<view class="adBaseView" v-for="items in groupList" :key="items.groupId" @click="submit1(items.groupId,items.groupNum)">
			<view class="cloumnlist">
				团队名称：{{items.groupName}}
			</view>
			<view class="cloumnlist">
				团队编号：{{items.groupNum}}
			</view>
			<view class="cloumnlist">
				发团日期：{{items.date}}
			</view>
			<view class="bottomLine2" />
		</view>
	</view>

</template>

<script>
	import {
		getALLGroups
	} from '../../api/group/group.js';
	import {
		orderListFindGroups
	} from '../../api/group/group.js';
	export default {
		data() {
			return {
				locationName: '',
				showdetail: false,
				groupList: '',
				list: [],
				instanceId: '',
				instanceName: '',
				retType: '',
				orderList: [],
				weipintuanList: []
			}
		},
		onLoad(options) {
			this.list = JSON.parse(decodeURIComponent(options.data))
			console.log(this.list)
			getALLGroups().then(res => {
				this.groupList = res.data
			}).catch(err => {

			})
		},
		methods: {

			submit1(groupId, groupNum) {
				var that =this
				uni.showModal({
					title: '提示',
					showCancel: true,
					confirmColor: "#000000",
					content: '是否选择' + groupNum,
					success: function(res) {
						if (res.confirm) {
							orderListFindGroups({
								list: that.list,
								groupId: groupId
							}).then(res => {
								uni.switchTab({
									url:'../indexcom/menu'
								})
							}).catch(err => {

							})
						}
					}
				});

			},
			tijiaozi() {

				console.log(this.list)
				orderListFindGroups({
					list: this.list
				}).then(res => {
					this.orderList = res.data

					this.$refs.checkbox.set({
						type: 'checkbox', // 类型：复选框
						column: 1, // 分列：3
						list: this.orderList
					});
				}).catch(err => {

				})
			}

		}
	}
</script>

<style lang="scss">
	.adBaseView {
		width: 100%;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 20upx;
	}

	.cloumnlist {
		text-align: center;
		/* margin-left: 30upx; */
		font-size: 28upx;
	}

	.bottomLine2 {
		width: 100%;
		height: 2upx;
		background-color: #DDDDDD;
		margin-top: 20upx;
	}

	.tt {
		margin-top: 5upx;
		width: 60%;
		height: auto;
		font-size: 28upx;
		margin-bottom: 8upx;
	}
</style>
