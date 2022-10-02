// pages/meeting/meeting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meeting: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMeeting()
  },
  shuaxin(){
    this.getMeeting2()
  },
  
  getMeeting(){
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.cloud.database().collection('meeting')
      .skip(this.data.meeting.length)
      .get()
      .then(res => {
        wx.hideLoading()
        console.log('请求成功', res)
        if (res.data.length <= 0) {
          wx.showToast({
            title: '没有更多数据啦',
            icon: 'none'
          })
        }
        this.setData({
          meeting: this.data.meeting.concat(res.data)
        })
      })
      .catch(res => {
        wx.hideLoading()
        console.log('请求失败', res)
      })
  },
  getMeeting2(){
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.cloud.database().collection('meeting')
      .skip(0)
      .get()
      .then(res => {
        wx.hideLoading()
        console.log('请求成功', res)
        if (res.data.length <= 0) {
          wx.showToast({
            title: '没有更多数据啦',
            icon: 'none'
          })
        }
        this.setData({
          meeting: res.data
        })
      })
      .catch(res => {
        wx.hideLoading()
        console.log('请求失败', res)
      })
  },
  getDetail(e){
    console.log('测试',e.currentTarget.dataset._id)
    wx.navigateTo({
      url: '/pages/meeting-1/meeting-1?id=' + e.currentTarget.dataset._id,
    })
  },
  getDetail2(e){
    wx.navigateTo({
      url: '/pages/meeting-2/meeting-2?_id=' + e.currentTarget.dataset._id
      + '&time1=' + e.currentTarget.dataset.time1 + '&time2=' + e.currentTarget.dataset.time2,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getMeeting2()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getMeeting2()
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
      this.getMeeting()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})