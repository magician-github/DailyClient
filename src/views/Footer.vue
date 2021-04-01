<template>
  <div class="footer-wra">
    <van-tabbar route>
      <van-tabbar-item replace to="/home/time">
        <span>时间</span>
        <template #icon="props">
          <van-icon name="underway-o" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/home/work"
        >
        <span>任务</span>
        <template #icon="props">
          <van-icon name="fire-o" />
        </template>
        </van-tabbar-item
      >
      <van-tabbar-item replace to="/home/create"
        >
        <span>创作</span>
        <template #icon="props">
          <van-icon name="comment-circle-o" />
        </template></van-tabbar-item
      >
      <van-tabbar-item replace to="/home/man" icon="home-o"
        >管理</van-tabbar-item
      >
      <van-tabbar-item replace to="/home/me" icon="friends-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { Icon } from 'vant';
export default {};
</script>

<style>
</style>