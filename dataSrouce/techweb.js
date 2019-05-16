const Feed = require('rss-to-json')
const fs = require('fs')
const moment = require('moment')
const rootDir = process.cwd()

async function techweb (url, cb) {
  const baseUrl = url || 'http://www.techweb.com.cn/rss/hotnews.xml'
  Feed.load(baseUrl, async (err, rss) => {
    if (err) console.log(err)
    const filename = `${rootDir}/newsData/techweb/${moment().format('YYYYMMDD')}.json`
    await fs.writeFileSync(filename, JSON.stringify(rss), 'utf8')
    const news = rss.items
    const newsTitleList = news.map(item => item.title).sort((a, b) => b.length - a.length).slice(0, 10)
    cb(newsTitleList)
  })
}

module.exports = techweb
