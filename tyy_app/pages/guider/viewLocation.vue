<template>
	<view>
		<map style="width: 100%; height: 100vh;" :latitude="latitude" :longitude="longitude" :markers="mapList" :polyline="polylines" @markertap='markertap' :scale="15" />
	</view>
</template>

<script>
	import {
		guiderPunchMap
	} from '../../api/guider/guider.js';
	export default {
		data() {
			return {
				polylines: [{
					points: [],
					arrowLine: true,
					dottedLine: true,
					width: 2,
					color: '#8A2BE2'
				}],
				mapList: [],
				longitude: 0,
				latitude: 0,
				groupId: '',
				locationName:'',
				locationContent:''
			}
		},
		

		onLoad(options) {
			var that = this
			that.longitude = options.locationLongitude
			that.latitude = options.locationLatitude
			that.locationName = options.locationName
			that.locationContent= options.locationContent
					var markers = {
						id: '',
						title: '',
						latitude: '',
						longitude: '',
						label: {
							content: '',
							color: 'black',
							fontSize: 15,
							borderWidth: 2,
							bgColor: '#FFFFFF',
							borderColor: '#7acfa6',
							textAlign: 'center'
						},
						width: 50,
						height: 70,
						iconPath: '../../static/icon_position.png'
					}
					// markers.id = res.data[i].id
					markers.longitude = options.locationLongitude
					markers.latitude = options.locationLatitude
					markers.title = options.locationName
					markers.label.content = '集合地点:' + options.locationContent + '\n'
					that.mapList.push(markers)
					var points1 ={
						latitude: '',
						longitude: ''
					}
					points1.longitude = options.locationLongitude
					points1.latitude = options.locationLatitude
				   that.polylines[0].points.push(points1)
				console.log(that.mapList)

		},
		methods: {
			markertap:function(){
				// let lat = parseDouble(this.latitude)
				// let lnt = parseDouble(this.longitude)
				// console.log(typeof Number(this.latitude));
				// console.log((this.latitude));
				
				uni.openLocation({
                            latitude: Number(this.latitude)   , 
                            longitude: Number(this.longitude),
                            name: this.locationName,//地址名称
                            address: this.locationContent,//详细地址名称
                            success: function () {
                                console.log('导航成功');
                            },
                            fail:function(error){
                                console.log(error)
          }
   });

			}
		},
	}
</script>

<style>
</style>
