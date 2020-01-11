<template>
  <div class="box">
    <!-- 头部区域 -->
    <van-nav-bar title="图片分享" left-text="返回" left-arrow ref="goback" @click-left="onClickLeft" class="head" />
    <!-- 分类标签 -->
    <van-tabs v-model="activeName" @click="getPhotoList(activeName)">
      <van-tab v-for="item in photoclassify" :key="item.id" :title="item.title" :name="item.id">
        <!-- 图片列表区域 -->
        <ul>
          <li v-for="(item,index) in photolist" :key="index" @click.stop="goToPhotoInfo(item.id)">
            <div class="img">
              <img :src="item.img_url" alt />
            </div>
            <div class="txt">
              <span class="title">{{item.title}}</span>
              <span class="zhaiyao">{{item.zhaiyao}}</span>
            </div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
    <!-- 解决最下方被固定定位压住的问题 -->
    <div style="height:50px"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // tab标签的当前下标
      activeName: 0,
      // 图片的分类数据
      photoclassify: [],
      // 图片的列表数据
      photolist: []
    }
  },
  created () {
    this.getPhotoClassify()
    this.getPhotoList(this.activeName)
  },
  methods: {
    // 点击返回上一页
    onClickLeft () {
      this.$refs.goback.children[0].setAttribute('style', 'opacity:0')
      this.$router.go(-1)
    },
    // 获取图片的分类数据
    async getPhotoClassify () {
      const { data: res } = await this.$http.get('/api/getimgcategory')
      if (res.status !== 0) {
        return false
      }
      this.photoclassify = res.message
      this.photoclassify.unshift({ title: '全部', id: 0 })
    },
    // 获取图片的列表数据
    async getPhotoList (id) {
      const { data: res } = await this.$http(`/api/getimages/${id}`)
      if (res.status !== 0) {
        return false
      }
      this.photolist = res.message
      // console.log(this.photolist)
    },
    // 点击图片跳转到详情页
    goToPhotoInfo (id) {
      this.$router.push(`/default/photo/info?id=${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  ul {
    padding: 0 10px;
    li {
      width: 100%;
      margin: 10px 0;
      border-radius: 5px;
      overflow: hidden;
      height: 300px;
      position: relative;
      .img {
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .txt {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 72px;
        padding: 0 10px;
        font-size: 12px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.4);
        .title {
          display: block;
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>
