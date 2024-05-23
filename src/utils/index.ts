/**
 * 防止多次点击
 */
export function debounce(func: Function, wait: number, immediate: boolean) {
  let timer: any = 0;
  return function (...args: any) {
    //@ts-ignore
    let context = this;
    if (timer) clearTimeout(timer);
    if (immediate) {
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = 0;
      }, wait)
      if (callNow) func.apply(context, args);
    } else {
      timer = setTimeout(() => {
        func.apply(context, args)
      }, wait);
    }
  }
}