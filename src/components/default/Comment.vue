<template>
  <div class="boxComment">
    <!-- 评论功能 -->
    <div class="comment">
      <h4>发表评论</h4>
      <div class="text">
        <textarea cols="30" rows="10" placeholder="请输入评论内容" autofocus v-model="commentText"></textarea>
        <van-button type="info" class="btn" @click="addComment">发表评论</van-button>
      </div>
    </div>
    <!-- 评论信息 -->
    <div class="commentlist" v-for="(item,index) in commentList" :key="index">
      <div class="title">
        <span class="sp1">第{{index+1}}楼</span>
        <span class="sp2">用户: {{item.user_name}}</span>
        <span class="sp3">发表时间: {{item.add_time | dateFormat}}</span>
      </div>
      <div class="body">{{item.content}}</div>
    </div>
    <!-- 加载更多评论 -->
    <div class="more" @click="loadMore">加载更多</div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      // 评论内容
      commentText: '',
      // 评论的当前页码
      pageindex: 1,
      // 评论信息列表
      commentList: [],
      // 判断当前是否为发表评论操作
      isFlag: true
    }
  },
  created () {
    this.getCommentById()
  },
  methods: {
    // 根据ID和页码获取文章的评论信息
    async getCommentById (flag) {
      const pagenum = flag ? 1 : this.pageindex
      const { data: res } = await this.$http.get(
        `/api/getcomments/${this.id}?pageindex=${pagenum}`
      )
      if (res.status !== 0) {
        return false
      }
      // 当有参数传递时,此时为发表评论后的调用,向服务器请求第一页的评论,取第一条评论添加到commentList数组的最前面
      if (flag) {
        this.commentList.unshift(res.message[0])
        if (res.message.length === 10) {
          this.commentList.pop()
        }
      } else {
        // 当没有参数传递时,此时为页面加载后的初始调用或者用户点击了加载更多
        if (this.pageindex === 1) {
          // 页面加载初始调用,直接对commentList进行赋值
          this.commentList = res.message
        } else {
          // 点击加载更多后的调用,将得到的评论数组展开运算后,push到commentList数组中
          if (res.message.length === 0) {
            this.pageindex -= 1
            this.$toast.fail('已没有更多评论!')
            return true
          }
          this.commentList.push(...res.message)
        }
      }
    },
    // 点击发表评论
    async addComment () {
      if (this.commentText.trim().length === 0) {
        this.commentText = ''
        return this.$toast.fail('评论不能为空!')
      }
      // URLSearchParams方法传参会将请求头的content-type字段更改为application/x-www-form-urlencoded
      var params = new URLSearchParams()
      params.append('content', this.commentText)
      const { data: res } = await this.$http.post(
        `/api/postcomment/${this.id}`,
        params
      )
      if (res.status !== 0) {
        return this.$toast.fail('评论提交失败!')
      }
      this.$toast.success('评论成功!')
      this.getCommentById(this.isFlag)
      this.commentText = ''
    },
    // 点击加载更多评论
    loadMore () {
      this.pageindex += 1
      this.getCommentById()
    }
  }
}
</script>

<style lang="less" scoped>
.boxComment {
  padding: 0px 10px;
  .comment {
    .text {
      padding-top: 7px;
      border-top: 1px solid #000;
    }
    textarea {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 100px;
      padding: 10px 15px;
      border: 1px solid #999;
    }
    .btn {
      margin: 5px 0;
      width: 100%;
      height: 44px;
    }
  }
  .commentlist {
    .title {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background-color: #ccc;
      font-size: 12px;
      .sp1,
      .sp2 {
        margin-right: 48px;
      }
    }
    .body {
      width: 100%;
      height: 35px;
      text-indent: 2em;
      line-height: 35px;
      font-size: 12px;
    }
  }
  .more {
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 14px;
    color: #f44;
    border: 1px solid #f44;
  }
}
</style>
