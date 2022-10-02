const DEFAULT_PAGE = 0;
Page({
  startPageX: 0,
  currentView: DEFAULT_PAGE,
  /**
   * 页面的初始数据
   */
  data: {
    guanliyuan:[],
    toView: `card_${DEFAULT_PAGE}`,
    list: ['Javascript', 'Typescript', 'Java', 'PHP', 'Go']
  },
  tels: function(e){
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.num,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.database().collection('users')
    .where({
      quanxian: true
    })
    .get()
    .then(res => {
      console.log('获取成功', res)
      this.setData({
        guanliyuan: res.data
      })
    })
    .catch(res =>{
      console.log('获取失败', res)
    })
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
  touchStart(e) {
    this.startPageX = e.changedTouches[0].pageX;
  },

  touchEnd(e) {
    const moveX = e.changedTouches[0].pageX - this.startPageX;
    const maxPage = this.data.list.length - 1;
    if (Math.abs(moveX) >= 150){
      if (moveX > 0) {
        this.currentView = this.currentView !== 0 ? this.currentView - 1 : 0;
      } else {
        this.currentView = this.currentView !== maxPage ? this.currentView + 1 : maxPage;
      }
    }
    this.setData({
      toView: `card_${this.currentView}`
    });
  }
})