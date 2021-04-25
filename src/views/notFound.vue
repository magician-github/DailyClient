<template>
  <div class="notFound">
    <img src="../assets/404.jpg" alt="" />
    <van-button @click="back" style="margin-top: 7px;p" round block type="info"
      >返回</van-button
    >
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.push("/home/time");
    },
  },
};
</script>

<style scoped>
.notFound {
  width: 100vw;
  height: 100vh;
}
img {
  width: 100vw;
  height: 300px;
}
</style>