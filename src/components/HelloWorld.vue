<script setup>
import { onMounted, ref } from 'vue'

// 定时器，每隔5秒执行一次，检查今天是否已经签到，如果没有签到，则自动签到，如果已经签到，则不做任何操作，签到后添加标识，防止重复签到
let isSignIn = ref('')

function clear() {
  GM_deleteValue('isSignIn')
  isSignIn.value = ''
}

// 弹出二维码，引导用户关注公众号，获取验证码，输入验证码之后，才能使用脚本
// showQrcode()

function showQrcode() {
  Swal.fire({
    title: '关注公众号，获取验证码',
    imageUrl: 'https://www.wxbuluo.com/static/images/getqrcode.jpg',
    width: 500,

    imageWidth: 200,
    imageHeight: 200,
    input: 'text',
    inputPlaceholder: '请输入验证码',
    showConfirmButton: true,
    preConfirm: (code) => {
      if (code === 'wxbuluo') {
        Swal.fire({
          title: '验证成功',
          text: '感谢您的关注',
          icon: 'success',
        })
      } else {
        Swal.fire({
          title: '验证失败',
          text: '验证码错误',
          icon: 'error',
        })
      }
    },
  })
}

/**
 * 显示使用说明：每天会自动签到，如果没有签到，会显示“未签到”，如果已经签到，会显示“已签到：2021/8/1”，每隔30分钟检查一次
 */
function showInfo() {
  Swal.fire({
    title: '使用说明',
    html: `
      <div class="read-the-docs">
        <p>登录之后，打开任意掘金网页即可，每天会自动签到</p>
      </div>
    `,
    showConfirmButton: true,
  })
}

onMounted(() => {
  isSignIn.value = GM_getValue('isSignIn')
})

setInterval(() => {
  const today = new Date().toLocaleDateString()
  if (today !== isSignIn.value) {
    signIn(today)
  }
}, 1800)

// 签到

function signIn(today) {
  GM_xmlhttpRequest({
    method: 'POST',
    url: 'https://api.juejin.cn/growth_api/v1/check_in',
    headers: {
      'content-type': 'application',
      'user-agent': navigator.userAgent,
    },
    responseType: 'json',
    onload: function (response) {
      if (response.status === 200) {
        const { err_no, err_msg } = response.response
        if (err_no === 0) {
          const { data } = response.response
          const { sum_point, incr_point } = data
          Swal.fire({
            title: `签到成功`,
            text: `获得积分：${incr_point}，总积分：${sum_point}`,
            icon: 'success',
          })
        } else {
          Swal.fire({
            title: '签到失败',
            text: err_msg,
            icon: 'error',
          })
        }
      } else {
        Swal.fire({
          title: '签到失败',
          text: '网络错误',
          icon: 'error',
        })
      }
      GM_setValue('isSignIn', today)
      isSignIn.value = today
    },
  })
}
</script>

<template>
  <!-- <button type="" @click="clear()">test</button> -->
  <span class="show-info" @click="showInfo()">{{ isSignIn ? '已签到：' : '未签到' }}{{ isSignIn }}</span>
</template>

<style lang="scss">
.read-the-docs {
  color: #888;
  p {
    font-size: 16px;
    text-align: left;
    line-height: 1.8;
    // 文字间隔
    letter-spacing: 1px;
  }
}
.show-info {
  // 鼠标悬浮时的样式
  &:hover {
    cursor: pointer;
    color: #409eff;
  }
}
.swal2-modal {
  display: flex !important;
  flex-direction: column !important;
  input {
    margin: 0 auto;
    margin-top: 20px;
    width: 80% !important;
  }
}
</style>
