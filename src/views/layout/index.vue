<template>
  <div>
    <!-- 子路由出口 -->
    <router-view></router-view>
    <!-- tabbar -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/home">主页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/faq">问答</van-tabbar-item>
      <van-tabbar-item icon="tv-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      // 记录被选中的tab标签的索引
      active: 0
    };
  }
};
</script>

<style>
</style>