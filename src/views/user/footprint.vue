<template>

  <div>
    <div id="dialog">
      <van-nav-bar
          title="足迹"
          left-text="返回"
          left-arrow
          right-text="全部删除"
          @click-left="back"
          @click-right="delAll"
      />
    </div>

    <van-grid :column-num="3">
      <van-grid-item  v-for="item in footprintList" :key="item.id">
        <van-image :src="img(item.img)" @click="toDetail(item.productId)">￥{{item.price}}</van-image>
      </van-grid-item>
    </van-grid>

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
import detail from '../homepage/components/productdetail'//此处引用饶民泽商品详情页组件的位置
export default {
  name: "FootPrint",
  data(){
    return{
      footprintList: [],
      url: '/cms-footprint/list',
      customer: this.$route.query.customer,
      query:{
        customer: this.$route.query.customer,
        customerId: null, //此处应该获取当前token里的customerId，我测试直接写成1了
        productId: null
      },
      show:false,
      productId:50,
    }
  },
  components:{
    detail,
  },
  created(){
    this.customer = this.$route.query.customer
    this.query.customer= this.$route.query.customer
    this.getData()
  },

  methods:{
    getData(){
      this.query.customerId=this.query.customer.id
      this.get(this.url,this.query,response=>{
        console.log(response)
        console.log(this.query)
        this.footprintList=response
      })
    },
    toDetail(productId){//跳转商品详情
      console.log(productId)
      this.show = true
      this.productId = productId
    },
    back(){
      var customer=this.customer
      this.$router.push({
        path: '/user',query: {customer}
      })
    },
    delAll(){
      this.$dialog.confirm({
        title:'确定删除吗？',
        message:'此操作将删除所有商品足迹',
        confirmButtonColor:'red'
      }).then(()=>{
        axios.get('http://127.0.0.1:8090/cms-footprint/delAll', {
          params: {
            customerId: this.customer.id
          }
        })
        this.footprintList=[]
        Toast.success("删除成功");
      }).catch(()=>{

      })
    }
  }
}
</script>

<style scoped>
.product-detail{
  width:100%;
  height:90%;
  margin-bottom: 0;
  border-radius: 0;
}
.btn{
  margin:10px;
}

</style>