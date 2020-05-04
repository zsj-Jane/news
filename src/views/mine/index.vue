<template>
  <div class="mine">
    <!-- 已登录 头部区域 -->
    <div class="top" v-if="$store.state.token">
      <!-- 用户信息 -->
      <div class="user-info">
        <img @click="$router.push('/profile')" class="avatar" :src="userInfo.photo" alt />
        <span class="username">{{userInfo.name}}</span>
      </div>
      <!-- 统计数据 -->
      <div class="data">
        <div class="data-item">
          <span>{{userInfo.art_count}}</span>
          <span>动态</span>
        </div>
        <div class="data-item">
          <span>{{userInfo.follow_count}}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span>{{userInfo.fans_count}}</span>
          <span>粉丝</span>
        </div>
      </div>
      <!-- 阅读时间 -->
      <div class="readTime">
        <span>今日阅读</span>
        <span>9分钟</span>
      </div>
    </div>
    <!-- 未登录 头部区域 -->
    <div class="top" v-else>
      <!-- 未登录头像 -->
      <div class="top-phone">
        <img
          @click="$router.push('/login')"
          src="http://toutiao.research.itcast.cn/img/wd_weidl.png"
          alt
        />
      </div>
    </div>
    <!-- 中间操作区域 -->
    <van-grid :column-num="3">
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="underway-o" text="历史" />
      <van-grid-item icon="records" text="作品" />
    </van-grid>
    <!-- 功能区域 -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="用户反馈" is-link />
      <!-- 
        动态路由参数里可以直接写路径，例$router.push('/login')
        也可以传对象：固定属性：
          name：路由的名字（在路由中写好的）
          params：给路由的参数
          path：路由跳转的路径（如果写path和params的话，路由跳转后，params为空）
      -->
      <van-cell
        title="小智同学"
        @click="$router.push({name:'robot',params:{icon:userInfo.photo}})"
        is-link
      />
      <van-cell title="退出登录" @click="logout" is-link />
    </van-cell-group>
  </div>
</template>

<script>
// 导入用户相关接口
import { getInfo } from "@/api/user";
import { removeLocal } from "@/utils/local.js";
export default {
  name: "mine",
  data() {
    return {
      // 用户信息
      userInfo: {}
    };
  },
  methods: {
    // 退出登录
    logout() {
      removeLocal("ttToken");
      this.$store.commit('changeToken','');
    }
  },
  async created() {
    // 判断有没有登录
    if (this.$store.state.token) {
      // 有token表示已登录
      // 发请求获取用户自己的信息
      let res = await getInfo();
      // 保存用户信息
      this.userInfo = res.data;
    }
  }
};
</script>

<style lang="less" scoped>
.mine {
  .top {
    background-color: #3e9df8;
    position: relative;
    min-height: 200px;
    .user-info {
      display: flex;
      padding-top: 35px;
      padding-left: 50px;
      .avatar {
        height: 66px;
        width: 66px;
        border-radius: 50%;
      }
      .username {
        margin-left: 20px;
        color: #fff;
        margin-top: 5px;
      }
    }
    .data {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
      .data-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          color: #fff;
          margin-bottom: 5px;
        }
      }
    }
    .readTime {
      position: absolute;
      top: 50px;
      right: 0;
      padding: 5px 15px;
      background-color: #2b6ead;
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        font-size: 13px;
        color: #fff;
        &:not(:last-of-type) {
          margin-bottom: 2px;
        }
      }
    }
    .top-phone {
      width: 66px;
      height: 66px;
      border-radius: 50%;
      margin: 0 auto;
      padding-top: 60px;
      img {
        width: 100%;
      }
    }
  }
  /deep/.van-grid-item {
    .van-icon {
      font-size: 30px;
    }
    .van-icon-star-o {
      color: #ff4444;
    }
    .van-icon-underway-o {
      color: #ff9e1f;
    }
    .van-icon-records {
      color: #7097ff;
    }
    .van-grid-item__text {
      font-size: 16px;
    }
  }
  .van-cell-group {
    margin-top: 15px;
    .van-cell__title {
      font-size: 16px;
    }
  }
}
</style>