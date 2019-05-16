const puppeteer = require('puppeteer')
const fs = require('fs')

async function scrapy (url) {
  const targetUrl = url || 'https://wemp.app/posts/985191ae-a778-422c-83e7-1e027c215bff'

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(targetUrl, {
    timeout: 0
  })

  const pageContent = await page.content()
  console.log(pageContent)

  fs.writeFile('./index.html', pageContent, err => {
    if (err) console.log(err)
  })

  await page.goto(`file://${process.cwd()}/index.html`)

  return page.evaluate(() => {
    const topNewsTitleSelector = '#content > section > section > section > section:nth-child(1) > section > section > section > section > section > section:nth-child(2) > section > section > section:nth-child(2) > p'
    const topNewsTitle = document.querySelector(topNewsTitleSelector)
    console.log(topNewsTitle)
    return topNewsTitle
  })

  // return page.evaluate(() => {
  //   const allNews = []

  //   const topNewsTitleSelector = '#content > section > section > section > section:nth-child(1) > section > section > section > section > section > section:nth-child(2) > section > section > section:nth-child(2) > p'
  //   const topNewsSelector = '#content > section > section > section > section:nth-child(1) > section > section > section > section > section > section:nth-child(3) > section > p:nth-child(n) > span'
  //   const topNewsTitle = document.querySelector(topNewsTitleSelector).innerText
  //   const topNewsElements = document.querySelectorAll(topNewsSelector)
  //   const topNewsList = []
  //   for (let ele of topNewsElements) topNewsList.push(ele.innerText)
  //   allNews.push({ category: topNewsTitle, newsList: topNewsList })

  //   const categorySelector = `#content > section > section > section > section:nth-child(${(3 * i) + 4}) > section > section > strong > section > p`
  //   const categoryElements = document.querySelectorAll(categorySelector)
  //   for (let i = 0; i < categoryElements.length; i++) {
  //     const categoryEle = categoryElements[i]
  //     const category = categoryEle.innerText
  //     const newsSelector = `#js_content > section > section > section > section:nth-child(${(3 * i) + 4}) > section > p:nth-child(n) > span`
  //     const newsElements = document.querySelectorAll(newsSelector)
  //     const newsList = []
  //     for (let newsEle of newsElements) newsList.push(newsEle.innerText)
  //     allNews.push({ category, newsList })
  //   }
  //   return allNews
  // })
}

scrapy().then(r => console.log(JSON.stringify(r))).catch(e => console.log(e))
// module.exports = scrapy
