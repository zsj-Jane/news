<template>
  <div class="search-wrap">
    <!-- 顶部通栏 -->
    <div class="top-nav">
      <!-- 搜索框 -->
      <van-search
        @input="onInput"
        @keydown.enter="toSearchResult(key)"
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
        <van-icon class="del-icon" name="delete" @click="clearHistory" />
      </div>
      <!-- 内容 -->
      <van-row class="content">
        <van-col
          v-for="(item, index) in historyList"
          :key="index"
          span="12"
          class="history-item"
          @click="toSearchResult(item)"
        >
          {{item}}
          <!-- 阻止事件冒泡 -->
          <van-icon class="close" name="close" @click.stop="del(index)" />
        </van-col>
      </van-row>
    </div>
    <!-- 搜索建议区域 -->
    <van-cell-group v-else>
      <van-cell
        v-for="(item, index) in suggestList"
        :key="index"
        icon="search"
        @click="toSearchResult(item.oldItem)"
      >
        <!-- :title="item"无法解析出来，当做纯文本，需用自定义插槽title -->
        <template slot="title">
          <div v-html="item.newItem"></div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
// 导入搜索相关接口
import { getSuggestion } from "@/api/search.js";
// 导入操作本地存储的工具
import { setLocal, getLocal, removeLocal } from "@/utils/local.js";
export default {
  name: "search",
  data() {
    return {
      // 是否显示历史记录
      // isHistory: true,
      // 搜索框双向绑定的值
      key: "",
      // 搜索联想建议数组
      suggestList: [],
      // 计时器id
      timeId: null,
      // 历史记录数组
      historyList: getLocal("history") || []
    };
  },
  methods: {
    // 正在输入事件
    onInput() {
      // 先清除上一次的计时器
      clearTimeout(this.timeId);
      // 开启计时器，等停止后400毫秒在执行内部函数（函数防抖）
      this.timeId = setTimeout(async () => {
        // 如果关键词删完了，就不发送请求了,并显示出历史记录区域
        if (this.key == "") {
          // this.isHistory=true;
          // 清空搜索联想建议数组
          this.suggestList = [];
          // 退出方法
          return;
        }
        // 发送请求获得联想词汇
        let res = await getSuggestion({ q: this.key });
        // 保存获取的搜索联想建议
        this.suggestList = res.data.options;
        // this.isHistory = false;
        // 遍历这个数组，对每个元素进行高亮处理(不区分大小写)
        this.suggestList = this.suggestList.map(item => {
          // 先统一转成小写，在调用replace替换每个数组元素中匹配的内容
          let str = item
            .toLowerCase()
            .replace(
              this.key.toLowerCase(),
              `<span style="color:red;">${this.key}</span>`
            );
          // 把原始值和新的带标签的值存进对象里，作为一个元素返回
          return {
            oldItem: item,
            newItem: str
          };
        });
      }, 400);
    },
    // 跳转到搜索结果页面
    toSearchResult(key) {
      // 将搜索的关键字保存到历史记录数组中的第一位
      this.historyList.unshift(key);
      // 利用ES6中的set去重
      this.historyList = [...new Set(this.historyList)];
      // 把最新的历史记录数组保存在本地
      setLocal("history", JSON.stringify(this.historyList));
      // 跳转到搜索结果页面，并携带关键字
      this.$router.push(`/searchResult/${key}`);
    },
    // 清除所有历史记录
    clearHistory() {
      // 清空历史记录数组
      this.historyList = [];
      // 删除本地存储的历史记录
      removeLocal("history");
    },
    // 删除单个历史记录
    del(index) {
      // 从数组中删除这个元素
      this.historyList.splice(index, 1);
      // 把最新的历史记录数组保存在本地
      setLocal("history", JSON.stringify(this.historyList));
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
        position: relative;
        &:nth-of-type(odd) {
          border-right: 0.5px solid #ccc;
        }
        .close {
          position: absolute;
          right: 10px;
        }
      }
    }
  }
}
</style>