<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 2个输入框 -->
    <van-field placeholder="请输入用户名">
      <template slot="left-icon">
        <i class="iconfont icon-phone"></i>
      </template>
    </van-field>
    <van-field placeholder="请输入密码">
      <template slot="left-icon">
        <i class="iconfont icon-Lock"></i>
      </template>
      <van-button slot="button" size="small" round>发送验证码</van-button>
    </van-field>
    <!-- 登录按钮 -->
    <van-button type="info">登录</van-button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.login {
  background-color: #f5f7f9;
  .van-nav-bar {
    background-color: #3296fa;

    .van-nav-bar__title {
      color: white;
    }
  }
  .van-button--small {
    background-color: #ededed;
  }
  .van-button--normal {
    width: 90%;
    display: block;
    margin: 30px auto;
  }
}
</style>