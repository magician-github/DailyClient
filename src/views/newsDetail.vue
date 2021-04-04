<template>
  <div class="wraNews" style="width: 100%">
    <iframe
      :src="url"
      frameborder="0"
      style="width: 100%; height: 560px"
    ></iframe>
    <van-button @click="back" style="margin-top:7px" round block type="info">返回</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "",
    };
  },
  mounted() {
    this.url = this.$route.query.url;
  },
  methods: {
    back() {
      this.$router.push("/home/news");
    },
  },
};
</script>

<style>
</style>