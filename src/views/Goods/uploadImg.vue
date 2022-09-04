<template>
<!--
     ref="upload" 获取dom元素
     action：必选参数，上传地址
     show-file-list:是否显示文件上传列表
     :on-success：文件上传成功时的钩子	function(response, file, fileList)
     before-upload：删除文件之前的钩子，参数为上传的文件和文件列表，
     若返回 false 或者返回 Promise 且被 reject，则停止删除。
 -->
   <div class="">
    <h2>上传图片</h2>
    <el-upload
  class="avatar-uploader"
  :action="imageUrl"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  >
 
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
   </div>
</template>

<script>
import base from '@/api/base';
 export default {
    data() {
      return {
        imageUrl: base.uploadUrl
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        console.log('文件上传成功')
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(res)
        this.$emit('sendImg',this.imageUrl)
      },
      beforeAvatarUpload(file) {
         console.log('文件上传中')

        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // changeAvatar(file){

      // }
    }
  }
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
