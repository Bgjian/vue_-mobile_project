<template>
  <div class="box">
    <!-- 头部区域 -->
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      ref="goback"
      @click-left="onClickLeft"
      class="head"
    />
    <div class="goodBox">
      <!-- 商品图片轮播 -->
      <van-swipe :autoplay="3000" indicator-color="#ccc" @change="onChange">
        <van-swipe-item v-for="(item,index) in goodsPhotoList" :key="index">
          <img class="lunboimg" :src="item.src" />
        </van-swipe-item>
        <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{goodsPhotoList.length}}</div>
      </van-swipe>
      <!-- 商品概述与加入购物车 -->
      <div class="goodsinfo">
        <div class="title">{{goodsDetailList.title}}</div>
        <p>
          市场价
          <del class="s1">¥{{goodsDetailList.market_price}}</del>
          销售价
          <span class="s2">¥{{goodsDetailList.sell_price}}</span>
        </p>
        <div class="num">
          <span>购买数量</span>
          <van-stepper v-model="count" min="1" />
        </div>
        <div class="btns">
          <van-button type="info" size="small" @click.stop="handleBuy(goodsDetailList.id)">立即购买</van-button>
          <van-button type="danger" size="small" @click.stop="handleAdd(goodsDetailList.id,goodsDetailList.sell_price)">加入购物车</van-button>
        </div>
      </div>
      <!-- 商品参数与图文介绍、评论 -->
      <div class="arguments">
        <div class="arguments_title">商品参数</div>
        <div class="arguments_body">
          <p>商品货号: {{goodsDetailList.goods_no}}</p>
          <p>库存情况: {{goodsDetailList.stock_quantity}}件</p>
          <p>上架时间: {{goodsDetailList.add_time | dateFormat}}</p>
        </div>
        <div class="arguments_btns">
          <div class="d1" @click="goIntroduce(goodsDetailList.id)">图文介绍</div>
          <div class="d2" @click="goComment(goodsDetailList.id)">商品评论</div>
        </div>
      </div>
    </div>
    <div style="height:50px"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 轮播图指示器
      current: 0,
      // 商品详情列表
      goodsDetailList: {},
      // 获取商品轮播图
      goodsPhotoList: [],
      // 商品购买数量
      count: 1
    }
  },
  created () {
    this.getGoodsById()
    this.getGoodsPhotoById()
  },
  methods: {
    // 点击返回上一页
    onClickLeft () {
      this.$refs.goback.children[0].setAttribute('style', 'opacity:0')
      this.$router.go(-1)
    },
    // 获取当前商品的数据
    async getGoodsById () {
      const { data: res } = await this.$http.get(
        `/api/goods/getinfo/${this.id}`
      )
      if (res.status !== 0) {
        return false
      }
      this.goodsDetailList = res.message[0]
      console.log(this.goodsDetailList)
    },
    // 获取当前商品的轮播图数据
    async getGoodsPhotoById () {
      const { data: res } = await this.$http.get(
        `/api/getthumimages/${this.id}`
      )
      if (res.status !== 0) {
        return false
      }
      this.goodsPhotoList = res.message
      // console.log(this.goodsPhotoList)
    },
    // 轮播图切换触发
    onChange (index) {
      this.current = index
    },
    // 点击立即购买
    handleBuy () {
      // 提示登录
      this.$toast.fail('您还未登录,请先登录!')
    },
    // 点击加入购物车
    handleAdd (id, price) {
      // 传递商品数量count,id,价格price
      this.$store.commit('addGood', { count: this.count, id: id, price: price })
      this.$toast.success('已加入购物车!')
    },
    // 点击进入图文介绍
    goIntroduce (id) {
      this.$router.push(`/default/goods/introduce?id=${id}`)
    },
    // 点击进入商品评论
    goComment (id) {
      this.$router.push(`/default/goods/comment?id=${id}`)
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
  .goodBox {
    width: 100%;
    padding: 10px;
    .van-swipe {
      position: relative;
      width: 100%;
      height: 232px;
      border: 1px solid #ccc;
      border-radius: 3px;
      img {
        display: block;
        width: 200px;
        height: 200px;
        margin: auto;
      }
      .custom-indicator {
        position: absolute;
        bottom: 12px;
        width: 100%;
        height: 10px;
        line-height: 10px;
        text-align: center;
      }
    }
    .goodsinfo {
      width: 100%;
      height: auto;
      margin-top: 10px;
      padding: 15px;
      border-radius: 3px;
      border: 1px solid #ccc;
      .title {
        border-bottom: 1px solid #ccc;
      }
      p {
        padding-left: 10px;
        font-size: 14px;
        color: #8f8f94;
        .s1 {
          margin-right: 20px;
        }
        .s2 {
          font-size: 16px;
          color: red;
        }
      }
      .num {
        position: relative;
        padding: 10px;
        span {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          color: #8f8f94;
        }
        .van-stepper {
          margin-left: 82px;
          display: inline-block;
        }
      }
      .btns {
        padding: 0 10px;
        .van-button:nth-child(1) {
          margin-right: 16px;
        }
      }
    }
    .arguments {
      width: 100%;
      margin-top: 10px;
      padding: 15px 15px 0 15px;
      border-radius: 3px;
      border: 1px solid #ccc;
      .arguments_title {
        font-size: 17px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ccc;
      }
      .arguments_body {
        border-bottom: 1px solid #ccc;
        padding: 15px;
        p {
          font-size: 14px;
          margin: 10px 0;
          color: #8f8f94;
        }
      }
      .arguments_btns {
        margin-top: 10px;
        font-size: 16px;
        text-align: center;
        .d1,
        .d2 {
          width: 100%;
          height: 40px;
          border-radius: 5px;
          line-height: 40px;
        }
        .d1 {
          border: 1px solid #1989fa;
          color: #1989fa;
        }
        .d2 {
          margin: 10px 0;
          border: 1px solid #f44;
          color: #f44;
        }
      }
    }
  }
}
</style>
