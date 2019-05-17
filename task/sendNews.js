const fs = require('fs')
const moment = require('moment')
const techweb = require('../dataSrouce/techweb')
const WX = require('../libs/WX')
const wx = new WX()

const rootDir = process.cwd()

async function sendNews () {
  const url = ''
  // 爬取数据
  techweb(url, (newsTitleList) => {
    let content = ``
    newsTitleList.map((ele, i) => {
      content += `${i + 1}、${ele} </br>`
    })
    wx.sendTextMsg({
      reciverList: ['ZhangYeSheng', 'HuangYing'],
      content
    })
  })
}

module.exports = sendNews
