// pages/shenghe/shenghe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pass_shenhe: false,
    detail:{},
    shenhe: false,
    zhanghao: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      zhanghao:  options.zhanghao
    })
    wx.cloud.database().collection('users_d')
    .where({
      zhanghao: options.zhanghao
    })
    .get()
    .then(res => {
      console.log('获取成功', res)
      this.setData({
        detail: res.data[0],
        pass_shenhe: res.data[0].pass_shenhe,
        shenhe:  res.data[0].shenhe
      })
    })
    .catch(res => {
      console.log('获取失败', res)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  fanhui(){
    wx.navigateBack()
  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  kaishidenglu(){
    wx.navigateBack()
  },
  chongxinrenzheng(){
    wx.cloud.database().collection('users_d')
    .where({
      zhanghao: this.data.zhanghao
    })
    .remove()
    .then(res => {
      console.log('删除成功', res)
    })
    .catch(res => {
      console.log('删除失败', res)
    })
    wx.navigateBack()
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