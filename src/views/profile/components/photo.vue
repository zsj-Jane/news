<template>
  <van-popup class="photo-wrap" v-model="show">
      <div class="photo-item">从相册选择</div>
      <div class="photo-item">拍照</div>
      <div class="photo-item">取消</div>
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      // 是否显示弹出层
      show: false
    };
  }
};
</script>

<style lang="less" scoped>
.photo-wrap{
    width: 80%;
    border-radius: 6px;
    .photo-item{
        text-align: center;
        padding: 10px 0;
    }
}
</style>