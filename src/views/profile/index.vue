<template>
  <div class="profile">
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人信息"
      right-text="保存"
      left-arrow
      @click-left="$router.back()"
      @click-right="save"
    />
    <van-cell-group class="first-cell">
      <van-cell @click="$refs.photo.show=true" title="头像" is-link>
        <!-- 自定义右侧内容 -->
        <template slot="default">
          <img class="avatar" :src="userInfo.photo" alt />
        </template>
      </van-cell>
      <van-cell title="昵称" :value="userInfo.name" is-link />
      <van-cell title="介绍" :value="userInfo.intro" is-link />
    </van-cell-group>
    <van-cell-group class="second-cell">
      <van-cell title="性别" :value="userInfo.gender==0?'男':'女'" is-link />
      <van-cell title="生日" :value="userInfo.birthday" is-link />
    </van-cell-group>
    <!-- 选择图片弹出层 -->
    <photo ref="photo" @uploadPhoto="changeImg" />
  </div>
</template>

<script>
// 导入用户相关接口
import { getInfo, getProfile } from "@/api/user";
// 导入选择图片弹出层组件
import photo from "./components/photo";
export default {
  name: "profile",
  components: {
    // 选择图片弹出层组件
    photo
  },
  data() {
    return {
      userInfo: {}
    };
  },
  methods: {
    // 修改头像
    changeImg(val) {
      // 接收photo子组件传递过来的值
      this.userInfo.photo = val;
      // 隐藏选择图片弹出层
      this.$refs.photo.show = false;
    },
    // 保存按钮的点击事件
    save() {
      console.log('保存');
    }
  },
  async created() {
    // 获取名字、头像、简介
    let res = await getInfo();
    this.userInfo = res.data;
    // 获取性别、生日
    res = await getProfile();
    // 单独赋值的熟悉，要用$set来添加，否则数据没有响应式的特点
    this.$set(this.userInfo, "gender", res.data.gender);
    this.$set(this.userInfo, "birthday", res.data.birthday);
  }
};
</script>

<style lang="less" scoped>
.profile {
  .van-nav-bar {
    background-color: #3e9df8;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon {
      color: #fff;
    }
    .van-nav-bar__text {
      color: #fff;
    }
  }
  .first-cell {
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
  .second-cell {
    margin-top: 10px;
  }
}
</style>