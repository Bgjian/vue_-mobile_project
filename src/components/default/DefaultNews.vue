<template>
  <div class="box">
    <!-- 头部区域 -->
    <van-nav-bar title="新闻资讯" left-text="返回" ref="goback" left-arrow @click-left="onClickLeft" class="head" />
    <van-card
      v-for="(item,index) in newsList"
      :key="index"
      :title="item.title"
      :thumb="item.img_url"
      class="van-hairline--bottom van-ellipsis"
      @click="toDetail(item.id)"
    >
      <div class="card_foot" slot="tags">
        <span class="s1">发表时间: {{item.add_time | dateFormat}}</span>
        <span class="s2">点击: {{item.click}}</span>
      </div>
    </van-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 新闻资讯列表
      newsList: []
    }
  },
  created () {
    this.getNewsList()
  },
  methods: {
    // 点击返回上一页
    onClickLeft () {
      this.$refs.goback.children[0].setAttribute('style', 'opacity:0')
      this.$router.go(-1)
    },
    // 获取新闻资讯列表
    async getNewsList () {
      const { data: res } = await this.$http.get('/api/getnewslist')
      if (res.status !== 0) {
        return false
      }
      this.newsList = res.message
      // console.log(this.newsList)
    },
    // 跳转到文章详情
    toDetail (id) {
      this.$router.push({ path: '/default/news/detail', query: { id: id } })
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  .van-card {
    position: relative;
    height: 70px;
    background-color: #fff;
    .card_foot {
      .s1 {
        position: absolute;
        left: 0%;
        bottom: 14%;
        font-size: 12px;
        color: #226aff;
      }
      .s2 {
        position: absolute;
        right: 0%;
        bottom: 14%;
        font-size: 12px;
        color: #226aff;
      }
    }
  }
}
</style>
