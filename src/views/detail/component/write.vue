<template>
  <div class="write">
    <!-- 输入框 -->
    <van-search
      @keydown.enter="addComment"
      v-model="msg"
      shape="round"
      left-icon
      placeholder="写评论"
    />
    <!-- 评论 -->
    <van-icon name="comment-o" />
    <!-- 收藏 -->
    <van-icon v-if="selfCollect" @click="cancleCollect" name="star" color="yellow" />
    <van-icon v-else @click="collect" name="star-o" />
    <!-- 分享 -->
    <van-icon name="share" />
  </div>
</template>

<script>
// 导入评论相关接口
import { commentAdd } from "@/api/comment.js";
// 导入eventBus
import bus from "@/utils/bus.js";
// 导入文章相关接口
import { articleCollect, articleCancleCollect } from "@/api/article.js";
export default {
  name: "write",
  props: ["is_collected"],
  data() {
    return {
      // 输入框双向绑定内容
      msg: "",
      // 收藏值
      selfCollect: this.is_collected
    };
  },
  watch: {
    // 侦听父组件传过来的值
    is_collected(val) {
      this.selfCollect = val;
    }
  },
  methods: {
    // 发表评论
    async addComment() {
      // 当输入框的内容不为空或者空格时，才发送请求
      // 判断登录状态
      if (this.msg.trim() != "" && this.checkLogin()) {
        // 发送请求添加评论
        let res = await commentAdd({
          // 文章id
          target: this.$route.params.art_id,
          // 评论内容
          content: this.msg
        });
        // 提供comment组件，要添加的评论数据
        bus.$emit("newComment", res.data.new_obj);
        // 把输入框中的内容清空
        this.msg = "";
      }
    },
    // 取消收藏文章
    async cancleCollect() {
      // 发请求取消收藏文章
      await articleCancleCollect({
        art_id: this.$route.params.art_id
      });
      // 改变收藏值，实现效果
      this.selfCollect = false;
    },
    // 收藏文章
    async collect() {
      // 发请求收藏文章
      await articleCollect({
        target: this.$route.params.art_id
      });
      // 改变收藏值，实现效果
      this.selfCollect = true;
    }
  }
};
</script>

<style lang="less">
.write {
  display: flex;
  background-color: #ffffff;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #ccc;
  .van-search {
    flex: 1;
    margin-right: 15px;
  }
  .van-icon {
    font-size: 22px;
    color: rgb(119, 119, 119);
    margin-right: 25px;
  }
}
</style>