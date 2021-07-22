<template>
  <div>
      <!--<h3>搜索栏  吸顶</h3>-->
      <van-sticky>
          <div class="my-sticky">

              <van-row class="van-row">
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
                      <div v-if="!$store.getters.GET_TOKEN" class="login-btn" @click="login">登录</div>
                  </van-col>
              </van-row>

              <!--标签tab-->
              <van-tabs  style="font-size: .25rem" @click="getTab">
                  <van-tab class="van-tabs" style="font-size: .25rem" v-for="(item,idx) in tabdata" :key="idx" :title="item.name">
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
    <div class="div-ads">
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
    </div>


    <!--<h1>商品列表</h1>-->
      <div class="list-style">
          <tab
          :select="query.tabselect"
          >
          </tab>
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
    console.log(this.tabdata)
      this.getcategories()
  },
  data(){
    return{
      swiperImgs:[
       require( '../../assets/swipe/5.jpg'),
       require( '../../assets/swipe/3.jpg'),
       require( '../../assets/swipe/2.jpg'),
       require( '../../assets/swipe/4.jpg'),
      ],
        tabdata:[],
        girdItem:[],
        query: {
            tabselect:1
        },
    }
  },
  methods:{
    getTab(idx){
        this.query.tabselect = this.tabdata[idx].id
    },
    getcategories(){
        this.get('http://127.0.0.1:8090/pms-category/getparent',{},response =>{
            this.tabdata = response
        })
    },
    toSearch(){
          this.$router.push('/SearchIndex')
    },
    login(){
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="less">
    .van-tab{
        font-size: .5rem;
    }
    .van-row{
        background: #C22B2E;
        border-radius: 0 0 .2rem .2rem;
    }
    .list-style{
        margin-top: -1.5rem;
    }
    .van-tabs__wrap{
        /*border-radius: .5rem;*/
        font-weight: bolder;
        font-size: .4rem;
    }
    .van-tabs__wrap{
        /*border-radius: .5rem;*/
        font-weight: bolder;
        font-size: .4rem;
    }
    .my-sticky{
        background: white;
        background: white;
    }
    .div-ads{
      height: .35rem;
    }
    .ads{
        text-align: center;
        height: .3rem;
      //line-height: .6rem;
        font-size: .22rem;
        color: white;
        margin: 0rem 0.1rem 0 0 ;
        /*background: rgba(246, 247, 249, 0.15);*/
        /*background: orangered;*/
    }
    .login-btn{
        margin: .45rem 0 .5rem .1rem;
        width: .8rem;
        height: .45rem;
        text-align: center;
        border: 1px solid red;
        /*border-radius: .1rem;*/
        font-size: .3rem;
        background: white;
        color:#C22B2E;
        font-weight: bolder;
    }
    .header_search{
    width: 4rem;
        height: 0.5rem;
        margin: 0.45rem 0 0.07rem .1rem;
        padding: 0;
        background: red;
        border-radius: .5rem;
    }
    .van-search{
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
        color: white;
    }
</style>