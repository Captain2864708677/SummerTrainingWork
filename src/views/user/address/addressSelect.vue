<template>
  <div>
    <van-nav-bar
        title="收货地址"
        left-text="返回"
        right-text="确定"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
    ></van-nav-bar>
    <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
    >
      <van-button round type="primary" @click="del" color="linear-gradient(to right, #ff6034, #ee0a24)" block>删除
      </van-button>

    </van-address-list>
  </div>
</template>

<script>
export default {
  name: "addressSelect",
  data() {
    const module = '/cms-customer-address'
    return {
      url: {
        get: module + '/list',
        del: module + '/del',
        getone:module +'/getone'
      },
      chosenAddressId: null,
      list: [],
      customerId: null,
      address:'',
      name:''
    }
  },
  created() {
    this.getAddress()
  },
  methods: {
    getAddress() {
      this.get(this.url.get, {customerId: 1}, response => {
        this.list = response
        for (let i = 0; i < response.length; i++) {
          if (response[i].isDefault === 1) {
            this.list[i].isDefault = true;
          }
        }
      })
    },
    onAdd() {
      this.$router.push('./addAddress')
    },
    onEdit(item) {
      this.$router.push({
        path: '/editAddress',
        query: {
          id:item.id,
          customerId:1,
          name:item.name,
          tel:item.tel,
          address:item.address,
          postalCode:item.postalCode,
          isDefault:item.isDefault
        }
      })
    },
    del() {
      this.post(this.url.del, {chosenAddressId: this.chosenAddressId}, () => {
        this.getAddress()
      })
    },
    onClickLeft(){
      this.$router.go(-1)
    },
    onClickRight(){
      this.get(this.url.getone,{chosenAddressId: this.chosenAddressId},response =>{
        this.address = response.address
        this.name = response.name
        this.$router.push({
          path: '/order',
          query: {
            chosenAddressId:this.chosenAddressId,
            address:this.address,
            name:this.name
          }
        })

      })

    }
  }
}
</script>

<style scoped>

</style>