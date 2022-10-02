// pages2/yonghushenghe/yonghushenghe.js
let id = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    id: '',
    isDetail: true,
    isGuanli: false,
    zhanghao: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options._id
    this.getDetial(id)
  },
  getDetial(e) {
    wx.cloud.database().collection('users')
      .doc(id)
      .get()
      .then(res => {
        console.log('获取成功', res)
        this.setData({
          detail: res.data,
          isGuanli: res.data.quanxian,
          zhanghao: res.data.zhanghao
        })
      })
      .catch(res => {
        console.log('获取失败', res)
      })
    this.setData({
      isDetail: true
    })
  },
  xiugaixinxi(){
    wx.navigateTo({
      url: '/pages/gerenxinxi-1/gerenxinxi-1?_id=' + id,
    })
  },

  onReady: function () {
    this.getDetial(id)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getDetial(id)
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