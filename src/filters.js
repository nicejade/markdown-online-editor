/** @format */

import dayjs from 'dayjs'

export default {
  dateTimeConvert(time) {
    return time && dayjs(time).format('YYYY-MM-DD HH:mm:ss')
  },
  dateConvert(time) {
    return time && dayjs(time).format('YYYY-MM-DD')
  }
}
