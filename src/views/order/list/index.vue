<template>
    <div>

        <!--分类 级联下拉框-->
        <div>

            <!-- 卡片列表 -->
            <div class="list-style" id="list-card">
                <van-list
                        v-model:loading="liststate.loading"
                        :finished="liststate.finished"
                        finished-text="没有更多了"
                        @load="listonLoad">

                        <van-card
                    class="van-card"
                    v-for="(item,idx) in liststate.list" :key="idx"
                    :price=item.price
                    :title=item.productName
                    :desc=item.detail
                    :num=item.productNum
                    :thumb=img(item.img)
                    @click="orderDetail(item.id)"
                    >
                            <template #footer>
                                <van-row class="card-foot">
                                    <van-col span="7"></van-col>
                                    <van-col span="8">
                                        <div style="color: red;font-size:12px ">总价：￥{{item.price*item.productNum}}</div>
                                    </van-col>
                                    <van-col span="2"></van-col>
                                    <van-col span="7">
                                        <div v-if="item.stateId === 1">
                                            <van-button class="card-btn" size="mini" @click="pay(item.id)">付款</van-button>
                                        </div>
                                        <div style="border: 1px solid red" v-else-if="item.stateId === 2">
                                            等待商家发货
                                        </div>
                                        <div v-else-if="item.stateId === 3">
                                            <van-button class="card-btn" size="mini" @click="take(item.id)">确认收货</van-button>
                                        </div>
                                        <div style="" v-else-if="item.stateId === 4">
                                            订单已完成
                                        </div>
                                    </van-col>
                                </van-row>
                            </template>

                    </van-card>
                </van-list>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Tab",
        data(){
            return{
                liststate:{
                    list: [],//订单列表
                    loading: false,
                    finished: false,
                },
                query:{
                    customerId:1,
                    orderId:'',
                },
                orderList:[],
                productId:'',
                isSearch:true,
            }
        },
        props:{
          select:'',//tab选中的订单状态
            aim:''
        },
        watch:{
            select: function (newval,oldval) {
                console.log('s old:',oldval,' new:',newval)
                this.select = newval
                this.listonLoad()
            },
        },
        create(){
            // this.productId = -1
            this.select = 0
            console.log(this.select)
            this.listonLoad()
        },
        methods:{
            listonLoad(){
                if(this.select === 0){//全部订单
                    this.get('http://127.0.0.1:8090/cms-order/list',this.query,response =>{
                        this.liststate.list = response
                        console.log('order',response)
                        // this.count = this.liststate.list.length
                    })
                }else{//根据订单状态筛选
                    this.get('http://127.0.0.1:8090/cms-order/list',this.query,response =>{
                        this.liststate.list = response
                        let orders = this.liststate.list
                        let result = []
                        for(let i =0;i<orders.length;i++){
                            if(orders[i].stateId === this.select){
                                result.push(orders[i])
                            }
                        }
                        this.liststate.list = result
                    })
                }

                if(this.count != 0){
                    this.found = true
                }
              this.liststate.loading = false;
              this.finished = true;
          },
            pay(id){
                this.query.orderId = id
                this.get('http://127.0.0.1:8090/cms-order/pay',this.query,response =>{
                    console.log(response)
                    this.listonLoad()
                    console.log("payed",this.liststate.list)
                })
            },
            take(id){
                this.query.orderId = id
                this.get('http://127.0.0.1:8090/cms-order/take',this.query,response =>{
                    console.log(response)
                    this.listonLoad()
                    console.log("took",this.liststate.list)
                })
            },
            orderDetail(orderid){
                this.$router.push({path:'/orderDetail',query:{orderId:orderid}})
            },
        },
    }
</script>

<style lang="less" scoped>
    .card-btn{
        background-color: red;
        color: white;
        border-radius: 5px;
    }
    .van-dropdown-menu{
        background-color: #C22B2E;
        color: white;
    }
    .list-style{
        margin-top: .1rem;
        background: #eeeeee;
    }
    .hint-font{
        font-size: 0.2rem;
    }
    #list-card /deep/.van-card__thumb{
    }
    #list-card /deep/.van-card__title{
        /*font-weight: bolder;*/
        line-height: 0;
        font-size: .28rem;
        height:.5rem;
        overflow: unset;
        margin-top: .3rem;
    }
    #list-card /deep/.van-card__price{
        color: red;
        font-size: .3rem;
    }
    #list-card /deep/.van-card__header{
    }
    .van-card{
        text-align: left;
        width: 100%;
        /*height: 2rem;*/
        background: #ffffff;
        font-size: .25rem;
        /*card-title-line-height:20px;*/
        /*card-price-color:#C22B2E;*/

    }

    .product-detail{
        width:100%;
        height:90%;
        margin-bottom: 0;
        border-radius: 0;
    }

</style>