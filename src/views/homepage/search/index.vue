<template>
  <div>
    <form action="/">
      <van-search
          class="searchTop"
          shape="round"
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel">
      </van-search>
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchForm",
  data() {
    return {
      value: ''
    }
  },
  methods: {
    onCancel() {
      this.$router.push('/homepage')
    },
    onSearch() {

    }
  }
}
</script>

<style scoped lang="less">

</style>