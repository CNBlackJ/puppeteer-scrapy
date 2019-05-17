const cron = require('node-cron')
const sendNews = require('./task/sendNews')
 
cron.schedule('0 0 09 * * *', () => {
  sendNews()
    .then(() => console.log('send news done.'))
    .catch(e => console.log(`send news error: ${JSON.stringify(e)}`))
})