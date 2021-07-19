<template>
  <div>
    <van-search
        class="searchTop"
        shape="round"
        v-model="value"
        placeholder="牛仔运动短裤"
        @click="onSearch"
        input-align="center">
    </van-search>
    <div>
      <span>
        <van-button round type="info" @click="toProductDetail(params)">商品详情页</van-button>
      </span>
    </div>
  </div>

</template>

<script>
export default {
  name: "HomePage",
  data(){
    const module = '/pms-product'
    return {
      url: {
        getone: module + '/getone',
        getData: module + '/getData'
      },
      tabs: [
        {title: '商品详情', component: () => import('./components/productdetail')}
      ],
      value: '',
      params: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.get(this.url.getData,{},response => {
        console.log(response)
        this.params = response
      })
    },

    onSearch(){
      this.$router.push('/searchform')
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


</style>