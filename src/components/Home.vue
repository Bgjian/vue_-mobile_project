<template>
  <div class="welcomeBox">
    <!-- 主体区域路由占位符 -->
    <router-view></router-view>
    <!-- 底部区域 -->
    <van-tabbar
      route
      class="foot animated bounceInUp"
      v-model="activeName"
      active-color="#1989fa"
      inactive-color="#7d7e80"
      ref="tabBottomRef"
    >
      <van-tabbar-item id="default" name="default" icon="wap-home-o" to="/default">首页</van-tabbar-item>
      <van-tabbar-item id="search" name="search" size="32px" icon="search" to="/search">搜索</van-tabbar-item>
      <van-tabbar-item id="cart" name="cart" icon="cart-o" to="/cart" :info="goodsNum">购物车</van-tabbar-item>
      <van-tabbar-item id="mine" name="mine" icon="manager-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // tab页签默认显示项的索引下标
      activeName: 'default'
    }
  },
  created () {
    // 全局监听路由的变化,根据即将跳转的路由,设置对应tanbar的样式
    this.$router.beforeEach((to, from, next) => {
      this.activeName = to.path.split('/')[1]
      setTimeout(() => {
        this.$refs.tabBottomRef.$el.children.forEach(item => {
          if (item.id === this.activeName) {
            item.setAttribute(
              'class',
              'van-tabbar-item van-tabbar-item--active'
            )
          } else {
            item.setAttribute('class', 'van-tabbar-item')
          }
        })
      }, 1)
      next()
    })
    // 监听页面刷新事件
    window.addEventListener('load', () => {
      // 刷新后,保持对应tanbar的样式
      this.activeName = location.hash.split('#')[1].split('/')[1]
      setTimeout(() => {
        this.$refs.tabBottomRef.$el.children.forEach(item => {
          if (item.id === this.activeName) {
            item.setAttribute(
              'class',
              'van-tabbar-item van-tabbar-item--active'
            )
          }
        })
      }, 1)
      // 调用vuex中的onLoad函数
      this.$store.commit('onLoad')
    })
  },
  computed: {
    // 计算商品总数
    goodsNum () {
      var many = 0
      this.$store.state.goods.forEach(item => {
        many += item.count
      })
      return many
    }
  }
}
</script>

<style lang="less" scoped>
.welcomeBox {
  display: flex;
  height: 100%;
  overflow-x: hidden;
  .foot {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    font-size: 10px;
    border-top: 1px solid#d7dadf;
  }
}
</style>
