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
      <van-tab v-for="(item, index) in 6" :key="index" :title="'标签'+item">
        <van-pull-refresh v-model="pullLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      active: 0,
      // 列表数据
      list: [],
      // 控制列表的刷新状态，为false会调用onLoad，为true则不调用
      loading: false,
      // 是否已经刷到底部
      finished: false,
      // 控制下拉刷新的状态
      pullLoading: false
    };
  },
  methods: {
    // 加载数据的方法
    onLoad() {
      console.log("被调用了");
      let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
      this.list.push(...arr);
      // 加载一段数据，改成false的话，后面滚到最后一定会调用onLoad
      // 这个属性是控制加载状态的，为false就会再调用onLoad，为true就不调用
      this.loading = false;
      // 如果数据超过100个就不加载了，显示没有更多数据了
      if (this.list.length >= 100) {
        this.finished = true;
      }
    },
    // 下拉刷新的方法
    onRefresh() {
      // 只要往下拽就会触发，一旦触发，会自动把下拉状态给为true
      console.log("下拉刷新了" + this.pullLoading);
      setTimeout(() => {
        this.pullLoading = false;
      }, 1000);
    }
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