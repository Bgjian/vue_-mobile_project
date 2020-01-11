<template>
  <div class="box">
    <!-- 头部区域 -->
    <van-nav-bar
      title="搜索"
      left-text="返回"
      right-text="添加"
      ref="goback"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      class="head"
    />
    <!-- 搜索区域 -->
    <van-search
      v-model="valueName"
      autofocus
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />
    <div v-if="flag">
      <van-swipe-cell v-for="(item,index) in searchList" :key="index">
        <van-cell :border="false" :title="item.name" :value="item.ctime | dateFormat" />
        <template slot="right">
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </div>
    <div class="history" v-if="!flag">
      <div class="dd">
        <div class="sear">搜索历史</div>
        <van-icon name="delete" @click="clear" />
      </div>
      <van-tag v-for="(item,index) in history" :key="index">{{item}}</van-tag>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 搜索结果列表
      searchList: [],
      // 搜索关键词
      valueName: '',
      // 显示与隐藏
      flag: false,
      // 保存搜索历史的数组
      history: []
    }
  },
  created () {
    this.onCancel()
  },
  methods: {
    onClickLeft () {
      this.$refs.goback.children[0].setAttribute('style', 'opacity:0')
      this.$router.go(-1)
    },
    onClickRight () {
      this.$refs.goback.children[0].setAttribute('style', 'opacity:0')
      this.$router.push('/search/addgoods')
    },
    // 回车搜索
    async onSearch () {
      const { data: res } = await this.$http.get('/api/getprodlist')
      res.message.forEach(item => {
        if (item.name === this.valueName) {
          this.searchList.push(item)
        }
      })
      console.log(this.history, this.valueName)
      if (!this.history) {
        this.history = [this.valueName]
      } else {
        this.history.push(this.valueName)
      }
      // 将当前的搜索历史数组添加到sessionStorage中
      window.sessionStorage.setItem('history', JSON.stringify(this.history))
      this.valueName = ''
      if (this.searchList.length === 0) {
        return this.$toast.fail('您所搜索的商品不存在!')
      }
      this.flag = true
    },
    // 取消与显示历史隐藏
    onCancel () {
      this.flag = false
      this.searchList = []
      // 取出sessionStorage中的值,渲染到tag中
      this.history = JSON.parse(window.sessionStorage.getItem('history'))
    },
    // 清除搜索历史
    clear () {
      this.history = []
      window.sessionStorage.clear()
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  .history {
    padding: 0 10px;
    .dd {
      padding: 0 10px;
      width: 100%;
      height: 20px;
      font-size: 14px;
      font-weight: 400px;
      color: #ccc;
      .sear {
        float: left;
      }
      .van-icon {
        float: right;
      }
    }
    .van-tag {
      margin: 10px 0 0 10px;
    }
  }
}
</style>
