<template>
<<<<<<< HEAD
    <div id="mine">
        <!--我的订单、查看全部订单-->
        <van-cell-group>
            <van-cell
                    title="我的订单"
                    value="查看所有订单"
                    is-link
                    icon="label"
            />
        </van-cell-group>
        <!--待付款、待发货、待收货、待评价、售后/退款-->
        <van-grid>
            <van-grid-item
                v-for="(order,index) in orderData"
                :key="index"
                :icon="order.icon"
                :text="order.title"/>
        </van-grid>
        <!--填写订单-->
        <van-button type="primary" to="order">填写订单</van-button>
    </div>
  <div>
    <p class="title">个人中心</p>
      <van-cell-group title="个人信息">
        <van-button round  type="info" plain size="small" native-type="submit" @click="edit">修改信息</van-button>
        <van-cell title="账户" :value="customer.account"/>
        <van-cell title="昵称" :value="customer.nickyname" />
        <van-cell title="手机号" :value="customer.phone" />
        <van-cell title="性别" :value="customer.sex" />

        <van-row>
          <van-col span="13">
            <van-cell title="修改登录密码"/>
          </van-col>
          <van-col span="6"></van-col>
          <van-col span="5">
            <van-button icon="edit" @click="editPwd"></van-button>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="13">
            <van-cell title="查看所有订单" />
          </van-col>
          <van-col span="6"></van-col>
          <van-col span="5">
            <van-button icon="balance-list" to="state"></van-button>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="13">
            <van-cell title="收货地址"/>
          </van-col>
          <van-col span="6"></van-col>
          <van-col span="5">
            <van-button icon="location" @click="address"></van-button>
          </van-col>
        </van-row>

      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round  type="info" size="small" native-type="submit" @click="logout">退出登录</van-button>
      </div>
  </div>

<!--    <van-cell-group inset>-->
<!--        <van-cell title="我的订单" is-link to="order" />-->
<!--        <van-button icon="idcard" color="#FFA500" plain hairline round type="primary" to="order">待付款</van-button>-->
<!--        <van-button icon="send-gift-o" color="#FFA500" plain hairline round type="primary" to="order">待发货</van-button>-->
<!--        <van-button icon="logistics" color="#FFA500" plain hairline round type="primary" to="order">待收货</van-button>-->
<!--        <van-button icon="chat-o" color="#FFA500" plain hairline round type="primary" to="order">待评价</van-button>-->
<!--        <van-button icon="after-sale" color="#FFA500" plain hairline round type="primary" to="order">退款/售后</van-button>-->
<!--    </van-cell-group>-->
</template>

<script>
export default {
  name: "User",
  data() {
      return {
          orderData: [
              {title:'待付款',icon:'idcard'},
              {title:'待发货',icon:'send-gift-o'},
              {title:'待收货',icon:'logistics'},
              {title:'待评价',icon:'chat-o'},
              {title:'售后/退款',icon:'after-sale'}
          ],
      customer: {
        account:"007",
        nickyname: 'hlo',
        phone:13545878954,
        sex: '男'
      }
    };
  },
  methods: {
    logout() {
      this.$router.push({
        path: '/login'
      })
    },
    edit() {
      var customer = this.customer
      this.$router.push({
        path: '/edit', query: {customer}
      })
    },
    editPwd() {
      var customer = this.customer
      this.$router.push({
        path: '/editPwd', query: {customer}
      })
    },
    address() {
      this.$router.push({
        path:'./addressMs',
      })
    }
}}
</script>

<style scoped>
#mine /deep/ .van-cell__left-icon{
    color: orange;
    front-size: 1.2rem;
}
</style>