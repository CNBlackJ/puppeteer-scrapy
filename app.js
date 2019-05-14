const puppeteer = require('puppeteer')

async function test () {

  const targetUrl = 'https://mp.weixin.qq.com/s/Y3riqoHoMxqlH6K75cV42A'

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(targetUrl)
  
  return page.evaluate(() => {
    const allNews = []

    const topNewsTitleSelector = '#js_content > section > section > section > section:nth-child(1) > section > section > section > section > section > section:nth-child(2) > section > section > section:nth-child(2) > p > span > strong'
    const topNewsSelector = '#js_content > section > section > section > section:nth-child(1) > section > section > section > section > section > section:nth-child(3) > section > p:nth-child(n) > span'
    const topNewsTitle = document.querySelector(topNewsTitleSelector).innerText
    const topNewsElements = document.querySelectorAll(topNewsSelector)
    const topNewsList = []
    for (let ele of topNewsElements) topNewsList.push(ele.innerText)
    allNews.push({ category: topNewsTitle, newList: topNewsList })

    const categorySelector = '#js_content > section > section > section > section:nth-child(n) > section > section > strong > section > p'
    const categoryElements = document.querySelectorAll(categorySelector)
    for (let i = 0; i < categoryElements.length; i++) {
      const categoryEle = categoryElements[i]
      const category = categoryEle.innerText
      const newsSelector = `#js_content > section > section > section > section:nth-child(${(3*i)+4}) > section > p:nth-child(n) > span`
      const newsElements = document.querySelectorAll(newsSelector)
      const newsList = []
      for (let newsEle of newsElements) newsList.push(newsEle.innerText)
      allNews.push({ category, newsList })
    }
    return allNews
  })
}

test().then(r => console.log(JSON.stringify(r))).catch(e => console.log(e))