// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'

  // Your code here...
  /*
/*
* @Author: ZhangYuHua
* @Date: 2023-02-15 17:01:05
* @LastEditors: ZhangYuHua
* @LastEditTime: 2023-02-15 22:32:53
* @Note: 未添加注意事项
* @Description: 自动答问卷星脚本
*/
  /*
   * @Author: ZhangYuHua
   * @Date: 2023-02-15 17:01:05
   * @LastEditors: ZhangYuHua
   * @LastEditTime: 2023-02-15 22:43:00
   * @Note: 未添加注意事项
   * @Description: 自动答问卷星脚本
   */
  /*
   * @Author: ZhangYuHua
   * @Date: 2023-02-15 17:01:05
   * @LastEditors: ZhangYuHua
   * @LastEditTime: 2023-02-15 22:45:10
   * @Note: 未添加注意事项
   * @Description: 自动答问卷星脚本
   */
  /*
   * @Author: ZhangYuHua
   * @Date: 2023-02-15 17:01:05
   * @LastEditors: ZhangYuHua
   * @LastEditTime: 2023-02-15 23:04:06
   * @Note: 未添加注意事项
   * @Description: 自动答问卷星脚本
   */

  /*
   * @Author: ZhangYuHua
   * @Date: 2023-02-15 17:01:05
   * @LastEditors: ZhangYuHua
   * @LastEditTime: 2023-02-15 23:06:12
   * @Note: 未添加注意事项
   * @Description: 自动答问卷星脚本
   */

  /*
   * @Author: ZhangYuHua
   * @Date: 2023-02-15 17:01:05
   * @LastEditors: ZhangYuHua
   * @LastEditTime: 2023-02-15 23:07:43
   * @Note: 未添加注意事项
   * @Description: 自动答问卷星脚本
   */

  /*
   * @Author: ZhangYuHua
   * @Date: 2023-02-15 17:01:05
   * @LastEditors: ZhangYuHua
   * @LastEditTime: 2023-02-15 23:07:43
   * @Note: 未添加注意事项
   * @Description: 自动答问卷星脚本
   */

  // 初始化答题次数
  /*
   * @Author: ZhangYuHua
   * @Date: 2023-02-15 17:01:05
   * @LastEditors: ZhangYuHua
   * @LastEditTime: 2023-02-15 23:11:20
   * @Note: 未添加注意事项
   * @Description: 自动答问卷星脚本
   */

  /*
   * @Author: ZhangYuHua
   * @Date: 2023-02-15 17:01:05
   * @LastEditors: ZhangYuHua
   * @LastEditTime: 2023-02-15 23:32:36
   * @Note: 未添加注意事项
   * @Description: 自动答问卷星脚本
   */

  // 初始化答题次数
  if (!localStorage.getItem('submitNum')) {
    localStorage.setItem('submitNum', 0)
  }

  // 从localStorage拿到当前答题次数
  let submitNum = localStorage.getItem('submitNum')

  // 拿到提交按钮
  const submit = document.querySelector('#ctlNext')

  // 绘制btn点击按钮
  const btnEl = document.createElement('button')
  btnEl.textContent = `开始答题,第${submitNum}`
  btnEl.style.cssText =
    'width:100px;height:50px;position:absolute;top:0;left:50%;background:beige;transform: translateX(-50%)'

  // 监听btn点击事件
  btnEl.addEventListener('click', () => {
    // 随机答题
    singleOption()
    tableSingleOption()

    //执行表单提交
    submit.click()
    // 答题次数+1,更新本地存储答题次数
    localStorage.setItem('submitNum', ++submitNum)

    // 被盾有验证
    setTimeout(() => {
      if (document.querySelector('#captcha').style.display === 'block') {
        console.log('被盾了')
        // 移除遮罩层
        document.querySelector('.layui-layer-shade').remove()
        document.querySelector('#SM_BTN_1').click()
        setTimeout(() => {
          removeValidation()
        }, 3000)
      }
    }, 1000)
  })
  document.querySelector('body').appendChild(btnEl)

  function random(length) {
    // 传入选项个数，随机生成一个选择的答案
    return Math.floor(Math.random() * length) + 1
  }
  // 自动选中单选题
  function singleOption() {
    //拿到所有的题
    const problem = document.querySelectorAll('.ui-controlgroup')
    problem.forEach((item) => {
      const option = item.querySelectorAll('.ui-radio')
      option[random(option.length) - 1].click()
    })
  }
  //表格单选题
  function tableSingleOption() {
    //拿到所有的题
    const problem = document.querySelectorAll('[tp="d"]')
    problem.forEach((item) => {
      const option = [...item.querySelectorAll('td')].filter((item, index) => index > 0)
      option[random(option.length) - 1].click()
    })
  }

  // 监听页面跳转
  setInterval(() => {
    const reg = /www.wjx.cn\/vm\/ml0IbRr.aspx/
    if (!reg.test(location.href)) {
      location.href = 'https://www.wjx.cn/vm/ml0IbRr.aspx'
    }
  }, 2000)

  function removeValidation() {
    //监听验证
    console.log('监听验证')
    if (document.querySelector('#nc_1__bg')) {
      console.log('破解滑块中')
      document.querySelector('#SM_POP_1').remove()
      document.querySelector('#SM_BTN_1').click()
    }
    // if (document.querySelector('#SM_BTN_1')) {
    //   document.querySelector('#SM_BTN_1').click()
    // }
  }
  // 自动点击
  setTimeout(() => {
    btnEl.click()
  }, 1000)
})()
