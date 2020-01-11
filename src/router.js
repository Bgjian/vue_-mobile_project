// 导入vue
import Vue from 'vue'

// 导入vue-router
import VueRouter from 'vue-router'

// 导入路由子组件
import Home from './components/Home.vue'
import Default from './components/default/Default.vue'
import NewsList from './components/default/DefaultNews.vue'
import NewsDetail from './components/default/DefaultNewsDetail.vue'
import PhotoList from './components/default/DefaultPhoto.vue'
import PhotoDetail from './components/default/DefaultPhotoDetail.vue'
import GoodsList from './components/default/DefaultGoods.vue'
import GoodsDetail from './components/default/DefaultGoodsDetail.vue'
import GoodsComment from './components/default/DefaultGoodsComment.vue'
import GoodsIntroduce from './components/default/DefaultGoodsIntroduce.vue'
import Search from './components/search/Search.vue'
import Addgoods from './components/search/AddGoods.vue'
import CheckGoods from './components/search/CheckGoods.vue'
import Cart from './components/Cart.vue'
import Mine from './components/Mine.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: Home,
    children: [
      { path: '/home', redirect: '/default' },
      { path: '/default', component: Default },
      { path: '/default/news', component: NewsList },
      { path: '/default/news/detail', component: NewsDetail },
      { path: '/default/photo', component: PhotoList },
      { path: '/default/photo/info', component: PhotoDetail },
      { path: '/default/goods', component: GoodsList },
      { path: '/default/goods/content', component: GoodsDetail },
      { path: '/default/goods/comment', component: GoodsComment },
      { path: '/default/goods/introduce', component: GoodsIntroduce },
      { path: '/search', component: Search },
      { path: '/search/addgoods', component: Addgoods },
      { path: '/search/checkGoods', component: CheckGoods },
      { path: '/cart', component: Cart },
      { path: '/mine', component: Mine }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
