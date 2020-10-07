<template>
			<view>
			<uni-section style="height: 7vh;" title="选择产品" type="line" />
			<view class="item-t" v-for="(item, index) in groupList" :key="index"
			        @click="viewJournal(item)"
			>
				<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;">
					<view style="margin-bottom: 3px;">
						<text>{{  item.name }}</text>
					</view>
				</view>
			</view>
		</view>
</template>

<script>
import { tuoke } from '../../api/guider/guider.js';
	export default {

		data() {
			return {
				groupList:[],

			};
		},

		onShow() {
			tuoke().then(res => {
				this.groupList = res.data
			});
		},
		methods: {
				viewJournal(item){
			uni.navigateTo({
				url: '/pages/distributer/tuokeDetail?code='+item.code+'&productId='+item.productId+''
			})
		},
		}
	}
</script>

<style lang="scss">
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
</style>
