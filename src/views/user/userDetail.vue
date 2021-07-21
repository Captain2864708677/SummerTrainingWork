<template>
  <div class="detailScan">
    <van-cell-group class="cell" inset>
      <van-cell  is-link to="./addressMs"  value="收货地址" icon="location-o"/>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "userDetail"
}
</script>

<style scoped>
  .detailScan{
    background: linear-gradient(0deg,#ffff00,#f30000);

  }
</style>