// pages2/huiyishiguanli-1/huiyishiguanli-1.js
let id = ''
let u_id = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jvli: 0,
    zhuangtai: false,
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options._id)
    id = options._id
    u_id = options.u_id
    this.setData({
      jvli: options.jvli
    })
    if(options.zhuangtai == 'true'){
      this.setData({
        zhuangtai: true
      })
    }
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

  shoucanghuiyishi(e){
    console.log(e.currentTarget.dataset._id)
    wx.cloud.database().collection('users')
    .doc(u_id)
    .get()
    .then(res => {
      console.log('获取成功', res)
    })
    .catch(res => {
      console.log('获取失败', res)
    })
  },

  xiugaiyuyuexinxi(e){
    wx.navigateTo({
      url: '/pages2/biaoge/biaoge?_id=' + e.currentTarget.dataset._id + '&u_id=' + u_id,
    })
  },

  chakantianqiqingkuang(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages2/huiyitianqi/huiyitianqi?num=' + e.currentTarget.dataset.num,
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