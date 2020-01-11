<template>
  <div class="box">
    <!-- 头部区域 -->
    <van-nav-bar
      title="商品列表"
      left-text="返回"
      left-arrow
      ref="goback"
      @click-left="onClickLeft"
      class="head"
    />
    <ul class="goodscontent">
      <li v-for="(item,index) in goodsList" :key="index" @click.stop="handleClick(item.id)">
        <div class="img">
          <img :src="item.img_url" alt="图片跑丢了" />
        </div>
        <p class="title">{{item.title}}</p>
        <div class="info">
          <div class="price">
            <span class="s1">¥{{item.sell_price}}</span>
            <del class="s2">¥{{item.market_price}}</del>
          </div>
          <div class="hotbox">
            <span class="hot">热卖中</span>
            <span class="num">剩余{{item.stock_quantity}}件</span>
          </div>
        </div>
      </li>
      <li class="message">没有更多了</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 商品列表
      goodsList: [],
      // 商品列表页码
      pageindex: 1
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    // 点击返回上一页
    onClickLeft () {
      this.$refs.goback.children[0].setAttribute('style', 'opacity:0')
      this.$router.go(-1)
    },
    // 获取商品列表数据
    async getGoodsList () {
      const { data: res } = await this.$http.get(
        `/api/getgoods?pageindex=${this.pageindex}`
      )
      if (res.status !== 0) {
        return false
      }
      this.goodsList.push(...res.message)
      if (res.message.length !== 0) {
        this.pageindex += 1
        this.getGoodsList()
      }
      // console.log(this.goodsList)
    },
    // 点击跳转到商品详情页
    handleClick (id) {
      this.$router.push(`/default/goods/content?id=${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  div,
  ul,
  li,
  span,
  p,
  img {
    box-sizing: border-box;
  }
  .goodscontent {
    padding: 5px 10px;
    width: 100%;
    height: 100%;
    border-top: 1px solid #fff;
    li {
      overflow: hidden;
      float: left;
      width: 48%;
      border: 1px solid #ccc;
      border-radius: 3px;
      height: 330px;
      margin-bottom: 15px;
      .img {
        width: 100%;
        height: 180px;
        line-height: 180px;
        text-align: center;
        padding: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        font-size: 14px;
        color: #000;
        text-align: left;
        padding: 0px 10px;
        height: 60px;
      }
      .info {
        width: 100%;
        background: #eee;
        padding: 5px 0;
        height: 60px;
        .s1 {
          font-size: 16px;
          color: red;
          margin: 0 40px 0 10px;
        }
        .s2,
        .hot,
        .num {
          font-size: 14px;
          color: #323233;
        }
        .hot {
          margin: 0 60px 0 10px;
        }
        .hotbox {
          margin-top: 10px;
        }
      }
    }
    li:nth-child(2n) {
      margin-left: 15px;
    }
    .message {
      border: 0;
      width: 100%;
      height: 80px;
      color: #969799;
      font-size: 13px;
      line-height: 50px;
      text-align: center;
    }
  }
}
</style>
