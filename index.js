const cheerio = require('cheerio')
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
const mongoose = require('mongoose')
const Promo = require('./model')
mongoose.connect('mongodb://localhost/promo'); 
const url = 'https://dana.id'

nightmare
  .goto(url)
  .click('a.navbar-item[href="/promo"]')
  .wait(4000)
  .wait('body')
  .evaluate(() => document.querySelector('body').innerHTML)
  .end()
  .then(result => {
    getData(result)
  })
  .catch(error => {
    console.error(error)
  })

let getData = html => {
  const $ = cheerio.load(html)
  $('.promo-tab .promo-card').each((i, val) => {
    const promo = new Promo({
      title: $(val).find('h2').text(),
      date: $(val).find('.date').text(),
      banner: $(val).find('img').attr('src')
    });
    promo.save();
  })
}