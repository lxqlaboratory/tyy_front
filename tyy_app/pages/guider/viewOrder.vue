<!-- <template>
			<view>
			<uni-section style="height: 7vh;" title="选择订单" type="line" />
			<view class="item-t" v-for="(item, index) in dataList" :key="index"
			        @click="viewOrderDetile(item)"
			>
				<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;">
					<view style="margin-bottom: 3px;">
						<text>{{  item.locationName }}</text>
					</view>
					<view style="margin-bottom: 3px;">{{  item.locationContent }}</view>
					<view style="margin-bottom: 3px;">{{  item.collectTime }}</view>		
				</view>
			</view>
		</view>
</template>


<script>
	import { viewOrder} from '../../api/guider/guider.js';
	export default{
		data() {
			return {
				id:'',
				dataList: [],
			};
		},
		onLoad(options){
			this.groupId = options.groupId
			viewOrder({groupId:this.groupId}).then(res => {
							this.dataList = res.data
						}).catch(err => {
							
						})
			
		},
		methods:{
		viewOrderDetile(item){
			uni.navigateTo({
				url: '/pages/guider/viewOrderDetile?id='+item.id+'&locationName='+item.locationName+'&locationContent='+item.locationContent+'&locationLongitude='+item.locationLongitude+'&locationLatitude='+item.locationLatitude+' '
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
 -->
 
 
 <template>
 	<view>
 		<map style="width: 100%; height: 100vh;" :latitude="latitude" :longitude="longitude" :markers="mapList" :polyline="polylines"  :scale="10" @markertap='markertap' />
 	</view>
 </template>
 
 <script>
	import { viewOrder} from '../../api/guider/guider.js';
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
 				groupId: '',
				id:'',
				dataList: [],
 			}
 		},
 		onLoad(options) {
 			var that = this
 			this.groupId = options.groupId
 			viewOrder({
 				'groupId': this.groupId
 			}).then(res => {
 				that.longitude = res.data.locationData[0].locationLongitude
 				that.latitude = res.data.locationData[0].locationLatitude
 				for (var i = 0; i < res.data.locationData.length; i++) {
 					var markers = {
 						id: '',
 						title: '',
 						latitude: '',
 						longitude: '',
 						label: {
 							content: '',
 							color: 'black',
 							fontSize: 11,
 							borderWidth: 1,
 							bgColor: '#FFFFFF',
 							borderColor: '#7acfa6',
 							textAlign: 'center'
 						},
 						width: 30,
 						height: 40,
 						iconPath: '../../static/icon_position.png'
 					}
 					markers.id = res.data.locationData[i].locationId
 					markers.longitude = res.data.locationData[i].locationLongitude
 					markers.latitude = res.data.locationData[i].locationLatitude
 					markers.title = res.data.locationData[i].locationName
					markers.label.content = '集合地点:' + res.data.locationData[i].locationContent + '\n' 
 					markers.label.content = '集合地点:' + res.data.locationData[i].locationContent + '\n' + '带团人数:' + res.data.locationData[i].tourNum
 					that.mapList.push(markers)
 					var points1 ={
 						latitude: '',
 						longitude: ''
 					}
 					points1.longitude = res.data.locationData[i].locationLongitude
 					points1.latitude = res.data.locationData[i].locationLatitude
 				   that.polylines[0].points.push(points1)
 				}
 				console.log(that.mapList)
 			});
 		},
		methods:{
  markertap:function(e){
   //  console.log("this.groupId=="+this.groupId);
			uni.navigateTo({				
				url: '/pages/guider/viewOrderDetile?locationId='+e.detail.markerId+'&groupId='+this.groupId+''
			})
   
		}
 	},
	}
 </script>
 
 <style>
 </style>
 