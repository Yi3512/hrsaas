export const imgError = {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: (el, { value }) => {
    // 聚焦元素
    el.onerror = () => {
      el.src = value
    }
  },
}
export const aa = {
  inserted() {},
}
