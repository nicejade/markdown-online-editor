/**
 * /*
 * 权限验证模块
 *
 * @format
 */

import Cookies from 'js-cookie'

export default {
  checkSession() {
    return Cookies.get('isLogin')
  }
}
