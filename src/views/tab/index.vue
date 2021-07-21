<template>
  <div>

    <div v-if="isSearch" class="hint-font">
      <span>已为您搜索到{{this.count}}件商品</span>
    </div>
    <!--分类 级联下拉框-->

    <div v-if="found">

      <van-dropdown-menu class="van-dropdown-menu">
        <van-dropdown-item style="font-size: .25rem" v-model="value" :options="brands" @open="getBrands" @change="setBrand"/>
        <van-dropdown-item style="font-size: .25rem" v-model="value2" :options="option2" @change="setRank" />
      </van-dropdown-menu>

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
              :desc=item.keywords
              :title=item.name
              :thumb=img(item.img)
              @click="toDetail(item.id)"
          >
            <template #footer>
              <span>销量:{{item.sold}}</span>
            </template>
          </van-card>

        </van-list>
      </div>
    </div>

    <!-- 商品详情 -->
    <div >
      <van-dialog
          v-if="show"
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
import detail from '@/views/homepage/components/productdetail'
export default {
  name: "Tab",
  // store,
  components:{
    detail
  },
  data(){
    return{
      liststate:{
        list: [],
        loading: false,
        finished: false,
      },
      origin:[],
      value:0,
      brands:[
        {text:'选择品牌',value:0},
      ],
      value2:0,
      option2:[
        {text:'默认排序',value: 0},
        {text:'价格升序',value: 1},
        {text:'价格降序',value: 2},
        {text:'销量降序',value: 3},
        {text:'销量升序',value: 4},
      ],
      query:{
        name:'',
        categoryId:'',
        brandIds:[],
        brandId:''
      },
      productId:'',
      show:false,
      count:0,
      found:true,
      isSearch:true,
    }
  },
  props:{
    select:'',
    aim:''
  },
  watch:{
    select: function (newval,oldval) {
      console.log('s old:',oldval,' new:',newval)
      this.query.name = newval
      this.listonLoad()
    },
    aim: function (newval,oldval) {
      console.log('a old:',oldval,' new:',newval)
      this.query.aim = newval
      this.listonLoad()
    },
  },
  create(){
    this.productId = -1
    this.getBrands()
  },
  methods:{
    listonLoad(){
      if(typeof(this.aim)!='undefined'){//搜索页根据商品名称模糊查询
        console.log('aim ',this.aim)
        this.query.name = this.aim
        // console.log(this.query)
        // this.get('http://127.0.0.1:8090/pms-product/getProductByName',this.query,response =>{
        this.get('http://127.0.0.1:8090/pms-product/getProductByName',this.query,response =>{
          // console.log(response)
          this.liststate.list = response
          this.origin = this.liststate.list
          this.count = this.liststate.list.length
        })
      }else{
        if(typeof(this.select)!='undefined'){//首页根据分类查询
          console.log('select',this.select)
          this.query.categoryId = this.select
          // this.get('http://127.0.0.1:8090/pms-product/getByCategory',this.query,response =>{
          this.get('http://127.0.0.1:8090/pms-product/getByCategory',this.query,response =>{
            this.liststate.list = response
            console.log('homepage',this.liststate.list)
            // this.count = this.liststate.list.length
          })
        }
      }
      if(this.count != 0){
        this.found = true
      }
      this.liststate.loading = false;
      this.finished = true;
    },
    getBrands(){//根据当前商品列表获取品牌列表
      var brand ={}
      let brandids = []
      let brds = []
      let products = this.origin
      for(let i =0;i<products.length;i++){//获取当前商品列表的品牌id
        if(brandids.indexOf(products[i].brandId) === -1){
          brandids.push(products[i].brandId)
        }
      }
      this.query.brandIds = brandids
      console.log('ids',this.query.brandIds)
      this.get('http://127.0.0.1:8090/pms-brand/getByids',this.query,response =>{
        this.brands = response
        console.log('brands',this.brands)
      })
    },
    toDetail(productId){//跳转商品详情
      this.show = true
      this.productId = productId
      console.log(productId)
    },
    setBrand(){//按品牌筛选
      let products = this.origin
      let result = []
      for(let i =0;i<products.length;i++){
        if(products[i].brandId === this.value){
          result.push(products[i])
          console.log('setBrand ',i,'res',result,'pro',products)
        }
      }
      this.liststate.list = result
      this.count = this.liststate.list.length
    },
    setRank(){//排序 0默认 1价格升序 2降序 3销量升序 4销量降序
      let n = this.value2
      let products = this.liststate.list
      let origin = products
      let i,j
      switch (n) {
        case 0:
          this.liststate.list = origin
          break
        case 1:
          i= products.length
          while(i>0){
            for(j = 0;j<i-1;j++){
              let a = products[j].price
              let b = products[j+1].price
              if(a>b){
                let temp = products[j]
                products[j] = products[j+1]
                products[j+1] = temp
              }
            }
            i--
          }
          this.liststate.list = products
          break
        case 2:
          i= products.length
          while(i>0){
            for(j = 0;j<i-1;j++){
              let a = products[j].price
              let b = products[j+1].price
              if(a<b){
                let temp = products[j]
                products[j] = products[j+1]
                products[j+1] = temp
              }
            }
            i--
          }
          this.liststate.list = products
          break
        case 3:
          i= products.length
          while(i>0){
            for(j = 0;j<i-1;j++){
              let a = products[j].sold
              let b = products[j+1].sold
              if(a>b){
                let temp = products[j]
                products[j] = products[j+1]
                products[j+1] = temp
              }
            }
            i--
          }
          this.liststate.list = products
          break
        case 4:
          i= products.length
          while(i>0){
            for(j = 0;j<i-1;j++){
              let a = products[j].sold
              let b = products[j+1].sold
              if(a<b){
                let temp = products[j]
                products[j] = products[j+1]
                products[j+1] = temp
              }
            }
            i--
          }
          this.liststate.list = products
          break
      }
    },
  },
}
</script>

<style lang="less" scoped>

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
  height: 2rem;
  width: 2rem;
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
  height: 2rem;
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