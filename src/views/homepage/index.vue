<template>
  <div>
    <h3>搜索栏</h3>

    <!--轮播图-->
    <div class="div-swipe">
      <van-swipe class="myswipe":autoplay="3000" lazy-render >
        <van-swipe-item v-for="image in swiperImgs" :key="image">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <h5>广告栏</h5>
    <h3>分类宫格</h3>


    <h1>卡片列表</h1>

  </div>
</template>

<script>

export default {
  name: "HomePage",
  created(){

  },
  data(){
    return{
      swiperImgs:[//引用本地图片需要用require
       require( '../../assets/swiper/1.jpg'),
       require( '../../assets/swiper/2.jpg'),
       require( '../../assets/swiper/3.jpg'),
       require( '../../assets/swiper/4.jpg'),
      ],
    }
  },
  methods:{
    },
}
</script>

<style scoped>
  .myswipe{
    width: 100%;
    height: 1000px;
  }
  .div-swipe img{
    display: inline-block;
    width: 100%;
    height: 1000px;
  }
</style>