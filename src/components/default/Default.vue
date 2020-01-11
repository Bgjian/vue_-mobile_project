<template>
  <div class="box">
    <!-- 头部区域 -->
    <div class="head">白马商城</div>
    <!-- 轮播图区域 -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in imgList" :key="item.id">
        <img class="lunboimg" :src="item.img" />
      </van-swipe-item>
    </van-swipe>
    <!-- 宫格区域 -->
    <van-grid :column-num="3" :border="bool">
      <van-grid-item v-for="(item,index) in imgGridList" :key="index" :to="item.url">
        <van-image :src="item.img" />
        <br />
        <span class="text">{{item.text}}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 存放轮播图片
      imgList: [],
      // 宫格区域图片
      imgGridList: [
        {
          img: require('../../assets/images/menu1.png'),
          text: '新闻资讯',
          url: '/default/news'
        },
        {
          img: require('../../assets/images/menu2.png'),
          text: '图片分享',
          url: '/default/photo'
        },
        {
          img: require('../../assets/images/menu3.png'),
          text: '商品购买',
          url: '/default/goods'
        },
        { img: require('../../assets/images/menu4.png'), text: '留言反馈' },
        { img: require('../../assets/images/menu5.png'), text: '视频专区' },
        { img: require('../../assets/images/menu6.png'), text: '联系我们' }
      ],
      // 宫格区域不显示边框
      bool: false
    }
  },
  created () {
    this.getImgList()
  },
  methods: {
    // 获取轮播图数据
    async getImgList () {
      const { data: res } = await this.$http.get('/api/getlunbo')
      if (res.status !== 0) {
        return false
      }
      res.message[0].img = 'http://dl.ppt123.net/pptbj/201603/2016030410190920.jpg'
      res.message[1].img =
        'http://www.itcast.cn/images/newslide/homepageandphone/2020070809075255.jpg'
      res.message.push({
        id: 4,
        img:
          'http://www.itcast.cn/images/newslide/homepageandphone/20203206113247714.jpg',
        url: 'http://www.itcast.cn/subject/phoneweb/index.html'
      })
      this.imgList = res.message
      // console.log(this.imgList)
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  .lunboimg {
    width: 100%;
    height: 200px;
  }
  .van-image {
    width: 60px;
    height: 60px;
  }
  .text {
    font-size: 14px;
  }
}
</style>
