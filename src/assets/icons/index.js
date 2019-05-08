/** @format */

const files = require.context('.', true, /\.svg$/)
const modules = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.svg)/g, '')] = files(key)
})

export default modules
