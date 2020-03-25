<template>
  <van-popup class="photo-wrap" v-model="show">
    <div class="photo-item" @click="choosePhoto">
      从相册选择
      <input ref="photoFile" @change="fileChange" type="file" style="display:none" />
    </div>
    <div class="photo-item" @click="photograph">拍照</div>
    <div class="photo-item" @click="show=false">取消</div>
  </van-popup>
</template>

<script>
// 导入ImagePreview 图片预览
import { ImagePreview } from "vant";
// 导入用户相关接口
import { uploadPhoto } from "@/api/user.js";
export default {
  name: "photo",
  data() {
    return {
      // 是否显示弹出层
      show: false
    };
  },
  methods: {
    // 点击“从相册选择”
    choosePhoto() {
      // 找到file元素，调用file默认的点击事件
      this.$refs.photoFile.click();
    },
    // 文件选择后触发的事件
    fileChange() {
      // 拿到file元素选择的图片
      let photo = this.$refs.photoFile.files[0];
      // 把文件对象转成临时路径
      let url = URL.createObjectURL(photo);
      // 图片预览
      ImagePreview({
        images: [url],
        showIndex: false,
        // 关闭事件：这里要用箭头函数(用function会改变this指向)
        onClose: () => {
          // 关闭时，弹出一个确认框
          this.$dialog
            .confirm({
              message: "是否设置该图片为头像"
            })
            .then(async () => {
              // 点击确认触发
              // 发请求保存图片
              let res = await uploadPhoto({ photo });
              // 把上传成功后图片在服务器的地址，传递给父组件
              this.$emit("uploadPhoto", res.data.photo);
            })
            .catch(() => {
              console.log("取消");
            });
        }
      });
    },
    // 拍照的点击事件
    photograph() {
      this.$toast("拍照需要调用跟摄像头相关的SDK");
    }
  }
};
</script>

<style lang="less" scoped>
.photo-wrap {
  width: 80%;
  border-radius: 6px;
  .photo-item {
    text-align: center;
    padding: 10px 0;
  }
}
</style>