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
        >+ {{item.name}}</van-tag>
      </div>
    </div>
  </van-popup>
</template>

<script>
// 导入获取全部频道接口
import { channelAll } from "@/api/channel.js";
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