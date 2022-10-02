// pages/wodeyuyue/wodeyuyue.js
let shijianchuo3 = null
const util = require('../../utils/util.js')
let id = null
let app = getApp()
let yuYuelan = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meeting: [],
    isxianshi: 0,
    yuyuejilu:[],
    yuYuelan_1: [],
  },
  tiaozhuandaobiaoge(e){
    wx.navigateTo({
      url: '/pages2/biaoge/biaoge?_id=' + e.currentTarget.dataset._id + '&u_id=' + app.globalData.user_id,
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    id = options._id
    this.yuyue_Ceshi()
  },
  yuyue_Ceshi() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.database().collection('users')
      .doc(app.globalData.user_id)
      .get()
      .then(res => {
        console.log('第一次————获取成功', res)
        this.setData({
          yuyuejilu: res.data.yuyuejilu
        })
        this.yuyue_Ceshi_2()
      })
      .catch(res => {
        console.log('获取失败le', res)
      }) 
  },
  yuyue_Ceshi_2(){
    let that = this
    if (this.data.yuyuejilu == null || this.data.yuyuejilu.length == 0){
      this.setData({
        yuyuejilu: [],
        isxianshi: -1
      })
      wx.stopPullDownRefresh()
      wx.hideLoading()
      return
    }else{
      this.setData({
        isxianshi: 1
      })
    }
    let new_list = this.data.yuyuejilu
    for(var i = 0; i <new_list.length; i++){
      let i1 = i
      let length = new_list.length-1
      let id = new_list[i].m_id
      let zhuangtai = new_list[i].isZuofei
      let z_time = new_list[i].z_time
      let time1 = that.format(parseInt(new_list[i].q_time))
      let time2 = that.format(parseInt(new_list[i].z_time))
      wx.cloud.database().collection('meeting-1')
      .doc(new_list[i].m_id)
      .get()
      .then(res =>{
        console.log('获取成功', res)
        var danxiang = {
          "zhuangtai" : zhuangtai,
          "image" : res.data.meeting_img,
          "_id" : id,
          "address" : res.data.address,
          "name": res.data.name,
          "z_time" : z_time,
          "time1" : time1,
          "time2" : time2
        }
        yuYuelan.push(danxiang)
        if (danxiang.z_time<shijianchuo3){
          danxiang.zhuangtai = true
        }
        console.log(yuYuelan)
        that.setData({
          yuYuelan_1 : yuYuelan
        })
        if(i1 == length){
          wx.hideLoading()
          wx.stopPullDownRefresh()
        }
      })
      .catch(res =>{
        console.log('获取失败', res)
      })
    }
  },
  // yuyue_Ceshi_3(){
  //   for(var i = 0;  i < this.data.yuYuelan_1.length; i++){
  //     if (this.data.yuYuelan_1.z_time < shijianchuo3){
  //       this.data.yuYuelan_1.zhuangtai = true
  //       console.log(this.data.yuYuelan_1[i])
  //     }
  //   }
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    yuYuelan = []
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    yuYuelan = []
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    yuYuelan = []
    this.yuyue_Ceshi()
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