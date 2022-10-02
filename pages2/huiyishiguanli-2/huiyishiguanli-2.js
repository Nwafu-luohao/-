// pages2/huiyishiguanli-2/huiyishiguanli-2.js
let id = null
let getname = ''
let getphoneNumber = ''
let getaddressNumber = ''
let getJingwei = ''
let getJingwei2 = ''
let getaddress = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options._id)
    id = options._id
    this.getDetail()
  },
  getDetail() {
    wx.cloud.database().collection('meeting-1')
      .doc(id)
      .get()
      .then(res => {
        console.log('获取成功', res)
        this.setData({
          detail: res.data
        })
      })
      .catch(res => {
        console.log('获取失败', res)
      })
  },

  getname(e) {
    console.log(e.detail.value)
    getname = e.detail.value
    console.log('测试中', e.detail.value)
  },
  getphoneNumber(e) {
    getphoneNumber = e.detail.value
  },
  getaddressNumber(e) {
    getaddressNumber = e.detail.value
  },
  getJingwei(e) {
    getJingwei = e.detail.value
  },
  getJingwei2(e) {
    getJingwei2 = e.detail.value
  },
  getaddress(e) {
    getaddress = e.detail.value
  },
  baocunxiugai() {
    if (getname == '' || getname == null) {
      console.log('hahal')
      console.log('hahal', this.data.detail.name)
      getname = this.data.detail.name
      console.log('haha', getname)
      if (getname == '' || getname == null) {
        getname = ' '
      }
    }
    console.log('haha', getname)
    if (getphoneNumber == '' || getphoneNumber == null) {
      getphoneNumber = this.data.detail.phoneNumber
      if (getphoneNumber == '' || getphoneNumber == null) {
        getphoneNumber = ' '
      }
    }
    if (getJingwei == '' || getJingwei == null) {
      getJingwei = this.data.detail.Jingwei
      if (getJingwei == '' || getJingwei == null) {
        getJingwei = ' '
      }
    }
    if (getJingwei2 == '' || getJingwei2 == null) {
      getJingwei2 = this.data.detail.Jingwei2
      if (getJingwei2 == '' || getJingwei2 == null) {
        getJingwei2 = ' '
      }
    }
    if (getaddressNumber == '' || getaddressNumber == null) {
      getaddressNumber = this.data.detail.addressNumber
      if (getaddressNumber == '' || getaddressNumber == null) {
        getaddressNumber = ' '
      }
    }
    if (getaddress == '' || getaddress == null) {
      getaddress = this.data.detail.address
      if (getaddress == '' || getaddress == null) {
        getaddress = ' '
      }
    }
    console.log(getname, getphoneNumber, getaddressNumber, getJingwei, getaddress)
    if (getname.length < 2 || getname == null) {
      wx.showToast({
        title: '会议室名至少2位',
        icon: 'none'
      })
      return
    }
    if (getname.length > 20) {
      wx.showToast({
        title: '会议室名最多20位',
        icon: 'none'
      })
      return
    }
    // 校验账号
    if (getphoneNumber.length < 11 || getphoneNumber == null) {
      wx.showToast({
        title: '电话号码至少11位',
        icon: 'none'
      })
      return
    }
    if (getaddressNumber.length < 4 || getaddressNumber == null) {
      console.log(getaddressNumber)
      wx.showToast({
        title: '地址编号输入不合法',
        icon: 'none'
      })
      return
    }
    if (getJingwei.length < 4 || getJingwei == null) {
      wx.showToast({
        title: '经纬度输入不合法',
        icon: 'none'
      })
      return
    }

    if (getaddress.length < 4 || getaddress == null) {
      wx.showToast({
        title: '地址输入不合法',
        icon: 'none'
      })
      return
    }
    wx.cloud.database().collection('meeting-1')
      .where({
        name: getname
      })
      .get()
      .then(res => {
        if (res.data.length > 1) {
          console.log('名称已存在1', res)
          wx.showToast({
            title: '会议室名已存在',
            icon: 'error'
          })
          return
        }
        if (res.data.length >= 1 && this.data.detail.name != getname) {
          console.log('名称已存在2', res)
          console.log('名称已存在2-1', this.data.detail.name)
          console.log('名称已存在2-2', getname)
          wx.showToast({
            title: '会议室名已存在',
            icon: 'error'
          })
          return
        } else {
          wx.cloud.database().collection('meeting-1')
            .doc(id)
            .update({
              data: {
                name: getname,
                phoneNumber: getphoneNumber,
                addressNumber: getaddressNumber,
                Jingwei: getJingwei,
                Jingwei2: getJingwei2,
                address: getaddress
              }
            })
            .then(res => {
              console.log('修改成功', res)
              wx.showToast({
                title: '修改成功',
                icon: 'success'
              })
              getname = ''
              getphoneNumber = ''
              getaddressNumber = ''
              getJingwei = ''
              getJingwei2 = ''
              getaddress = ''
            })
            .catch(res => {
              console.log('修改失败', res)
            })
        }
      })
      .catch(res => [
        console.log('名称不存在', res)
      ])
  },
  huoqubianhaohejingweidu(){
    this.gettianQi1()
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

  },
  gettianQi1() {
    let new_detail = this.data.detail
    const that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        new_detail.Jingwei = longitude
        new_detail.Jingwei2 = latitude
        that.setData({
          detail: new_detail
        })
        wx.chooseLocation({
          latitude,
          longitude,
          success: (res) => {
            console.log(res)
            const address1 = res.address
            that.bianMa(address1)
          },
        })
      }
    })
  },
  bianMa(address) {
    let new_detail = this.data.detail
      const that = this;
      wx.request({
        url: 'https://restapi.amap.com/v3/geocode/geo?parameters',
        method: 'GET',
        data: {
          'key': 'defac5b7e633b1d48b8c3a0ca60e934d',
          'address': '' + address,
        },
        success: (res) => {
          new_detail.addressNumber = res.data.geocodes[0].adcode
          console.log(res.data.geocodes[0].adcode)
          that.setData({
            detail : new_detail
          })
        }
      })
  },
})