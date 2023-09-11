<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
// Add a custom menu item
GM_registerMenuCommand('脚本官网', function () {
  // Code to run when the menu item is clicked
  location.href = 'https://www.wxbuluo.com'
})

// 脚本地址https://greasyfork.org/en/scripts/474736
// 检查脚本是否有更新，如果有更新，弹出提示框，提示用户更新脚本
checkUpdate()
const scriptUrl = 'https://greasyfork.org/en/scripts/474736'

async function checkUpdate() {
  const version = GM_info.script.version

  try {
    const response = await fetch(scriptUrl)
    const pageContent = await response.text()
    // 获取类.script-show-version下的span标签的内容
    const regex = /<dd class="script-show-version".*?>\s*<span[^>]*>([\d.]+)<\/span>/
    const match = pageContent.match(regex)
    if (match && match[1] && version !== match[1]) {
      // 如果获取到最新版本号并且与当前版本号不同，显示更新提示
      const updateConfirmation = await Swal.fire({
        title: '脚本有更新',
        html: `
          <div >
            <p>当前版本：${version}</p>
            <p>最新版本：${match[1]}</p>
          </div>
        `,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '立即更新',
        cancelButtonText: '稍后更新',
      })

      if (updateConfirmation.isConfirmed) {
        // 用户点击了更新按钮，跳转到脚本url，在新窗口打开
        window.open(scriptUrl, '_blank')
      }
    }
  } catch (error) {
    console.error('检查更新时出错：', error)
  }
}
</script>

<template>
  <div class="monkey-box">
    <HelloWorld />
  </div>
</template>

<style scoped>
.monkey-box {
  /* background: red; */
  box-shadow: 2px 2px 4px #000;
  background: #fff;
  position: fixed;
  bottom: 0px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  max-width: 300px;
  padding: 10px;
}
</style>
