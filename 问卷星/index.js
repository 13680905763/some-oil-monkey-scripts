// ==UserScript==
// @name         问卷星自动答题
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
  // 单选题
  function singleProblem(problem) {
    // 所有选项
    const options = problem.querySelectorAll('.ui-radio')
    // 随机点一个
    options[random(options.length) - 1].click()
  }
  // 多选题
  function manyProblem(problem) {
    // 所有选项
    const options = shuffle([...problem.querySelectorAll('a')])
    // 随机生成要点几个
    const clickTime = random(options.length)
    // 随机点几个
    for (let i = 0; i < clickTime; i++) {
      options[i].click()
    }
  }
  // 下拉框题
  function selectProblem(problem) {
    console.log('---下拉框---未写')
    // console.log(problem)
    // document.querySelector('.selection').querySelector('span').click()
    // console.log(problem)
    // const select = [...problem.querySelectorAll('option')].filter((_, index) => index > 0)
    // select[random(select.length) - 1].click()
  }
  // 量表题
  function scaleProblem(problem) {
    const options = problem.querySelector('ul').querySelectorAll('li')
    // 随机点一个
    options[random(options.length) - 1].click()
  }
  // 矩形单选
  function rSingleProblem(problem) {
    const rows = [...problem.querySelectorAll('[tp="d"]')]
    rows.forEach((row) => {
      const options = row.querySelectorAll('a')
      options[random(options.length) - 1].click()
    })
  }
  // 排序题
  function sortProblem(problem) {
    console.log('排序题还没写完')
    console.log(problem[1].click())
    problem[1].click()
    // const problem = document.querySelector('.ui-listview').querySelectorAll('li')
    // const options = problem.querySelectorAll('li')
    // console.log(options[0], options[1], options[2])
    // options[1].click()
    // console.log(options[0])
    // options[0].click()
    // options[2].click()
    // console.log(options[0], options[1], options[2])
    // const arr = [...new Array(options.length).keys()]
    // arr.forEach((i) => {
    //   document.querySelector('.ui-listview').querySelectorAll('li')[i].click?.()
    // })
    // arr.forEach((a) => {
    //   console.log(options[a])
    //   options[a].querySelector('input').checked = true
    // })
  }
  //题型映射
  const map = {
    3: singleProblem,
    4: manyProblem,
    5: scaleProblem,
    6: rSingleProblem,
    7: selectProblem,
    11: sortProblem
  }
  // 初始化答题次数
  if (!localStorage.getItem('submitTime')) {
    localStorage.setItem('submitTime', 0)
  }
  // 初始化执行次数
  if (!localStorage.getItem('runTime')) {
    localStorage.setItem('runTime', 0)
  }
  // 初始化问卷地址
  if (!localStorage.getItem('pageUrl')) {
    localStorage.setItem('pageUrl', location.href)
  }
  // 从localStorage拿到当前答题次数
  let submitTime = localStorage.getItem('submitTime')
  // 自动答卷的次数
  let runTime = localStorage.getItem('runTime')
  // 问卷地址
  let pageUrl = localStorage.getItem('pageUrl')
  // 拿到提交按钮
  const submit = document.querySelector('#ctlNext')

  //绘制div
  const divEl = document.createElement('div')
  divEl.style.cssText = 'position:absolute;top:5rem;left:1.25rem;text-align:center;'
  divEl.textContent = `已完成${submitTime}次提交`
  // 绘制btn点击按钮
  const btnEl = document.createElement('button')
  btnEl.textContent = `开始运行`
  btnEl.style.cssText =
    'width:100%;height:1.875rem;display:block;background:rgb(64,150,255);border:0;margin-top:.125rem;'

  // 如果是第一次进入，绘制input框
  if (submitTime == 0) {
    const inputEl = document.createElement('input')
    inputEl.type = 'number'
    inputEl.placeholder = '请输入自动填写的份数'
    inputEl.style.cssText = 'display:block'
    divEl.appendChild(inputEl)
  }
  divEl.appendChild(btnEl)

  document.querySelector('body').appendChild(divEl)

  // 监听btn点击事件
  btnEl.addEventListener('click', () => {
    if (runTime == 0) {
      const inputValue = divEl.querySelector('input')?.value
      if (inputValue) {
        localStorage.setItem('runTime', inputValue)
        // 开始答题
        resolveProblem()
      } else {
        alert('请输入需要执行的次数')
      }
    } else if (submitTime < runTime) {
      // 当前答题次数小于目标答题次数
      // 继续答题
      resolveProblem()
    } else {
      console.log('执行完毕')
      clearInterval(listenUrl)
      localStorage.removeItem('submitTime')
      localStorage.removeItem('runTime')
      localStorage.removeItem('pageUrl')
      alert('脚本执行完毕，请关闭当前窗口')
    }
  })

  // 打乱数组
  function shuffle(a) {
    var length = a.length
    var shuffled = Array(length)
    for (var index = 0, rand; index < length; index++) {
      rand = ~~(Math.random() * (index + 1))
      if (rand !== index) shuffled[index] = shuffled[rand]
      shuffled[rand] = a[index]
    }
    return shuffled
  }
  function random(length) {
    // 传入选项个数，随机生成一个选择的答案
    return Math.floor(Math.random() * length) + 1
  }
  // 答题函数
  function resolveProblem() {
    const promise = new Promise((resolve, reject) => {
      // 拿到所有的题
      const problems = document.querySelectorAll('.ui-field-contain')
      problems.forEach((problem) => {
        map[problem.getAttribute('type')]?.(problem)
      })
      submit.click()
      setTimeout(() => {
        // 遮罩层
        const layui = document.querySelector('.layui-layer-shade')
        // 验证按钮
        const verificationBtn = document.querySelector('#rectMask')
        // const slider = document.querySelector('#SM_POP_1')
        // if (slider) {
        //   reject('抱歉无法移除滑块。。。')
        // }
        if (layui || verificationBtn) {
          // 有点击验证
          reject([layui, verificationBtn])
        } else {
          resolve()
        }
      }, 1000)
    })
    promise.then(
      (res) => {
        console.log('提交成功')
        localStorage.setItem('submitTime', ++submitTime)
      },
      (e) => {
        console.log('验证中...')
        e[0]?.remove()
        e[1]?.click()
      }
    )
  }

  // 监听页面跳转
  const listenUrl = setInterval(() => {
    console.log('监听url...')
    if (location.href !== pageUrl) {
      location.href = pageUrl
    }
  }, 2000)

  // 自动点击
  setTimeout(() => {
    if (submitTime <= runTime && runTime !== '0') {
      console.log('按钮点击')
      btnEl.click()
    }
  }, 1000)
})()
