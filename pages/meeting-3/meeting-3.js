const util = require('../../utils/util.js')
let shijianchuo3 = null
let shijianchuo0 = null
let shijianchuo1 = null
let shijianchuo2 = null
let shijianchuo1_1 = null
let shijianchuo2_2 = null
let _id = null
let u_id = null
let shujugengxin = null
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isYuyue: false,
    detail: [],
    date: '2016-09-01',
    time: '12:01',
    date1: '2016-09-01',
    time1: '12:01',
    customItem: '全部',
    Time: null,
    Time2: null,
    meeting_List: [],
    yuYueJiLu: [1, 2, 3]
  },
  shuaxin() {
    wx.cloud.database().collection('meeting-1')
      .doc(_id)
      .get()
      .then(res => {
        console.log('获取成功', res)
        this.setData({
          detail: res.data.yuyue
        })
      })
      .catch(res => {
        console.log('获取失败', res)
      })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    _id = options._id
    u_id = options.u_id
    shijianchuo1 = options.time1
    shijianchuo2 = options.time2
    shijianchuo1_1 = options.time1
    shijianchuo2_2 = options.time2
    let that = this


    this.getYuYueJiLu()
    wx.cloud.database().collection('meeting-1')
      .doc(options._id)
      .get()
      .then(res => {
        console.log('获取成功', res.data.yuyue)
        this.setData({
          detail: res.data.yuyue,
          meeting_List: res.data.yuyue
        })
      })
      .catch(res => {
        console.log('获取失败', res)
      })



    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formattime(new Date());

    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var date = util.formatdate(new Date());

    let datetime3 = date + ' ' + time
    let datetime0 = date + ' ' + '06:00'
    var dates3 = new Date(datetime3)
    shijianchuo3 = dates3.getTime()
    var dates0 = new Date(datetime0)
    shijianchuo0 = dates0.getTime()
    this.shujuguoqishanchu()
  },
  shujuguoqishanchu() {
    let that = this
    if (this.data.detail == null || this.data.detail.length <= 0) {
      this.setData({
        detail: []
      })
    } else {
      for (var i = 0; i < that.data.detail.length; i++) {
        if (that.data.detail[i].z_time < shijianchuo0) {
          if (that.data.detail.length == 1) {
            that.setData({
              detail: []
            })
          }
          if (that.data.detail.length > 1) {
            that.data.detail.splice(i, 1)
          }
        }
      }
    }
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value + ':00'
    })
  },
  bindDateChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date1: e.detail.value
    })
  },
  bindTimeChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time1: e.detail.value + ':00'
    })
  },
  wancheng() {
    let that = this
    let datetime1 = this.data.date + ' ' + this.data.time
    var dates1 = new Date(datetime1)
    let datetime2 = this.data.date1 + ' ' + this.data.time1
    var dates2 = new Date(datetime2)
    shijianchuo1 = dates1.getTime()
    shijianchuo2 = dates2.getTime()
    console.log(shijianchuo1, shijianchuo2, shijianchuo3)
    if ((shijianchuo2 - shijianchuo1) >= 20 * 60 * 60 * 1000) {
      wx.showToast({
        title: '会议时长不能超过一天',
        icon: 'none'
      })
      return
    }
    if ((shijianchuo2 - shijianchuo0) > ((24 * 6 + 18) * 3600 * 1000)) {
      wx.showToast({
        title: '只能提前一周预约',
        icon: 'none'
      })
      return
    }
    if (shijianchuo1 >= shijianchuo2) {
      wx.showToast({
        title: '会议开始时间不能迟于结束时间',
        icon: 'none'
      })
    } else if (shijianchuo2 <= shijianchuo3 || shijianchuo1 <= shijianchuo3) {
      wx.showToast({
        title: '会议开始时间不能早于当前时间',
        icon: 'none'
      })
    } else {
      this.shanchuyuyue()
      let juJIn = 0
      let hours = 3600000
      juJIn = (shijianchuo1 - shijianchuo0) / hours
      console.log(juJIn)
      console.log('查看时间', shijianchuo1)
      wx.cloud.database().collection('meeting-1')
        .doc(_id)
        .get()
        .then(res => {
          console.log('获取成功', res)
          that.setData({
            detail: res.data.yuyue
          })
          if (that.data.detail == null || that.data.detail.length <= 0) {
            that.setData({
              detail: []
            })
          }
          let detail = this.data.detail
          let detail2 = [{
            u_id: u_id,
            q_time: shijianchuo1,
            z_time: shijianchuo2
          }]
          shujugengxin = detail.concat(detail2)
          console.log(shujugengxin)
          if (detail == []) {
            this.updateYuyue()
          } else {
            let time_yanchi = 1200000
            for (var i = 0; i < detail.length; i++) {
              console.log('这个非常重要', detail[i])
              if ((shijianchuo1 > (detail[i].q_time - time_yanchi) && shijianchuo1 < (detail[i].z_time + time_yanchi)) || (shijianchuo2 > (detail[i].q_time - time_yanchi) && shijianchuo2 < (detail[i].z_time + time_yanchi))) {
                wx.showToast({
                  title: '与其他会议重叠',
                  icon: 'error'
                })
                return
              }
            }
            this.updateYuyue()
          }

        })
        .catch(res => {
          console.log('获取失败', res)
        })
    }
  },

  updateYuyue() {
    wx.cloud.database().collection('meeting-1')
      .doc(_id)
      .update({
        data: {
          yuyue: shujugengxin
        }
      })
      .then(res => {
        console.log('修改成功,lalala', res)
        this.baocunyuyuejilu()
        wx.showToast({
          title: '修改成功',
          icon: 'success'
        })
        app.globalData.is_wodeyuYue_change = true
        this.setData({
          isYuyue: true
        })
      })
      .catch(res => {
        console.log('修改失败', res)
      })
  },

  baocunyuyuejilu() {
    // 将原来的记录设置为无效
    let yuyue_liust = this.data.yuYueJiLu
    for (var i = yuyue_liust.length - 1; i >= 0; i--) {
      if (yuyue_liust[i].q_time == shijianchuo1_1 && yuyue_liust[i].z_time == shijianchuo2_2 && yuyue_liust[i].isZuofei == false) {
        yuyue_liust[i].isZuofei = true
      }
      break
    }
    this.setData({
      yuYueJiLu: yuyue_liust
    })
    this.xiugaigerenjilu()
    // 保存预约记录
    let that = this
    let jilu_detail = null
    let jilu_detail2 = [{
      m_id: _id,
      q_time: shijianchuo1,
      z_time: shijianchuo2,
      isZuofei: false
    }]
    wx.cloud.database().collection('users')
      .doc(u_id)
      .get()
      .then(res => {
        console.log('获取成功', res)
        jilu_detail = res.data.yuyuejilu
        if (jilu_detail == null || jilu_detail <= 0) {
          jilu_detail = []
        }
        jilu_detail = jilu_detail.concat(jilu_detail2)
        this.baocunyuyuejilu_update(jilu_detail)
      })
      .catch(res => {
        console.log('获取失败', res)
      })
  },
  baocunyuyuejilu_update(jilu_detail2) {
    wx.cloud.database().collection('users')
      .doc(u_id)
      .update({
        data: {
          yuyuejilu: jilu_detail2
        }
      })
      .then(res => {
        console.log('更新成功', res)
      })
      .catch(res => {
        console.log('更新失败', res)
      })
  },
  // 修改个人预约记录
  xiugaigerenjilu() {
    wx.cloud.database().collection('users')
      .doc(u_id)
      .update({
        data: {
          yuyuejilu: this.data.yuYueJiLu
        }
      })
      .then(res => {
        console.log('修改成功', res)
      })
      .catch(res => {
        console.log('修改失败', res)
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      date: this.format1(parseInt(shijianchuo1)),
      time: this.format2(parseInt(shijianchuo1)),
      date1: this.format1(parseInt(shijianchuo2)),
      time1: this.format2(parseInt(shijianchuo2)),
    })
    this.shuaxin()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      date: this.format1(parseInt(shijianchuo1)),
      time: this.format2(parseInt(shijianchuo1)),
      date1: this.format1(parseInt(shijianchuo2)),
      time1: this.format2(parseInt(shijianchuo2)),
    })
    this.shuaxin()
  },
  add0(m) {
    return m < 10 ? '0' + m : m
  },
  format1(shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '/' + this.add0(m) + '/' + this.add0(d);
  },
  format2(shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return this.add0(h) + ':' + this.add0(mm);
  },
  shanchuyuyue() {
    let that = this
    let new_list = that.data.meeting_List
    for (var i = 0; i < new_list.length; i++) {
      console.log(new_list[i])
      if (new_list[i].q_time == shijianchuo1_1 && new_list[i].z_time == shijianchuo2_2 && new_list[i].u_id == u_id) {
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
      })
      .catch(res => {
        console.log('修改失败', res)
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