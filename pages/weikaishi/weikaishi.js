const util = require('../../utils/util.js')
let id = null
let db = wx.cloud.database()
let _ = db.command
let shijianchuo3 = null
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
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formattime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    console.log(time)
    this.setData({
      time: time,
      time1: time
    });

    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var date = util.formatdate(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    console.log(date)
    this.setData({
      date: date,
      date1: date
    });
    let datetime3 = date + ' ' + time
    var dates3 = new Date(datetime3)
    shijianchuo3 = dates3.getTime()
    this.getMeeting()
  },
  shuaxin() {
    this.getMeeting2()
  },
  getMeeting() {
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.cloud.database().collection('meeting')
      .where(
        _.and(
          [{
            isyuyue: true
          }, {
            q_time: _.gt(shijianchuo3)
          }]
        )
      )
      .skip(this.data.meeting.length)
      .get()
      .then(res => {
        wx.hideLoading()
        console.log('请求成功 hahaha', res)
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
  getMeeting2() {
    wx.showLoading({
      title: '数据加载中...',
    })
    console.log(shijianchuo3)
    wx.cloud.database().collection('meeting')
      .where(
        _.and(
          [{
            isyuyue: true
          },
           {
            q_time: _.gt(shijianchuo3)
          }
        ]
        )
      )
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
          meeting: [],
          meeting: res.data
        })
      })
      .catch(res => {
        wx.hideLoading()
        console.log('请求失败', res)
      })
  },
  getDetail(e) {
    console.log('测试', e.currentTarget.dataset._id)
    wx.navigateTo({
      url: '/pages/meeting-1/meeting-1?id=' + e.currentTarget.dataset._id,
    })
  },
  getDetail2(e) {
    wx.navigateTo({
      url: '/pages/meeting-2/meeting-2?_id=' + e.currentTarget.dataset._id +
        '&time1=' + e.currentTarget.dataset.time1 + '&time2=' + e.currentTarget.dataset.time2,
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