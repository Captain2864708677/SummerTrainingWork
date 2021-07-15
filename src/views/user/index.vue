<template>
  <div>
    <div>
      <van-icon name="setting-o" @click="userDetail" />
    </div>
  </div>

</template>

<script>
export default {
  name: "User",
  methods:{
    userDetail(){
      this.$router.push('./userDetail')
    }
  }
}
</script>

<style scoped>

</style>