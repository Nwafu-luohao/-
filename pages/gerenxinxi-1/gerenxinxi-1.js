// pages2/yonghushenghe/yonghushenghe.js
let id = ''
let name1 = ''
let zhanghao = ''
let name_main = ''
let xueHao = ''
let college = ''
let zhuanye = ''
let banji = ''
let mima = ''
let app = getApp()
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
  getname(e) {
    name1 = e.detail.value

  },
  getzhanghao(e) {
    zhanghao = e.detail.value
  },
  getname_main(e) {
    name_main = e.detail.value
  },
  getxueHao(e) {
    xueHao = e.detail.value
  },
  getcollege(e) {
    college = e.detail.value
  },
  getzhuanye(e) {
    zhuanye = e.detail.value
  },
  getclass(e) {
    banji = e.detail.value
  },
  getmima(e) {
    mima = e.detail.value
  },

  baocunxiugai() {
    if (name1 == '') {
      name1 = this.data.detail.name
    }
    if (zhanghao == '') {
      zhanghao = this.data.detail.zhanghao
    }
    if (name_main == '') {
      name_main = this.data.detail.name_main
    }
    if (xueHao == '') {
      xueHao = this.data.detail.xueHao
    }
    if (college == '') {
      college = this.data.detail.college
    }
    if (zhuanye == '') {
      zhuanye = this.data.detail.zhuanye
    }
    if (banji == '') {
      banji = this.data.detail.class
    }
    if (mima == '') {
      mima = this.data.detail.mima
    }
    console.log(name1.length)
    // 校验用户名
    if (name1.length < 2) {
      wx.showToast({
        title: '姓名至少2位',
        icon: 'none'
      })
      return
    }
    if (name1.length > 20) {
      wx.showToast({
        title: '姓名最多20位',
        icon: 'none'
      })
      return
    }
    // 校验账号
    if (zhanghao.length < 11) {
      wx.showToast({
        title: '账号至少11位',
        icon: 'none'
      })
      return
    }
    // 校验密码
    if (mima.length < 6) {
      wx.showToast({
        title: '密码至少6位',
        icon: 'none'
      })
      return
    }
    if (mima.length > 40) {
      wx.showToast({
        title: '密码最多40位',
        icon: 'none'
      })
      return
    }
    // lalala
    if (xueHao.length < 10) {
      wx.showToast({
        title: '学号（职工号）至少10位',
        icon: 'none'
      })
      return
    }
    if (banji.length < 4) {
      wx.showToast({
        title: '班级输入不合法',
        icon: 'none'
      })
      return
    }
    if (college.length < 2) {
      wx.showToast({
        title: '学院输入不合法',
        icon: 'none'
      })
      return
    }
    if (zhuanye.length < 2) {
      wx.showToast({
        title: '专业输入不合法',
        icon: 'none'
      })
      return
    }

    // 高级校验，核对唯一性
    wx.cloud.database().collection('users_d', 'users')
      .where({
        zhanghao: zhanghao
      })
      .get()
      .then(res => {
        console.log('账号已存在', res)
        if (res.data.length > 1) {
          wx.showToast({
            title: '账号已存在',
            icon: 'error'
          })
          return
        }
        if (res.data.length >= 1 && this.data.detail.zhanghao != zhanghao) {
          wx.showToast({
            title: '账号已存在',
            icon: 'error'
          })
          return
        } else {
          wx.cloud.database().collection('users')
            .doc(id)
            .update({
              data: {
                zhanghao: zhanghao,
                name: name1,
                name_main: name_main,
                mima: mima,
                xueHao: xueHao,
                college: college,
                zhuanye: zhuanye,
                class: banji
              }
            })
            .then(res => {
              console.log('修改成功', res)
              wx.showToast({
                title: '修改成功',
                icon: 'success'
              })
              app.globalData.is_gerenxinxi_change == true
              let name1 = ''
              zhanghao = ''
              name_main = ''
              xueHao = ''
              college = ''
              zhuanye = ''
              banji = ''
              mima = ''
            })
            .catch(res => {
              console.log('修改失败', res)
            })
        }
      })
      .catch(res => [
        console.log('账号不存在', res)
      ])
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