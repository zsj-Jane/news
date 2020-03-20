<template>
  <div class="detail">
    <!-- 导航栏部分 -->
    <van-nav-bar title="标题" left-arrow @click-left="$router.back()" @click-right="onClickRight">
      <van-icon name="ellipsis" slot="right" />
    </van-nav-bar>
    <!-- 标题部分 -->
    <h2 class="title">文章标题</h2>
    <!-- 作者信息 -->
    <van-cell>
      <template slot="title">
        <!-- 头像 -->
        <div class="avatar">
          <img src="http://toutiao.meiduo.site/Fkj6tQi3xJwVXi1u2swCElotfdCi" alt />
        </div>
        <!-- 作者名字+时间 -->
        <div class="aut_info">
          <div class="name">作者</div>
          <div class="time">1周前</div>
        </div>
        <!-- 关注按钮 -->
        <van-button type="info" icon="plus">关注</van-button>
      </template>
    </van-cell>
    <!-- 内容部分 -->
    <div class="content">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque quibusdam illo perspiciatis deleniti omnis nostrum cum, velit assumenda quidem fugiat soluta ipsam, blanditiis adipisci, rerum qui fuga magni odit laborum.
      Incidunt, qui numquam accusantium excepturi quaerat, hic animi est vero eveniet sunt doloribus blanditiis atque distinctio. Assumenda eos, culpa fuga sunt officiis ea rerum veritatis perferendis perspiciatis ullam, amet cupiditate.
      rum corporis. Dignissimos quas placeat a debitis et quia est adipisci quos, id obcaecati, facilis natus enim quibusdam. Repellendus doloremque quam reprehenderit ad, voluptatum quibusdam dolorem?
    </div>
    <!-- 操作区域 -->
    <div class="operation">
      <van-button icon="like" round>点赞</van-button>
      <van-button icon="delete" round>不喜欢</van-button>
    </div>
    <h3 class="subhead">猜你喜欢</h3>
    <!-- 评论区域 -->
    <comment></comment>
  </div>
</template>

<script>
// 导入评论组件
import comment from "./component/comment";
export default {
  name: "detail",
  components: {
    // 评论组件
    comment
  },
  data() {
    return {};
  },
  methods: {
    onClickRight() {
      this.$toast("按钮");
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  height: 100%;
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
      .name{
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