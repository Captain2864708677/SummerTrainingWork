<template>
    <div id="orderDetail" class="detail-content">
        <!--导航栏-->
        <van-nav-bar
                title="我的订单"
                left-arrow
                :fixed=true
                :border=true
                @click-left="$router.go(-1)"
        >
        </van-nav-bar>

        <van-tabs @click="setState">
            <van-tab  v-for="(item,idx) in tabs":key="idx" :title=item.title :name=item.name ></van-tab>
        </van-tabs>

        <div>
            <list
            :select="query.stateId">
            </list>
        </div>

    </div>
</template>

<script>
    import list from '../list'
    export default {
        name: "index",
        data() {
            return {
                activeName: 'a',
                tabs:[
                    {title:'全部',name:0},
                    {title:'待付款',name:1},
                    {title:'待发货',name:2},
                    {title:'待收货',name:3},
                    {title:'已完成',name:4},
                ],
                cartList:[],
                productId:'',
                url: {
                    list: '/cms-shopping-cart/list',
                },
                query: {
                    productId: 1,
                    stateId:0,
                },
            }
        },
        components:{
            list
        },
        created() {
            this.getData()
        },
        methods: {
            getData() {
                this.get(this.url.list, this.query, response => {
                    this.cartList = response
                    console.log(response)
                })
            },
            setState(idx){
                this.query.stateId = this.tabs[idx].name
            },
        }
    }
</script>

<style scoped>
.detail-content{
    /*height: 100%;*/
    margin-top: 40px;
}
</style>