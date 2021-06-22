// pages/login/login.js
/**
 * 登录流程
 * 1.收集表单项数据
 * 2.前端验证（数据是否合法）
 * 3.后端验证
 */
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: ''
  },
  //表单内容变化触发的函数
  handleInput(event) {
    // console.log(event);
    let type = event.currentTarget.id
    this.setData({
      //在对象里面操作属性用[]
      [type]: event.detail.value
    })
  },
  //登录验证函数
  async login () {
    // console.log('denglu');
    //收集表单数据
    let {phone, password} = this.data
    if (!phone){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        // duration: 2000
      })
      return 
    }
    //手机号验证正则
    let phoneReg= /^1(3|4|5|6|7|8|9)\d{9}$/
    if (!phoneReg.test(phone)){
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        // duration: 2000
      })
      return 
    }
    if (!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        // duration: 2000
      })
      return
    }
    //前端验证通过，开始进行后端验证
    let res_login = await request('/login/cellphone',{phone, password})
    console.log(res_login);
    if (res_login.code === 200) {
      wx.showToast({
        title: '登录成功',
        // duration: 2000
      })
      // 跳转至个人中心
      wx.switchTab({
        url: '/pages/personal/personal',
      });
    }else if (res_login.code === 400) {
      wx.showToast({
        title: '手机号错误',
        icon: 'none',
        // duration: 2000
      })
    } else if (res_login.code === 502) {
      wx.showToast({
        title: '密码错误',
        icon: 'none',
        // duration: 2000
      })
    }else if (res_login.code === 501) {
      wx.showToast({
        title: '用户不存在',
        icon: 'none',
        // duration: 2000
      })
    }else {
      wx.showToast({
        title: '登录失败，请重新登录',
        icon: 'none',
        // duration: 2000
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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