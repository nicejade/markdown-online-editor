/** @format */

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
  defaultField: 1314
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
