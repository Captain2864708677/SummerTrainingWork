<template>
  <div>
      <!--<h3>搜索栏  吸顶</h3>-->
      <van-sticky>
          <div class="my-sticky">

              <van-row>
                  <van-col span="6" >
                      <img class="logo" :src=" require( '../../assets/logo.png')"/>
                  </van-col>
                  <van-col span="14">
                      <van-search
                              class="header_search"
                              placeholder="点击搜索"
                              @click="toSearch"/>
                  </van-col>
                  <van-col span="3">
                      <div class="login-btn" @click="login">登录</div>
                  </van-col>
              </van-row>

              <!--标签tab-->
              <van-tabs @click="getTab">
                  <van-tab v-for="(item,idx) in tabdata" :key="idx" :title="item.name">
                  </van-tab>
              </van-tabs>

          </div>
      </van-sticky>


      <!--轮播图-->
      <div class="div-swipe">
          <van-swipe class="myswipe":autoplay="3000" lazy-render >
              <van-swipe-item v-for="image in swiperImgs" :key="image">
                  <img :src="image" />
              </van-swipe-item>
          </van-swipe>
      </div>

    <!--<h5>广告栏</h5>-->
      <van-row class="ads">
          <van-col span="8">
              <van-icon class="icon-ad" name="friends" />
              <span >&nbsp东软自营品牌</span>
          </van-col>
          <van-col span="8">
          <van-icon class="icon-ad" name="bag" />
              <span>&nbsp30天质量保证</span>
          </van-col>
          <van-col span="8">
          <van-icon class="icon-ad" name="cart" />
              <span>&nbsp24小时随时发货</span>
          </van-col>
      </van-row>


      <!--<h3>分类宫格   和tab重复 不一定要</h3>-->
      <!--<van-grid :column-num="3">-->
          <!--<van-grid-item v-for="value in girdItem" :key="value" icon="photo-o" text="文字" />-->
      <!--</van-grid>-->


    <!--<h1>商品列表</h1>-->
      <div class="list-style">
          <tab
          :select="query.tabselect"
          >
          </tab>
      </div>

    <div>
      <span>
        <van-button round type="info" @click="toProductDetail(params)">商品详情页</van-button>
      </span>
    </div>


  </div>
</template>

<script>
import tab from '../tab'

export default {

  name: "HomePage",
    components:{
        tab
    },
  created(){
    this.getData()
    console.log(this.tabdata)
      this.getcategories()
  },
  data(){
    const module = '/pms-product'
    return{
      url: {
        getone: module + '/getone',
        getData: module + '/getData'
      },
      tabs: [
        {title: '商品详情', component: () => import('./components/productdetail')}
      ],
      value: '',
      params: [],

      swiperImgs:[
       require( '../../assets/swipe/5.jpg'),
       require( '../../assets/swipe/3.jpg'),
       require( '../../assets/swipe/2.jpg'),
       require( '../../assets/swipe/4.jpg'),
      ],
        tabdata:[],
        girdItem:[],
        query: {
            tabselect:''
        },
    }
  },
  methods:{
    getData() {
      this.get(this.url.getData,{},response => {
        console.log(response)
        this.params = response
      })
    },
    getTab(idx){
        this.query.tabselect = this.tabdata[idx].id
        console.log('idx',idx,this.query.tabselect)
    },
    getcategories(){
        this.get('http://localhost:8082/pms-category/getparent',{},response =>{
            // console.log(response)
            this.tabdata = response
        })
    },
    toSearch(){
          this.$router.push('../search')
    },
    login(){
      this.$router.push()
    },
    toProductDetail(params){
      this.$router.push({
        path: '/productdetail',
        query: {
          params : params
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
    .list-style{
        margin-top: -1rem;
    }
    .my-sticky{
        background: #ffffff;
    }
    .ads{
        text-align: center;
        height: .6rem;line-height: .6rem;
        font-size: 3px;
        margin: 0.1rem 0.1rem 0 0 ;
        background: rgba(246, 247, 249, 0.15);
    }
    .login-btn{
        margin: .45rem 0 .5rem .1rem;
        width: .8rem;
        height: .45rem;
        text-align: center;
        border: 1px solid #2c3e50;
        border-radius: .1rem;
        font-size: .3rem;
    }
    .header_search{
    width: 4rem;
        height: 0.5rem;
        margin: 0.45rem 0 0.07rem .1rem;
        padding: 0;
        background: aliceblue;
        border-radius: .2rem;
    }
    .van-search_content{
        color: #666;
    }
  .myswipe{
    width: 100%;
    height: 5rem;
  }
  .div-swipe img{
    display: inline-block;
      padding: auto;
    height: 5rem;
      width: 100%;
  }
  .logo{
      display: inline-block;
    width:1.5rem;
      margin: .1rem 0 0 0;
  }
    .icon-ad{
        color: #2c3e50;
    }
</style>