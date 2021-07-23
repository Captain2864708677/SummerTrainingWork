<template>
  <div>
    <van-nav-bar
        title="收货地址"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    ></van-nav-bar>
    <van-address-edit
        :area-list="areaList"
        show-postal
        show-set-default
        show-search-result
        :tel-maxlength="11"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @change-default="change(true)"
    />
  </div>

</template>

<script>
import {areaList}  from '@vant/area-data'
import { Toast } from 'vant'
export default {
  name: "addAddress",
  data(){
    const module = '/cms-customer-address'
    return{
      url:{
        add : module+'/add',
        update:module+'/update',
        setAllNotDefault:module+'/setAllNotDefaultWhenAdd'
      },
      form:{
        customerId:null,
        address:'',
        name:'',
        tel:'',
        postalCode:'',
        isDefault:0
      },
      areaList:areaList,
      id:null
    }
  },
  methods:{
    onSave(content){
      this.form.customerId = this.$store.getters.GET_CUSTOMERID
      this.form.address = content.province +content.city +content.county +content.addressDetail
      this.form.name = content.name
      this.form.tel = content.tel
      this.form.postalCode = content.postalCode
      if (content.isDefault === true) {
        this.form.isDefault = 1
      }
      this.post(this.url.add,this.form,()=>{
        this.$router.push('./addressMs')
      })
    },onClickLeft(){
      this.$router.go(-1)
    },
    change(value){
      if (value){
        this.post(this.url.setAllNotDefault,{customerId:this.$store.getters.GET_CUSTOMERID},response =>{
          Toast.success(response)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>