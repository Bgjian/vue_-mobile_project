<template>
  <div class="box">
    <!-- 头部区域 -->
    <van-nav-bar
      title="添加商品"
      left-text="返回"
      ref="goback"
      left-arrow
      @click-left="onClickLeft"
      class="head"
    />
    <div class="content">
      <van-cell-group>
        <van-field autofocus v-model="value" placeholder="请输入商品名称" />
      </van-cell-group>
      <van-button type="info" @click="addGoodRole" class="btn1">添加商品</van-button>
      <van-button type="info" @click="chakanGoodRole">查看商品</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 输入的数据
      value: ''
    }
  },
  methods: {
    // 点击返回
    onClickLeft () {
      this.$refs.goback.children[0].setAttribute('style', 'opacity:0')
      this.$router.go(-1)
    },
    // 点击添加
    async addGoodRole () {
      if (this.value.trim().length === 0) {
        return this.$toast.fail('品牌名称不能为空!')
      }
      var params = new URLSearchParams()
      params.append('name', this.value)
      const { data: res } = await this.$http.post(`/api/addproduct`, params)
      if (res.status !== 0) {
        this.$toast.fail(res.message)
      } else if (res.status === 0) {
        this.$toast.success('添加成功!')
        this.value = ''
      }
    },
    // 点击查看
    chakanGoodRole () {
      this.$router.push('/search/checkGoods')
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  .content {
    padding: 0 10px;
    .van-cell {
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
    }
    .van-button {
      width: 45%;
      height: 40px;
    }
    .btn1 {
      margin: 0 3%;
    }
  }
}
</style>
