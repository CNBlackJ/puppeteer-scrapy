const puppeteer = require('puppeteer')

async function test () {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto('http://www.digitalgd.com.cn', { timeout: 0 })

	const pageContent = await page.content()

	console.log(pageContent)

	await page.evaluate(() => {
	  const a = '#banner > div.banner-in.banner--pc > div > div > div > p'
	  const res = document.querySelector(a).innerText
	  console.log(res)
	})

	await browser.close()
}

test().then().catch()