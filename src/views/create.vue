<template>
  <div style="margin-top: 20px">
    <van-tabs v-model="active" type="card" color="#07c160">
      <van-tab title="写日记">
        <van-list>
          <van-cell>
            <div
              style="
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-item: center;
              "
            >
              <van-form @submit="onSubmitDaily">
                <van-field
                  v-model="daily"
                  rows="10"
                  autosize
                  label="日记"
                  type="textarea"
                  maxlength="1000"
                  placeholder="请输入日记"
                  show-word-limit
                />
                <van-field
                  readonly
                  clickable
                  name="picker1"
                  :value="moodValue"
                  label="心情"
                  placeholder="点击选择心情"
                  @click="moodShowPicker = true"
                />
                <van-popup v-model="moodShowPicker" position="bottom">
                  <van-picker
                    show-toolbar
                    :columns="moodColumns"
                    @confirm="onConfirmMood"
                    @cancel="moodShowPicker = false"
                  />
                </van-popup>
                <van-field
                  readonly
                  clickable
                  name="picker2"
                  :value="weatherValue"
                  label="天气"
                  placeholder="点击选择天气"
                  @click="weatherShowPicker = true"
                />
                <van-popup v-model="weatherShowPicker" position="bottom">
                  <van-picker
                    show-toolbar
                    :columns="weatherColumns"
                    @confirm="onConfirmWeather"
                    @cancel="weatherShowPicker = false"
                  />
                </van-popup>
                <van-field
                  v-model="createTime"
                  name="时间"
                  label="创建时间"
                  placeholder="日记时间"
                  :rules="[{ pattern, message: '请填写日记时间,格式为yyyy-mm-dd' }]"
                />
                <div style="margin: 16px">
                  <van-button round block type="info" native-type="submit"
                    >提交</van-button
                  >
                </div>
              </van-form>
            </div>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from 'axios';
import { Toast   } from "vant";
Toast.setDefaultOptions({ duration: 300 });
export default {
  data() {
    return {
      pattern:/^\d{4}\-\d{2}\-\d{2}$/,
      daily: "",
      active: "",
      moodValue: "",
      moodColumns: ["非常好", "良好", "普通", "差", "很差"],
      moodShowPicker: false,
      createTime:'',
      weatherValue: "",
      weatherColumns: ["晴", "阴", "小雨", "大雨", "雪"],
      weatherShowPicker: false,
    };
  },
  methods: {
    onSubmit(values) {},
    onConfirmMood(value) {
      this.moodValue = value;
      this.moodShowPicker = false;
    },
    onConfirmWeather(value) {
      this.weatherValue = value;
      this.weatherShowPicker = false;
    },
    async onSubmitDaily(values){
      let params = {
        content:this.daily,
        create_time:this.createTime,
        mood:this.moodValue,
        weather:this.weatherValue
      }
      const resp = await axios.post('/api/write/writeDaily',params);
      if(resp.data.code == 200){
        this.daily = '';
        this.moodValue = '';
        this.weatherValue = '';
        this.createTime = '';
        Toast.success('成功');
      } else {
        Toast.fail('请检查字段');       
      }
    }
  },
};
</script>

<style>
</style>