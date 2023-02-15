/*
 * @Author: ZhangYuHua
 * @Date: 2023-02-15 17:01:05
 * @LastEditors: ZhangYuHua
 * @LastEditTime: 2023-02-15 19:48:24
 * @Note: 未添加注意事项
 * @Description: 自动答问卷星脚本
 */

const btnEl = document.createElement('button')
btnEl.textContent = '开始答题'
btnEl.style.cssText =
  'width:100px;height:50px;position:absolute;top:0;left:50%;background:beige;transform: translateX(-50%)'
btnEl.addEventListener('click', () => {
  singleOption()
  tableSingleOption()
  document.querySelector('#ctlNext').click()
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
