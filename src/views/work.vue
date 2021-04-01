<template>
  <div style="margin-top: 20px">
    <van-tabs
      v-model="active"
      type="card"
      color="#07c160"
      style="height: 400px; overflow: auto"
    >
      <van-tab title="全部任务">
        <van-list>
          <van-cell v-for="item in curList" :key="item.id">
            <div
              style="
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-item: center;
              "
            >
              <div>{{ item.title }}</div>
              <div>{{ item.time }}</div>
              <div>{{ item.status }}</div>
              <van-button
                plain
                type="primary"
                size="small"
                @click="updateWork(item)"
                >编辑</van-button
              >
              <van-button
                plain
                size="small"
                type="danger"
                @click="delWork(item.id)"
                >删除</van-button
              >
            </div>
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab title="已完成">
        <van-list>
          <van-cell v-for="item in list1" :key="item.id">
            <div
              style="
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-item: center;
              "
            >
              <div>{{ item.title }}</div>
              <div>{{ item.time }}</div>
              <div>{{ item.status }}</div>
              <van-button
                plain
                type="primary"
                size="small"
                @click="updateWork(item)"
                >编辑</van-button
              >
              <van-button
                plain
                type="danger"
                size="small"
                @click="delWork(item.id)"
                >删除</van-button
              >
            </div>
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab title="未完成">
        <van-list>
          <van-cell v-for="item in list2" :key="item.id">
            <div
              style="
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-item: center;
              "
            >
              <div>{{ item.title }}</div>
              <div>{{ item.time }}</div>
              <div>{{ item.status }}</div>
              <van-button
                plain
                type="primary"
                size="small"
                @click="updateWork(item)"
                >编辑</van-button
              >
              <van-button
                plain
                type="danger"
                style=":"
                size="small"
                @click="delWork(item.id)"
                >删除</van-button
              >
            </div>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
    <van-form @submit="onSubmit" v-if="isEdit">
      <van-field
        v-model="title"
        name="title"
        label="任务名"
        placeholder="任务名"
        :rules="[{ required: true, message: '请填写任务名' }]"
      />
      <van-field
        v-model="time"
        name="time"
        label="时间"
        placeholder="格式必须为yyyy-mm-dd"
        :rules="[
          { pattern, message: '请填写时间,格式必须为yyyy-mm-dd' },
        ]"
      />
      <!-- <van-field
        v-model="status"
        name="status"
        label="状态"
        placeholder="转态"
        :rules="[{ required: true, message: '请填写状态' }]"
      /> -->
      <div style="margin: 16px; display: flex; justify-content: space-around">
        <van-button round inline-block type="info" native-type="submit"
          >提交</van-button
        >
        <van-button
          @click="add"
          round
          inline-block
          type="info"
          native-type="submit"
          >返回</van-button
        >
      </div>
    </van-form>
    <!-- 修改 -->
    <van-form @submit="onUpdateWork" v-if="!isEdit && update">
      <van-field
        v-model="utitle"
        name="任务名"
        label="任务名"
        placeholder="任务名"
        :rules="[{ required: true, message: '请输入更改的任务名' }]"
      />
      <van-field
        v-model="utime"
        name="时间"
        label="时间"
        placeholder="请输入任务时间，格式为yyyy-mm-dd"
        :rules="[{ pattern, message: '请输入任务更改的时间,格式为yyyy-dd-mm' }]"
      />
      <van-field
        readonly
        clickable
        name="pickerStatus"
        :value="ustatus"
        label="任务状态"
        placeholder="点击选择任务转态"
        @click="statusShowPicker = true"
      />
      <van-popup v-model="statusShowPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="statusColumns"
          @confirm="onConfirmStatus"
          @cancel="statusShowPicker = false"
        />
      </van-popup>
      <div style="margin: 16px; display: flex; justify-content: space-around">
        <van-button
          round
          inline-block
          size="small"
          type="info"
          native-type="submit"
          >提交更改</van-button
        >
        <van-button round inline-block size="small" @click="goBack" type="info"
          >返回</van-button
        >
      </div>
    </van-form>

    <van-button
      v-if="!isEdit && !update"
      type="primary"
      @click="add"
      style="margin-left: 145px"
      >新增任务</van-button
    >
    <van-loading
      v-if="isLoading"
      type="spinner"
      color="#1989fa"
      style="position: fixed; top: 30%; left: 45%"
    />
  </div>
</template>

<script>
import axios from "../axios";
import { Toast } from "vant";
Toast.setDefaultOptions({ duration: 300 });
function deepCopy(obj) {
  let result = obj;
  if (typeof obj === "object" && obj !== null) {
    result = Object.prototype.toString.call(obj) === "[object Array]" ? [] : {};
    for (let prop in obj) {
      result[prop] = deepCopy(obj[prop]);
    }
  }
  return result;
}
export default {
  components: {},
  data() {
    return {
      pattern:/^\d{4}\-\d{2}\-\d{2}$/,
      active: "全部任务",
      update: false,
      uid: -1,
      title: "",
      utitle: "",
      time: "",
      utime: "",
      ustatus: "",
      isEdit: false,
      curList: [],
      list: [],
      list1: [],
      list2: [],
      statusValue: "",
      statusColumns: ["未完成", "已完成"],
      statusShowPicker: false,
      isLoading:true
    };
  },

  async mounted() {
    await this.getWork();
    this.isLoading = false;
  },
  methods: {
    goBack() {
      this.utime = "";
      this.utitle = "";
      this.ustatus = "";
      this.update = false;
    },
    async onUpdateWork() {
      let params = {
        id: this.uid,
        title: this.utitle,
        time: this.utime,
        status: this.ustatus,
      };
      const resp = await axios.post("/api/update/updateWork", params);
      if (resp.data.code == 200) {
        Toast.success("成功");
        this.update = false;
        this.getWork();
      }
    },
    async onConfirmStatus(val) {
      this.ustatus = val;
      this.statusShowPicker = false;
    },
    async delWork(id) {
      const resp = await axios.get("/api/delete/delWork", {
        params: {
          id: id,
        },
      });
      if (resp.data.code == 200) {
        Toast.success("成功");
        this.getWork();
      }
    },
    updateWork(item) {
      this.update = !this.update;
      let newItem = deepCopy(item);
      this.uid = item.id;
      this.utitle = newItem.title;
      this.utime = newItem.time;
      this.ustatus = newItem.status;
    },
    // onClickTab(e) {
    //   console.log(e)
    //   switch (e) {
    //     case 0:
    //       this.curList = this.list;
    //     case 1:
    //       this.curList = this.list1;
    //     case 2:
    //       this.curList = this.list2;
    //   }
    // },
    async getWork() {
      const resp = await axios.get("/api/query/queryWork");
      this.list = resp.data.data.map((it, index) => {
        return {
          id: it.id,
          time: it.time.slice(0, 10),
          title: it.title,
          status: it.status,
        };
      });
      this.curList = this.list;
      this.list1 = this.list.filter((it) => {
        console.log(it.status);
        return it.status == "已完成";
      });
      console.log(this.list1, "完成");
      this.list2 = this.list.filter((it) => it.status == "未完成");
      console.log("未完成", this.list2);
    },
    add() {
      this.isEdit = !this.isEdit;
    },
    async onSubmit(values) {
      const resp = await axios.post("/api/write/writeWork", {
        title: values.title,
        time: values.time,
        status: "未完成",
      });
      if (resp.data.code == 200) {
        this.getWork();
        this.isEdit = false;
      }
      console.log(resp, "result");
    },
  },
};
</script>

<style>
</style>