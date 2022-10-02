// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // env:'xiaochengxu-7g0sacbi501960c0'//云开发环境id
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection('num').skip(event.len).limit(event.pageNum).get()
}