<template>
  <div id="Diglog">
    <van-dialog title="title" v-model:show="show" show-cancel-button>
      <img :src="path">
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props:["title","show","path"]
}
</script>

<style scoped>

</style>