let _id = null
let u_id = null
let shijianchuo1 = null
let shijianchuo2 = null
let shijianchuo1_n = null
let shijianchuo2_n = null
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShanchu: false,
    shijianchuo1: 0,
    shijianchuo2: 0,
    isbenren: false,
    detail: {},
    meeting_List: [],
    User_name: '',
    time11: null,
    time22: null,
    yuYueJiLu: [1,2,3]
  },


  getLocalTime(nS) {
    return new Date(nS).toLocaleString().replace(/:\d{1,2}$/, ' ');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.isbenren == 1) {
      this.setData({
        isbenren: true
      })
    }
    this.setData({
      shijianchuo1: options.time1,
      shijianchuo2: options.time2
    })
    _id = options._id
    u_id = options.u_id
    shijianchuo1 = options.time1
    shijianchuo2 = options.time2
    this.getYuYueJiLu()
    this.getDetail()
    this.getUser_name()
  },
  getYuYueJiLu() {
    wx.cloud.database().collection('users')
      .doc(u_id)
      .get()
      .then(res => {
        console.log('预约记录 获取成功', res)
        this.setData({
          yuYueJiLu: res.data.yuyuejilu
        })
      })
      .catch(res => {
        console.log('获取失败', res)
      })
  },
  getDetail() {
    wx.cloud.database().collection('meeting-1')
      .doc(_id)
      .get()
      .then(res => {
        console.log('获取成功', res)
        this.setData({
          detail: res.data,
          meeting_List: res.data.yuyue
        })
      })
      .catch(res => {
        console.log('获取失败', res)
      })
  },
  getUser_name() {
    wx.cloud.database().collection('users')
      .doc(u_id)
      .get()
      .then(res => {
        console.log('获取成功', res)
        this.setData({
          User_name: res.data.name_main
        })
      })
      .catch(res => {
        console.log('获取失败', res)
      })
  },
  xiugaiyuyue(e) {
    if (this.data.isShanchu){
      wx.showToast({
        title: '您已删除预约',
        icon:'error'
      })
      return
    }
    console.log('点击了修改预约', e)
    wx.navigateTo({
      url: '/pages/meeting-3/meeting-3?_id=' + _id + '&u_id=' + u_id + '&time1=' + shijianchuo1 + '&time2=' + shijianchuo2,
    })
  },
  shanchuyuyue() {
    if (this.data.isShanchu){
      wx.showToast({
        title: '不要重复删除',
        icon:'error'
      })
      return
    }
    let that = this;
    wx.showModal({
      title: "是否决定删除",
      content: '您再仔细想一想，是否真的要删除预约',
      success(res) {
        if (res.confirm == true) {
          let new_list = that.data.meeting_List
          let yuyue_liust = that.data.yuYueJiLu
          for (var i = yuyue_liust.length-1; i >= 0; i--) {
            if (yuyue_liust[i].q_time == shijianchuo1 && yuyue_liust[i].z_time == shijianchuo2 && yuyue_liust[i].isZuofei == false) {
              yuyue_liust[i].isZuofei = true
            }
            break
          }
          that.setData({
            yuYueJiLu: yuyue_liust
          })
          for (var i = 0; i < new_list.length; i++) {
            console.log(new_list[i])
            if (new_list[i].q_time == shijianchuo1 && new_list[i].z_time == shijianchuo2 && new_list[i].u_id == u_id) {
              new_list.splice(i, 1)
            }
          }
          that.setData({
            meeting_List: new_list
          })
          wx.cloud.database().collection('meeting-1')
            .doc(_id)
            .update({
              data: {
                yuyue: that.data.meeting_List
              }
            })
            .then(res => {
              console.log('修改成功', res)
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              })
              app.globalData.is_wodeyuYue_change = true
              that.setData({
                isShanchu: true,
                User_name: '------',
                time11: '----------',
                time22: '----------'
              })
            })
            .catch(res => {
              console.log('修改失败', res)
            })
            // 修改个人预约记录
            wx.cloud.database().collection('users')
            .doc(u_id)
            .update({
              data:{
                yuyuejilu: that.data.yuYueJiLu
              }
            })
            .then(res =>{
              console.log('修改成功', res)
            })
            .catch(res =>{
              console.log('修改失败', res)
            })
        } else if (res.cancel == true) {
          console.log("用户点击了取消")
          return
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      time11: this.format(parseInt(shijianchuo1)),
      time22: this.format(parseInt(shijianchuo2)),
    })
  },
  add0(m) {
    return m < 10 ? '0' + m : m
  },
  format(shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '年' + this.add0(m) + '月' + this.add0(d) + '日 ' + this.add0(h) + ':' + this.add0(mm);
    //  + ':' + this.add0(s);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      time11: this.format(parseInt(shijianchuo1)),
      time22: this.format(parseInt(shijianchuo2)),
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
    var app = getApp()
    app.globalData.isSuo = false
    this.setData({
      isShanchu: false
    })
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