<template>
  <div class="detail">
    <!-- 导航栏部分 -->
    <van-nav-bar title="标题" left-arrow @click-left="$router.back()" @click-right="onClickRight">
      <van-icon name="ellipsis" slot="right" />
    </van-nav-bar>
    <!-- 标题部分 -->
    <h2 class="title">{{detail.title}}</h2>
    <!-- 作者信息 -->
    <van-cell>
      <template slot="title">
        <!-- 头像 -->
        <div class="avatar">
          <img :src="detail.aut_photo" alt />
        </div>
        <!-- 作者名字+时间 -->
        <div class="aut_info">
          <div class="name">{{detail.aut_name}}</div>
          <div class="time">{{detail.pubdate | formatTime}}</div>
        </div>
        <!-- 关注按钮 -->
        <van-button type="info" v-if="detail.is_followed" @click="unfollow">已关注</van-button>
        <van-button type="info" icon="plus" v-else @click="follow">关注</van-button>
      </template>
    </van-cell>
    <!-- 内容部分 -->
    <van-cell>
      <template slot="title">
        <div class="content" v-html="detail.content"></div>
      </template>
    </van-cell>
    <!-- 操作区域 -->
    <div class="operation">
      <van-button
        v-if="detail.attitude==1"
        @click="unlike"
        plain
        color="#ff4444"
        icon="like"
        round
      >点赞</van-button>
      <van-button v-else @click="like" icon="like" round>点赞</van-button>
      <van-button
        v-if="detail.attitude==0"
        @click="cancleDislike"
        plain
        color="#ff4444"
        icon="delete"
        round
      >不喜欢</van-button>
      <van-button v-else @click="dislike" icon="delete" round>不喜欢</van-button>
    </div>
    <h3 class="subhead">猜你喜欢</h3>
    <!-- 评论区域 -->
    <comment></comment>
    <!-- 写评论组件 -->
    <write :is_collected="detail.is_collected"></write>
    <!-- 写评论的回复组件 -->
    <reply></reply>
  </div>
</template>

<script>
// 导入评论组件
import comment from "./component/comment";
// 导入写评论组件
import write from "./component/write";
// 导入写评论的回复组件
import reply from './component/reply';
// 导入文章相关接口
import {
  articleDetail,
  articleLiking,
  articleUnlike,
  articleDislike,
  articleCannelDislike
} from "@/api/article.js";
// 导入用户相关接口
import { followUser, unfollowUser } from "@/api/user.js";
export default {
  name: "detail",
  components: {
    // 评论组件
    comment,
    // 写评论组件
    write,
    // 写评论的回复组件
    reply
  },
  data() {
    return {
      // 文章详情
      detail: ""
    };
  },
  methods: {
    onClickRight() {
      this.$toast("按钮");
    },
    // 关注按钮的点击事件
    async follow() {
      // 判断登录状态
      if (this.checkLogin()) {
        // 发请求去关注用户
        await followUser({
          target: this.detail.aut_id
        });
        // 把关注状态设置为true
        this.detail.is_followed = true;
        // 成功提示
        this.$toast.success("关注成功");
      }
    },
    // 已关注按钮的点击事件
    async unfollow() {
      // 判断登录状态
      if (this.checkLogin()) {
        // 发请求去取关用户
        unfollowUser({
          aut_id: this.detail.aut_id
        });
        // 把关注状态设置为false
        this.detail.is_followed = false;
        // 成功提示
        this.$toast.success("取消关注成功");
      }
    },
    // 取消点赞
    async unlike() {
      // 判断登录状态
      if (this.checkLogin()) {
        // 发请求去取消点赞
        await articleUnlike({
          art_id: this.detail.art_id
        });
        // 把attitude设置为-1（无态度）
        this.detail.attitude = -1;
      }
    },
    // 点赞的点击事件
    async like() {
      // 判断登录状态
      if (this.checkLogin()) {
        // 发请求去点赞文章
        await articleLiking({
          target: this.detail.art_id
        });
        // 把attitude设置为1
        this.detail.attitude = 1;
      }
    },
    // 取消对文章不喜欢
    async cancleDislike() {
      // 判断登录状态
      if (this.checkLogin()) {
        // 发请求去取消对文章不喜欢
        await articleCannelDislike({
          art_id: this.detail.art_id
        });
        // 把attitude为-1（无态度）
        this.detail.attitude = -1;
      }
    },
    // 不喜欢的点击事件
    async dislike() {
      // 判断登录状态
      if (this.checkLogin()) {
        // 发请求去对文章不喜欢
        await articleDislike({
          target: this.detail.art_id
        });
        // 把attitude设置为0
        this.detail.attitude = 0;
      }
    }
  },
  async created() {
    // 页面一打开，请求文章详情数据
    let res = await articleDetail({
      art_id: this.$route.params.art_id
    });
    // console.log(res);
    // 保存文章详情数据
    this.detail = res.data;
  }
};
</script>

<style lang="less" scoped>
.detail {
  // 解决内容比较多，背景颜色问题
  min-height: 100%;
  background-color: #fff;
  .van-nav-bar {
    background-color: #3194ff;
    .van-icon {
      color: #ffffff;
    }
    .van-nav-bar__title {
      color: #ffffff;
    }
  }
  .title {
    text-align: center;
  }
  .van-cell__title {
    display: flex;
    .avatar > img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .aut_info {
      flex: 1;
      margin-left: 15px;
      .name {
        margin-bottom: 5px;
      }
    }
  }
  .content {
    // padding: 30px 15px;
    /deep/img {
      // 限制内容区域的图片大小
      max-width: 100%;
    }
    // 找到content中所有元素，都设置换行模式
    /deep/ * {
      // 换行
      word-break: break-word;
      // 间隙正常
      white-space: normal;
    }
  }
  .operation {
    display: flex;
    justify-content: space-around;
  }
  .subhead {
    padding: 0 15px;
  }
}
</style>