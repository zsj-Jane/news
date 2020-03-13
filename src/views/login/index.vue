<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 2个输入框 -->
    <van-field placeholder="请输入手机号" :error-message="valid.mobile" v-model="form.mobile">
      <template slot="left-icon">
        <i class="iconfont icon-phone"></i>
      </template>
    </van-field>
    <van-field placeholder="请输入验证码" :error-message="valid.code" v-model="form.code">
      <template slot="left-icon">
        <i class="iconfont icon-Lock"></i>
      </template>
      <van-button slot="button" size="small" round>发送验证码</van-button>
    </van-field>
    <!-- 登录按钮 -->
    <van-button type="info" :loading="isLoading" loading-text="登录中..." @click="doLogin">登录</van-button>
  </div>
</template>

<script>
// 导入登录接口
import { login } from "@/api/login.js";
export default {
  data() {
    return {
      // 双向绑定数据
      form: {
        mobile: "18612345678",
        code: "246810"
      },
      // 错误提示对象
      valid: {
        mobile: "",
        code: ""
      },
      // 加载中状态
      isLoading: false
    };
  },
  methods: {
    // 登录格式校验
    checkLogin() {
      let flag = true;
      // 只要有一个不匹配，就把flag的值改为false
      if (/0?(13|14|15|18)[0-9]{9}/.test(this.form.mobile)) {
        // 格式正确，把错误信息清空
        this.valid.mobile = "";
      } else {
        // 错误信息显示
        this.valid.mobile = "请输入正确的手机号";
        // 不通过就把值改为false
        flag = false;
      }
      if (this.form.code.length == 6) {
        // 格式正确，把错误信息清空
        this.valid.code = "";
      } else {
        // 错误信息显示
        this.valid.code = "请输入6位验证码";
        // 不通过就把值改为false
        flag = false;
      }
      return flag;
    },
    // 登录按钮的点击事件
    async doLogin() {
      // 登录验证
      if (this.checkLogin()) {
        // 打开登录中状态
        this.isLoading = true;
        try {
          // 发送登录请求
          let res = await login(this.form);
          console.log(res);
        } catch (error) {
          // 错误提示
          console.log("账号或验证码错误！");
        } finally {
          // 关闭登录中状态
          this.isLoading = false;
        }
      }
    }
  }
};
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