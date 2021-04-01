<template>
  <div style="margin-top: 20px" >
    <van-tabs type="card" color="#07c160">
      <van-tab title="日记详情">
        <van-list style="height: 400px; overflow: hidden">
          <van-cell>
            <div
              style="
                width: 100%;
                display: flex;
                color:#07c160;
                justify-content: space-around;
                align-item: center;
              "
            >
              <div>时间:{{create_time}}</div>
              <div>天气:{{ weather }}</div>
              <div>心情:{{ mood }}</div>
            </div>
            <div
              style="
                margin-top: 20px;
                width: 100%;
                height:500px;
                <!-- background: blue; -->
                border:1px solid #ddd;  
                color:#07c160;
                font-size:16px;
                font-weight:bold;
                text-indent:25px;
                border-radius: 10px;
              "
            >{{content}}</div>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
    <van-button round style="width:300px;margin:auto;margin-top:20px" block type="info" @click="back">返回</van-button>
  </div>
</template>

<script>
import axios from "axios";
import { Dialog  } from "vant";
export default {
  data() {
    return {
      content:'',
      create_time:'',
      mood:'',
      weather:''
    };
  },
  mounted() {
      this.getDailyDetail();
  },
  methods: {
      async getDailyDetail(){
          const id = this.$route.params.id;
          const resp = await axios.get('/api/query/queryDailyById',{
              params:{
                  id:id
              }
          })
          if(resp.data.code == 200){
            const {content,mood,weather,create_time} = resp.data.data[0];
            this.create_time = create_time.slice(0,10);
            this.content = content;
            this.mood = mood;
            this.weather = weather;
          }

      },
      back(){
          this.$router.push('/home/man');
      }
  },
};
</script>

<style>
</style>