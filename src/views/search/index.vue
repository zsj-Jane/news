<template>
  <div class="search-wrap">
    <!-- 顶部通栏 -->
    <div class="top-nav">
      <!-- 搜索框 -->
      <van-search class="top-search" v-model="value" background="#3194ff" placeholder="请输入搜索关键词" />
      <!-- 右边文字 -->
      <span>取消</span>
    </div>
    <!-- 历史记录区域 -->
    <div class="history" v-if="isHistory">
      <!-- 标题 -->
      <div class="title">
        <span>历史记录</span>
        <van-icon class="del-icon" name="delete" />
      </div>
      <!-- 内容 -->
      <van-row class="content">
        <van-col span="12" class="history-item">搜索记录</van-col>
      </van-row>
    </div>
    <!-- 搜索建议区域 -->
    <van-cell-group v-else>
      <van-cell title="单元格" icon="search" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
    data() {
        return {
            // 是否显示历史记录
            isHistory:true,
        }
    },
};
</script>

<style lang="less">
.search-wrap {
  .top-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #3194ff;
    padding-right: 10px;
    .top-search {
      flex: 1;
    }
    span {
      color: white;
    }
  }
  .history {
    background-color: #fff;
    margin-top: 10px;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 44px;
      padding: 0 10px;
      span {
        font-size: 16px;
      }
      .del-icon {
        font-size: 25px;
      }
    }
    .content {
      .history-item {
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 0.5px solid #ccc;
        &:nth-of-type(odd) {
          border-right: 0.5px solid #ccc;
        }
      }
    }
  }
}
</style>