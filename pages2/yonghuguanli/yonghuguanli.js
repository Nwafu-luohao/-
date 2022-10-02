// pages2/yonghushenghe/yonghushenghe.js
let id = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    detail: {},
    id: '',
    isDetail: false,
    isGuanli: false,
    zhanghao: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.database().collection('users')
      .get()
      .then(res => {
        console.log('获取成功', res)
        this.setData({
          listData: res.data
        })
      })
      .catch(res => {
        console.log('获取失败', res)
      })
  },
  getDetial(e) {
    id = e.currentTarget.dataset._id
    console.log(e.currentTarget.dataset._id)
    wx.cloud.database().collection('users')
      .doc(e.currentTarget.dataset._id)
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
  fanhuiliebiao() {
    this.setData({
      isDetail: false
    })
    this.onLoad()
  },
  shanchuyonghu() {
    let that = this
    wx.cloud.database().collection('users')
      .doc(id)
      .remove()
      .then(res => {
        wx.showToast({
          title: '删除成功',
          icon: 'success'
        })
        console.log('删除成功haha', res)
        that.setData({
          isDetail: false
        })
        that.onLoad()
      })
      .catch(res => {
        console.log('删除失败', res)
      })

      wx.cloud.database().collection('users_d')
        .where({
          zhanghao: this.zhanghao
        })
        .remove()
        .catch(res =>{
          console.log('dada', res)
        })
  },
  xiugaixinxi(){
wx.navigateTo({
  url: '/pages2/yonghuguanli-1/yonghuguanli-1?_id=' + id,
})
  },
  onReady: function () {
    this.onLoad()
    this.setData({
      isDetail: false
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
    this.setData({
      isDetail: false
    })
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