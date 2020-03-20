<template>
  <div class="write">
    <!-- 输入框 -->
    <van-search v-model="msg" shape="round" left-icon="" placeholder="写评论" />
    <!-- 评论 -->
    <van-icon name="comment-o" />
    <!-- 收藏 -->
    <van-icon v-if="is_collected" name="star" color="yellow"/>
    <van-icon v-else name="star-o" />
    <!-- 分享 -->
    <van-icon name="share" />
  </div>
</template>

<script>
export default {
  name: "write",
  props:['is_collected'],
  data() {
      return {
          msg:""
      }
  },
};
</script>

<style lang="less">
.write{
    display: flex;
    background-color: #ffffff;
    align-items: center;
    position: fixed;
    left: 0;
    bottom:0;
    width: 100%;
    border-top: 1px solid #ccc;
    .van-search {
        flex: 1;
        margin-right: 15px;
    }
    .van-icon{
        font-size: 22px;
        color: rgb(119, 119, 119);
        margin-right: 25px;
    }
}
</style>