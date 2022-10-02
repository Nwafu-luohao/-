// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id : null
  },
  getMeeting(){
    wx.navigateTo({
      url: '/pages/meeting/meeting',
    })
  },
  yaoqingyrenyuan(){
    wx.navigateTo({
      url: '/pages/yaoqingrenyuan/yaoqingrenyuan',
    })
  },
  quxiaoyuyue(){
    wx.navigateTo({
      url: '/pages/quxiaoyuyue/quxiaoyuyue?_id=' + this.data._id
    })
  },
  xiugaiyuyue(){
    wx.navigateTo({
      url: '/pages/xiugaiyuyue/xiugaiyuyue?_id=' + this.data._id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getStorage({
      key: 'user',
      success (res) {
        console.log('cao',res.data._id)
       that.setData({
         _id: res.data._id
       })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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