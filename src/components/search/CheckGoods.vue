<template>
  <div class="box">
    <!-- 头部区域 -->
    <van-nav-bar
      title="商品名称列表"
      left-text="返回"
      ref="goback"
      left-arrow
      @click-left="onClickLeft"
      class="head"
    />
    <!-- 商品名称列表 -->
    <van-cell class="headCell">
      <span>名称</span>
      <span>添加世间</span>
      <span>操作</span>
    </van-cell>
    <van-cell v-for="item in list" :key="item.id" class="bodyCell">
      <div class="div1">{{item.name}}</div>
      <div class="div2">{{item.ctime | dateFormat}}</div>
      <div class="div3">
        <van-button type="danger" size="small" @click="deleteGoodsById(item.id)">删除</van-button>
      </div>
    </van-cell>
    <div style="height:50px"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  created () {
    this.onSearch()
  },
  methods: {
    // 点击返回
    onClickLeft () {
      this.$refs.goback.children[0].setAttribute('style', 'opacity:0')
      this.$router.go(-1)
    },
    // 获取列表
    async onSearch () {
      const { data: res } = await this.$http.get('/api/getprodlist')
      if (res.status !== 0) {
        return false
      }
      this.list = res.message
    },
    // 删除操作
    async deleteGoodsById (id) {
      const confirmDefault = await this.$dialog
        .confirm({
          title: '警告',
          message: '确认删除该商品吗?'
        })
        .catch(err => err)
      if (confirmDefault === 'confirm') {
        const { data: res } = await this.$http.get(`/api/delproduct/${id}`)
        if (res.status === 0) {
          this.$toast.success(res.message)
        }
        this.onSearch()
      } else {
        this.$notify({ type: 'success', message: '已取消删除' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  .headCell {
    margin-top: 10px;
  }
  .headCell span {
    font-size: 16px;
    color: #000;
    font-weight: 600;
    display: inline-block;
    width: 33.33%;
    text-align: center;
  }
  .bodyCell {
    position: relative;
  }
}
</style>
