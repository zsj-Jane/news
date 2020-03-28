<template>
  <div class="robot">
    <!-- 导航栏 -->
    <van-nav-bar title="小智机器人" left-arrow @click-left="$router.back()" />
    <!-- 聊天面板 -->
    <div class="chat-wrap">
      <div class="chat-item" v-for="(item, index) in list" :key="index" :class="{user:item.isMe}">
        <img class="avatar" :src="item.isMe?$route.params.icon:'http://img2.imgtn.bdimg.com/it/u=3476053323,2840761167&fm=26&gp=0.jpg'" alt />
        <div class="content">{{item.content}}</div>
      </div>
    </div>
    <!-- 底部 发消息区域 -->
    <van-search
      class="write"
      v-model="msg"
      show-action
      action-text="发送"
      left-icon
      shape="round"
      background="#f4f5f6"
    />
  </div>
</template>

<script>
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
      msg: ""
    };
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
    padding: 0 10px 10px;
    margin-bottom: 55px;
    // 聊天每一项
    .chat-item {
      display: flex;
      margin-top: 20px;
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