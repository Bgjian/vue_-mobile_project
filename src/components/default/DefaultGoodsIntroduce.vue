<template>
  <div class="box">
    <!-- 头部区域 -->
    <van-nav-bar
      title="商品图文介绍"
      left-text="返回"
      left-arrow
      ref="goback"
      @click-left="onClickLeft"
      class="head"
    />
    <div class="goodsDesc_content">
      <h4>{{goodsintroduce.title}}</h4>
      <div class="cont" v-html="goodsintroduce.content"></div>
    </div>
    <div style="height:50px"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 商品图文详情
      goodsintroduce: {}
    }
  },
  created () {
    this.getGoodsIntroduce()
  },
  methods: {
    // 点击返回上一页
    onClickLeft () {
      this.$refs.goback.children[0].setAttribute('style', 'opacity:0')
      this.$router.go(-1)
    },
    // 获取当前商品的图文介绍
    async getGoodsIntroduce () {
      const { data: res } = await this.$http.get(
        `/api/goods/getdesc/${this.id}`
      )
      if (res.status !== 0) {
        return false
      }
      this.goodsintroduce = res.message[0]
      console.log(this.goodsintroduce)
    }
  },
  computed: {
    // 获取当前商品id
    id () {
      return window.location.href.split('id=')[1]
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  .goodsDesc_content {
    padding: 1px 10px;
    h4 {
      font-size: 16px;
      color: #226aff;
      text-align: center;
      margin: 15px 0;
    }
  }
}
</style>
