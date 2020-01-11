import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 保存已加入购物车的商品id和数量
  state: {
    goods: []
  },
  mutations: {
    // 加入购物车功能
    addGood (state, obj) {
      const { count, id, price } = obj
      // 判断goods数组中是否含有该商品的id
      const index = state.goods.findIndex(item => item.id === id)
      // 如果index为-1,向goods中push一个对象{id:id,count:count}
      if (index === -1) {
        state.goods.push({ id: id, count: count, price: price })
      } else {
        // 如果index !== -1,将goods中对应id商品的count加count
        state.goods[index].count += count
      }
      // 将商品数组存放在localstorage中
      window.localStorage.setItem('cart', JSON.stringify(state.goods))
    },
    // 页面加载时,将localstorage中的值,取出来赋值给goods
    onLoad (state) {
      state.goods = JSON.parse(window.localStorage.getItem('cart')) ? JSON.parse(window.localStorage.getItem('cart')) : []
    },
    // 修改商品数量及删除商品
    editGoods (state, obj) {
      state.goods.forEach((item, index, arr) => {
        if (item.id === obj.id && obj.sign === 1) {
          item.count += 1
        }
        if (item.id === obj.id && obj.sign === 2) {
          item.count -= 1
        }
        if (item.id === obj.id && obj.sign === 3) {
          arr.splice(index, 1)
        }
      })
      // 重新对localStorage赋值
      window.localStorage.setItem('cart', JSON.stringify(state.goods))
    }
  },
  actions: {
  },
  modules: {
  }
})
