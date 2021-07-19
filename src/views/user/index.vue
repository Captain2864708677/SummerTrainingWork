<template>
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
                ]
            }
        }
    }
</script>

<style scoped>
    #mine /deep/ .van-cell__left-icon{
        color: orange;
        front-size: 1.2rem;
    }
</style>