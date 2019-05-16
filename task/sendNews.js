const fs = require('fs')
const moment = require('moment')
const scrapy = require('../libs/scrapy')
const WX = require('../libs/WX')
const wx = new WX()

const rootDir = process.cwd()

async function sendNews () {
  const url = ''
  // 爬取数据
  let isAllRight = true
  const news = await scrapy(url)
  // 检查数据的正确性
  if (!news || !news.length) {
    console.log('cannot get news')
    isAllRight = false
  }
  const newsList = news.map(item => {
    if (item.category && item.newsList.length) {
      return item
    }
  })
  console.log(newsList)
  if (isAllRight) {
    // 保存本地文件
    const filename = `${rootDir}/newsData/${moment().format('YYYYMMDD')}.json`
    fs.writeFile(filename, JSON.stringify(news), 'utf8', (err) => {
      if (err) return console.log(err)
      wx.sendTextMsg({
        reciverList: ['ZhangYeSheng'],
        content: JSON.stringify(news)
      })
    })
  }
}

sendNews().then().catch()
