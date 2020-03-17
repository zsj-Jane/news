<template>
  <van-popup class="more-wrap" v-model="show">
    <!-- 第一层cell -->
    <van-cell-group v-if="isFirst">
      <van-cell title="不感兴趣" icon="failure" @click="dislike" />
      <van-cell title="反馈垃圾内容" icon="warning-o" is-link @click="isFirst=false" />
      <van-cell title="拉黑作者" icon="delete" />
    </van-cell-group>
    <!-- 第二一层cell：反馈垃圾内容 -->
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isFirst=true" />
      <van-cell
        v-for="(item, index) in reportList"
        :key="index"
        :title="item.title"
        @click="report(item.type)"
      />
    </van-cell-group>
  </van-popup>
</template>

<script>
// 导入文章操作相关接口
import { articleDislike, articleReport } from "@/api/article.js";
export default {
  name: "more",
  data() {
    return {
      // 是否显示弹出层
      show: false,
      // 文章id
      art_id: "",
      // 文章数组
      art_list: [],
      // 标记是否为第一个面板
      isFirst: true,
      // 举报文章理由数组
      reportList: [
        { type: 1, title: "标题夸张" },
        { type: 2, title: "低俗色情" },
        { type: 3, title: "错别字多" },
        { type: 4, title: "旧闻重复" },
        { type: 5, title: "广告软文" },
        { type: 6, title: "内容不实" },
        { type: 7, title: "涉嫌违法范围" },
        { type: 8, title: "侵权" },
        { type: 0, title: "其他问题" }
      ]
    };
  },
  methods: {
    // 删除文章的方法
    articleDel() {
      for (let i = 0; i < this.art_list.length; i++) {
        // 判断当前文章id是否为要删除的文章id
        if (this.art_list[i].art_id == this.art_id) {
          // 找到就删除该文章
          this.art_list.splice(i, 1);
          // 跳出循环
          break;
        }
      }
    },
    // 不感兴趣的点击事件
    async dislike() {
      // 删除当前点击的文章
      this.articleDel();
      // 发请求给服务器，保存不感兴趣的文章操作
      let res = await articleDislike({
        // 用json-bigint转换后，使用时，把转换成对象的大数字id完整拼接，用toString()方法
        target: this.art_id.toString()
      });
      // 弹出提示
      this.$toast("删除不感兴趣项成功");
      // 删完之后隐藏弹出层
      this.show = false;
    },
    // 举报文章的点击事件
    async report(type) {
      // 删除当前点击的文章
      this.articleDel();
      // 发送请求举报文章
      let res = await articleReport({
        target: this.art_id.toString(),
        // target:this.art_id,
        type,
        remark: ""
      });
      // 弹出提示
      this.$toast("举报成功");
      // 返回第一个面板
      this.isFirst = true;
      // 删完之后隐藏弹出层
      this.show = false;
    }
  }
};
</script>

<style lang="less">
.more-wrap {
  width: 80%;
  border-radius: 6px;
}
</style>