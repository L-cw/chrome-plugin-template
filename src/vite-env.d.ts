/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare global {
  interface Window {
    [key: string]: any;
  }
}
interface Window {
  QCefClient: any;
  a: any
}

declare module 'element-plus'
declare module 'rollup-plugin-copy'
declare module 'qs'
