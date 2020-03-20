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
        <van-button type="info" v-if="detail.is_followed">已关注</van-button>
        <van-button type="info" icon="plus" v-else>关注</van-button>
      </template>
    </van-cell>
    <!-- 内容部分 -->
    <div class="content" v-html="detail.content"></div>
    <!-- 操作区域 -->
    <div class="operation">
      <van-button v-if="detail.attitude==1" plain color="#ff4444" icon="like" round>点赞</van-button>
      <van-button v-else icon="like" round>点赞</van-button>
      <van-button v-if="detail.attitude==0" plain color="#ff4444" icon="delete" round>不喜欢</van-button>
      <van-button v-else icon="delete" round>不喜欢</van-button>
    </div>
    <h3 class="subhead">猜你喜欢</h3>
    <!-- 评论区域 -->
    <comment></comment>
    <!-- 写评论组件 -->
    <write></write>
  </div>
</template>

<script>
// 导入评论组件
import comment from "./component/comment";
// 导入写评论组件
import write from "./component/write";
// 导入文章相关接口
import { articleDetail } from "@/api/article.js";
export default {
  name: "detail",
  components: {
    // 评论组件
    comment,
    // 写评论组件
    write
  },
  data() {
    return {
      // 文章详情
      detail:""
    };
  },
  methods: {
    onClickRight() {
      this.$toast("按钮");
    }
  },
  async created() {
    // 页面一打开，请求文章详情数据
    let res = await articleDetail({
      art_id: this.$route.params.art_id
    });
    console.log(res);
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
    padding: 30px 15px;
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