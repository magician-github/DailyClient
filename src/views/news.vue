<template>
   <div style="margin-top: 20px">
    <van-tabs type="card" color="#07c160">
      <van-tab title="热点新闻">
          <div @click="toDetail(item.url)" style="width:100%;padding:15px;font-size:18px;color:#abcdef;border:1px solid #ddd;box-sizing:border-box" class="newsItem" v-for="item in list " :key="item.uniquekey">
              <div class="conImg" style="display:flex;justify-content:space-around">
                  <div class="left" style="width:60%">{{item.title}}</div>
                  <div style="width:20%;height:60px;"><img style="width:100%;height:100%" :src="item.thumbnail_pic_s" alt="图片" ></div>
              </div>
              <div class="newsTime" style="padding:15px;font-size:15px;color:yellow">
                  {{item.author_name+'---'+item.date}}
              </div>
          </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      list: [],
    };
  },
  async mounted() {
    const resp = await axios.get("http://api.jsplusplus.com/Juhe/getNewsList");
    if (resp.status == 200) {
      this.list = resp.data.result.data;
    }
  },
  methods:{
      toDetail(url){
          this.$router.push({path:'/home/newsDetail',query:{
              url
          }}); 
      }
  }
};
</script>

<style scoped>
.newsWra {
  width: 100%;
}
</style>