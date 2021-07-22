<template>
    <div>
        <p class="title">修改个人信息</p>
        <van-form>
            <van-cell-group>
                <van-field
                        v-model="customer.account"
                        label="账户名"
                        placeholder="请输入账户名"
                        readonly/>
                <van-field
                        v-model="customer.nickyName"
                        required
                        label="昵称"
                        placeholder="请输入昵称"/>
                <van-field name="radio" label="性别" required>
                    <template #input>
                         <div  v-if="customer.sex == '男'" >
                            <van-radio-group v-model="customer.sex" direction="horizontal">
                                <van-radio name="男" checked="true">男</van-radio>
                                <van-radio name="女">女</van-radio>
                                </van-radio-group>
                         </div>
                         <div  v-else >
                             <van-radio-group v-model="customer.sex" direction="horizontal">
                                <van-radio name="男">男</van-radio>
                                <van-radio name="女" checked="true">女</van-radio>
                             </van-radio-group>
                         </div>
                    </template>
                </van-field>
                <van-field
                        v-model="customer.phone"
                        required
                        label="手机号"
                        placeholder="请输入手机号"
                        :rules="[
                         { required: true },
                         { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！' },]"/>
            </van-cell-group>
        </van-form>
        <div style="margin: 16px;">
            <van-button round  type="primary" size="small" native-type="submit" @click="confirm">确定</van-button>
            <van-button round  type="info" size="small" native-type="submit" @click="cansel">取消</van-button>
        </div>
    </div>

</template>

<script>
    export default {
        name: "CustomerEdit",
        data() {
            return {
                customer: this.$route.query.customer,
            };
        },
        methods: {
            confirm(){
                axios.get('http://127.0.0.1:8090/cms-customer/update', {
                    params: {
                        id: this.$store.getters.GET_CUSTOMERID,
                        account: this.customer.account,
                        nickyName:this.customer.nickyName,
                        sex:this.customer.sex,
                        password:this.customer.password,
                        phone:this.customer.phone
                    }
                }).then(function (response) {
                    console.log(response);
                    var message=response.data.message;
                    if(message=="修改用户成功"){
                        this.$toast('修改用户信息成功');
                        var customer=this.customer
                        this.$router.push({
                            path: '/user',query: {customer}
                        })
                    }

                }.bind(this))
            },
            cansel(){
                var customer=this.customer
                this.$router.push({
                    path: '/user',query: {customer}
                })
            }
        }
    }
</script>

<style scoped>
    .title {
        size: 1px;
        height: 50px;
        line-height: 50px;
        background-color: #20a0ff;
        color: #fff;
        text-align: center;
    }
</style>