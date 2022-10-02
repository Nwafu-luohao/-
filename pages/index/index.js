Page({
  data: {
    name: '',
    zhanghao: '',
    mima: '',
    banji: '',
    zhuanye: '',
    college: '',
    xuehao: '',
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false
  },
  // 获取用户名
  getName(e) {
    console.log('用户名', e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  // 获取用户账号
  getZhanghao(e) {
    console.log('账号', e.detail.value)
    this.setData({
      zhanghao: e.detail.value
    })
  },
  // 获取密码
  getMima(e) {
    console.log('密码', e.detail.value)
    this.setData({
      mima: e.detail.value
    })
  },
  getbanji(e) {
    console.log('密码', e.detail.value)
    this.setData({
      banji: e.detail.value
    })
  },
  getzhuanye(e) {
    console.log('密码', e.detail.value)
    this.setData({
      zhuanye: e.detail.value
    })
  },
  getcollege(e) {
    console.log('密码', e.detail.value)
    this.setData({
      college: e.detail.value
    })
  },
  getxuehao(e) {
    console.log('密码', e.detail.value)
    this.setData({
      xuehao: e.detail.value
    })
  },
  zhuCe() {
    let name = this.data.name
    let zhanghao = this.data.zhanghao
    let mima = this.data.mima
    let xuehao = this.data.xuehao
    let college = this.data.college
    let zhuanye = this.data.zhuanye
    let banji = this.data.banji
    // 校验用户名
    if (name.length < 2) {
      wx.showToast({
        title: '姓名至少2位',
        icon: 'none'
      })
      return
    }
    if (name.length > 20) {
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
    if (xuehao.length < 10) {
      wx.showToast({
        title: '学号（职工号）至少10位',
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
    if (banji.length < 4) {
      wx.showToast({
        title: '班级输入不合法',
        icon: 'none'
      })
      return
    }
    // 高级校验，核对唯一性
    wx.cloud.database().collection('users_d','users')
      .where({
        zhanghao: zhanghao
      })
      .get()
      .then(res => {
        console.log('账号已存在', res)
        if (res.data.length > 0) {
          wx.showToast({
            title: '不要重复注册',
            icon: 'error'
          })
          return
        } else {
          // 注册功能的实现
          wx.cloud.database().collection('users_d')
            .add({
              data: {
                tou_image: this.data.userInfo.avatarUrl,
                name: this.data.userInfo.nickName,
                name_main: name,
                zhanghao: zhanghao,
                mima: mima,
                college: college,
                xueHao: xuehao,
                class: banji,
                zhuanye: zhuanye,
                pass_shenhe: false,
                shenhe: false
              }
            })
            .then(res => {
              console.log('提交审核成功', res)
              wx.showToast({
                title: '已成功提交审核',
                icon: 'success'
              })
              wx.setStorageSync('user', {
                tou_image: this.data.userInfo.avatarUrl,
                name: this.data.userInfo.nickName,
                name_main: name,
                zhanghao: zhanghao,
                mima: mima,
                college: college,
                xueHao: xuehao,
                class: banji,
                zhuanye: zhuanye
              })
              console.log('注册信息保存成功')
            })
            .catch(res => {
              console.log('提交审核失败', res)
            })
        }
      })
      .catch(res => {
        console.log('账号不存在', res)
      })
  },
  onLoad: function (options) {
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          that.setData({
            canIUse: true
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
})