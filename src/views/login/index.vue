<template>
    <div>
        <p class="title">登录界面</p>
        <van-form @submit="login">
            <van-cell-group inset>
                <van-field
                        v-model="customer.account"
                        name="用户名"
                        label="用户名"
                        placeholder="用户名"
                        :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                        v-model="customer.password"
                        type="password"
                        name="密码"
                        label="密码"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                />
            </van-cell-group>

            <van-row>
                <van-col span="6"></van-col>
                <van-col span="12">
                    <div style="margin: 16px;text-align: center;">
                        <van-button round block type="primary" native-type="submit">
                            登录
                        </van-button>
                        <div class="reg">
                            <div @click="toRegister" size="mini">没有账号？立即注册</div>
                        </div>
                    </div>
                </van-col>
                <van-col span="6"></van-col>
            </van-row>


        </van-form>

    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                customer: {
                    account:'',
                    password:''
                }
            };
        },
        methods: {
            login() {
                axios.get('http://127.0.0.1:8083/cms-customer/login', {
                    params: {
                        account: this.customer.account,
                        password: this.customer.password
                    }
                }).then(function (response) {
                    console.log(response);
                    var customer = response.data;
                    if(customer === null){
                        _this.$message({
                            message: '用户名或密码错误',
                            type: 'warning'
                        });
                    }else{
                        var customer=response.data.obj.customer
                        console.log(customer);
                        this.$router.push({path: '/user',query: { customer }});
                    }
                }.bind(this))
            },
            toRegister(){
                this.$router.push({
                    path: '/register'
                })
            }
        }
    }

</script>

<style scoped>
    .title {
        /* border-radius: 15px; */
        size:1px;
        height: 50px;
        line-height: 50px;
        background-color: #20a0ff;
        color: #fff;
        text-align: center;
    }
    .reg {
        font-size: 3px
    }
</style>
