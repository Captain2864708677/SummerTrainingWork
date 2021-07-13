<template>
  <div>
    <van-search
        class="searchTop"
        shape="round"
        v-model="value"
        placeholder="牛仔运动短裤"
        @click="onSearch"
        input-align="center">
    </van-search>
  </div>

</template>

<script>
export default {
  name: "HomePage",
  data(){
    return {
      value: ''
    }
  },
  methods: {
    onSearch(){
      this.$router.push('/searchform')
    }
  }
}
</script>

<style scoped lang="less">


</style>