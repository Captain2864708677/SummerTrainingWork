<template>

    <div>
        代表商品id{{productId}}欢迎你
        <van-button @click="close()" color=red size="small">关闭</van-button>
    </div>

</template>

<script>
    export default {
        name: "index",
        props:{
            productId:'',
        },
        methods:{
            close(){
                this.$emit('update:visible',false)
            }
        }
    }
</script>

<style scoped>

</style>