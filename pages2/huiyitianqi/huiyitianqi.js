// pages2/huiyitianqi/huiyitianqi.js
let num = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressNumber: '',
    detail: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    num = options.num
    this.setData({
      addressNumber : options.num
    })
    this.gettianQi(options.num) 
  },
  gettianQi(e) {
    wx.request({
      url: 'https://restapi.amap.com/v3/weather/weatherInfo?parameters',
      method: 'GET',
      data: {
        'key': 'defac5b7e633b1d48b8c3a0ca60e934d',
        'city': e,
        'extensions': 'base'
      },
      success: (res) => {
        console.log(res)
        this.setData({
          detail: res.data.lives[0]
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
this.gettianQi(num)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.gettianQi(num)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})