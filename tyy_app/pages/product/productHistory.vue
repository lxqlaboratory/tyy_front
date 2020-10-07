<template>
	<view>
		<uni-section style="height: 7vh;" title="分销历史" type="line" />


		<view class="item-t" v-for="item in list" :key=item.productId>
			<!-- <view>
				<text>{{ '产品名称：' + '  ' + item.productName }}</text>
			</view> -->

			<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;">
				<view style="margin-bottom: 3px;">
					<text>{{ '产品名称：' + '  ' + item.productName }}</text>
				</view>
				<view style="margin-bottom: 3px;">{{ '产品编号：' + '  ' + item.code }}</view>
				<view>{{ '转发日期：' + '  ' + item.createTime }}</view>
			</view>
			<view style="display: flex;flex-direction: column;justify-content: left;">
				<view class="f-button" @click="chakan(item.groupId)">
					查看详情
				</view>
			</view>


		</view>

	</view>
</template>

<script>
	import {
		fenxiaoHistory
	} from '../../api/product/product.js';
	export default {
		data() {
			return {
				longitude: '',
				latitude: '',
				list: [{
						productId: 0,
						productName: "牙膏",
						code: "000001",
						createTime: 2020 - 1 - 30
					},
					{
						productId: 1,
						productName: "牙刷",
						code: "000002",
						createTime: 2020 - 1 - 30
					},
				]
			};
		},
		onShow() {
			// fenxiaoHistory().then(res => {
			// 	this.list = res.data;
			// });
		},
		methods: {
			chakan(groupId) {
				uni.navigateTo({
					url: './punchMap?groupId=' + groupId + ''

				});
			}

		}
	}
</script>

<style scoped>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	.item-t {

		width: 100%;
		padding: 15px;
		border-bottom: 1px solid DarkGray;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: white;
	}

	.item-bottom {

		width: 100%;
		padding: 15px;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: white;
	}

	.f-button {
		font-size: 13px;
		padding: 5px 15px;
		background-color: WhiteSmoke;
		color: Black;
		border-radius: 5px;
		border: 1px solid Gray;
	}
</style>
