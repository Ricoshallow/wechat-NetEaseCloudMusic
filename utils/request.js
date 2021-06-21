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
            url: config.mobileHost + url,
            data,
            method,
            success: (res)=>{
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