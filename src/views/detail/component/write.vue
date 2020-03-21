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
    <van-icon v-if="is_collected" name="star" color="yellow" />
    <van-icon v-else name="star-o" />
    <!-- 分享 -->
    <van-icon name="share" />
  </div>
</template>

<script>
// 导入评论相关接口
import { commentAdd } from "@/api/comment.js";
// 导入eventBus
import bus from "@/utils/bus.js";
export default {
  name: "write",
  props: ["is_collected"],
  data() {
    return {
      msg: ""
    };
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