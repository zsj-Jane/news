<template>
  <div class="search-wrap">
    <!-- 顶部通栏 -->
    <div class="top-nav">
      <!-- 搜索框 -->
      <van-search
        @input="onInput"
        class="top-search"
        v-model="key"
        background="#3194ff"
        placeholder="请输入搜索关键词"
      />
      <!-- 右边文字 -->
      <span @click="$router.back()">取消</span>
    </div>
    <!-- 历史记录区域 -->
    <div class="history" v-if="suggestList.length==0">
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
      <van-cell v-for="(item, index) in suggestList" :key="index" :title="item" icon="search" />
    </van-cell-group>
  </div>
</template>

<script>
// 导入搜索相关接口
import { getSuggestion } from "@/api/search.js";
export default {
  name:"search",
  data() {
    return {
      // 是否显示历史记录
      // isHistory: true,
      // 搜索框双向绑定的值
      key: "",
      // 搜索联想建议数组
      suggestList: []
    };
  },
  methods: {
    async onInput() {
      // 如果关键词删完了，就不发送请求了,并显示出历史记录区域
      if (this.key == "") {
        // this.isHistory=true;
        this.suggestList=[];
        return;
      }
      // 发送请求
      let res = await getSuggestion({ q: this.key });
      // 保存获取的搜索联想建议
      this.suggestList = res.data.options;
      // this.isHistory = false;
    }
  }
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