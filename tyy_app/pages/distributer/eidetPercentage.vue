<template>
	<view>
		<uni-section style="height: 7vh;" title="请设置分成比例" type="line" />
		<view class="horizontal">
			<!-- 反转  进度值在拖柄内 进度值字体大小设置 拖柄颜色设置-->
			<bing-progress class="bp" infoEndText="%" infoAlign="handle" infoColor="#ffffff" infoFontSize="14px" handleColor="#aa55ff"  barBorderRadius="20px" backgroundColor="#E0E0E0" bpBorderRadius="20px"
			:subValue="subValue" :value="value" @dragend="dragend" activeColor="#96FED1"></bing-progress>
		</view>
		
		<text class="mix-btn" @click="submit">提交</text>
	</view>
</template>

<script>
	import bingProgress from '../../components/bing-progress/bing-progress.vue'
	import {
		getPercentageByPerson
	} from '../../api/guider/guider.js';
	import {
		shezhifencheng
	} from '../../api/guider/guider.js';
	export default {
		components: {
			bingProgress
		},
		data() {
			return {
				adminId: '',
				value: 0,
				subValue: 0,
				percentage:'',
				
			}
		},
		onLoad(options) {
			this.adminId = options.adminId
			getPercentageByPerson({
				'adminId': this.adminId
			}).then(res => {
				this.value = res.data.percentage
				})
		},
		methods: {
			dragend(e) {
				this.percentage = e
			},
			submit(){
				
				
				shezhifencheng({
					'adminId': this.adminId,'value': this.percentage.value
				}).then(res => {
					uni.navigateBack()
					})
			}
			}
	}
</script>

<style lang="scss">
	.bp {
		margin: 5px;
	} 
	.horizontal {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
