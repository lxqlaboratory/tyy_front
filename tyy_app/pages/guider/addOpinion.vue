<template>		
	<view class="container">
		<view class="c-list">
			<uni-section style="height: 7vh;" title="上传意见单(长按图片可以删除)" type="line" />
			
			<view class="item-t" v-for="(item, index) in dataList" :key="index"
			>
				<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;">
					<view style="margin-bottom: 3px;">
						<text>{{  item.touName }}</text>
					</view>
					<view style="margin-bottom: 3px;">{{  item.phone }}</view>
				</view>
				<view class="image-wrapper" v-show="item.photo!==''">
					<image :src="item.photo" @tap="_previewImage(item.photo)" @longtap="longtap(item,index)" ></image>
				</view>
				<view v-show="item.photo===''">
				<view style="display: flex;flex-direction: column;justify-content: left;">
					<imageupload :count="1" :length="1" :restype="8" v-model="imgRidList[index]"></imageupload>
				</view>					
				</view>
			</view>
				<button class="confirm-btn" @click="submit" >上传</button>				
		</view>
	</view>		
		
</template>


<script>
	import imageupload from '../../components/upload-images_zxx.vue'
	import { getGatherTou} from '../../api/guider/guider.js';
	import { addOpinion} from '../../api/guider/guider.js';
	import { delOpinion} from '../../api/guider/guider.js';
	
	export default{
		data() {
			return {
				id:'',
				dataList: [],
				imgRidList: [],
				photo :[],
				size:0,
				groupId:''
			};
		},
		components: {
			imageupload
		},		
		onLoad(options){
			this.groupId = options.groupId
			getGatherTou({groupId:this.groupId}).then(res => {
					if(res.status==0){
						uni.showModal({
					    title: '提示',
						showCancel: false,
						confirmColor: "#000000",
					    content: res.errMessage,
					    success: function (res) {
					        if (res.confirm) {
								 uni.navigateBack()
					        } 
					    }
					});
				}
							this.dataList = res.data
							this.size = this.dataList.length
							// console.log(this.dataList[0].touName)
						}).catch(err => {
							
						})
			
		},
		methods:{
			longtap(item,index){
				uni.showModal({
				title: '提示',
				content: '删除该图片',
				success: function (res) {
				if (res.cancel) {
					
				} else if (res.confirm) {
				  delOpinion({dataList:item}).then(res=>{
				  	if(res.status==1){
				  			uni.showModal({
				  		    title: '提示',
				  			showCancel: false,
				  			confirmColor: "#000000",
				  		    content: res.data,
				  		    success: function (res) {
				  		        if (res.confirm) {
									item.photo = ''
									// onLoad()
				  			     // uni.navigateBack()
				  		        } 
				  		    }
				  		});
				  	}else{
				  	uni.showModal({
				  	    title: '提示',
				  		showCancel: false,
				  		confirmColor: "#000000",
				  	    content: res.errMessage,
				  	});						
				  	}				
				})					
					}
				}
			});
		},
				_previewImage(image) {
				var imgArr = [];
				imgArr.push(image);
				//预览图片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[0]
				});
			},
					submit() {
						for (var i = 0; i < this.dataList.length; i++) {
							if(this.imgRidList[i]!=null) 						
							this.dataList[i].photo = this.imgRidList[i][0].rId
							console.log("this.dataList[i].photo===="+this.dataList[i].photo)
						}
						addOpinion({dataList:this.dataList}).then(res=>{
							if(res.status==1){
									uni.showModal({
								    title: '提示',
									showCancel: false,
									confirmColor: "#000000",
								    content: res.data,
								    success: function (res) {
								        if (res.confirm) {
									     uni.navigateBack()
								        } 
								    }
								});
							}else{
							uni.showModal({
							    title: '提示',
								showCancel: false,
								confirmColor: "#000000",
							    content: res.errMessage,
							});						
							}				
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
  	.confirm-btn{
  width: 630upx;
  height: 76upx;
  line-height: 76upx;
  border-radius: 50px;
  margin-top: 120upx;
  background: $uni-color-primary;
  color: #fff;
  font-size: $font-lg;
  &:after{
  	border-radius: 100px;
  }
  }
  		.image-wrapper{
  	width: 150upx;
  	height: 150upx;
  	border-radius: 3px;
	margin-right: 30upx;
	margin-bottom: 30upx;
  	overflow: hidden;
  	image{
  		width: 100%;
  		height: 100%;
  		opacity: 1;
  	}
  }
</style>
