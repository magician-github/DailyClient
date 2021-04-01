<template>
  <div style="margin-top: 20px">
    <van-tabs type="card" color="#07c160">
      <van-tab title="管理日记">
        <van-list style="height: 400px; overflow: hidden">
          <van-cell v-for="item in dailyList" :key="item.id">
            <div
              style="
                width: 100%;
                display: flex;

                justify-content: space-around;
                align-item: center;
              "
            >
              <div>时间:{{ item.time }}</div>
              <div>天气:{{ item.weather }}</div>
              <div>心情:{{ item.mood }}</div>
              <van-button
                plain
                type="primary"
                size="small"
                @click="lookDaily(item.id)"
                >查看</van-button
              >
              <van-button
                plain
                type="danger"
                style=""
                size="small"
                @click="delDaily(item.id)"
                >删除</van-button
              >
            </div>
          </van-cell>
        </van-list>
        <van-pagination
          v-model="currentPage"
          :show-page-size="size"
          :page-count="Math.ceil(count / size)"
          force-ellipses
          @change="pageChange"
        />
      </van-tab>
    </van-tabs>
    <van-loading
      v-if="isLoading"
      type="spinner"
      color="#1989fa"
      style="position: fixed; top: 30%; left: 45%"
    />
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
Toast.setDefaultOptions({ duration: 300 });
export default {
  data() {
    return {
      dailyList: [],
      currentPage: 1,
      size: 5,
      count: 0,
      isLoading: true,
    };
  },
  async mounted() {
    await this.getDailyList();
    this.isLoading = !this.isLoading;
  },
  methods: {
    async lookDaily(id) {
      this.$router.push("/detail/" + id);
    },
    async delDaily(id) {
      console.log("id", id);
      const resp = await axios.get("/api/delete/delDaily", {
        params: {
          id: id,
        },
      });
      if (resp.data.code == 200) {
        Toast.success("成功");
        this.getDailyList(this.currentPage);
      }
    },
    async pageChange(params) {
      this.currentPage = params;
      this.getDailyList();
    },
    async getDailyList(p) {
      const resp0 = await axios.get("/api/query/queryDailyCount");
      this.count = resp0.data.data[0].count;
      let that = this;
      const resp = await axios.get("/api/query/queryDaily", {
        params: {
          pagination: that.currentPage,
        },
      });
      if (resp.data.code == 200) {
        this.dailyList = resp.data.data.map((it) => {
          return {
            id: it.id,
            time: it.create_time.slice(0, 10),
            mood: it.mood,
            weather: it.weather,
          };
        });
      }
    },
  },
};
</script>

<style>
</style>