import random
import time

from selenium.webdriver.chrome.service import Service
from selenium import webdriver


def setDriver():
    option = webdriver.ChromeOptions()
    option.add_experimental_option('excludeSwitches', ['enable-automation'])
    option.add_experimental_option('useAutomationExtension', False)
    driver = webdriver.Chrome(options=option, executable_path=r"D:\AQA-project\epidemic\epidemic-python\venv\Lib\site-packages\selenium\webdriver\chrome\chromedriver.exe")
    driver.execute_cdp_cmd('Page.addScriptToEvaluateOnNewDocument',
                           {'source': 'Object.defineProperty(navigator, "webdriver", {get: () => undefined})'
                            })
    return driver


# 随机单选  （driver，第几题开始，几次）
def oneCheck_random(html, id, num):
    for i in range(num):
        # 题目box
        problem = html.find_element_by_id(f'div{id + i}')
        # 选项列表
        singleOption = problem.find_element_by_class_name('ui-controlgroup')
        # 选项
        items = singleOption.find_elements_by_class_name('ui-radio')
        # 选取随机数点击
        items[random.randint(0, len(items) - 1)].click()


# 随机多选  （driver，第几题开始，几次）
def moreCheck_random(html, id, num):
    for i in range(num):
        # 题目box
        problem = html.find_element_by_id(f'div{id + i}')
        # 选项列表
        singleOption = problem.find_element_by_class_name('ui-controlgroup')
        # 选项
        items = singleOption.find_elements_by_class_name('ui-checkbox')
        # 选取随机数点击
        for j in range(random.randint(1, len(items) - 1)):
            items[j].click()


# 指定单选  （driver，题号,哪个选项）
def oneCheck_appoint(html, id, number):
    problem = html.find_element_by_id(f'div{id}')
    # 选项列表
    singleOption = problem.find_element_by_class_name('ui-controlgroup')
    # 选项
    items = singleOption.find_elements_by_class_name('ui-radio')
    # 选取随机数点击
    items[number-1].click()


# td单选 (xx,题号，点几次，选项有几个)
def TdCheck_random(html, id, numCheck, optionNum):
    for i in range(numCheck):
        tr = html.find_element_by_id(f'drv{id}_{i + 1}')
        tds = tr.find_elements_by_tag_name('td')
        tds[random.randint(1, optionNum)].click()


def scale_random(html, id, num):
    for i in range(num):
        # 题目box
        problem = html.find_element_by_id(f'div{id + i}')
        # 选项列表
        singleOption = problem.find_element_by_class_name('scale-div')
        # 选项
        items = singleOption.find_elements_by_class_name('td')
        # 选取随机数点击
        items[random.randint(0, len(items) - 1)].click()


# 提交操作
def submit(html):
    time.sleep(1)
    html.find_element_by_id('ctlNext').click()
    time.sleep(1)
    if html.find_element_by_class_name('layui-layer-btn0'):
        html.find_element_by_class_name('layui-layer-btn0').click()
    html.find_element_by_id('rectMask').click()
    time.sleep(3)
    html.quit()


if __name__ == '__main__':
    # 编写模拟代码
    def autoTable():
        Driver = setDriver()
        Driver.get('https://www.wjx.cn/vm/hbksedY.aspx')
        # 随机
        oneCheck_random(Driver, 1, 4)
        # 指定
        oneCheck_appoint(Driver, 5, 1)
        oneCheck_random(Driver, 6, 1)
        # 下一页
        Driver.find_element_by_id('divNext').click()
        oneCheck_random(Driver, 7, 4)
        TdCheck_random(Driver, 11, 5, 4)
        oneCheck_random(Driver, 12, 1)
        moreCheck_random(Driver, 13, 1)
        oneCheck_random(Driver, 14, 1)
        moreCheck_random(Driver, 15, 1)
        oneCheck_random(Driver, 16, 4)
        # 下一页
        Driver.find_element_by_id('divNext').click()
        scale_random(Driver, 20, 10)
        oneCheck_appoint(Driver, 30, 2)
        # 提交
        submit(Driver)

    # 次数
    for i in range(5):
        autoTable()
        print(f'提交第{i+1}次问卷')
