// pages/personal.js
let startY = 0
let moveY =0
let movedY =0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: 'translateY(0)',
    coverTransition: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  handleTouchStart(event){
    startY = event.touches[0].clientY
    this.setData({
      coverTransition: ''
    })
  },
  handleTouchMove(event ){
    moveY = event.touches[0].clientY
    movedY = moveY - startY
    // console.log(movedY);
    if (movedY<=0){
      return
    }
    if (movedY>=80){
      movedY = 80
    }
    this.setData({
      coverTransform: `translateY(${movedY}rpx)`
    })
  },
  handleTouchEnd(){
    this.setData({
      coverTransform: 'translateY(0)',
      coverTransition: 'transform 1s linear'
    })
  },
  // 跳转到登录页面
  toLogin () {
    wx.navigateTo({
      url: '/pages/login/login',
    });
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