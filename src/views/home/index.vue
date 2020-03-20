<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <div class="top-nav">
      <!-- 左边图标 -->
      <van-icon class="top-icon" name="wap-nav" @click="$refs.channel.show=true" />
      <!-- 搜索框 -->
      <van-search
        @focus="$router.push('/search')"
        class="top-search"
        v-model="value"
        shape="round"
        background="#3194ff"
        placeholder="请输入搜索关键词"
      />
      <!-- 右边图标 -->
      <van-icon class="top-icon" name="search" />
    </div>
    <!-- 频道部分 -->
    <van-tabs v-model="active" class="tabs">
      <van-tab v-for="(item, index) in channelList" :key="index" :name="item.id" :title="item.name">
        <van-pull-refresh v-model="item.pullLoading" @refresh="onRefresh(item)">
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad(item)"
          >
            <!-- 每行就是一个单元格 -->
            <van-cell v-for="(it,idx) in item.list" :key="idx" :title="it.title">
              <!-- 自定义title内容 -->
              <template slot="title">
                <!-- 标题 -->
                <div class="title" @click="$router.push(`/detail/${it.art_id}`)">
                  <span>{{it.title}}</span>
                  <!-- 单张图片显示 -->
                  <img v-if="it.cover.type==1" :src="it.cover.images[0]" alt class="pic" />
                </div>
                <!-- 图片（3张图片显示） -->
                <van-grid v-if="it.cover.type==3" :border="false" :column-num="3">
                  <van-grid-item v-for="(it1, idx1) in it.cover.images" :key="idx1">
                    <!-- 宫格中的每个格子 -->
                    <van-image class="pic1" :src="it1" />
                  </van-grid-item>
                </van-grid>
                <!-- 作者、评论、时间等信息 -->
                <div class="info">
                  <div class="info-span">
                    <span>{{it.aut_name}}</span>
                    <span>{{it.comm_count}}</span>
                    <span>{{it.pubdate|formatTime}}</span>
                  </div>
                  <van-icon class="info-close" name="cross" @click="showMore(it,item.list)" />
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 频道弹出层 -->
    <channel ref="channel" :myList="channelList"></channel>
    <!-- 更多操作弹出层 -->
    <more ref="more"></more>
  </div>
</template>

<script>
// 导入获取用户频道列表接口
import { channelList } from "@/api/channel.js";
// 导入获取频道新闻推荐列表接口
import { articleList } from "@/api/article.js";
// 导入频道弹出层组件
import channel from "./components/channel";
// 导入更多操作弹出层组件
import more from "./components/more";
// 导入操作本地存储的方法
import { getLocal } from "@/utils/local.js";
export default {
  name: "home",
  components: {
    // 频道弹出层组件
    channel,
    // 更多操作弹出层组件
    more
  },
  data() {
    return {
      // 搜索框绑定数据
      value: "",
      // 当前频道的id
      active: "",
      // 频道数据
      channelList: []
    };
  },
  methods: {
    // 请求频道新闻列表数据
    LoadList(item) {
      // 获取频道新闻列表数据
      return articleList({
        // 频道id
        channel_id: item.id,
        // 时间戳,用Date.now()返回的是随机数据，用 上一次请求返回的pre_timestamp时间戳 则返回的是下一页的数据
        timestamp: item.pre_timestamp,
        // 是否包含置顶
        with_top: 0
      });
    },
    // 加载数据的方法
    async onLoad(item) {
      // 获取频道新闻列表数据
      let res = await this.LoadList(item);
      console.log(res);
      // 拿到新闻数据
      let arr = res.data.results;
      // 一拿到数据，就判断是否为空
      if (arr.length == 0) {
        // 拿到的新闻数据为空，表示加载完了，显示没有更多数据了
        item.finished = true;
      } else {
        // 拿到的新闻数据不为空，表示还有数据
        // 修改该频道数据中的list
        item.list.push(...arr);
        // 记录上一次请求返回的pre_timestamp时间戳(上一页的时间戳)
        item.pre_timestamp = res.data.pre_timestamp;
        // console.log("上一页时间戳", item.pre_timestamp);
        // 加载一段数据，改成false的话，后面滚到最后一定会调用onLoad
        // 这个属性是控制加载状态的，为false就会再调用onLoad，为true就不调用
        item.loading = false;
      }
    },
    // 下拉刷新的方法
    async onRefresh(item) {
      // 只要往下拽就会触发，一旦触发，会自动把下拉状态给为true
      // 每次下拉请求最新的随机数据，修改该频道的上一页时间戳为Date.now()
      item.pre_timestamp = Date.now();
      // console.log("下拉刷新时间戳", item.pre_timestamp);
      // loading改为false(可重新加载数据)
      item.loading = false;
      // finished改为false
      item.finished = false;
      // 获取频道新闻列表数据
      let res = await this.LoadList(item);
      console.log(res);
      // list重新赋值为加载过来的数据
      item.list = res.data.results;
      // 重新记录下拉刷新后返回的pre_timestamp时间戳
      item.pre_timestamp = res.data.pre_timestamp;
      // 结束下拉状态
      item.pullLoading = false;
    },
    // 更多操作图标的点击事件
    showMore(item, list) {
      // item是当前点击文章，list是当前频道保存所有文章的数组
      // 显示更多操作弹出层
      this.$refs.more.show = true;
      // 把被点击的文章的id传给组件
      this.$refs.more.art_id = item.art_id;
      // 把当前频道保存所有文章的数组传给组件
      this.$refs.more.art_list = list;
    },
    // 请求获取用户频道方法
    async getChannel() {
      // 发送获取用户频道列表请求
      let res = await channelList();
      // 保存频道数据
      this.channelList = res.data.channels;
      // 拿到频道数据后，给每个频道数据添加(控制下拉刷新的状态、列表数据、控制列表的刷新状态、是否已经刷到底部)这四个属性
      this.channelList.forEach(item => {
        // 控制下拉刷新的状态
        // 直接赋值，界面不会跟着响应，要用$set
        // item.pullLoading = false;
        this.$set(item, "pullLoading", false);
        // 列表数据(新闻数据)
        this.$set(item, "list", []);
        // 控制列表的刷新状态，为false会调用onLoad，为true则不调用
        this.$set(item, "loading", false);
        // 是否已经刷到底部
        this.$set(item, "finished", false);
        // 第一次请求数据时，是没有上一次请求的时间戳的，存当前时间即可
        // 因为不用在界面显示，直接添加属性即可
        item.pre_timestamp = Date.now();
      });
    }
  },
  created() {
    if (this.$store.state.token) {
      // 发送获取用户频道列表请求
      this.getChannel();
    } else {
      // 没有登录,从本地存储中取出频道数组
      let res = getLocal("channels");
      if (res) {
        // 有值，用channelList保存从本地存储中取出的频道数据
        this.channelList = res;
      } else {
        // 没有值，就发请求拿到服务器推荐下来的默认频道
        this.getChannel();
      }
    }
  }
};
</script>

<style lang="less">
.home {
  .top-nav {
    display: flex;
    align-items: center;
    background-color: #3194ff;
    padding-left: 10px;
    padding-right: 10px;
    // 固定定位
    position: fixed;
    // 提高层级
    z-index: 999;
    // div不脱标会用父盒子宽度，但固定定位脱标了，靠内容撑开
    width: 100%;
    // 内减模型
    box-sizing: border-box;
    top: 0;
    .top-icon {
      font-size: 20px;
      color: white;
    }
    .top-search {
      flex: 1;
    }
  }
  .tabs {
    .van-tabs__wrap {
      position: fixed;
      z-index: 999;
      top: 54px;
      width: 100%;
    }
    .van-tabs__content {
      margin-top: 98px;
      margin-bottom: 50px;
    }
    .title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .pic {
        width: 116px;
        height: 73px;
      }
    }
    .pic1 {
      height: 73px;
    }
    .info {
      display: flex;
      justify-content: space-between;
      .info-span {
        span {
          margin-right: 10px;
          font-size: 12px;
          color: #ccc;
        }
      }
      .info-close {
        border: 1px solid #ccc;
        color: #ccc;
        width: 23px;
        height: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>