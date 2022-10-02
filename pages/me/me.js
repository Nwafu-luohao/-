var app = getApp()
Page({
  data: {
    loginOK: false,
    zhanghao: '0',
    name: '',
    shenhezhaungtai: false,
    isZhuce: false,
    zhanghao1: '',
    mima: ''
  },
  onLoad() {
    let user  = wx.getStorageSync('user')
    console.log(user)
    this.setData({
      zhanghao: user.zhanghao
    })
    if(this.data.zhanghao == null)
    return
    wx.cloud.database().collection('users_d')
    .where({
      zhanghao: this.data.zhanghao
    })
    .get()
    .then(res =>{
      console.log('获取成功', res)
      if(res.data.length == 1){
        this.setData({
          isZhuce: true,
          shenhezhaungtai: res.data.pass_shenhe
        })
      }else{
        this.setData({
          isZhuce: false,
        })
      }
    })
    .catch(res =>{
      console.log('获取失败', res)
      this.setData({
        isZhuce: false
      })
    })
  },
  // 去注册页
  zhuce() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  chakanshenhe() {
    wx.navigateTo({
      url: '/pages/shenghe/shenghe?zhanghao=' + this.data.zhanghao,
    })
  },
  onShow() {
    let user = wx.getStorageSync('user')
    if (user && user.name && user.pass_shenhe) {
      this.setData({
        loginOK: true,
        name: user.name
      })
    } else {
      this.setData({
        loginOK: false
      })
    }
    if (this.data.loginOK) {
      wx.switchTab({
        url: '/pages/home/home',
      })
    }

    let user2 = wx.getStorageSync('user')
    this.setData({
      zhanghao: user2.zhanghao
    })
    if(this.data.zhanghao == null)
    return
    wx.cloud.database().collection('users_d')
    .where({
      zhanghao: this.data.zhanghao
    })
    .get()
    .then(res =>{
      console.log('获取成功', res)
      if(res.data.length == 1){
        this.setData({
          isZhuce: true,
          shenhezhaungtai: res.data.pass_shenhe
        })
      }else{
        this.setData({
          isZhuce: false,
        })
      }
    })
    .catch(res =>{
      console.log('获取失败', res)
      this.setData({
        isZhuce: false
      })
    })

  },
  onReady(){
    let user  = wx.getStorageSync('user')
    console.log('显示保存的信息',user)
    this.setData({
      zhanghao: user.zhanghao
    })
    if(this.data.zhanghao == null)
    return
    wx.cloud.database().collection('users_d')
    .where({
      zhanghao: this.data.zhanghao
    })
    .get()
    .then(res =>{
      console.log('获取成功', res)
      if(res.data.length == 1){
        this.setData({
          isZhuce: true,
          shenhezhaungtai: res.data.pass_shenhe
        })
      }else{
        this.setData({
          isZhuce: false,
        })
      }
    })
    .catch(res =>{
      console.log('获取失败', res)
      this.setData({
        isZhuce: false
      })
    })
  },
    // 获取账号
    getZhanghao(e){
      console.log('账号', e.detail.value)
      this.setData({
        zhanghao1: e.detail.value
      })
    },
    // 获取密码
    getMima(e){
      console.log('密码', e.detail.value)
      this.setData({
        mima: e.detail.value
      })
    },
    // 登录
    login(){
  console.log('点击了登录')
      let zhanghao1 = this.data.zhanghao1
      let name = this.data.name
      let mima = this.data.mima
      // 校验账号
      if (zhanghao1.length < 4){
        wx.showToast({
          title: '账号至少11位',
          icon: 'none'
        })
        return
      }
      if (zhanghao1.length > 30){
        wx.showToast({
          title: '账号最多30位',
          icon: 'none'
        })
        return
      }
      // 校验密码
      if (mima.length < 6){
        wx.showToast({
          title: '密码至少6位',
          icon: 'none'
        })
        return
      }
      if (mima.length > 40){
        wx.showToast({
          title: '密码最多40位',
          icon: 'none'
        })
        return
      }
      // 登录校验
      wx.cloud.database().collection('users')
      .where({
        zhanghao: zhanghao1
      })
      .get()
      .then(res => {
        console.log('获取数据成功',res)
        let user = res.data[0]
        if(user==null){
          wx.showToast({
            title: '输入有效账号',
            icon: 'error'
          })
          return 
        }
        if (mima == user.mima){
          console.log('登录成功')
          name = user.name
          wx.showToast({
            title: '登录成功',
          })
          // wx.navigateTo({
          //   url: '/pages/home/home?_zhanghao1=' + zhanghao1 +'&name=' + name,
          // })
          wx.switchTab({
            url: '/pages/home/home',
          })
          // 保存用户登录状态
          wx.setStorageSync('user', null)
          wx.setStorageSync('user', user)
        }
        else{
          wx.showToast({
            title: '输入正确的密码',
            icon: 'error'
          })
        }
      })
      .catch(res => {
        console.log('获取数据失败', res)
      })
    }
})