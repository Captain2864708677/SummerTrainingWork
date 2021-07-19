<template>
<div>

    <div>
        <div id="mine">
            <!--导航栏-->
        <van-nav-bar
                title="购物车"
                :fixed=true
                :border=false
        >
            <template #left>
                <van-icon name="cart-o" size="25" dot color="#ee0a24" />
            </template>
        </van-nav-bar>
        </div>

        <van-search
                v-model="query.productName"
                shape="round"
                background=white
                placeholder="请输入搜索关键词"
                class="van-search"
        >
            <template #left>
                <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" size="small" @click="search" >搜索</van-button>
            </template>
        </van-search>
        <van-notice-bar left-icon="volume-o" mode="closeable">东软睿购夏季大促7.23开始！全场优惠多多，满减多多！消费金额前一百名顾客更有机会赢取幸运大奖！</van-notice-bar>

</div>
        <div class="list" >
            <van-empty image="search" description="购物车空空如也，去添加商品吧^-^" v-show="emptyShow"/>
            <van-swipe-cell v-for="item in cartList":key="item.productId"  >
                <van-checkbox-group  v-model="checkGroup" @change="chooseChange()" v-if="item.active === 1">
                    <van-checkbox :name="item"
                                  checked-color=red
                    > </van-checkbox>

                    <van-card
                            tag="聚划算"
                            class="van-card"
                            :title="item.productName"
                            :price="item.price"
                            :thumb="img(item.img)"
                            @click-thumb="toDetail(item.productId)"
                    >
                        <template #price-top>
                            <van-count-down :time="999999" />
                        </template>
                        <template #tags>
                            <van-tag plain type="danger">{{item.detail}}</van-tag>
                        </template>
                        <template #footer>
                            <van-stepper v-model="item.productNum" @change="chooseChange()" theme="round" button-size="22" disable-input />
                        </template>
                    </van-card>
                </van-checkbox-group>
                <template #right>
                    <van-button square text="删除" type="danger" @click="del(item.productId,0)" class="delete-button" />
                </template>
            </van-swipe-cell>
        </div>

        <div >
            <van-submit-bar :price="this.totalPrice"
                            @submit="onSubmit"
                            button-text="去结算"
                            class="van-submit-bar">
                <van-button type="danger"  size="small" @click="checkAll">全选</van-button>
                <van-button type="warning" size="small" @click="delAll(0)">清空</van-button>
            </van-submit-bar>
        </div>
    <div>
    <van-dialog v-model:show.sync="show"
                title="商品详情页"
                :showConfirmButton=false>
        <detail :productId="productId"
                :visible.sync="show"
        ></detail>
    </van-dialog>
    </div>
</div>
</template>

<script>
    import detail from '../detail'
export default {
    name:"cart",
    components:{
        detail
    },
    data(){
        return {
            checked:'',
            value:'',
            totalPrice:0,
            checkGroup:[],
            cartList:[],
            orderList:[],
            productId:'',
            show:false,
            url: {
                list: '/cms-shopping-cart/list',
                del:'/cms-shopping-cart/del'
            },
            query: {
                productName: ''
            }
        }
    },
    created() {
        this.getData()
        this.flag_scroll=true
    },
    methods:{
        getData() {
            this.get(this.url.list, this.query, response => {
                this.cartList = response

            })
        },
        checkAll() {
            // let ids = []
            // for(let i =0;i<this.cartList.length;i++){
            //     ids[i] = this.cartList[i].productId
            // }
            // this.checkGroup = ids
            this.checkGroup=this.cartList
        },
        chooseChange(){
            console.log(this.checkGroup.length)
            let sum=0
                for(let i=0;i<this.checkGroup.length;i++){
                    sum +=this.checkGroup[i].productNum*this.checkGroup[i].price*100
                 console.log(sum)
                }
                this.totalPrice =sum

        },
        search(){
            this.getData()
        },
        del(id,active){
          this.$dialog.confirm({
                message: '确认删除该宝贝吗？',
            })
                .then(()=> {
                this.post(this.url.del, {id: id, active: active
                },() => {
                    this.getData()
                })
            })
        },
        delAll(active){
            console.log(this.cartList)
            this.$dialog.confirm({
                message: '确认清空购物车吗？',
            })
                .then(() => {
                    this.cartList=[]
                    this.emptyShow = true
                    this.totalPrice=0
                })
                .catch(() => {
                    this.getData()
                })
        },
        onSubmit(){
            for(let i=0;i<this.checkGroup.length;i++){
               this.orderList[i]=this.checkGroup[i]

            }
            console.log(this.orderList)
    },
        toDetail(productId){
            this.show=true
            this.productId=productId
            console.log(this.productId)
        }
    }
}
</script>

<style lang="less" scoped>
.list{
    margin:0 0 100px 0;
}
.van-submit-bar {
    bottom:49px;
}
.delete-button {
      top:30px;
        height: 80%;
    }
#mine {
    width: 100%;
    height: 100%;
    background-color:  white;
}
.van-nav-bar {
    background-color: orangered;

}
#mine /deep/ .van-nav-bar__title{
    color: white !important;
    font-size: 1.4rem;
}
#mine /deep/.van-icon {
    color: white !important;
}
.van-card__thumb{
    margin-right:-150px!important;
}
.van-search{
   margin-top: 48px;
}
.van-card__price{
    integer-font-size:large;
    color:red;
    }
 .van-card__title{
font-size:15px;
 }
</style>