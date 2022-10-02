// app.js
App({ // 小程序一启动，就会执行
  globalData:{
    isSuo: false,
    weiZhi: false,
    user_id: null,
    is_wodeyuYue_change : true,
    is_gerenxinxi_change: false,
    isZhuce: false
  },
  onLaunch() {
   console.log('小程序开始启动了')
   wx.cloud.init({
     env:'xiaochengxu-7g0sacbi501960c0'//云开发环境id
   })
 },
})
