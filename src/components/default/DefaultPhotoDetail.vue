<template>
  <div class="box">
    <!-- 头部区域 -->
    <van-nav-bar
      title="图文详情"
      left-text="返回"
      left-arrow
      ref="goback"
      @click-left="onClickLeft"
      class="head"
    />
    <!-- 详情区域 -->
    <div class="photodetail">
      <!-- 标题 -->
      <h4>{{photoInfo.title}}</h4>
      <p>
        <span class="s1">发表时间: {{photoInfo.add_time | dateFormat}}</span>
        <span class="s2">点击: {{photoInfo.click}}</span>
      </p>
      <hr />
      <!-- 图片缩略图 -->
      <ul>
        <li v-for="(item,index) in photoList" :key="index" @click="handleView">
          <img :src="item" alt />
        </li>
      </ul>
      <div class="content" v-html="photoInfo.content"></div>
    </div>
    <!-- 评论区域 -->
    <comment :id="id"></comment>
    <!-- 解决最下方被固定定位压住的问题 -->
    <div style="height:60px"></div>
  </div>
</template>

<script>
import Comment from './Comment'
import { ImagePreview } from 'vant'
export default {
  data () {
    return {
      // 图文详情
      photoInfo: {},
      // 图片缩略图
      photoList: []
    }
  },
  created () {
    this.getPhoto()
  },
  methods: {
    // 点击返回上一页
    onClickLeft () {
      this.$refs.goback.children[0].setAttribute('style', 'opacity:0')
      this.$router.go(-1)
    },
    // 获取图文详情与缩略图
    async getPhoto () {
      const { data: res1 } = await this.$http.get(
        `/api/getimageInfo/${this.id}`
      )
      if (res1.status !== 0) {
        return false
      }
      this.photoInfo = res1.message[0]
      const { data: res2 } = await this.$http.get(
        `/api/getthumimages/${this.id}`
      )
      if (res2.status !== 0) {
        return false
      }
      res2.message.forEach(item => {
        this.photoList.push(item.src)
      })
      // console.log(this.photoInfo)
    },
    // 图片点击预览
    handleView () {
      ImagePreview({ images: this.photoList, startPosition: 0 })
    }
  },
  computed: {
    // 获取图片详情对应的id
    id () {
      return window.location.href.split('id=')[1]
    }
  },
  components: {
    comment: Comment
  }
}
</script>

<style lang="less" scoped>
.box {
  .photodetail {
    padding: 1px 10px 0;
    h4 {
      text-align: center;
      color: #26a2ff;
      font-size: 15px;
    }
    p {
      font-size: 13px;
      color: #8f8f94;
      overflow: hidden;
      .s1 {
        float: left;
      }
      .s2 {
        float: right;
      }
    }
    hr {
      display: block;
      unicode-bidi: isolate;
      margin-block-start: 0.5em;
      margin-block-end: 0.5em;
      margin-inline-start: auto;
      margin-inline-end: auto;
      overflow: hidden;
      border-style: inset;
      border-width: 1px;
    }
    ul {
      overflow: hidden;
      width: 100%;
      li {
        box-sizing: border-box;
        float: left;
        width: 33.3333%;
        padding: 5px;
        img {
          width: 100%;
          box-shadow: 1px 0 8px 1px rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
}
</style>
