let _id = null
let u_id = null
const util = require('../../utils/util.js')
let shijianchuo3 = null
let shijianchuo0 = null
let shijianchuo1 = null
let shijianchuo2 = null
let shujubiao = []
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekList: [],
    time: '',
    date: '',
    iskongbai: false,
    istuxing: false,
    isSuo: true,
    meeting_List: [],
    wlist: []
  },

  getDetail(e) {
    app.globalData.isSuo = true
    console.log('点击了图像', e)
    wx.navigateTo({
      url: '/pages/meeting-2/meeting-2?_id=' + _id + '&u_id=' + e.currentTarget.dataset.user_id + '&time1=' + e.currentTarget.dataset.shijianchuo1 + '&time2=' + e.currentTarget.dataset.shijianchuo2+ '&isbenren=' + e.currentTarget.dataset.isbenren,
    })
  },
  toYueyue() {
    if (app.globalData.isSuo == true) {
      return
    }
    wx.navigateTo({
      url: '/pages/meeting-1/meeting-1?_id=' + _id + '&u_id=' + u_id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 日期表
    let e = this.getDates(7)
    let tmp_Item = ''
    let temp = ['日期   时间']
    for (var i = 0; i < e.length; i++) {
      tmp_Item = e[i].month + '.' + e[i].day + '   ' + e[i].week
      temp = temp.concat(tmp_Item)
    }
    console.log(temp)
    this.setData({
      weekList: temp
    })

    // 获取会议数据
    _id = options._id
    u_id = options.u_id
    this.getList()




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
    let datetime0 = date + ' ' + '06:00'
    var dates3 = new Date(datetime3)
    shijianchuo3 = dates3.getTime()
    var dates0 = new Date(datetime0)
    shijianchuo0 = dates0.getTime()
    console.log(date)
  },
  getList() {
    wx.cloud.database().collection('meeting-1')
      .doc(_id)
      .get()
      .then(res => {
        console.log('滴滴获取成功', res)
        console.log(res.data.yuyue)
        this.setData({
          meeting_List: res.data.yuyue
        })
        this.shujuguoqishanchu()
        this.shezhihuiyibiao()
      })
      .catch(res => {
        console.log('获取失败', res)
      })
  },
  shezhihuiyibiao() {
    let that = this
    for (var i = 0; i < this.data.meeting_List.length; i++) {
      let user_id = that.data.meeting_List[i].u_id
      let shijianchuo1_1 =that.data.meeting_List[i].q_time
      let shijianchuo2_2 = that.data.meeting_List[i].z_time
      console.log('我是你爹', user_id,shijianchuo1_1,shijianchuo2_2)
      let xqj = 0
      let sksj = 0
      let skcd = 0
      let kcxx = ''
      let color_list = 0
      let julijinzao = this.data.meeting_List[i].q_time - shijianchuo0
      let oneDay = 24 * 60 * 60 * 1000
      let oneHour = 60 * 60 * 1000
      if (this.data.meeting_List[i].u_id == u_id) {
        color_list = 1
      }
      xqj = 1 + ((julijinzao / oneDay) - ((julijinzao / oneDay) % 1))
      sksj = ((julijinzao / oneDay) % 1) * oneDay / oneHour + 1
      skcd = (this.data.meeting_List[i].z_time - this.data.meeting_List[i].q_time) / oneHour
      console.log(xqj, sksj, skcd)
      wx.cloud.database().collection('users')
        .doc(this.data.meeting_List[i].u_id)
        .get()
        .then(res => {
          console.log('获取成功_用户数据', res)
          kcxx = res.data.name_main + '的会议'
          let dantiaoshuju = {
            "xqj": xqj,
            "sksj": sksj,
            "skcd": skcd,
            "kcxx": kcxx,
            "color_list": color_list,
            "user_id": user_id,
            "shijianchuo1": shijianchuo1_1,
            "shijianchuo2": shijianchuo2_2
          }
          console.log(dantiaoshuju)
          shujubiao = shujubiao.concat(dantiaoshuju)
          console.log('这是数据表', shujubiao)
          that.setData({
            wlist: shujubiao,
          })
        })
        .catch(res => {
          console.log('获取失败', res)
        })
    }
    shujubiao = []
  },
  shujuguoqishanchu() {
    let that = this
    if (this.data.meeting_List == null || this.data.meeting_List.length <= 0) {
      this.setData({
        meeting_List: []
      })
    } else {
      for (var i = 0; i < that.data.meeting_List.length; i++) {
        if (that.data.meeting_List[i].z_time < shijianchuo3) {
          if (that.data.meeting_List.length == 1) {
            that.setData({
              meeting_List: []
            })
          }
          if (that.data.meeting_List.length > 1) {
            that.data.meeting_List.splice(i, 1)
          }
        }
      }
    }
    wx.cloud.database().collection('meeting-1')
      .doc(_id)
      .update({
        data: {
          yuyue: this.data.meeting_List
        }
      })
      .then(res => {
        console.log('更新成功', res)
      })
      .catch(res => {
        console.log('更新失败', res)
      })
  },
  //获取d当前时间多少天后的日期和对应星期
  getDates(days, todate = this.getCurrentMonthFirst()) { //todate默认参数是当前日期，可以传入对应时间
    var dateArry = [];
    for (var i = 0; i < days; i++) {
      var dateObj = this.dateLater(todate, i);
      dateArry.push(dateObj)
    }
    return dateArry;
  },
  /**
   * 传入时间后几天
   * param：传入时间：dates:"2018-04-02",later:往后多少天
   */
  dateLater(dates, later) {
    let dateObj = {};
    let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
    let date = new Date(dates);
    date.setDate(date.getDate() + later);
    let day = date.getDay();
    dateObj.year = date.getFullYear();
    dateObj.month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
    dateObj.day = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
    dateObj.week = show_day[day];
    return dateObj;
  },
  //获取当前时间
  getCurrentMonthFirst() {
    var date = new Date();
    var todate = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
    return todate;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getList()
    console.log('刷新页面')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList()
    console.log('刷新页面')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      wlist: []
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      wlist: []
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getList()
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