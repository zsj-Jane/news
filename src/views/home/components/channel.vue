<template>
  <!-- 频道弹出层 -->
  <van-popup
    class="channel-wrap"
    v-model="show"
    position="left"
    :style="{ width: '85%',height:'100%' }"
    closeable
    close-icon-position="top-left"
  >
    <!-- 我的频道 -->
    <div class="my-channel">
      <!-- 标题部分 -->
      <div class="title">
        <span>我的频道</span>
        <van-button color="#f85a5a" plain round size="mini">编辑</van-button>
      </div>
      <!-- 内容部分 -->
      <div class="content">
        <template v-for="(item, index) in myList">
          <van-tag v-if="index!=0" :key="index" size="large" class="channel-tag">{{item.name}}</van-tag>
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
import { channelAll, channelSave } from "@/api/channel.js";
export default {
  name: "channelPop",
  props: {
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
      // 过滤掉我的频道外的所有频道
      otherList: []
    };
  },
  methods: {
    // 添加频道到我的频道中
    addChannel(item) {
      // 把被点击的频道添加到我的频道中
      this.myList.push(item);
      // 删除otherList中的被点击的频道
      for (let i = 0; i < this.otherList.length; i++) {
        // 找到被点击的元素
        if (this.otherList[i] == item) {
          // 删除数组元素
          this.otherList.splice(i, 1);
        }
      }
      // 准备调用接口要传的参数,参数要求不能带‘推荐’频道，需要把‘推荐’频道截取掉，剩下的频道为要传的参数
      let channels = this.myList.slice(1).map((item, index) => {
        return {
          id: item.id,
          seq: index + 1
        };
      });
      // 调用接口发送请求 保存频道
      channelSave({ channels });
    }
  },
  async created() {
    // 请求所有频道数据
    let res = await channelAll();
    // console.log(res);
    // 保存所有频道数据
    this.allList = res.data.channels;
    // 找出我的频道中的id
    let ids = this.myList.map(item => {
      return item.id;
    });
    // console.log(ids);
    // 过滤掉我的频道外的其他所有频道
    this.otherList = this.allList.filter(item => {
      return !ids.includes(item.id);
    });
    // console.log(this.otherList);
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