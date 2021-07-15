<template>
  <div>
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


    <div>这里是收货地址管理</div>
  </div>
</template>

<script>
import {Dialog} from 'vant'

export default {
  name: "addressMs",
  data() {
    const module = '/cms-customer-address'
    return {
      url: {
        get: module + '/list',
        del: module + '/del'
      },
      chosenAddressId: null,
      list: [],
      customerId: null,
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
    }
  }
}
</script>

<style scoped>

</style>