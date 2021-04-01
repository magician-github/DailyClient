<template>
  <div class="wra">
    <div class="formWra">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <a
          v-if="isLogin"
          href="#"
          @click="isLogin = !isLogin"
          style="margin-left: 20px"
          >{{!isLogin?'去登录':'去注册'}}</a
        >
        <div v-else @click="goReg" style="margin-left: 20px;color:blue"
          >去注册</div
        >
        <div style="margin: 16px">
          <van-button
            v-if="isLogin"
            round
            block
            type="info"
            native-type="submit"
            >登录</van-button
          >
          <van-button v-else round block type="info" native-type="submit"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import axios from "../axios";
import { Toast   } from "vant";
Toast.setDefaultOptions({ duration: 300 });
export default {
  components: {
  },
  data() {
    return {
      username: "",
      password: "",
      isLogin: true,
      pattern:/.{6,}/
    };
  },
  mounted() {
  },
  methods: {
    async goReg(){
      this.isLogin = !this.isLogin;
    },
    async onSubmit(values) {
      if (this.isLogin) {
        const resp = await axios.post("/api/loginAndReg/login", values);
        // console.log(typeof respJson,respJson)
        // const resp = JSON.parse(respJson)
        if(resp.data.meta.status == 400){
          Toast.fail('失败');

        } else {
          Toast.success(resp.data.meta.msg);
          window.localStorage.setItem('avatarUrl',resp.data.data.avatar_url);
          window.localStorage.setItem('time',resp.data.data.create_time);
          window.localStorage.setItem('token',resp.token);
          window.localStorage.setItem('id',resp.data.data.id,)
          this.$router.replace('/home/time');
        }
      } else {
        const resp = await axios.post('/api/loginAndReg/reg',values);
        if(resp.data.code == 200){
          Toast.success('成功');
          this.isLogin = !this.isLogin;
          this.username = '';
          this.password = '';
        }
      }
    },
  },
};
</script>

<style scoped>
.wra {
  width: 100%;
  height: 667px;
  display: flex;
  align-content: center;
  justify-content: center;
}
.formWra {
  margin-top: 200px;
}
</style>