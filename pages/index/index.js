import request from '../../utils/request'

// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],//轮播图数据
    songSheetList: [],//歌单数据


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    //获取轮播图数据
    let res_banner = await request('/banner',{type: 2})
    
    // 获取歌单数据
    let res_songSheet = await request('/personalized', {limit: 10})

    this.setData({
      bannerList: res_banner.banners,
      songSheetList: res_songSheet.result
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

  }
})