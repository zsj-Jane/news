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
      <van-cell title="昵称" @click="nameShow=true" :value="userInfo.name" is-link />
      <van-cell title="介绍" @click="introShow=true" :value="userInfo.intro" is-link />
    </van-cell-group>
    <van-cell-group class="second-cell">
      <van-cell title="性别" @click="genderShow=true" :value="userInfo.gender==0?'男':'女'" is-link />
      <van-cell title="生日" @click="dateShow=true" :value="userInfo.birthday" is-link />
    </van-cell-group>
    <!-- 选择图片弹出层 -->
    <photo ref="photo" @uploadPhoto="changeImg" />
    <!-- 昵称弹出层 -->
    <van-popup v-model="nameShow" position="bottom">
      <van-field v-model="userInfo.name" placeholder="请输入昵称" />
    </van-popup>
    <!-- 简介弹出层 -->
    <van-popup v-model="introShow" position="bottom">
      <van-field v-model="userInfo.intro" placeholder="请输入简介" />
    </van-popup>
    <!-- 性别弹出层 -->
    <van-popup v-model="genderShow" class="gender-popup" position="bottom">
      <div @click="changeGender(0)" class="gender-item">男</div>
      <div @click="changeGender(1)" class="gender-item">女</div>
      <div @click="genderShow=false" class="gender-item">取消</div>
    </van-popup>
    <!-- 生日弹出层 -->
    <van-popup v-model="dateShow" position="bottom">
      <!-- 时间选择器 -->
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="changeDate"
      />
    </van-popup>
  </div>
</template>

<script>
// 导入用户相关接口
import { getInfo, getProfile, editProfile } from "@/api/user";
// 导入选择图片弹出层组件
import photo from "./components/photo";
// 导入dayjs
import dayjs from "dayjs";
export default {
  name: "profile",
  components: {
    // 选择图片弹出层组件
    photo
  },
  data() {
    return {
      // 用户信息
      userInfo: {},
      // 控制昵称弹出层是否显示
      nameShow: false,
      // 控制简介弹出层是否显示
      introShow: false,
      // 控制性别弹出层是否显示
      genderShow: false,
      // 控制日期弹出层是否显示
      dateShow: false,
      // 能选择的最小日期
      minDate: new Date(1949, 10, 1),
      // 能选择的最大日期
      maxDate: new Date(),
      // 当前日期（选择的日期）
      currentDate: new Date()
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
    // 修改性别
    changeGender(val) {
      // 修改用户信息中性别的值
      this.userInfo.gender = val;
      // 隐藏性别弹出层
      this.genderShow = false;
    },
    // 时间选择器中确认按钮的点击事件：修改生日
    changeDate() {
      // 把日期对象转成字符串，并赋值给用户信息的birthday属性
      this.userInfo.birthday = dayjs(this.currentDate).format("YYYY-MM-DD");
      // 隐藏生日弹出层
      this.dateShow = false;
    },
    // 保存按钮的点击事件
    async save() {
      // 发送请求保存用户个人信息
      await editProfile({
        name: this.userInfo.name,
        intro: this.userInfo.intro,
        gender: this.userInfo.gender,
        birthday: this.userInfo.birthday
      });
      // 成功提示
      this.$toast.success('修改成功!');
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
      &:active{
        // 导航栏右侧文字的激活状态
        background-color: transparent;
      }
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
  .gender-popup {
    background-color: #f5f7f9;
    .gender-item {
      background-color: #fff;
      text-align: center;
      padding: 10px 0;
      &:last-of-type {
        margin-top: 10px;
      }
    }
  }
}
</style>