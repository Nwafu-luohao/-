const order = ['1', '2', '3']
let shijianchuo3 = null
const util = require('../../utils/util.js')
let u_id = null
let jinxingZhong = false
let app = getApp()
let yuYuelan = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quanxian_img_1: 'https://7869-xiaochengxu-7g0sacbi501960c0-1309579270.tcb.qcloud.la/%E6%9D%83%E9%99%90%E5%9B%BE%E6%A0%87/%E5%A4%B4%E8%A1%94_%E9%80%9A%E7%94%A8%E6%88%B7.png?sign=d51627ef0e1e2bf5b585e60d94649e12&t=1648535228',
    quanxian_img_2: 'https://7869-xiaochengxu-7g0sacbi501960c0-1309579270.tcb.qcloud.la/%E6%9D%83%E9%99%90%E5%9B%BE%E6%A0%87/%E5%A4%B4%E8%A1%94_%E7%AE%A1%E7%90%86%E5%91%98.png?sign=0eb7d448e6643e0fc42b5521e0b058e4&t=1648535246',
    isGuanli: false,
    toView: 'green',
    loginOK: true,
    _id: '',
    detail: {},
    yuyue_ceshi: [],
    yuYuelan_1: [],
    isHave: true,
    num_shuaxin: 0
  },
  geRenxinxi() {
    wx.navigateTo({
      url: '/pages/gerenxinxi/gerenxinxi?_id=' + this.data._id,
    })
  },
  onShareAppMessage() {
    return {
      title: 'scroll-view',
      path: 'page/component/pages/scroll-view/scroll-view'
    }
  },



  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },

  tap() {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },

  tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  // 退出登录
  tuichu() {
    let that = this
    wx.showModal({
      title: "是否决定退出登录",
      content: '您再仔细想一想，是否真的要退出登录',
      success(res) {
        if (res.confirm == true) {
          console.log('用户点击了确定')
          wx.setStorageSync('user', null)
          let user = wx.getStorageSync('user')
          console.log('haha')
          if (user && user.name) {
            that.setData({
              loginOK: true,
              name: user.name
            })
          } else {
            that.setData({
              loginOK: false
            })
            app.globalData.user_id = null
          }
          if (!that.data.loginOK) {
            wx.redirectTo({
              url: '/pages/me/me',
            })
          }
        } else if (res.cancel == true) {
          console.log("用户点击了取消")
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setInterval(() => {
      this.data.num_shuaxin += 1
     
      this.setData({
     
        num_shuaxin:this.data.num_shuaxin
     
      })
      if (this.data.num_shuaxin == 10){
        this.data.num_shuaxin = 0
        this.onShow()
      }
     
     },1000)
    console.log(app)
    if (jinxingZhong) {
      return
    }
    jinxingZhong = true
    // 获取当时的时间
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formattime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    console.log(time)
    this.setData({
      time: time,
    });

    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var date = util.formatdate(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    console.log(date)
    this.setData({
      date: date,
    });
    let datetime3 = date + ' ' + time
    var dates3 = new Date(datetime3)
    shijianchuo3 = dates3.getTime()

    let that = this
    this.get_Onload()

  },
  get_Onload() {
    let that = this
    wx.getStorage({
      key: 'user',
      success(res) {
        console.log('cao', res.data._id)
        u_id = res.data._id
        that.yuyue_Ceshi()
        that.setData({
          _id: res.data._id
        })
        wx.cloud.database().collection('users')
          .doc(res.data._id)
          .get()
          .then(res => {
            console.log('头像获取成功', res)
            that.setData({
              detail: res.data
            })
            if (res.data.quanxian == true) {
              that.setData({
                isGuanli: true
              })
            }
          })
          .catch(res => {
            console.log('头像获取失败', res)
          })


      }

    })
  },
  yuyue_Ceshi() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.database().collection('users')
      .doc(app.globalData.user_id)
      .get()
      .then(res => {
        console.log('获取成功', res)
        this.setData({
          yuyue_ceshi: res.data.yuyuejilu
        })
        if (this.data.yuyue_ceshi == undefined || this.data.yuyue_ceshi == null || this.data.yuyue_ceshi.length == 0) {
          this.data.isHave = false
        }
        // console.log('快说', this.data.isHave, this.data.yuyue_ceshi.length)
        this.yuyue_Ceshi_2()
      })
      .catch(res => {
        console.log('获取失败le', res)
      })
  },
  yuyue_Ceshi_2() {
    let that = this
    if (this.data.yuyue_ceshi == null || this.data.yuyue_ceshi.length == 0) {
      this.setData({
        yuyue_ceshi: [],
        isHave: false
      })
    }
    let new_list = this.data.yuyue_ceshi
    for (var i = 0; i < new_list.length; i++) {
      if (new_list[i].isZuofei || new_list[i].z_time < shijianchuo3) {
        console.log('删除了')
        let s = new_list.splice(i, 1)
        console.log(s)
      }
    }
    for (var i = 0; i < new_list.length; i++) {
      if (new_list[i].isZuofei || new_list[i].z_time < shijianchuo3) {
        console.log('删除了')
        let s = new_list.splice(i, 1)
        console.log(s)
      }
    }
    for (var i = 0; i < new_list.length; i++) {
      if (new_list[i].isZuofei || new_list[i].z_time < shijianchuo3) {
        console.log('删除了')
        let s = new_list.splice(i, 1)
        console.log(s)
      }
    }
    for (var i = 0; i < new_list.length; i++) {
      if (new_list[i].z_time < shijianchuo3) {
        console.log('删除了')
        let s = new_list.splice(i, 1)
        console.log(s)
      }
    }
    for (var i = 0; i < new_list.length; i++) {
      if (new_list[i].isZuofei) {
        console.log('删除了')
        let s = new_list.splice(i, 1)
        console.log(s)
      }
    }
    console.log('还是完整的', new_list)
    if (new_list.length <= 0) {
      that.setData({
        isHave: false
      })
    }
    for (var i = 0; i < new_list.length; i++) {
      if (new_list[i].z_time > shijianchuo3 && new_list[i].q_time < shijianchuo3) {
        console.log('看一看', 'new_list.q_time', new_list.q_time, 'new_list.q_time', new_list.q_time, 'shijianchuo3', shijianchuo3)
        new_list[i].isZuofei = true;
        console.log('测试了吗')
      }
      console.log('测试了')
      let i1 = i
      let length = new_list.length - 1
      let id = new_list[i].m_id
      let zhuangtai = new_list[i].isZuofei
      let q_time = new_list[i].q_time
      let z_time = new_list[i].z_time
      wx.cloud.database().collection('meeting-1')
        .doc(new_list[i].m_id)
        .get()
        .then(res => {
          console.log('获取成功', res)
          var danxiang = {
            "zhuangtai": zhuangtai,
            "image": res.data.meeting_img,
            "_id": id,
            "q_time" : q_time,
            "z_time" : z_time
          }
          yuYuelan.push(danxiang)
          console.log(yuYuelan)
          that.setData({
            yuYuelan_1: yuYuelan
          })
          console.log('腾讯是垃圾',this.data.yuYuelan_1)
          console.log('快给我出', that.data.yuYuelan_1.length)
          if (that.data.yuYuelan_1.length <= 0) {
            that.setData({
              isHave: false
            })
          } else {
            that.setData({
              isHave: true
            })
          }

        })
        .catch(res => {
          console.log('获取失败', res)
        })
    }

    jinxingZhong = false
    wx.hideLoading()
    wx.stopPullDownRefresh()
  },

  tiaozhuandaobiaoge(e) {
    console.log(e.currentTarget.dataset._id)
    wx.navigateTo({
      url: '/pages2/biaoge/biaoge?_id=' + e.currentTarget.dataset._id + '&u_id=' + app.globalData.user_id,
    })
  },

  wodeyuyue() {
    wx.navigateTo({
      url: '/pages/wodeyuyue/wodeyuyue?_id=' + this.data._id,
    })
  },
  yonghushenghe() {
    wx.navigateTo({
      url: '/pages2/yonghushenghe/yonghushenghe?_id=' + this.data._id,
    })
  },
  yonghuguanli() {
    wx.navigateTo({
      url: '/pages2/yonghuguanli/yonghuguanli?_id=' + this.data._id,
    })
  },
  huiyishiguanli() {
    wx.navigateTo({
      url: '/pages2/huiyishiguanli/huiyishiguanli?_id=' + this.data._id,
    })
  },
  wodeshoucang() {
    wx.navigateTo({
      url: '/pages2/wodeshoucang/wodeshoucang?_id=' + this.data._id,
    })
  },
  chakantousu() {
    wx.navigateTo({
      url: '/pages2/chakantousu/chakantousu?_id=' + this.data._id,
    })
  },
  lianxiguanliyuan() {
    wx.navigateTo({
      url: '/pages2/lianxiguanliyuan/lianxiguanliyuan?_id=' + this.data._id,
    })
  },
  tousujianyi() {
    wx.navigateTo({
      url: '/pages2/tousujianyi/tousujianyi?_id=' + this.data._id,
    })
  },
  yuyuezonglan() {
    wx.navigateTo({
      url: '/pages/wodeyuyue/wodeyuyue?_id=' + this.data._id,
    })
  },
  tianqi() {
    wx.navigateTo({
      url: '/pages/tianqi/tianqi',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 获取当时的时间
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formattime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    console.log(time)
    this.setData({
      time: time,
    });

    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var date = util.formatdate(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    console.log(date)
    this.setData({
      date: date,
    });
    let datetime3 = date + ' ' + time
    var dates3 = new Date(datetime3)
    var shijianchuo3_1 = shijianchuo3
    shijianchuo3 = dates3.getTime()
    if ((shijianchuo3-shijianchuo3_1)>(1000*1*60)){
      app.globalData.is_wodeyuYue_change = true
      jinxingZhong = false
    }
    let new_list = this.data.yuYuelan_1
    for(var i = 0; i < new_list.length; i++){
      if (new_list.z_time > shijianchuo3 && new_list.q_time < shijianchuo3) {
        console.log('看一看', 'new_list.q_time', new_list.q_time, 'new_list.q_time', new_list.q_time, 'shijianchuo3', shijianchuo3)
        new_list[i].zhuangtai = true;
        console.log('测试了吗')
      }
    }
    this.data.yuYuelan_1 = new_list
    this.setData({
      yuYuelan_1 : this.data.yuYuelan_1
    })
    let that = this
    wx.cloud.database().collection('users')
    .doc(app.globalData.user_id)
    .get()
    .then(res => {
      console.log('头像获取成功', res)
      that.setData({
        detail: res.data
      })
      if (res.data.quanxian == true) {
        that.setData({
          isGuanli: true
        })
      }
    })
    .catch(res => {
      console.log('头像获取失败', res)
    })
    if (app.globalData.is_wodeyuYue_change == true) {

      if (jinxingZhong) {
        return
      }
      yuYuelan = []
      this.setData({
        yuyue_ceshi: [],
        yuYuelan_1: []
      })
      jinxingZhong = true
      this.yuyue_Ceshi()
      jinxingZhong = false
      app.globalData.is_wodeyuYue_change = false
      app.globalData.is_gerenxinxi_change == false
    } else {
      wx.stopPullDownRefresh()
    }
    app.globalData.is_gerenxinxi_change == false
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取当时的时间
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formattime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    console.log(time)
    this.setData({
      time: time,
    });

    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var date = util.formatdate(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    console.log(date)
    this.setData({
      date: date,
    });
    let datetime3 = date + ' ' + time
    var dates3 = new Date(datetime3)
    var shijianchuo3_1 = shijianchuo3
    shijianchuo3 = dates3.getTime()
    if ((shijianchuo3-shijianchuo3_1)>(1000*1*60)){
      app.globalData.is_wodeyuYue_change = true
      jinxingZhong = false
    }
    let new_list = this.data.yuYuelan_1
    for(var i = 0; i < new_list.length; i++){
      if (new_list[i].z_time > shijianchuo3 && new_list[i].q_time < shijianchuo3) {
        console.log('看一看', 'new_list.q_time', new_list.q_time, 'new_list.q_time', new_list.q_time, 'shijianchuo3', shijianchuo3)
        new_list[i].zhuangtai = true;
        console.log('测试了吗')
      }
    }
    this.data.yuYuelan_1 = new_list
    this.setData({
      yuYuelan_1 : this.data.yuYuelan_1
    })
    let that = this
    wx.cloud.database().collection('users')
          .doc(app.globalData.user_id)
          .get()
          .then(res => {
            console.log('头像获取成功', res)
            that.setData({
              detail: res.data
            })
            if (res.data.quanxian == true) {
              that.setData({
                isGuanli: true
              })
            }
          })
          .catch(res => {
            console.log('头像获取失败', res)
          })
    if (app.globalData.is_wodeyuYue_change == true ) {
      if (jinxingZhong) {
        return
      }
      yuYuelan = []
      this.setData({
        yuyue_ceshi: [],
        yuYuelan_1: []
      })
      jinxingZhong = true
      this.yuyue_Ceshi()
      jinxingZhong = false
      app.globalData.is_wodeyuYue_change = false
      app.globalData.is_gerenxinxi_change == false
    } else {
      wx.stopPullDownRefresh()
    }
    app.globalData.is_gerenxinxi_change == false
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (app.globalData.is_wodeyuYue_change == false) {
      return
    }
    yuYuelan = []
    this.setData({
      yuyue_ceshi: [],
      yuYuelan_1: []
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (app.globalData.is_wodeyuYue_change == false) {
      return
    }
    yuYuelan = []
    this.setData({
      yuyue_ceshi: [],
      yuYuelan_1: []
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onReady()
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