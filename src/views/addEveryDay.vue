<template>
  <div class="wra">
      <h2 style="position:relative;left:120px;top:-200px;padding-top:30px;color:#fff">新增每日一句</h2>
    <van-form @submit="onSubmit">
      <van-field
        v-model="newEveryDay"
        name="everyday"
        label="每日一句"
        placeholder="每日一句"
        :rules="[{ required: true, message: '请填写每日一句' }]"
      />
      <div style="margin: 5px; display: flex; justify-content: space-around">
        <van-button round inline-block type="info" native-type="submit"
          >提交</van-button
        >
        <van-button round inline-block type="info" @click="back"
          >返回</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import axios from "axios";
import { Toast   } from "vant";
Toast.setDefaultOptions({ duration: 300 });
export default {
    data(){
        return {
            newEveryDay:''
        }
    },
    
  methods: {
      back(){
          this.$router.push('/home/time')
      },
    async onSubmit(values) {
      const resp = await axios.post("/api/write/writeEveryDay", {
        content: values.everyday,
      });
      if (resp.data.code == 200) {
          Toast.success('新增成功');
          
          this.$router.push('/home/time')
      }
    },
  },
};
</script>

<style scoped>
    .wra{
        margin:200px auto;
    }
</style>>

</style>