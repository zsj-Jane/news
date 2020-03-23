<template>
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
              <van-tag
                @click="showReply(item)"
                class="reply"
                size="large"
                round
                color="#eff7f8"
              >回复{{item.reply_count}}</van-tag>
            </div>
          </div>
          <!-- 点赞部分 -->
          <div class="admire">
            <van-icon v-if="item.is_liking" @click="cancleLike(item)" name="like" color="#ff4444" />
            <van-icon v-else @click="like(item)" name="like-o" color="#ff4444" />
            <span>{{item.like_count}}</span>
          </div>
        </div>
      </template>
    </van-cell>
  </van-list>
</template>

<script>
// 导入评论相关接口
import {
  commentList,
  commentLiking,
  commentCancelLiking
} from "@/api/comment.js";
// 导入eventBus
import bus from "@/utils/bus.js";
export default {
  name: "comment",
  data() {
    return {
      // 评论数组
      list: [],
      // 控制加载状态，为false表示还没有加载完，为true表示加载完毕
      loading: false,
      // 数据完全加载完毕，为true表示数据全部加载完了，为false表示还有数据没加载
      finished: false,
      // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
      offset: undefined,
      // 文章评论总数
      com_total: 0
    };
  },
  methods: {
    // 下拉刷新：加载数据
    async onLoad() {
      // 请求文章评论数据
      let res = await commentList({
        // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        type: "a",
        // 因为comment组件还在文章详情页面中，可以通过路由拿数据
        source: this.$route.params.art_id,
        // 不传值，表示查第一页的数据，undefined表示没有传值，传入一个last_id表示查下一页的数据
        offset: this.offset,
        //页容量
        limit: 10
      });
      // console.log(res);
      // 保存获取的数据
      this.list.push(...res.data.results);
      // 发布文章评论总数给写评论组件
      bus.$emit("com_total", res.data.total_count);
      // 继续加载数据
      this.loading = false;
      // 把下一页的起始标识赋值给offset
      this.offset = res.data.last_id;
      // 判断以下是否结束
      if (res.data.end_id == res.data.last_id) {
        // 代表数据已经加载完了，结束了
        this.finished = true;
      }
    },
    // 取消对评论的点赞
    async cancleLike(item) {
      // 发送请求取消对评论的点赞
      await commentCancelLiking({
        target: item.com_id
      });
      // 修改is_liking为false，显示取消点赞效果
      item.is_liking = false;
      // 点赞数-1
      item.like_count--;
    },
    // 对评论点赞
    async like(item) {
      // 发送请求对评论点赞
      await commentLiking({
        target: item.com_id
      });
      // 修改is_liking为true，显示点赞效果
      item.is_liking = true;
      // 点赞数+1
      item.like_count++;
    },
    // 点击回复显示回复组件
    showReply(item) {
      // 发布消息
      // 传了值,是否显示回复组件的值
      // bus.$emit('showReply',true);
      // 不传值也可以，相当于订阅方拿到的是undefined
      // bus.$emit('showReply');
      // 传值，但传递的是整个评论item
      bus.$emit("showReply", item);
    }
  },
  created() {
    // 拿到添加的评论数据
    bus.$on("newComment", data => {
      // 加到评论数组中，加在第一条
      this.list.unshift(data);
    });
  }
};
</script>

<style lang="less">
.comment {
  margin-bottom: 55px;
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
        .reply {
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