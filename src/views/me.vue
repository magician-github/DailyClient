<template>
  <div class="wra">
    <div class="header">
      <div class="avatar">
        <!-- <img v-if="avatar" @click="changeAvatar" :src="'http://localhost:9000' + avatar" alt="头像" /> -->
        <van-uploader
          :show-upload="showUpload"
          :after-read="afterRead"
          :before-read="beforeRead"
          :before-delete="deleteItem"
          v-model="file"
          :delete="deleteItem"
          :deletable="true"
        />
      </div>
      <div class="username" style="margin-top: 8px;margin-left:20px; color: blue">
        {{ username }},欢迎您！
      </div>
    </div>
    <div class="content" style="margin-top: 10px;height:500px;overflow:auto">
      <van-form @submit="onSubmit">
        <van-list style="height:500px;overflow:auto">
          <van-cell
            style="
              color: blue;
              font-size: 20px;
              display: flex;
              align-items: center;
            "
            ><span style="color: blue">我的资料</span
            ><van-icon
              @click="goEdit"
              name="setting-o"
              :color="editColor"
              style="
                margin-left: 10px;
                width: 30px;
                position: relative;
                top: 3px;
              "
          /></van-cell>
          <van-cell
            >姓名:
            <span v-if="!isEdit">{{ myInfo.name }}</span>
            <van-field
              v-else
              v-model="myInfo.name"
              name="name"
              placeholder="请输入用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
            />
          </van-cell>
          <van-cell
            >年龄:
            <span v-if="!isEdit">{{ myInfo.age }}</span>
            <van-field
              v-else
              v-model.number="myInfo.age"
              name="age"
              placeholder="请输入年龄"
              :rules="[{ required:true, message: '请填写正确年龄' }]"
            />
          </van-cell>
          <van-cell
            >性别:
            <span v-if="!isEdit">{{ myInfo.sex }}</span>
            <van-field
              v-else
              v-model="myInfo.sex"
              name="sex"
              placeholder="请输入性别"
              :rules="[{ pattern: sexP, message: '请填写正确性别' }]"
            />
          </van-cell>
          <van-cell
            >电话:
            <span v-if="!isEdit">{{ myInfo.tel }}</span>
            <van-field
              v-else
              v-model="myInfo.tel"
              name="tel"
              placeholder="请输入电话"
              :rules="[{ pattern: telP, message: '请填写正确电话' }]"
            />
          </van-cell>
          <van-cell
            >邮箱:
            <span v-if="!isEdit">{{ myInfo.email }}</span>
            <van-field
              v-else
              v-model="myInfo.email"
              name="email"
              placeholder="请输入邮箱"
              :rules="[{ pattern: emailP, message: '请填写正确邮箱' }]"
            />
          </van-cell>
          <van-cell
            >爱好:
            <span v-if="!isEdit">{{ myInfo.hobby }}</span>
            <van-field
              v-else
              v-model="myInfo.hobby"
              name="hobby"
              placeholder="请输入爱好"
              :rules="[{ required: true, message: '请填写爱好' }]"
            />
          </van-cell>
          <van-cell
            >地址:
            <span v-if="!isEdit">{{ myInfo.address }}</span>
            <van-field
              v-else
              v-model="myInfo.address"
              name="address"
              placeholder="请输入地址"
              :rules="[{ required: true, message: '请填写正确地址' }]"
            />
          </van-cell>
          <van-cell
            >生日:
            <span v-if="!isEdit">{{ myInfo.birth }}</span>
            <van-field
              v-else
              v-model="myInfo.birth"
              name="birth "
              placeholder="请输入生日"
              :rules="[{ pattern: birthP, message: '请填写正确生日' }]"
            />
          </van-cell>
          <van-cell v-if="isEdit"><van-button size="small"  native-type="submit" style="margin-left:100px;width:150px" type="primary">确定修改</van-button></van-cell>
          <van-cell style="background:red;padding-left:10px;padding-right:10px;box-sizing:border-box"><div style="display:flex;width:150px;color:#fff;justify-content:center;margin-left:100px"  @click="loginOut">退出</div></van-cell>
          <van-cell style="visibility:hidden;"><van-button size="small" type="primary">隐藏</van-button></van-cell>

        </van-list>
      </van-form>
    </div>
  </div>
</template>

<script>
import axios from "../axios";
import { Toast } from "vant"; //引入Toast
async function upLoaderImg(file) {
  //file为 你读取成功的回调文件信息
  //new 一个FormData格式的参数
  let params = new FormData();
  params.append("avatar_url", file);
  let config = {
    headers: {
      //添加请求头
      "Content-Type": "multipart/form-data",
    },
  };
  return await axios.post("/api/upload", params, config);
}
export default {
  data() {
    return {
      ageP:/^([1-9]|[1-9]\\d|100)$/,
      birthP:/^\d{4}\-\d{2}\-\d{2}$/,
      sexP:/^['男']|['女']$/,
      telP:/^1\d{10}$/,
      emailP:/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
      editColor:'red',
      isEdit: false,
      hasAvatar: false,
      avatar: "",
      username: "",
      time: "",
      file: [],
      list: [1, 2, 3],
      showUpload: true,
      myInfo: {
        name: "",
        age: 0,
        sex: "",
        hobby: "",
        address: "",
        tel: "",
        email: "",
        birth: "",
      },
    };
  },
  async mounted() {
    this.getUsers();
    this.getMyInfo();
    console.log('this.file',this.file)
  },
  methods: {
    async loginOut(){
      const resp = await axios.get('/api/loginOut');
      if(resp.data.code == 200){
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('id');
        window.localStorage.removeItem('create_time');
        window.localStorage.removeItem('avatarUrl');

        this.$router.push('/')
      }
    },
    goEdit(){
      this.isEdit = !this.isEdit;
      this.editColor = this.editColor == 'red'?'green':'red';
    },
    async onSubmit(values) {
      console.log('values',values)
      const resp = await axios.post('/api/update/updateMyInfo',values);
      if(resp.data.code ==200){
        Toast.success('修改成功');
        this.isEdit = false;
      }

    },
    async getMyInfo() {
      const resp = await axios.get("/api/query/queryMyInfo");
      if (resp.data.code == 200 && resp.data.data.length>0) {
        resp.data.data[0].birth = resp.data.data[0].birth?resp.data.data[0].birth.slice(0, 10):'';
        Object.assign(this.myInfo, resp.data.data[0]);
        console.log("this.myinfo", this.myInfo);
      }
    },
    async deleteItem(file) {
      this.file = [];
      this.showUpload = true;
    },
    async changeAvatar() {
      this.avatar = "";
    },
    async beforeRead(file) {
      console.log(file);
      console.log("this.file", this.file);
    },
    async getUsers() {
      let that = this;
      const resp = await axios.get("/api/query/queryUsers");
      console.log("user", resp);
      if (resp.data.code == 200) {
        this.avatar = resp.data.data[0].avatar_url;
        this.username = resp.data.data[0].username;
        this.file = [
          {
            url: "http://localhost:9000" + that.avatar,
            deletable: true,
            imageFit: "contain",
            previewSize: 120,
          },
        ];
        this.showUpload = false;
      } else {
        Toast.fail("获取用户信息失败");
      }
    },
    uploadImg() {},
    beforeRead(file) {
      console.log("file", file);
      //上传之前校验
      if (file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/gif") {
        Toast("只允许上传jpg/png格式的图片！");
        return false;
      }
      return true;
    },
    async afterRead(file) {
      console.log("after", file);
      //文件读取完成后的回调函数
      let resp = await upLoaderImg(file.file); //使用上传的方法。file.file
      if (resp.data.code == 0) {
        this.showUpload = false;
        this.avatar = resp.data.data;
      }
      this.showUpload = false;
    },
  },
};
</script>

<style scoped>
.wra {
  width: 100%;
}
.header {
  width: 100%;
  height: 160px;
  background-color: aquamarine;
  box-sizing: border-box;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  /* border: 1px solid red; */
  box-sizing: border-box;
}
.username {
  font-weight: bold;
  font-size: 20px;
  margin-left: 8px;
}
img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>