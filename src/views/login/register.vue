<template>
    <div>
        <div class="icon-back" @click="tologin">
            <van-icon size="25" name="arrow-left" />
        </div>
        <div>
            <p class="title">注册用户</p>
        </div>
        <van-form>
            <van-cell-group>
                <van-field
                        v-model="customer.account"
                        required
                        label="账户名"
                        placeholder="请输入账户名"/>
                <van-field
                        v-model="customer.nickyName"
                        required
                        label="昵称"
                        placeholder="请输入昵称"/>
                <van-field name="radio" label="性别" required>
                    <template #input>
                        <van-radio-group v-model="customer.sex" direction="horizontal">
                            <van-radio name="男">男</van-radio>
                            <van-radio name="女">女</van-radio>
                        </van-radio-group>
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
                <van-field
                        v-model="customer.password"
                        required
                        type="password"
                        label="密码"
                        placeholder="请输入密码"
                />
                <van-field
                        v-model="password1"
                        required
                        type="password"
                        label="确认密码"
                        placeholder="请再次输入密码"
                />
            </van-cell-group>
        </van-form>
        <div style="margin: 16px">
            <van-button round block type="info" native-type="submit" @click="onsubmit">注册</van-button>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name: 'Register',
        data() {
            return {
                password1:'',
                value: '',
                customer: {
                    account:'',
                    nickyName:'',
                    sex: '',
                    phone:'',
                    password:''
                }
            };
        },
        methods: {
            onConfirm(value) {
                this.value = value;
            },
            tologin(){
                this.$router.go(-1);
            },
            onsubmit(){
                if(this.customer.phone==""||this.customer.account==""||this.customer.sex==""||this.customer.password==""||this.customer.password1==""){
                    Toast('注册失败！信息未完善');
                }
                else if(this.customer.password!=this.password1){
                    Toast('密码输入两次不一致！');
                }
                else{
                    axios.get('http://127.0.0.1:8090/cms-customer/add', {
                        params: {
                            account: this.customer.account,
                            nickyName:this.customer.nickyName,
                            sex:this.customer.sex,
                            password:this.customer.password,
                            phone:this.customer.phone
                        }
                    })
                    Toast.success('注册成功');
                    this.$notify({
                        type: "success",
                        message: "注册成功，3s后返回登录",
                        duration: 3000,
                    });
                    setTimeout(() => {
                        sessionStorage.clear("regis");
                        this.$router.go(-1);
                    }, 3000);
                }
            }
        },
    };
</script>

<style scoped>
    .icon-back{
        position: absolute;
        left: 2px;
        top:15px
    }
    .title {
        /* border-radius: 15px; */
        size:1px;
        height: 50px;
        line-height: 50px;
        background-color: #20a0ff;
        color: #fff;
        text-align: center;
    }
</style>

