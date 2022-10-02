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
    isGuanli: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  xiugaiquanxian() {
    if (this.data.isGuanli) {
      this.setData({
        isGuanli: false
      })
      return
    }
    if (!this.data.isGuanli) {
      this.setData({
        isGuanli: true
      })
      return
    }
  },
  onLoad: function (options) {
    wx.cloud.database().collection('users_d')
    .where({
      pass_shenhe: false
    })
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
    wx.cloud.database().collection('users_d')
      .doc(e.currentTarget.dataset._id)
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
  // 通过审核
  tongguoshenhe() {
    let that = this
    wx.cloud.database().collection('users')
      .add({
        data: {
          name: this.data.detail.name,
          zhanghao: this.data.detail.zhanghao,
          mima: this.data.detail.mima,
          college: this.data.detail.college,
          class: this.data.detail.class,
          zhuanye: this.data.detail.zhuanye,
          xueHao: this.data.detail.xueHao,
          name_main: this.data.detail.name_main,
          tou_image: this.data.detail.tou_image,
          pass_shenhe : true,
          quanxian: this.data.isGuanli,
          
        }
      })
      .then(res => {
        console.log('添加成功', res)
        wx.cloud.database().collection('users_d')
          .doc(id)
          .update({
            data:{
              pass_shenhe : true,
              shenhe: true
            }
          })
          .then(res => {
            console.log('更新成功', res)
          })
          .catch(res => {
            console.log('更新失败', res)
          })
          wx.showToast({
            title: '审核为通过', 
            icon: 'success'
          })
          that.setData({
            isDetail: false
          })
          that.onLoad()
          that.onShow()
          that.onLoad()
      })
      .catch(res => {
        console.log('添加失败', res)
      })
  },
  // 不通过审核
  tongguoshenhe2() {
    let that = this
    wx.cloud.database().collection('users_d')
      .doc(id)
      .update({
        data:{
          pass_shenhe : false,
          shenhe: true
        }
      })
      .then(res => {
        console.log('更新成功', res)
        wx.showToast({
          title: '审核为不通过', 
          icon: 'success'
        })
        that.setData({
          isDetail: false
        })
        that.onLoad()
      })
      .catch(res => {
        console.log('更新失败', res)
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