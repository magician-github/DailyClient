<template>
  <div class="wra">
    <van-form @submit="onSubmit">
      <van-field
        v-model="myInfo.oldPwd"
        type="password"
        name="oldPwd"
        label="旧密码"
        placeholder="请输入旧密码"
        :rules="[{ required: true, message: '请输入旧密码' }]"
      />
      <van-field
        v-model="myInfo.newPwd"
        type="password"
        name="newPwd"
        label="新密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <div style="margin: 8px">
        <van-button round block type="primary" native-type="submit"
          >提交</van-button
        >
      </div>
      <div style="margin: 16px">
        <van-button round block type="info" @click="back">返回</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import axios from "../axios";
import { Toast } from "vant"; //引入Toast
export default {
  mounted() {
    this.getUsers();
  },
  data() {
    return {
      oldPwd: "",
      id: null,
      myInfo: {
        oldPwd: "",
        newPwd: "",
      },
    };
  },
  methods: {
    async getUsers() {
      const resp = await axios.get("/api/query/queryUsers");
      console.log("user", resp);
      if (resp.data.code == 200) {
        this.oldPwd = resp.data.data[0].password;
        this.id = resp.data.data[0].id;
      } else {
        Toast.fail("获取密码失败");
      }
    },
    back() {
        this.$router.push('/home/me');
    },
    async onSubmit(value) {
      let that = this;
      if (value.oldPwd == this.oldPwd) {
        const resp = await axios.post("/api/update/updatePwd", {
          ...value,
          id: that.id,
        });
        Toast.success("修改成功");
        this.$router.push('/home/me')
      } else {
        Toast.fail("输入的旧密码错误");
      }
    },
  },
};
</script>

<style scoped>
.wra {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50%;
}
</style>