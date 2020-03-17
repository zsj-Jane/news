<template>
  <van-popup class="more-wrap" v-model="show">
    <van-cell-group>
      <van-cell title="不感兴趣" icon="failure" @click="dislike" />
      <van-cell title="反馈垃圾内容" icon="warning-o" is-link />
      <van-cell title="拉黑作者" icon="delete" />
    </van-cell-group>
  </van-popup>
</template>

<script>
// 导入文章操作相关接口
import { articleDislike } from "@/api/article.js";
export default {
  name: "more",
  data() {
    return {
      // 是否显示弹出层
      show: false,
      // 文章id
      art_id: "",
      // 文章数组
      art_list: []
    };
  },
  methods: {
    // 不感兴趣的点击事件
    async dislike() {
      for (let i = 0; i < this.art_list.length; i++) {
        // 判断当前文章id是否为要删除的文章id
        if (this.art_list[i].art_id == this.art_id) {
          // 找到就删除该文章
          this.art_list.splice(i, 1);
          // 跳出循环
          break;
        }
      }
      // 发请求给服务器，保存不感兴趣的文章操作
      let res = await articleDislike({
        // 用json-bigint转换后，使用时，把转换成对象的大数字id完整拼接，用toString()方法
        target: this.art_id.toString()
      });
      // 弹出提示
      this.$toast("删除不感兴趣项成功");
      // 删完之后隐藏弹出层
      this.show = false;
    }
  }
};
</script>

<style lang="less">
.more-wrap {
  width: 80%;
  border-radius: 6px;
}
</style>