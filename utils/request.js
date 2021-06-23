//发送Ajax请求
/**
 * 1.封装功能函数
 * 
 * 2.封装功能组件
 */

import config from './config'

export default (url, data={}, method='GET') => {
    // new Promise初始化实例的状态为pending
    return new Promise((resolve, reject) => {
        wx.request({
            url: config.host + url,
            data,
            method,
            header: {
                cookie: wx.getStorageSync('cookies')? wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U')!==-1) : ''
            },
            success: (res)=>{
                if (data.isLogin){
                    //登录请求 将用户的cookies存储至本地
                    wx.setStorage({
                        key: 'cookies',
                        data: res.cookies,
                    });
                }
                console.log('请求成功',res);
                // 修改promise的状态为成功状态resolved
                resolve(res.data)
            },
            fail: (err)=>{
                console.log('请求失败',err);
                // 修改promise的状态为失败状态rejected
                reject(err)
            }
        });
    })
    
}