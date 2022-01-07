type TimeoutHandle = ReturnType<typeof setTimeout>
type IntervalHandle = ReturnType<typeof setInterval>
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

interface Math {
  easeInOutQuad: Function
}

interface Window {
  webkitRequestAnimationFrame: Function
  mozRequestAnimationFrame: Function
}

interface Document {
  body: HTMLElement
}
