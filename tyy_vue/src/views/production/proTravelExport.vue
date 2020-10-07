<template>
  <div class="app-container">


  </div>
</template>

<script>
    import {getProductInfo} from "@/api/production";

    export default {
        name: "exportTravel",
        data() {
            return {
                center: {lng: 0, lat: 0},
                proData: {
                    proName: '',
                    proNum: '',
                    travelDateNum: '',
                    proScene: '',
                    proDes:'',
                    proTravel:[],
                    proServer:'',
                    proBuy:'',
                    proNotice:'',
                    proAution:'',
                    proPriStan:'',
                }
            }
        },
        created() {
            this.getProData()
        },
        computed: {
        },
        methods: {
            getProData(){
                getProductInfo(this.$route.query.id).then(res=>{
                    this.proData.proName=res.name;
                    this.proData.proNum=res.proNum;
                    this.proData.travelDateNum=res.travelDateNum;
                    this.proData.proScene=res.proScene;
                    this.proData.proDes=res.proDes;
                    this.proData.proTravel=res.proTravel;
                    this.proData.proServer=res.proServer;
                    this.proData.proBuy=res.proBuy;
                    this.proNotice=res.proNotice;
                    this.proData.proAution=re.proAution;
                    this.proData.proPriStan=res.proPriStan;
                }).catch(err=>{

                })
            },
        }
    }
</script>

<style scoped>

  .bm-view {
    margin-top: 15px;
    width: 80%;
    height: 500px;
  }
</style>
