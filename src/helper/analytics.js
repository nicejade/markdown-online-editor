/**
 * Google Analytics 埋点辅助函数
 * @format
 */

export const trackEvent = (action, category, label, value) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

export default {
  trackEvent,
}
