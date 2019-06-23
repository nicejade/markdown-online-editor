/** @format */

export default {
  updatePageMeta(to, from, next) {
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next()
  }
}
