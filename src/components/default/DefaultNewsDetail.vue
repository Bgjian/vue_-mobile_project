<template>
  <div class="box">
    <!-- 头部区域 -->
    <van-nav-bar
      title="新闻详情"
      left-text="返回"
      left-arrow
      ref="goback"
      @click-left="onClickLeft"
      class="head"
    />
    <div class="news_detail">
      <!-- 新闻详情 -->
      <h3>{{detail.title}}</h3>
      <div class="info">
        <span class="s1">发表时间: {{detail.add_time | dateFormat}}</span>
        <span class="s2">点击次数: {{detail.click}}</span>
      </div>
      <div class="content" v-html="detail.content"></div>
      <!-- 评论功能 -->
      <comment :id="id"></comment>
      <!-- 解决最下方被固定定位压住的问题 -->
      <div style="height:60px"></div>
    </div>
  </div>
</template>

<script>
import Comment from './Comment'
export default {
  data () {
    return {
      // 新闻详情
      detail: []
    }
  },
  created () {
    this.getDetailById()
  },
  methods: {
    // 点击返回上一页
    onClickLeft () {
      this.$refs.goback.children[0].setAttribute('style', 'opacity:0')
      this.$router.go(-1)
    },
    // 根据文章ID获取文章详细数据
    async getDetailById () {
      const { data: res } = await this.$http.get(`/api/getnew/${this.id}`)
      if (res.status !== 0) {
        return false
      }
      this.detail = res.message[0]
      // console.log(this.detail)
    }
  },
  computed: {
    // 获取当前url地址的文章id
    id () {
      return location.href.split('=')[1]
    }
  },
  components: {
    comment: Comment
  }
}
</script>

<style lang="less" scoped>
.news_detail {
  height: 100%;
  padding: 1px 10px 0;
  h3 {
    color: #1989fa;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    margin: 0;
    padding: 5px 0;
  }
  .info {
    position: relative;
    height: 30px;
    padding: 7px 0;
    color: #1989fa;
    font-size: 13px;
    border-bottom: 1px solid #ccc;
    .s1 {
      position: absolute;
      left: 0;
    }
    .s2 {
      position: absolute;
      right: 0;
    }
  }
  .content {
    color: #535353;
    font-size: 16px;
  }
}
</style>
