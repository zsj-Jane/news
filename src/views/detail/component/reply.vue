<template>
  <van-popup
    class="reply"
    v-model="show"
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '60%' }"
  >
    <div class="title-count">{{comment.reply_count}}条回复</div>
    <van-list
      class="comment"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index">
        <template slot="title">
          <div class="title">
            <!-- 头像 -->
            <img class="avatar" :src="item.aut_photo" alt />
            <!-- 详细信息 -->
            <div class="info">
              <div class="username">{{item.aut_name}}</div>
              <div class="content">{{item.content}}</div>
              <div class="tips">
                <span class="time">{{item.pubdate|formatTime}}</span>
              </div>
            </div>
            <!-- 点赞部分 -->
            <div class="admire">
              <van-icon
                v-if="item.is_liking"
                @click="cancleLike(item)"
                name="like"
                color="#ff4444"
              />
              <van-icon v-else @click="like(item)" name="like-o" color="#ff4444" />
              <span>{{item.like_count}}</span>
            </div>
          </div>
        </template>
      </van-cell>
    </van-list>
    <!-- 写评论组件 -->
    <write></write>
  </van-popup>
</template>

<script>
// 导入eventBus
import bus from "@/utils/bus.js";
// 导入写评论组件
import write from "./write";
// 导入评论相关接口
import { commentList } from "@/api/comment.js";
export default {
  name: "reply",
  components: {
    // 写评论组件
    write
  },
  data() {
    return {
      // 是否显示回复界面
      show: false,
      // 评论数据
      comment: {},
      // 评论回复数组
      list: [],
      // 控制加载状态，为false表示还没有加载完，为true表示加载完毕
      loading: false,
      // 数据完全加载完毕，为true表示数据全部加载完了，为false表示还有数据没加载
      finished: false,
      // 获取评论回复数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
      offset: undefined
    };
  },
  methods: {
    // 下拉刷新：加载数据
    async onLoad() {
      // 请求评论回复数据
      let res = await commentList({
        // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        type: "c",
        // 评论id,因为这个id是对象，要用toString()
        // 当请求方法不是get时，可以不用toString(),内部传值时会自动调用
        // 当请求方法是get时，但参数时路径参数，也可以不用toString(),内部传值时会自动调用
        source: this.comment.com_id.toString(),
        // 不传值，表示查第一页的数据，undefined表示没有传值，传入一个last_id表示查下一页的数据
        offset: this.offset,
        //页容量
        limit: 10
      });
      console.log(res);
      // 保存获取的评论回复数据
      this.list.push(...res.data.results);
      // 继续加载数据
      this.loading = false;
      // 把下一页的起始标识赋值给offset
      this.offset = res.data.last_id;
      // 判断以下是否结束
      if (res.data.end_id == res.data.last_id) {
        // 代表数据已经加载完了，结束了
        this.finished = true;
      }
    }
  },
  created() {
    // 订阅消息
    bus.$on("showReply", data => {
      // 传了值，这样接收
      // this.show = data;
      // 没有传是否显示的值，直接设置
      this.show = true;
      // data为评论item
      this.comment = data;
      // 在每次显示评论回复之前，把数据恢复为默认值
      this.list = [];
      this.loading = false;
      this.finished = false;
      this.offset = undefined;
    });
  }
};
</script>

<style lang="less" scoped>
.reply {
  /deep/i.van-icon.van-icon-cross.van-popup__close-icon.van-popup__close-icon--top-left {
    color: #000;
  }
  .title-count {
    font-size: 20px;
    text-align: center;
    padding: 13px 0;
  }
}
</style>