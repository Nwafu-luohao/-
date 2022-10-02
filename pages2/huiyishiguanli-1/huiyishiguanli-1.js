// pages2/huiyishiguanli-1/huiyishiguanli-1.js
let id = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options._id)
    id = options._id
    this.getDetail()
  },
  getDetail(){
    wx.cloud.database().collection('meeting-1')
    .doc(id)
    .get()
    .then(res => {
      console.log('获取成功', res)
      this.setData({
        detail: res.data
      })
    })
    .catch(res => {
      console.log('获取失败', res)
    })
  },

  xiugaiyuyuexinxi(){
    wx.navigateTo({
      url: '/pages2/biaoge/biaoge',
    })
  },
  shanchuhuiyishi(e){
    console.log(e.currentTarget.dataset._id)
    let that = this
    wx.showModal({
      title: "是否决定删除",
      content: '您再仔细想一想，删除后将清空该会议室所有信息',
      success(res) {
        if (res.confirm == true) {
          wx.showLoading({
            title: '删除中...',
          })
          console.log('用户点击了确定')
          wx.cloud.database().collection('meeting-1')
          .doc(e.currentTarget.dataset._id)
          .remove()
          .then(res => {
            console.log('删除成功', res)
            wx.hideLoading()
            wx.showToast({
              title: '删除成功',
              icon: 'success'
            })
          })
          .catch(res => {
            console.log('删除失败', res)
          })
        } else if (res.cancel == true) {
          console.log("用户点击了取消")
        }
      }
    })
  },
  xiugaixinxi(e){
    wx.navigateTo({
      url: '/pages2/huiyishiguanli-2/huiyishiguanli-2?_id=' + e.currentTarget.dataset._id,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getDetail()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getDetail()
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