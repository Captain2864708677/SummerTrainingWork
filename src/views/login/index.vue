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

            <van-row style="text-align: center">
                <van-col span="3"></van-col>
                <van-col style="width: 120px;height: 50px" span="6">
                          <van-button round block type="primary" native-type="submit">
                            登录
                          </van-button>
<!--                      <div class="reg">-->
<!--                        <div size="mini">没有账号？立即注册</div>-->
<!--                      </div>-->
                </van-col>
              <van-col span="2">&nbsp</van-col>
              <van-col style="width: 120px;height: 50px" span="6">
                <van-button round block type="primary"  @click="toRegister">
                  注册
                </van-button>
              </van-col>
                <van-col span="5"></van-col>
            </van-row>
        </van-form>

    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
          const module = '/cms-customer'
            return {
                customer: {
                  account: '',
                  password: ''
                },
              url:{
                login:module+'/login'
              }
            };
        },
        methods: {
            login() {
               this.post(this.url.login,this.customer,response =>{
                 this.$store.commit('SET_TOKEN',response.token)
                 this.$store.commit('SET_CUSTOMERID',response.customer.id)
                 this.$router.push('/homepage')
               })
            },
            toRegister(){
                this.$router.push('/register')
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
