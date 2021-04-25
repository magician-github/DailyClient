<template>
  <div>
    <div class="header">
      <h1 style="color:#fff">今日名言</h1>
      <div style="height:60px;font-size:18px;background:#fff;border-radius:10px;padding:10px;box-shadow:5px 5px 10px #ddd">{{ (everyDay) }}</div>
      <img
        src="../assets/kz.jpg"
        style="border-radius:5px; width: 70px; height: 60px; float: right; margin-right: 30px;margin-top:2px;"
        alt="古人"
      />
    </div>

    <div class="clock" id="clock">
      <!--圆心-->
      <div class="origin"></div>
      <!--时分秒针-->
      <div class="clock-line hour-line" id="hour-line"></div>
      <div class="clock-line minute-line" id="minute-line"></div>
      <div class="clock-line second-line" id="second-line"></div>
    </div>
    <van-form @submit="onSubmit" v-if="isEdit">
    </van-form>
    <van-button
      v-else
      type="primary"
      @click="add"
      style="height:30px;line-height:30px;margin-left: 130px; margin-top: 2px"
      >新增每日一句</van-button
    >
  </div>
</template>

<script>
import axios from "../axios";
export default {
  mounted() {},
  data() {
    return {
      everyDay: "",
      isEdit: false,
      newEveryDay: "",
    };
  },
  async mounted() {
    initNumXY(200, 160, 40, 40);
    var hour_line = document.getElementById("hour-line");
    var minute_line = document.getElementById("minute-line");
    var second_line = document.getElementById("second-line");

    function setTime() {
      var date = new Date();
      var s = date.getSeconds();
      var m = date.getMinutes() + s / 60;
      var h = date.getHours() + m / 60;

      hour_line.style.transform = " rotate( " + (h * 30 - 90) + "deg ) ";
      minute_line.style.transform = " rotate( " + (m * 6 - 90) + "deg ) ";
      second_line.style.transform = " rotate( " + (s * 6 - 90) + "deg ) ";
    }

    setTime(); //设置时间，不加这句开始会有一下停顿
    setInterval(setTime, 1000);

    //定位数字的位置，R：大圆的半径，r：数字所在位置小圆的半径，w: 数字的宽， h:数字的高
    function initNumXY(R, r, w, h) {
      var numXY = [
        {
          left: R + 0.5 * r - 0.5 * w,
          top: R - 0.5 * r * 1.73205 - 0.5 * h,
        },
        {
          left: R + 0.5 * r * 1.73205 - 0.5 * w,
          top: R - 0.5 * r - 0.5 * h,
        },
        {
          left: R + r - 0.5 * w,
          top: R - 0.5 * h,
        },
        {
          left: R + 0.5 * r * 1.73205 - 0.5 * w,
          top: R + 0.5 * r - 0.5 * h,
        },
        {
          left: R + 0.5 * r - 0.5 * w,
          top: R + 0.5 * r * 1.73205 - 0.5 * h,
        },
        {
          left: R - 0.5 * w,
          top: R + r - 0.5 * h,
        },
        {
          left: R - 0.5 * r - 0.5 * w,
          top: R + 0.5 * r * 1.73205 - 0.5 * h,
        },
        {
          left: R - 0.5 * r * 1.73205 - 0.5 * w,
          top: R + 0.5 * r - 0.5 * h,
        },
        {
          left: R - r - 0.5 * w,
          top: R - 0.5 * h,
        },
        {
          left: R - 0.5 * r * 1.73205 - 0.5 * w,
          top: R - 0.5 * r - 0.5 * h,
        },
        {
          left: R - 0.5 * r - 0.5 * w,
          top: R - 0.5 * r * 1.73205 - 0.5 * h,
        },
        {
          left: R - 0.5 * w,
          top: R - r - 0.5 * h,
        },
      ];

      var clock = document.getElementById("clock");
      //钟表上添加数字
      for (var i = 1; i <= 12; i++) {
        if (i % 3 == 0) {
          clock.innerHTML += "<div class='clock-num em_num'>" + i + "</div>";
        } else {
          clock.innerHTML += "<div class='clock-num'>" + i + "<div>";
        }
      }

      var clock_num = document.getElementsByClassName("clock-num");
      //定位
      for (var i = 0; i < clock_num.length; i++) {
        clock_num[i].style.left = numXY[i].left + "px";
        clock_num[i].style.top = numXY[i].top + "px";
        clock_num[i].style.position = "absolute";
      }

      //钟表上添加刻度
      var ul = document.createElement("ul");
      ul.setAttribute("id", "list");
      clock.appendChild(ul);
      for (var i = 0; i < 60; i++) {
        var li = document.createElement("li");
        li.style.transform = "rotate( " + i * 6 + "deg )";
        ul.appendChild(li);
      }
    }
    this.initEveryDay();
  },
  methods: {
    async initEveryDay() {
      const resp = await axios.get("/api/query/queryEveryDay");
      this.everyDay = resp.data.data[0]?resp.data.data[0].content:'';
    },
    async onSubmit(values) {
      const resp = await axios.post("/api/write/writeEveryDay", {
        content: values.everyday,
      });
      if (resp.data.code == 200) {
        this.initEveryDay();
      }
    },
    add() {
      this.$router.push('/addEveryDay')
    },
    handleTouch() {},
  },
};
</script>

<style scoped>
.header {
  box-sizing: border-box;
  height: 180px;
  margin: 15px 15px 5px 15px;
}
.clock {
  width: 355px;
  height: 355px;
  border: 10px solid #333;
  box-shadow: 0px 0px 20px 3px #444 inset;
  border-radius: 50%;
  position: relative;
  margin: 5px auto;
  z-index: 10;
  background-color: #f6f6f6;
}
/* 钟表上的数字 */
.clock-num {
  width: 40px;
  height: 40px;
  font-size: 22px;
  text-align: center;
  line-height: 40px;
  position: absolute;
  z-index: 8;
  color: #555;
  font-family: fantasy; /* 字体 */
}
.em_num {
  font-size: 28px;
}
.clock-line {
  position: absolute;
  z-index: 20;
}
.hour-line {
  width: 100px;
  height: 4px;
  top: 172px;
  left: 179px;
  background-color: #000;
  border-radius: 2px;
  transform-origin: 0 50%;
  box-shadow: 1px -3px 8px 3px #aaa;
}
.minute-line {
  width: 130px;
  height: 2px;
  top: 172px;
  left: 169px;
  background-color: #000;
  transform-origin: 7.692% 50%;
  box-shadow: 1px -3px 8px 1px #aaa;
}
.second-line {
  width: 170px;
  height: 1px;
  top: 178px;
  left: 166px;
  background-color: #f60;
  transform-origin: 11.765% 50%;
  box-shadow: 1px -3px 7px 1px #bbb;
}
.origin {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #000;
  position: absolute;
  top: 167px;
  left: 168px;
  z-index: 14;
}
/* 刻度 */
#list {
  list-style: none;
  position: relative;
  height: 100%;
  margin: 0;
  padding: 0;
}
#list li {
  list-style: none;
  width: 2px;
  height: 12px;
  position: absolute;
  left: 199px;
  top: 4px;
  transform-origin: center 196px; /* 相对元素左上角的位置 */
  background-color: #555;
}

#list li:nth-child(5n + 1) {
  width: 4px;
  height: 15px;
}
</style>