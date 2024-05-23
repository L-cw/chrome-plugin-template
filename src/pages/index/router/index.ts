import { createRouter, createWebHashHistory } from 'vue-router'
import LinkGroup from '../components/LinkGroup.vue'
import Tools from '../views/tools/index.vue'
import ToolsParseUrl from '../views/tools/parseUrl.vue'

const routes = [
  { path: '/', component: LinkGroup },
  { path: '/tools', component: Tools },
  { path: '/tools/parse-url', component: ToolsParseUrl },
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router
