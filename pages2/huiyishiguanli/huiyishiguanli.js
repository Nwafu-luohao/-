// pages2/huiyishiguanli/huiyishiguanli.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meetingList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.database().collection('meeting-1')
    .get()
    .then(res => {
      console.log('获取成功', res)
      this.setData({
        meetingList: res.data
      })
    })
    .catch(res => {
      console.log('获取失败', res)
    })
  },
  getDetial(e){
    console.log(e.currentTarget.dataset._id)
    wx.navigateTo({
      url: '/pages2/huiyishiguanli-1/huiyishiguanli-1?_id=' + e.currentTarget.dataset._id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
this.onLoad()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
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