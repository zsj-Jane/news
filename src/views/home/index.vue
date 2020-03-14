<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <div class="top-nav">
      <!-- 左边图标 -->
      <van-icon class="top-icon" name="wap-nav" />
      <!-- 搜索框 -->
      <van-search
        class="top-search"
        v-model="value"
        shape="round"
        background="#3194ff"
        placeholder="请输入搜索关键词"
      />
      <!-- 右边图标 -->
      <van-icon class="top-icon" name="search" />
    </div>
    <!-- 频道部分 -->
    <van-tabs v-model="active" class="tabs">
      <van-tab v-for="(item, index) in channelList" :key="index" :name="item.id" :title="item.name">
        <van-pull-refresh v-model="item.pullLoading" @refresh="onRefresh(item)">
          <van-list v-model="item.loading" :finished="item.finished" finished-text="没有更多了" @load="onLoad(item)">
            <van-cell v-for="(item1,index1) in item.list" :key="index1" :title="item1.title" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 导入获取用户频道列表接口
import { channelList } from "@/api/channel.js";
// 导入获取频道新闻推荐列表接口
import { articleList } from "@/api/article.js";
export default {
  name: "home",
  data() {
    return {
      // 搜索框绑定数据
      value: "",
      // 当前频道的id
      active: "",
      // 频道数据
      channelList: []
    };
  },
  methods: {
    // 加载数据的方法
    async onLoad(item) {
      // 获取频道新闻推荐列表数据
      let res = await articleList({
        // 频道id
        channel_id: item.id,
        // 时间戳
        timestamp: Date.now(),
        // 是否包含置顶
        with_top: 0
      });
      console.log(res);

      item.list.push(...res.data.results);
      // 加载一段数据，改成false的话，后面滚到最后一定会调用onLoad
      // 这个属性是控制加载状态的，为false就会再调用onLoad，为true就不调用
      item.loading = false;
      // 如果数据超过100个就不加载了，显示没有更多数据了
      if (item.list.length >= 100) {
        item.finished = true;
      }
    },
    // 下拉刷新的方法
    onRefresh(item) {
      // 只要往下拽就会触发，一旦触发，会自动把下拉状态给为true
      console.log("下拉刷新了" + item.pullLoading);
      setTimeout(() => {
        item.pullLoading = false;
      }, 1000);
    }
  },
  async created() {
    // 发送获取用户频道列表请求
    let res = await channelList();
    // 保存频道数据
    this.channelList = res.data.channels;
    // 拿到频道数据后，给每个频道数据添加(控制下拉刷新的状态、列表数据、控制列表的刷新状态、是否已经刷到底部)这四个属性
    this.channelList.forEach(item => {
      // 控制下拉刷新的状态
      // 直接赋值，界面不会跟着响应，要用$set
      // item.pullLoading = false;
      this.$set(item,'pullLoading',false);
      // 列表数据(新闻数据)
      this.$set(item,'list',[]);
      // 控制列表的刷新状态，为false会调用onLoad，为true则不调用
      this.$set(item,'loading',false);
      // 是否已经刷到底部
      this.$set(item,'finished',false);
    });
  }
};
</script>

<style lang="less">
.home {
  .top-nav {
    display: flex;
    align-items: center;
    background-color: #3194ff;
    padding-left: 10px;
    padding-right: 10px;
    // 固定定位
    position: fixed;
    // 提高层级
    z-index: 999;
    // div不脱标会用父盒子宽度，但固定定位脱标了，靠内容撑开
    width: 100%;
    // 内减模型
    box-sizing: border-box;
    top: 0;
    .top-icon {
      font-size: 20px;
      color: white;
    }
    .top-search {
      flex: 1;
    }
  }
  .tabs {
    .van-tabs__wrap {
      position: fixed;
      z-index: 999;
      top: 54px;
      width: 100%;
    }
    .van-tabs__content {
      margin-top: 98px;
      margin-bottom: 50px;
    }
  }
}
</style>