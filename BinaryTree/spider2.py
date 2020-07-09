"""
爬虫
author: 周小夏（CV调包侠）
"""
import requests
from lxml import etree
import xlwt
# from xlutils.copy import copy
import xlrd
import csv
import pandas as pd
import time

class LanjiaSpider:
    def __init__(self):
        self.url = 'https://wh.lianjia.com/ershoufang/ronganxian/pg{}/'
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36"}

    def get_response_spider(self, url_str):  # 发送请求
        get_response = requests.get(self.url, headers=self.headers)
        time.sleep(2)
        response = get_response.content.decode()
        html = etree.HTML(response)
        return html
    def get_content_html(self, html):  # 使xpath获取数据
        self.houseInfo = html.xpath('//div[@class="houseInfo"]/text()')
        self.title = html.xpath('//div[@class="title"]/a/text()')
        self.positionInfo = html.xpath('//div[@class="positionInfo"]/a/text()')
        self.totalPrice = html.xpath('//div[@class="totalPrice"]/span/text()')
        self.unitPrice = html.xpath('//div[@class="unitPrice"]/span/text()')
        self.followInfo = html.xpath('//div[@class="followInfo"]/text()')
        self.tag = html.xpath('//div[@class="tag"]/span/text()')
        # print(title)
        # return houseInfo,title,positionInfo,totalPrice,unitPrice,followInfo,tag

    def xpath_houseInfo(self):
        #print(self.houseInfo)
        #print(type(self.houseInfo))
        # df = pd.DataFrame({"houseInfo": self.houseInfo,"tite":self.title,"positionInfo":self.positionInfo,"totaPrice":self.totalPrice,"unitPrice":self.unitPrice,"followInfo":self.followInfo,"tag":self.tag})
        # df=pd.DataFrame({"houseInfo": self.houseInfo,"tite":self.title})
        # df.to_excel(r'C:\Users\wy\Desktop\sublime\链家\pand3.xlsx')
        # a=len(self.houseInfo)
        for i in range(len(self.houseInfo)):
            # print(i)
            # yield i
            # print(type(self.houseInfo))
            yield self.houseInfo[i]

    def qingxi_data_houseInfo(self):  # 清洗数据

        self.xpath_houseInfo()
        self.xpath_title()
        self.xpath_positionInfo()
        self.xpath_totalPrice()
        self.xpath_unitPrice()
        self.xpath_followInfo()
        self.xpath_tag()
        get_houseInfo = self.xpath_houseInfo()
        get_title = self.xpath_title()
        get_positionInfo=self.xpath_positionInfo()
        get_totalPrice = self.xpath_totalPrice()
        get_unitPrice = self.xpath_unitPrice()
        get_followInfo=self.xpath_followInfo()
        get_tag=self.xpath_tag()
        i = 1
        while True:
            data_houseInfo= next(get_houseInfo)
            data_title=next(get_title)
            data_positionInfo=next(get_positionInfo)
            data_totalPrice=next(get_totalPrice)
            data_unitPrice=next(get_unitPrice)
            data_followInfo=next(get_followInfo)
            data_tag=next(get_tag)

            with open("ronganxian.csv", "a", newline="", encoding="utf-8-sig") as f:
                fieldnames = ['houseInfo', 'title', 'positionInfo', 'totalPrice/万元', 'unitPrice', 'followInfo', 'tag']
                writer = csv.DictWriter(f, fieldnames=fieldnames)  # 写入表头
                writer.writeheader()
                list_1 = ['houseInfo', 'title', 'positionInfo', 'totalPrice/万元', 'unitPrice', 'followInfo', 'tag']
                list_2 = [data_houseInfo,data_title,data_positionInfo,data_totalPrice,data_unitPrice,data_followInfo,data_tag]
                list_3 = dict(zip(list_1, list_2))
                writer.writerow(list_3)
                print("写入第"+str(i)+"行数据")
            i += 1
            if i > len(self.houseInfo):
                break

    def xpath_title(self):
        for i in range(len(self.title)):
            yield self.title[i]

    def xpath_positionInfo(self):
        for i in range(len(self.positionInfo)):
            yield self.positionInfo[i]

    def xpath_totalPrice(self):
        for i in range(len(self.totalPrice)):
            yield self.totalPrice[i]
    def xpath_unitPrice(self):
        for i in range(len(self.unitPrice)):
            yield self.unitPrice[i]
    def xpath_followInfo(self):
        for i in range(len(self.followInfo)):
            yield self.followInfo[i]
    def xpath_tag(self):
        for i in range(len(self.tag)):
            yield self.tag[i]
    def run(self):
        i = 1
        while True:
            url_str = self.url.format(i)  # 构造请求url
            html = self.get_response_spider(url_str)
            self.get_content_html(html)
            self.qingxi_data_houseInfo()

            i += 1
            if i == 100:  # 不包括57页
                break


if __name__ == "__main__":
    lanjia = LanjiaSpider()
    lanjia.run()
