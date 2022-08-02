import router from '@/router'
import store from '@/store'
// 白名单
const whiteList = ['/login', '/404']
// 路由（全局）前置守卫
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  //   看有没有登录权限
  if (token) {
    // 有
    // 判断是否在登录页 是跳转至首页
    if (to.path === '/login') return next('/')
    // 不是 直接进入
    next()
  } else {
    // 无登录权限
    const isCloudes = whiteList.includes(to.path)
    // 判断是否在白名单 在 直接进入
    if (isCloudes) return next()        
    next('/login')
  }
})
