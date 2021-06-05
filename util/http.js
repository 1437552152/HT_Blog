/*
 * @Description: 
 * @Author: yfye
 * @Date: 2021-06-05 17:19:58
 * @LastEditTime: 2021-06-05 17:20:39
 * @LastEditors: yfye
 */
var request = require('request');
var qs=require( 'querystring' );
// 发起请求
var httpRequest = function (url,data=null,method="GET",headers={}){
  return new Promise((resolve, reject)=>{
    request({
      url: url+(method=="GET"?"?"+qs.stringify(data):""),
      method,
      json: true,
      headers:{
        "content-type":method=="GET"?"text/json":"application/x-www-form-urlencoded",
        ...headers
      },
      body:method=="POST"?qs.stringify(data):""
    }, function(error, response, body) {
      try {
        if (!error && response.statusCode == 200) {
          resolve(body)
        }else{
          reject(error)
        }
      } catch (error) {
        reject(error)
      }
         
    });
  })
}
 
module.exports = httpRequest;