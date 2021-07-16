<template>
  <van-address-edit
      :address-info="AddressInfo"
      :show-postal="true"
      :show-set-default="true"
      :show-search-result="true"
      :show-detail="true"
      :show-area="false"
      :tel-maxlength="11"
      @save="onSave"
      @change-default="change"
  />
</template>

<script>
import { Toast } from 'vant'
export default {
  name: "editAddress",
  data(){
    const module = '/cms-customer-address'
    return{
      AddressInfo:{
        id:null,
        customerId:null,
        name:'',
        tel:'',
        addressDetail:'',
        postalCode:'',
        isDefault: false
      },
      form:{
        customerId:null,
        address:'',
        name:'',
        tel:'',
        postalCode:'',
        isDefault:0
      },
      url:{
        update:module+'/update',
        setDefault:module+'/setDefault'
      }
    }
  },
  mounted(){
    this.AddressInfo.id= this.$route.query.id
    this.AddressInfo.customerId= this.$route.query.customerId
    this.AddressInfo.name= this.$route.query.name
    this.AddressInfo.tel= this.$route.query.tel
    this.AddressInfo.addressDetail= this.$route.query.address
    this.AddressInfo.postalCode= this.$route.query.postalCode
    this.AddressInfo.isDefault = this.$route.query.isDefault
  },
  methods:{
    onSave(content){
      this.form.id = content.id
      this.form.customerId = content.customerId
      this.form.address =content.addressDetail
      this.form.name = content.name
      this.form.tel = content.tel
      this.form.postalCode = content.postalCode
      if (content.isDefault === true) {
        this.form.isDefault = 1
      }
      this.post(this.url.update,this.form,()=>{
        this.$router.push('./addressMs')
      })
    },
    change(value){
      if (value){
        this.get(this.url.setDefault,{customerId:this.AddressInfo.customerId},response =>{
          Toast.success(response)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>