<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 2个输入框 -->
    <van-field placeholder="请输入用户名" left-icon="smile-o" />
    <van-field placeholder="请输入密码" left-icon="smile-o">
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
  .van-button--normal{
      width: 90%;
      display: block;
      margin: 30px auto;
  }
}
</style>