<template>
  <!-- 频道弹出层 -->
  <van-popup
    class="channel-wrap"
    v-model="show"
    position="left"
    :style="{ width: '85%',height:'100%' }"
    closeable
    close-icon-position="top-left"
    @closed="isEdit=false"
  >
    <!-- 我的频道 -->
    <div class="my-channel">
      <!-- 标题部分 -->
      <div class="title">
        <span>我的频道</span>
        <van-button
          @click="isEdit=!isEdit"
          color="#f85a5a"
          plain
          round
          size="mini"
        >{{isEdit?'完成':'编辑'}}</van-button>
      </div>
      <!-- 内容部分 -->
      <div class="content">
        <template v-for="(item, index) in myList">
          <van-tag v-if="index!=0" :key="index" size="large" class="channel-tag">
            {{item.name}}
            <van-icon
              v-if="isEdit"
              @click="removeChannel(item)"
              class="close"
              name="clear"
              color="rgb(205, 205, 205)"
            />
          </van-tag>
        </template>
      </div>
    </div>
    <!-- 频道推荐 -->
    <div class="recommend">
      <!-- 标题部分 -->
      <div class="title">
        <span>频道推荐</span>
      </div>
      <!-- 内容部分 -->
      <div class="content">
        <van-tag
          v-for="(item, index) in otherList"
          :key="index"
          size="large"
          class="channel-tag"
          @click="addChannel(item)"
        >+ {{item.name}}</van-tag>
      </div>
    </div>
  </van-popup>
</template>

<script>
// 导入频道相关接口
import { channelAll, channelSave, channelDel } from "@/api/channel.js";
// 导入操作本地存储的方法
import { setLocal } from "@/utils/local.js";
export default {
  name: "channelPop",
  props: {
    // 我的频道数组
    myList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      // 控制弹出层显示状态
      show: false,
      // 所有频道数据
      allList: [],
      // 是否为编辑状态
      isEdit: false
    };
  },
  methods: {
    // 添加频道到我的频道中
    addChannel(item) {
      // 把被点击的频道添加到我的频道中
      this.myList.push(item);
      // 解决新增频道对象只有id和name属性的问题，手动添加下面5个属性
      // 控制下拉刷新的状态
      // 直接赋值，界面不会跟着响应，要用$set
      this.$set(item, "pullLoading", false);
      // 列表数据(新闻数据)
      this.$set(item, "list", []);
      // 控制列表的刷新状态，为false会调用onLoad，为true则不调用
      this.$set(item, "loading", false);
      // 是否已经刷到底部
      this.$set(item, "finished", false);
      // 第一次请求数据时，是没有上一次请求的时间戳的，存当前时间即可
      this.$set(item, "pre_timestamp", Date.now());
      // 判断是否登录
      if (this.$store.state.token) {
        // 为已登录
        // 准备调用接口要传的参数,参数要求不能带‘推荐’频道，需要把‘推荐’频道去掉，从下标1开始截取，截取到的频道为要传的参数
        let channels = this.myList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 1
          };
        });
        // 调用接口发送请求 保存频道
        channelSave({ channels });
      } else {
        // 没有登录
        // 把频道数组 保存在本地
        setLocal("channels", JSON.stringify(this.myList));
      }
    },
    // 删除图标的点击事件（删除频道）
    removeChannel(item) {
      for (let i = 0; i < this.myList.length; i++) {
        if (this.myList[i] == item) {
          this.myList.splice(i, 1);
        }
      }
      // 判断是否登录
      if (this.$store.state.token) {
        // 为已登录
        // 调用接口发送请求 删除频道，点哪个删哪个，把被点击的频道id传给接口
        channelDel({ channels: [item.id] });
      } else {
        // 没有登录
        // 把频道数组 保存在本地
        setLocal("channels", JSON.stringify(this.myList));
      }
    }
  },
  computed: {
    // 过滤掉我的频道外的所有频道（不用再手动删除添加的频道了）
    otherList() {
      // 找出我的频道中的id
      let ids = this.myList.map(item => {
        return item.id;
      });
      // 过滤掉我的频道外的其他所有频道
      return this.allList.filter(item => {
        // 判断每个频道是否在myList里面
        return !ids.includes(item.id);
      });
    }
  },
  async created() {
    // 请求所有频道数据
    let res = await channelAll();
    // console.log(res);
    // 保存所有频道数据
    this.allList = res.data.channels;
  }
};
</script>

<style lang="less" scoped>
.channel-wrap {
  padding-left: 10px;
  padding-right: 5px;
  /deep/i.van-icon.van-icon-cross.van-popup__close-icon.van-popup__close-icon--top-left {
    color: black;
    font-size: 25px;
  }
  .my-channel {
    margin-top: 60px;
    .channel-tag {
      position: relative;
      .close {
        position: absolute;
        right: -8px;
        top: -8px;
      }
    }
  }
  .recommend {
    margin-top: 35px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  .channel-tag {
    margin-right: 10px;
    margin-top: 10px;
  }
}
</style>