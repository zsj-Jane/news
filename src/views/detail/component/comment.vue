<template>
  <van-list
    class="comment"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell v-for="item in list" :key="item" :title="item">
      <template slot="title">
        <div class="title">
          <!-- 头像 -->
          <img class="avatar" src="http://toutiao.meiduo.site/Fr8CYYJBDIZz7kkCeth1zu7-zXlM" alt />
          <!-- 详细信息 -->
          <div class="info">
            <div class="username">小脑斧</div>
            <div class="content">小可耐</div>
            <div class="tips">
              <span class="time">3天前</span>
              <van-tag class="reply" size="large" round color="#eff7f8">回复0</van-tag>
            </div>
          </div>
          <!-- 点赞部分 -->
          <div class="admire">
            <van-icon name="like" color="#ff4444" />
            <span>99</span>
          </div>
        </div>
      </template>
    </van-cell>
  </van-list>
</template>

<script>
export default {
  name: "comment",
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    onLoad() {
      for (let i = 0; i < 10; i++) {
        this.list.push(this.list.length + 1);
      }
      // 数据全部加载完成
      if (this.list.length >= 10) {
        this.finished = true;
      }
    }
  }
};
</script>

<style lang="less">
.comment {
  .title {
    display: flex;

    .avatar {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
    .info {
      flex: 1;
      margin-left: 15px;
      .username {
        color: #7d95bd;
        margin-bottom: 10px;
      }
      .content {
        margin-bottom: 10px;
      }
      .tips {
        .time {
          margin-right: 20px;
        }
        .reply{
            color: #000000;
            padding: 5px 18px;
        }
      }
    }
    .admire {
        display: flex;
        align-items: center;
      .van-icon {
        font-size: 25px;
        margin-right: 10px;
      }
    }
  }
}
</style>