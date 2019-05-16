const querystring = require('querystring')
const { corpid, corpsecret } = require('../config/default.js')
const baseConfig = {
  corpid,
  corpsecret
}
const agentid = 1000006

const request = require('axios')

class WX {
  async getAccessToken () {
    const payload = baseConfig
    const getTokenUrl = `https://qyapi.weixin.qq.com/cgi-bin/gettoken?${querystring.stringify(payload)}`
    const resp = (await request.post(getTokenUrl)).data
    const accessToken = !resp.errocode ? resp.access_token : ''
    if (!accessToken) console.error('get access token error: ', resp)
    return accessToken
  }

  async sendTextMsg ({ reciverList = [], partyList = [], tagList = [], content }) {
    const accessToken = await this.getAccessToken()
    const touser = reciverList.join('|')
    const toparty = partyList.join('|')
    const totag = tagList.join('|')
    const payload = {
      touser,
      toparty,
      totag,
      agentid,
      text: {
        content
      },
      msgtype: "text",
      safe: 0
    }
    const url = `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${accessToken}`
    const resp = (await request.post(url, payload)).data
    return resp
  }
}

module.exports = WX