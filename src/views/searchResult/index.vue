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
            <span>{{item.title}}</span>
            <!-- 显示一张图片 -->
            <img v-if="item.cover.type==1" :src="item.cover.images[0]" alt class="img" />
          </div>
          <!-- 图片 -->
          <van-grid v-if="item.cover.type==3" :border="false" :column-num="3">
            <van-grid-item v-for="(it, idx) in item.cover.images" :key="idx">
              <van-image class="img" :src="it" />
            </van-grid-item>
          </van-grid>
          <!-- 作者、评论、时间等信息 -->
          <div class="info">
            <span>{{item.aut_name}}</span>
            <span>{{item.comm_count}} 评论</span>
            <span>{{item.pubdate | formatTime}}</span>
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
  </div>
</template>

<script>
// 导入搜索相关接口
import { getSearch } from "@/api/search.js";
export default {
  name: "result",
  data() {
    return {
      // 列表数据
      list: [],
      // 控制加载状态，为false表示不在加载状态，且当为false时，onLoad才会被调用
      loading: false,
      // 加载完成的状态，为false表示没加载完，为true表示已经加载完成
      finished: false,
      // 当前页数
      page: 1,
      // 页容量
      size: 10
    };
  },
  methods: {
    // 加载列表数据的方法，一旦执行，会自动把loading改为true
    async onLoad() {
      // 发送请求获取搜索结果
      let res = await getSearch({
        page: this.page,
        per_page: this.size,
        q: this.$route.params.key
      });
      console.log(res);
      // 一页数据加载完后，下一次就要加载下一页数据
      this.page++;
      // 计算出最后一页的页码
      let lastPage = Math.ceil(res.data.total_count / this.page);
      // 有总数据量和分页数据，就以页码是否为最后一页为结束条件
      if (this.page > lastPage) {
        // 返回结果为空，表示数据全部加载完成
        // 把加载完成状态改为true
        this.finished = true;
      } else {
        // 表示还有数据没有加载完成
        // 表示可以继续加载
        this.loading = false;
        // 保存请求的搜索结果数据
        this.list.push(...res.data.results);
      }
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
  .van-cell {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0;
    margin-bottom: 20px;
    .title {
      padding: 0 15px 5px;
      display: flex;
      justify-content: space-between;
    }
    .img {
      width: 116px;
      height: 73px;
    }
    .info {
      padding: 0 15px;
      span {
        margin-right: 10px;
        font-size: 12px;
        color: #ccc;
      }
    }
    .btn {
      display: flex;
      .van-button--normal {
        flex: 1;
      }
    }
  }
}
</style>