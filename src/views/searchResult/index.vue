<template>
  <div class="result">
    <!-- 导航栏部分 -->
    <van-nav-bar title="搜索结果" left-arrow @click-left="$router.back()" />
    <!-- 列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in list" :key="index">
        <template slot="title">
          <!-- 标题 -->
          <div class="title">
            <span>{{item}}</span>
          </div>
          <!-- 图片 -->
          <van-grid :border="false" :column-num="3">
            <van-grid-item v-for="(item, index) in 3" :key="index">
              <van-image class="img" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
            </van-grid-item>
          </van-grid>
          <!-- 作者、评论、时间等信息 -->
          <div class="info">
            <span>作者</span>
            <span>0评论</span>
            <span>时间</span>
          </div>
          <!-- 评论、点赞、分享功能 -->
          <div class="btn">
            <van-button type="default" icon="comment-o">评论</van-button>
            <van-button type="default" icon="like-o">点赞</van-button>
            <van-button type="default" icon="share">分享</van-button>
          </div>
        </template>
      </van-cell>
    </van-list>
    <p>{{$route.params.key}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 列表数据
      list: [],
      // 控制加载状态，为false表示不在加载状态，且当为false时，onLoad才会被调用
      loading: false,
      // 加载完成的状态，为false表示没加载完，为true表示已经加载完成
      finished: false
    };
  },
  methods: {
    // 加载列表数据的方法，一旦执行，会自动把loading改为true
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    }
  }
};
</script>

<style lang="less">
.result {
  .van-nav-bar {
    background-color: #3194ff;
    .van-icon {
      color: #ffffff;
    }
    .van-nav-bar__title {
      color: #ffffff;
    }
  }
  .van-cell{
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0;
    margin-bottom: 20px;
    .title {
      padding: 0 15px;
    }
    .img{
      width: 116px;
      height: 73px;
    }
    .info{
      padding: 0 15px;
      span{
        margin-right: 10px;
        font-size: 12px;
        color: #ccc;
      }
    }
    .btn{
      display: flex;
      .van-button--normal{
        flex:1;
      }
    }
  }
}
</style>