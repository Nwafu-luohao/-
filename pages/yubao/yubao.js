// pages/yubao/yubao.js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tianQiUrl:'https://restapi.amap.com/v3/weather/weatherInfo?parameters',
    yuBao: [],
  },
  gettianQi(){
    wx.request({
      url: this.data.tianQiUrl,
      method:'GET',
      data: {'key' : 'defac5b7e633b1d48b8c3a0ca60e934d',
            'city': this.address1(),
          'extensions' : 'all'},
      success:(res) => {
        console.log(res)
        this.setData({
          yuBao : res.data.forecasts[0].casts
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.storeBindings = createStoreBindings(this,{
      store,
      fields:['numA','numB','sum','dizhibianhao'],
      actions:['updateNum1','updateNum2','address1','updatedizhibianhao']
    })
    this.gettianQi()
  },

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