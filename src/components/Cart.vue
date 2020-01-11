<template>
  <div class="box">
    <!-- 头部区域 -->
    <van-nav-bar
      title="购物车"
      left-text="返回"
      ref="goback"
      left-arrow
      @click-left="onClickLeft"
      class="head"
    />
    <!-- 商品预览区域 -->
    <div class="goodsList">
      <div class="kong" v-if="goodsList.length === 0 ? true : false">
        <img :src="img_url" alt="">
        <p>购物车空空如也</p>
        <van-button type="info" size="small" @click="goShopping">去逛逛</van-button>
      </div>
      <van-swipe-cell
        v-for="(item,index) in goodsList"
        :key="index"
        :name="item.id"
        :before-close="beforeClose"
      >
        <div class="commodity" ref="commodityRef">
          <img :src="item.thumb_path" alt />
          <div class="right">
            <span class="s1">{{item.title}}</span>
            <span class="s2">¥{{item.sell_price}}</span>
            <span class="s3">×{{item.cou}}</span>
          </div>
          <van-stepper
            v-model="item.cou"
            min="1"
            @plus="addCount(item.id)"
            @minus="cutCount(item.id)"
          />
        </div>
        <template slot="right">
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </div>
    <!-- 提交订单 -->
    <van-submit-bar :price="price" button-text="提交订单" @submit="onSubmit" />
    <div style="height:104px"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 购物车商品列表
      goodsList: [],
      // 取出localstorage中cart数组
      goodsCart: [],
      // 没有商品显示的图片
      img_url: require('../assets/images/cart_empty.png')
    }
  },
  created () {
    // 页面刷新时,从localStorage取cart
    this.goodsCart = JSON.parse(window.localStorage.getItem('cart'))
      ? JSON.parse(window.localStorage.getItem('cart'))
      : []
    this.getGoodsById()
  },
  methods: {
    // 点击返回按钮
    onClickLeft () {
      this.$refs.goback.children[0].setAttribute('style', 'opacity:0')
      this.$router.go(-1)
    },
    // 根据商品id获取商品购物车信息
    async getGoodsById () {
      if (JSON.parse(window.localStorage.getItem('cart')).length === 0) {
        this.goodsList = []
        return this.$toast.fail('当前购物车未添加商品!')
      }
      // 获取localStorage中的商品id数组,转换成字符串
      var idArr = []
      JSON.parse(window.localStorage.getItem('cart')).forEach(item => {
        idArr.push(item.id)
      })
      const ids = idArr.join(',')
      const { data: res } = await this.$http.get(
        `/api/goods/getshopcarlist/${ids}`
      )
      if (res.status !== 0) {
        return false
      }
      this.goodsList = res.message
      // 用goodsCart中的count替换goodsList中对应id的cou
      this.goodsList.forEach(item1 => {
        this.goodsCart.forEach(item2 => {
          if (item1.id === item2.id) {
            item1.cou = item2.count
          }
        })
      })
      console.log(this.goodsList)
    },
    // 增加商品数量
    addCount (id) {
      this.$store.commit('editGoods', { id: id, sign: 1 })
    },
    // 减少商品数量
    cutCount (id, count) {
      this.$store.commit('editGoods', { id: id, sign: 2 })
    },
    // 删除商品
    beforeClose ({ position, instance, name }) {
      switch (position) {
        case 'outside':
          instance.close()
          break
        case 'right':
          this.$dialog
            .confirm({
              message: '确定删除该商品吗？'
            })
            .then(() => {
              console.log(name)
              // 调用vuex中的editGoods函数
              this.$store.commit('editGoods', { id: name, sign: 3 })
              this.getGoodsById()
            })
            .catch(() => {
              this.$notify({ type: 'success', message: '已取消删除' })
            })
          break
      }
    },
    // 提交订单
    onSubmit () {
      this.$toast.fail('请先登录!')
    },
    // 取逛逛
    goShopping () {
      this.$router.push('/default/goods')
    }
  },
  computed: {
    // 计算商品总价
    price () {
      var goodsMoney = 0
      this.goodsList.forEach(item => {
        goodsMoney += item.cou * item.sell_price
      })
      return goodsMoney * 100
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  .van-swipe-cell {
    margin-top: 10px;
    width: 100%;
    height: 120px;
    .van-swipe-cell__wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      .commodity {
        background-color: #fafafa;
        padding: 10px;
        width: 100%;
        height: 100%;
        img {
          float: left;
          width: 26%;
        }
      }
      .van-stepper,
      .right {
        float: right;
        width: 70%;
      }
      .right {
        position: relative;
        font-size: 12px;
        .s2 {
          width: 40%;
          color: #f44;
          position: absolute;
          left: 0;
          top: 140%;
        }
        .s3 {
          position: absolute;
          right: 5px;
          top: 140%;
        }
      }
      .van-stepper {
        position: absolute;
        width: 105px;
        bottom: 10px;
        right: 0%;
      }
      .van-button {
        height: 100%;
      }
    }
  }
  .van-submit-bar,
  .van-submit-bar__bar {
    height: 50px;
  }
  .kong{
    height: 200px;
    img{
      display: block;
      margin: 20px auto 20px;
      width: 100px;
      height: 100px;
    }
    p{
      color:#ccc;
      font-size: 16px;
      text-align: center;
    }
    .van-button{
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
