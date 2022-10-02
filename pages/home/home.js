import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'
const util = require('../../utils/util.js')
let EARTH_RADIUS = 6371000 
let shijianchuo3 = null
let shijianchuo0 = null
let shijianchuo1 = null
let shijianchuo2 = null
let _id = null
let u_id = null
let jin1 = null
let wei1 = null
let jin2 = null
let wei2 = null
let weiZhi = false
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据列表
    swiperList:[],
    // 存放九宫格的列表
    url:'https://restapi.amap.com/v3/geocode/geo?parameters',
    kongzhifa: 0,
    address: '',
    _id: null,
    meeting: [],
    huoquweizhi: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(weiZhi)
    let that = this
    if(!weiZhi){
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success(res) {
          const latitude = res.latitude
          const longitude = res.longitude
          console.log('维', latitude, '经', longitude)
          jin1 = longitude
          wei1 = latitude
          weiZhi = true
          console.log('总得变了吧',weiZhi)
          that.setData({
            huoquweizhi: true
          })
          that.getMeeting()
        }
      })
    }
    
    console.log('看我的锁也没有用',weiZhi)
    // 获取现在的时间
    var time = util.formattime(new Date());
    var date = util.formatdate(new Date());
    let datetime3 = date + ' ' + time
    var dates3 = new Date(datetime3)
    shijianchuo3 = dates3.getTime()

     this.test()
    if (weiZhi){
      console.log('就是我弄得')
      this.getMeeting()
      console.log('就是我弄得')
    }
    
    wx.getStorage({
      key: 'user',
      success(res) {
        console.log('cao', res.data._id)
        app.globalData.user_id = res.data._id
        that.setData({
          _id: res.data._id
        })
        console.log('我就是App', app.globalData.user_id)
      }
    })
    // let that = this
    this.storeBindings = createStoreBindings(this,{
      store,
      fields:['numA','numB','sum','dizhibianhao'],
      actions:['updateNum1','updateNum2','address1','updatedizhibianhao']
    })
    if(that.data._id != null){
      wx.cloud.database().collection('users')
    .doc(that.data._id)
    .get()
    .then(res =>{
      console.log('还是获取成功',res)
      if(res.data.length <= 0){
        wx.setStorageSync('user', null)
        wx.redirectTo({
          url: '/pages/me/me',
        })
      }
    })
    .catch(res =>{
      console.log('还是获取失败',res)
      wx.setStorageSync('user', null)
        wx.redirectTo({
          url: '/pages/me/me',
        })
    })
    }

    wx.cloud.database().collection('lun_Image')
    .get()
    .then(res =>{
      console.log('获取成功', res)
      that.setData({
        swiperList: res.data
      })
    })
    .catch(res =>{
      console.log('获取失败', res)
    })
  }
  ,
  sleep(millisecond) {
      return new Promise(resolve => {
          setTimeout(() => {
              resolve()
          }, millisecond)
      })
  },

  async  test() {
      const start = new Date().getTime();
     console.log("执行开始",start);
     await this.sleep(500);
     console.log("执行结束",new Date().getTime() - start)
  }, 

  shezhizhuangtai(){
    if (this.data.huoquweizhi == false){
      return
    }
    let that = this
    let zhuangtai = false
    let jvli_1 = 0
    let list_new = this.data.meeting
    let danxiang  = {}
    for (var i = 0; i < list_new.length; i++){
      console.log(i,danxiang)
      jvli_1 = parseInt(that.huoqujuli(jin1,wei1,list_new[i].Jingwei,list_new[i].Jingwei2))
      if(list_new[i].yuyue == null || list_new[i].yuyue.length == 0){
        list_new[i].yuyue = []
        danxiang = {"zhuangtai": zhuangtai , "jvli":jvli_1}
        list_new[i] = Object.assign(list_new[i], danxiang);
        console.log(i,danxiang)
        danxiang = {}
        continue;
      }
      for (var j = 0; j < list_new[i].yuyue.length; j++){
        if (list_new[i].yuyue[j].q_time <= shijianchuo3 && list_new[i].yuyue[j].z_time >= shijianchuo3){
          zhuangtai = true
          danxiang = {"zhuangtai": zhuangtai , "jvli":jvli_1}
          list_new[i] = Object.assign(list_new[i], danxiang);
          console.log(i,danxiang)
          danxiang = {}
          zhuangtai = false
          break;
        }else{
          danxiang = {"zhuangtai": zhuangtai , "jvli":jvli_1}
          list_new[i] = Object.assign(list_new[i], danxiang);
          danxiang = {}
        }
      }
    }
    this.setData({
      meeting: list_new
    })
    console.log('我运行完了')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.onLoad()
    let that  =  this
    wx.getStorage({
      key: 'user',
      success(res) {
        console.log('cao', res.data._id)
        app.globalData.user_id = res.data._id
        that.setData({
          _id: res.data._id
        })
        console.log('我就是App', app.globalData.user_id)
      }
    })
    this.getMeeting4()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that  =  this
    wx.getStorage({
      key: 'user',
      success(res) {
        console.log('cao', res.data._id)
        app.globalData.user_id = res.data._id
        that.setData({
          _id: res.data._id
        })
        console.log('我就是App', app.globalData.user_id)
      }
    })
    // this.onLoad()
    this.getMeeting4()
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
    weiZhi = false
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getMeeting2()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getMeeting3()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  shuaxin(){
    this.getMeeting2()
  },
  
  getMeeting(){
    
    wx.cloud.database().collection('meeting-1')
      .skip(this.data.meeting.length)
      .get()
      .then(res => {
        wx.hideLoading()
        console.log('请求成功', res)
        if (res.data.length <= 0) {
          return
        }
        this.setData({
          meeting: res.data
        })
        this.shezhizhuangtai()
      })
      .catch(res => {
        wx.hideLoading()
        console.log('请求失败', res)
      })
  },
  getMeeting2(){
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.cloud.database().collection('meeting-1')
      .skip(0)
      .get()
      .then(res => {
        wx.hideLoading()
        console.log('请求成功', res)
        if (res.data.length <= 0) {
          wx.showToast({
            title: '没有更多数据啦',
            icon: 'none'
          })
        }
        this.setData({
          meeting: res.data
        })
        this.shezhizhuangtai()
      })
      .catch(res => {
        wx.hideLoading()
        console.log('请求失败', res)
      })
      wx.stopPullDownRefresh();
  },
  getMeeting3(){
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.cloud.database().collection('meeting-1')
      .skip(this.data.meeting.length)
      .get()
      .then(res => {
        wx.hideLoading()
        console.log('请求成功', res)
        if (res.data.length <= 0) {
          wx.showToast({
            title: '没有更多数据啦',
            icon: 'none'
          })
        }
        this.setData({
          meeting: this.data.meeting.concat(res.data)
        })
        this.shezhizhuangtai()
      })
      .catch(res => {
        wx.hideLoading()
        console.log('请求失败', res)
      })
  },
  getMeeting4(){
    wx.cloud.database().collection('meeting-1')
      .skip(0)
      .get()
      .then(res => {
        wx.hideLoading()
        console.log('请求成功', res)
        if (res.data.length <= 0) {
        }
        this.setData({
          meeting: res.data
        })
        this.shezhizhuangtai()
      })
      .catch(res => {
        wx.hideLoading()
        console.log('请求失败', res)
      })
      wx.stopPullDownRefresh();
  },
  getDetail(e){
    console.log('测试',e.currentTarget.dataset._id)
    wx.navigateTo({
      url: '/pages2/meeting-1/meeting-1?_id=' + e.currentTarget.dataset._id + '&u_id=' + this.data._id + '&zhuangtai=' +e.currentTarget.dataset.zhuangtai  + '&jvli=' +e.currentTarget.dataset.jvli ,
    })
  },
  getDetail2(e){
    wx.navigateTo({
      url: '/pages/meeting-2/meeting-2?_id=' + e.currentTarget.dataset._id
      + '&time1=' + e.currentTarget.dataset.time1 + '&time2=' + e.currentTarget.dataset.time2,
    })
  },
  huoqujuli(j1, w1, j2, w2) {
    console.log(j1, w1, j2, w2)
    // 当前地点
    let lon = j1;  // 当前经度
    let lat = w1;  // 当前纬度
    // 目标地点
    let lon1 = j2;
    let lat1 = w2;
    let dist;
    let dist2;
    dist = this.GetDistance(lon, lat, lon1, lat1);
    dist2 = this.distance(lon, lat, lon1, lat1);
    let dist3 = 0;
    dist3 = (dist + dist2) / 2
    console.log('是不是我的问题', dist3)
    return dist3
},

/**
 * 功能描述：计算两个经纬度的距离
 *
 * @param lon1 第一点的精度
 * @param lat1 第一点的纬度
 * @param lon2 第二点的精度
 * @param lat2 第二点的纬度
 * @return 返回的距离，单位m
 * @author cakin
 * @date 2021/10/30
 * @description: 基于googleMap中的算法得到两经纬度之间的距离, 计算精度与谷歌地图的距离精度差不多
 */
GetDistance( lon1,  lat1,  lon2,  lat2) {
    let radLat1 = this.rad(lat1)
    let radLat2 = this.rad(lat2)
    let a = radLat1 - radLat2
    let b = this.rad(lon1) - this.rad(lon2)
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
    s = s * EARTH_RADIUS
    s = Math.round(s * 10000) / 10000
    return s
},

/**
 * 转化为弧度(rad)
 */
 rad(d){
    return d * Math.PI / 180.0
},

/**
 * 计算中心经纬度与目标经纬度的距离(米)
 *
 * @param centerLon 中心经度
 * @param centerLat 中心纬度
 * @param targetLon 需要计算的经度
 * @param targetLat 需要计算的纬度
 * @return 米
 */
 distance( centerLon,  centerLat,  targetLon,  targetLat) {
    let jl_jd = 102834.74258026089786013677476285; // 每经度单位米;
    let jl_wd = 111712.69150641055729984301412873; // 每纬度单位米;
    let b = Math.abs((centerLat - targetLat) * jl_jd);
    let a = Math.abs((centerLon - targetLon) * jl_wd);
    return Math.sqrt((a * a + b * b));
}
})