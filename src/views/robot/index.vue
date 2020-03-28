<template>
  <div class="robot">
    <!-- 导航栏 -->
    <van-nav-bar title="小智机器人" left-arrow @click-left="$router.back()" />
    <!-- 聊天面板 -->
    <div class="chat-wrap" ref="chat">
      <div class="chat-item" v-for="(item, index) in list" :key="index" :class="{user:item.isMe}">
        <img
          class="avatar"
          :src="item.isMe?$route.params.icon:'http://img2.imgtn.bdimg.com/it/u=3476053323,2840761167&fm=26&gp=0.jpg'"
          alt
        />
        <div class="content">{{item.content}}</div>
      </div>
    </div>
    <!-- 底部 发消息区域 -->
    <van-search
      class="write"
      v-model="msg"
      show-action
      left-icon
      shape="round"
      background="#f4f5f6"
      @keydown.enter="send"
      @cancel="send"
    >
      <template #action>
        <div @click="send">发送</div>
      </template>
    </van-search>
  </div>
</template>

<script>
// 导入socket-io客户端
import io from "socket.io-client";
export default {
  name: "robot",
  data() {
    return {
      // 聊天记录数组
      list: [
        { isMe: false, content: "你好，我是小智" },
        { isMe: true, content: "你好" }
      ],
      // 消息输入框内容
      msg: "",
      socket: null
    };
  },
  methods: {
    // 发消息
    send() {
      // 判断输入框内容是否为空，为空就返回
      if (this.msg.trim() == "") {
        return;
      }
      // 如果不为空，就把输入的内容发送给服务器
      this.socket.emit("message", {
        msg: this.msg,
        timestamp: Date.now()
      });
      // 添加到聊天记录数组中
      this.list.push({
        isMe: true,
        content: this.msg
      });
      // 在界面下一次更新之后在执行
      this.$nextTick(() => {
        // 让滚动条滚动到最后
        this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
      });
      // 清空消息输入框内容
      this.msg = "";
    }
  },
  created() {
    // 连接服务器,需要携带token，网址传递
    this.socket = io(
      `http://ttapi.research.itcast.cn?token=${this.$store.state.token}`
    );
    // 接收服务器返回的消息
    this.socket.on("message", data => {
      console.log(data);
      // 将返回的消息，添加到聊天记录数组中
      this.list.push({
        isMe: false,
        content: data.msg
      });
      // 机器人回复后也要滚动到最后，在界面下一次更新之后在执行
      this.$nextTick(() => {
        // 让滚动条滚动到最后
        this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
      });
    });
  }
};
</script>

<style lang="less" scoped>
.robot {
  .van-nav-bar {
    background-color: #3e9df8;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon {
      color: #fff;
    }
  }
  // 聊天面板样式
  .chat-wrap {
    // 固定的高度，如果没有高度高度不会滚，因为没有固定高度，
    // 他就是内容撑开的高度，那么永远都不需要他能滚动
    // 布局技巧，自动计算高度
    // 给个固定定位，再给top和bottom，就会自动算出高度
    position: fixed;
    top: 44px;
    bottom: 55px;
    width: 100%;
    overflow: auto;
    // 聊天每一项
    .chat-item {
      display: flex;
      margin-top: 20px;
      margin-left: 10px;
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .content {
        max-width: 48%;
        background-color: #e0effb;
        padding: 10px;
        border-radius: 4px;
        word-wrap: break-word;
        word-spacing: normal;
        margin-left: 10px;
      }
      &.user {
        flex-direction: row-reverse;
        margin-right: 10px;
        .content {
          margin-right: 10px;
          background-color: #9eea6a;
        }
      }
    }
  }
  .write {
    position: fixed;
    left: 0;
    bottom: 0;
    padding-right: 10px;
    .van-search__content.van-search__content--round {
      background-color: #fff;
    }
    .van-search__action {
      margin-left: 10px;
    }
  }
}
</style>