// pages/tianqi/tianqi.js
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../store/store'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://restapi.amap.com/v3/geocode/geo?parameters',
    kongzhifa: 0,
    address: '',
    tianQiUrl: 'https://restapi.amap.com/v3/weather/weatherInfo?parameters',
    dangTian: [],
    dizhi: 1,
    xianshi: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['numA', 'numB', 'sum', 'dizhibianhao'],
      actions: ['updateNum1', 'updateNum2', 'address1', 'updatedizhibianhao']
    })
    this.bianMa()
  },
  gettianQi1() {
    const that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log('维', latitude, '经', longitude)
        wx.chooseLocation({
          latitude,
          longitude,
          success: (res) => {
            console.log(res)
            const address1 = res.address
            that.setData({
              address: address1,
              kongzhifa: 1
            })
          },

        })
      }
    })
  },
  bianMa() {
    if (this.data.kongzhifa == 0) {
      wx.showToast({
        title: '请先获取地理位置',
        icon: 'none',
        duration: 800
      })
    } else {
      const that = this;
      wx.request({
        url: this.data.url,
        method: 'GET',
        data: {
          'key': 'defac5b7e633b1d48b8c3a0ca60e934d',
          'address': '' + this.data.address,
        },
        success: (res) => {
          this.updatedizhibianhao(res.data.geocodes[0].adcode)
        }
      })
    }
  },
  bianMa2() {
    if (this.data.kongzhifa == 0) {
      wx.showToast({
        title: '请先获取地理位置',
        icon: 'none',
        duration: 800
      })
    } else {
      
      if (this.dizhibianhao != 0) {
        this.gettianQi()
        this.setData({
          xianshi: true
        })
      }
      this.gettianQi()
    }
  },
  liaojiegengduo() {
    wx.navigateTo({
      url: '/pages/yubao/yubao',
    })
  },
  gettianQi() {
    console.log(this.address1())
    wx.request({
      url: this.data.tianQiUrl,
      method: 'GET',
      data: {
        'key': 'defac5b7e633b1d48b8c3a0ca60e934d',
        'city': this.address1(),
        'extensions': 'base'
      },
      success: (res) => {
        console.log(res)
        this.setData({
          dangTian: res.data.lives[0]
        })
      }
    })

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.bianMa()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.bianMa()
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
    this.gettianQi()
    wx.stopPullDownRefresh()
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

  },
})