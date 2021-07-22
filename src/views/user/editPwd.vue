<template>
    <div>
        <p class="title">修改密码</p>
        <van-form>
            <van-cell-group>
                <van-field
                        v-model="value"
                        :value="value"
                        label="请输入当前登录密码"
                        label-width="130px"
                        placeholder="请输入当前登录密码"
                        type="password"
                        @focus="showKeyboard = true"/>
                <van-number-keyboard
                        v-model="value"
                        :show="showKeyboard"
                        @blur="showKeyboard = false"/>
                <van-field
                        v-model="password1"
                        :value="password1"
                        label="确认新密码"
                        placeholder="确认新密码"
                        type="password"
                        @focus="showKeyboard1 = true"/>
                <van-number-keyboard
                        v-model="password1"
                        :show="showKeyboard1"
                        @blur="showKeyboard1 = false"/>
            </van-cell-group>
        </van-form>
        <div style="margin: 16px;">
            <van-row>
                <van-col span="10">
                    <van-button round plain type="primary" size="large" native-type="submit" @click="confirm">确定</van-button>
                </van-col>
                <van-col span="4"></van-col>
                <van-col span="10">
                    <van-button round plain  type="info" size="large" native-type="submit" @click="cansel">取消</van-button>
                </van-col>
            </van-row>
        </div>
    </div>

</template>

<script>
    export default {
        name: "CustomerEditPwd",
        data() {
            return {
                value:'',
                showKeyboard :false,
                showKeyboard1 :false,
                password1:'',
                customer: this.$route.query.customer
            };
        },
        methods: {
            confirm(){
                axios.get('http://127.0.0.1:8090/cms-customer/editPwd', {
                    params: {
                        id: this.$store.getters.GET_CUSTOMERID,
                        password:this.value,
                        password1: this.password1
                    }
                }).then(function (response) {
                    console.log(response);
                    var message=response.data.message;
                    console.log(message);
                    if(message=="密码错误"){
                        this.$toast('密码不一致,请重新输入');
                    }
                    if(message=="修改用户密码成功"){
                        this.$toast('修改用户密码成功,请重新登录');
                        this.$store.commit('SET_TOKEN','')
                        this.$router.push({
                            path: '/login'
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