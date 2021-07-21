<template>
    <div>

        <div v-if="isSearch" class="hint-font">
            <span>已为您搜索到{{this.count}}件商品</span>
        </div>
        <!--分类 级联下拉框-->

        <div v-if="found">
            <!--<van-sticky :offset-top="90">-->
                <!--<van-field-->
                        <!--class="field"-->
                        <!--v-model="brands.fieldValue"-->
                        <!--is-link-->
                        <!--readonly-->
                        <!--color="grey"-->
                        <!--:label=select-->
                        <!--placeholder="请选择商品分类"-->
                        <!--@click="catestate.show = true"-->
                <!--/>-->
                <!--<van-popup v-model:show="catestate.show" round position="bottom">-->
                    <!--<van-cascader-->
                            <!--v-model="catestate.cascaderValue"-->
                            <!--title="请选择商品分类"-->
                            <!--:options="options"-->
                            <!--@close="catestate.show = false"-->
                            <!--@finish="onFinish"-->
                    <!--/>-->
                <!--</van-popup>-->
            <!--</van-sticky>-->

            <van-dropdown-menu>
                <van-dropdown-item v-model="brand" :options="brands" />
                <van-dropdown-item v-model="value2" :options="option2" />
            </van-dropdown-menu>


            <!-- 卡片列表 -->
            <div class="list-style">
                <van-list
                        v-model:loading="liststate.loading"
                        :finished="liststate.finished"
                        finished-text="没有更多了"
                        @load="listonLoad">

                    <!--<div class="procard" v-for="(item,idx) in liststate.list" :key="idx">-->
                        <!--<div>-->
                            <!--<img class="pro-img" :src=" require(img(item.img))"/>-->
                            <!--<h5>{{item.name}}</h5>-->
                            <!--<h6>{}}</h6>-->
                        <!--</div>-->
                    <!--</div>-->

                    <!--<van-cell v-for="item in state.list" :key="item" :title="item" />-->

                    <van-card
                    class="procard"
                    v-for="(item,idx) in liststate.list" :key="idx"
                    :price=item.price
                    :desc=item.keywords
                    :title=item.name
                    :thumb=img(item.img)
                    @click="toDetail(item.id)"
                    >
                    <!--<div class="my-card">-->

                    <!--</div>-->

                    <!--<template #tags>-->
                    <!--<van-tag plain type="danger">标签</van-tag>-->
                    <!--</template>-->
                    <!--<template #footer>-->
                    <!--<van-icon name="cart-o" size="small" color="red"/>-->
                    <!--<van-button-->
                    <!--class="card-btn"-->
                    <!--size="mini">添加购物车</van-button>-->
                    <!--</template>-->
                    </van-card>

                </van-list>
            </div>
        </div>




        <!-- 商品详情 -->
        <div >
            <van-dialog
                    class="product-detail"
                    v-model:show.sync="show" title="商品详情页"
                        :showConfirmButton=false
            >
                <detail
                        :productId="productId"
                        :visible.sync="show"
                ></detail>
            </van-dialog>
        </div>

    </div>
</template>

<script>
    // import store from '../../../store'
    import detail from '../detail'
    export default {
        name: "Tab",
        // store,
        components:{
            detail
        },
        data(){
            return{
                liststate:{
                    list: [
                        // {
                        //     name:'商品名称1',
                        //     img:'https://img.yzcdn.cn/vant/ipad.jpeg',
                        //     price:'3.00',
                        //     keywords:'1111'
                        // },
                    ],
                    loading: false,
                    finished: false,
                },
                brand:'',
                brands:[],
                value2:'',
                option2:[
                    {text:'默认排序',value: ''},
                    {text:'价格升序',value: 1},
                    {text:'价格降序',value: 2},
                    {text:'销量降序',value: 3},
                    {text:'销量降序',value: 4},
                ],
                query:{
                    name:'',
                    categoryId:'',
                    brandIds:[],
                },
                productId:'',
                show:false,
                count:0,
                found:true,
                isSearch:true,
                // select2:this.$router.query.select
            }
        },
        props:{
          select:'',
            aim:''
        },
        watch:{
            select: function (newval,oldval) {
                console.log('old:',oldval,' new:',newval)
                this.query.name = newval
                this.listonLoad()
            },
            aim: function (newval,oldval) {
                console.log('old:',oldval,' new:',newval)
                this.query.aim = newval
                this.listonLoad()
                this.getBrands()
            }
        },
        create(){
            this.getBrands()
        },
        methods:{
            listonLoad(){
                if(this.aim != ''){
                    this.query.name = this.aim
                    // console.log(this.query)
                    this.get('/pms-product/getProductByName',this.query,response =>{
                        // console.log(response)
                        this.liststate.list = response
                        this.count = this.liststate.list.length
                    })
                }
                if(this.select != ''){
                    this.query.categoryId = this.select
                    // console.log(this.query)
                    this.get('/pms-product/getByCategory',this.query,response =>{
                        // console.log(response)
                        this.liststate.list = response
                        this.count = this.liststate.list.length
                    })
                }

                if(this.count != 0){
                    this.found = true
                }
              this.liststate.loading = false;
              this.finished = true;
          },
            getBrands(){
                let brandids = []
                let brds = []
                let products = this.liststate.list
                for(let i =0;i<products.length;i++){//获取当前商品列表的品牌id
                    if(brandids.indexOf(products[i].brandId) === -1){
                        brandids.push(products[i].brandId)
                        console.log(brandids)
                    }
                }
                this.query.brandIds = brandids
                console.log(this.query.brandIds)
                this.get('/pms-brand/getByids',this.query,response =>{
                    // console.log(response)
                    brds = response
                    console.log(brds)
                })

                for(let i = 0;i<brds.length;i++){
                    brands[i].text = brds[i].name
                    brands[i].value = brds[i].id
                }
                console.log('brands',brands)
            },
            toDetail(productId){
                // this.$store.commit('setProductId',productId)
                this.show = true
                this.productId = productId
                console.log(productId)
                // console.log(this.$store)
                // this.$router.push('../detail')//跳转商品详情页
            }
        },
    }
</script>

<style scoped>
    .list-style{
        margin-top: .1rem;
        background: #eeeeee;
    }
    .hint-font{
        font-size: 0.2rem;
    }
    .field{
        color:red;
    }
.procard{
    text-align: left;
    width: 100%;
    /*height: 2rem;*/
    background: #ffffff;
}
    .card-btn{
        border-color: #2c3e50;
        border-radius: 0.1rem;
    }
    .product-detail{
        width:100%;
        /*height:100%;*/
    }

</style>