<template>
	<view>
		<imageupload :count="4" :length="8" :restype="8" v-model="imgRidList"></imageupload>
		<button type="primary" @click="save"> 定位</button>
		
		<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="markers" :polyline="polylines" ></map>
			
		<view>
		</view>
	</view>
</template>

<script>
	import imageupload from '../../components/upload-images.vue'
	export default {
		data() {
			return {
				  id:0, // 使用 marker点击事件 需要填写id
				            title: 'map',
				            latitude: 23.043594,
				            longitude: 113.160704,
							markers:[{
													title: '123',
													latitude: 23.043594,
													longitude: 113.160704,
													width: 50,
													height: 70,
													iconPath: '../../static/icon_position.png'
												},
												{
													title: '123',
													latitude: 23.036344,
													longitude: 113.160704,
													width: 50,
													height: 70,
													iconPath: '../../static/icon_position.png'
												},
												{
													title: '123',
													latitude: 23.03528,
													longitude: 113.149565,
													width: 50,
													height: 70,
													iconPath: '../../static/icon_position.png'
												},
												{
													title: '123',
													latitude: 23.03794,
													longitude: 113.138498,
													width: 50,
													height: 70,
													iconPath: '../../static/icon_position.png'
												},
												{
													title: '123',
													latitude: 23.049247,
													longitude: 113.145684,
													width: 50,
													height: 70,
													iconPath: '../../static/icon_position.png'
												},
											],
							
							polylines:[{
												points: [{
														latitude: 23.043594,
														longitude: 113.160704
													},
													{
														latitude: 23.036344,
														longitude: 113.160704
													},
													{
														latitude: 23.03528,
														longitude: 113.149565
													},
													{
														latitude: 23.03794,
														longitude: 113.138498
													},
													{
														latitude: 23.049247,
														longitude: 113.145684
													}
												],
												arrowLine: true,
												dottedLine: true,
												// arrowIconPath: "../../static/arrow_right.png",
												width: 3,
												color: '#303133'
											}],
						
				imgRidList: []
			}
		},
		components: {
			imageupload
		},
		onLoad: function() {
		
		},
		onShow: function() {
			
		},
			methods: {
				save() {
					uni.chooseLocation({
					    success: function (res) {
					        console.log('位置名称：' + res.name);
					        console.log('详细地址：' + res.address);
					        console.log('纬度：' + res.latitude);
					        console.log('经度：' + res.longitude);
					    }
					});
				}
			}
		}
</script>

<style>

</style>
