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
    <van-icon name="comment-o" @click="addComment">
      <span class="circle" v-if="show">{{isComment?com_total:reply_total}}</span>
    </van-icon>
    <!-- 如果是评论界面，就显示这个div -->
    <div v-if="isComment">
      <!-- 收藏 -->
      <van-icon v-if="selfCollect" @click="cancleCollect" name="star" color="yellow" />
      <van-icon v-else @click="collect" name="star-o" />
      <!-- 分享 -->
      <van-icon name="share" @click="share" />
    </div>
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
  props: ["is_collected", "isComment", "com_id", "reply_list", "reply_total"],
  data() {
    return {
      // 输入框双向绑定内容
      msg: "",
      // 收藏值
      selfCollect: this.is_collected,
      // 评论总数
      com_total: 0,
      // 是否显示评论图标上的数字圆圈
      show: false
    };
  },
  watch: {
    // 侦听父组件传过来的值
    is_collected(val) {
      this.selfCollect = val;
    },
    // 侦听回复评论组件传过来的回复评论总数的值
    reply_total(val) {
      // 判断是否为回复评论界面
      if (!this.isComment) {
        // 判断回复评论总数是否为0
        if (val != 0) {
          // 当不为0时，显示红色圆圈
          this.show = true;
        } else {
          // 为0时，不显示红色圆圈
          this.show = false;
        }
      }
    }
  },
  methods: {
    // 发表评论或回复评论
    async addComment() {
      // 当输入框的内容不为空或者空格时，才发送请求
      // 判断登录状态
      if (this.msg.trim() != "" && this.checkLogin()) {
        // 判断是发表评论还是回复评论
        if (this.isComment) {
          // 代表发表评论
          // 发送请求添加评论
          let res = await commentAdd({
            // 文章id
            target: this.$route.params.art_id,
            // 评论内容
            content: this.msg
          });
          // 提供comment组件，要添加的评论数据
          bus.$emit("newComment", res.data.new_obj);
        } else {
          // 代表回复评论
          // 发请求回复评论
          let res = await commentAdd({
            // 评论id
            target: this.com_id,
            // 回复评论内容
            content: this.msg,
            // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
            art_id: this.$route.params.art_id
          });
          // console.log(res);
          // 把添加的回复评论，保存在reply组件list中的第一条
          this.reply_list.unshift(res.data.new_obj);
          // 通知父组件，回复评论添加成功
          this.$emit("addReply");
        }
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
    },
    // 分享按钮的点击事件
    share() {
      this.$toast("分享功能暂不支持");
    }
  },
  created() {
    // 订阅
    bus.$on("com_total", data => {
      // 保存评论总数
      this.com_total = data;
      // 当显示为comment组件时
      if (this.isComment) {
        // 判断评论总数是否为0
        if (this.com_total != 0) {
          // 当不为0时，显示红色圆圈
          this.show = true;
        } else {
          // 为0时，不显示红色圆圈
          this.show = false;
        }
      }
    });
  },
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
  .circle {
    display: inline-block;
    position: absolute;
    right: -10px;
    top: -6px;
    min-width: 13px;
    height: 13px;
    border-radius: 50%;
    background-color: #e22829;
    font-size: 10px;
    color: #ffffff;
    padding: 3px;
    line-height: 13px;
    text-align: center;
  }
}
</style>