// pages/video/video.js
import request from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoTagList: [],
    videoList: [],
    navId: '',
    videoId: '',
    videoUpdateTime: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoTagList()
  },

  // 获取视频标签列表页
  async getVideoTagList(){
    let res_videoTagList = await request('/video/group/list')
    // console.log(res_videoTagList);
    this.setData({
      videoTagList: res_videoTagList.data.slice(0,16),
      navId: res_videoTagList.data[0].id
    })
    //拿到navid再进行视频标签下对应的视频数据的获取（解决异步请求下navid还没有传入值的情况）
    this.getVideoList(this.data.navId)
  },
  // 
  async getVideoList(id){
    let res_videoList = await request('/video/group',{id})
    // console.log(res_videoList);
    // 关闭正在加载提示框
    wx.hideLoading();
    this.setData({
      videoList: res_videoList.datas
    })
  },
  // 切换导航栏
  changeNav(evnet){
    let navId = evnet.currentTarget.id//通过id向event传参的时候如果传的是number会自动转换成string
    this.setData({
      navId: navId*1,
      // videoList: []
    })
    // 显示正在加载
    wx.showLoading({
      title: '正在加载',
      mask: true,
    });
    //获取对应导航栏的视频列表
    this.getVideoList(this.data.navId)
  },

  // 点击播放的回调
  handlePlay(event){
    let vid = event.currentTarget.id
    //关闭上一个视频
    // console.log(this.videoContext);
    // this.vid !== vid && this.videoContext && this.videoContext.stop()
    
    //创建控制video标签的实例对象
    // console.log(event.currentTarget.id);
    // this.vid = vid
    this.setData({
      videoId: vid
    })
    this.videoContext = wx.createVideoContext(vid)
    let {videoUpdateTime} = this.data
    let videoItem = videoUpdateTime.find(item => item.vid === vid)
    // console.log(videoItem);
    if (videoItem) {
      this.videoContext.seek(videoItem.currentTime)
    }
  },

  // 监听播放进度的回调
  handleTimeUpdate(event){
    let videoTimeObj = {vid: event.currentTarget.id, currentTime: event.detail.currentTime}
    let {videoUpdateTime} = this.data
    let videoItem = videoUpdateTime.find(item => item.vid === videoTimeObj.vid)
    //判断videoUpdateTime数组中是否有当前视频的播放记录
    if (videoItem) {
      videoItem.currentTime = videoTimeObj.currentTime
    } else{
      videoUpdateTime.push(videoTimeObj)
    }
    //更新数据
    this.setData({
      videoUpdateTime
    })
  },
  //视频播放完成的回调
  handleEnd(event){
    //移除videoUpdateTime数组中播放完的对象
    let {videoUpdateTime} = this.data
    let index = videoUpdateTime.findIndex(item => item.vid === event.currentTarget.id)
    videoUpdateTime.splice(index,1)
    this.setData({
      videoUpdateTime
    })
  },
  //srollview下拉刷新
  handleRefresh(){
    console.log('111');
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