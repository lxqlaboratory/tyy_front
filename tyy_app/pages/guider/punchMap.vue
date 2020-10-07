<template>
	<view>
		<map style="width: 100%; height: 100vh;" :latitude="latitude" :longitude="longitude" :markers="mapList" :polyline="polylines"  :scale="15" />
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
				longitude: '',
				latitude: '',
				groupId: ''
			}
		},
		onLoad(options) {
			var that = this
			this.groupId = options.groupId
			guiderPunchMap({
				'groupId': this.groupId
			}).then(res => {
				that.longitude = res.data[0].locationLongitude
				that.latitude = res.data[0].locationLatitude
				for (var i = 0; i < res.data.length; i++) {
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
					markers.id = res.data[i].id
					markers.longitude = res.data[i].locationLongitude
					markers.latitude = res.data[i].locationLatitude
					markers.title = res.data[i].locationName
					markers.label.content = '集合地点:' + res.data[i].locationContent + '\n' + '带团人数:' + res.data[i].touNum
					that.mapList.push(markers)
					var points1 ={
						latitude: '',
						longitude: ''
					}
					points1.longitude = res.data[i].locationLongitude
					points1.latitude = res.data[i].locationLatitude
				   that.polylines[0].points.push(points1)
				}
				console.log(that.mapList)
			});
		},
	}
</script>

<style>
</style>
