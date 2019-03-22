'use strict';
const cheerio = require('cheerio')
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
const mongoose = require('mongoose')
const db = mongoose.connection
const Promo = require('./model')
mongoose.connect('mongodb://localhost/promo') 
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

const getData = html => {
  const $ = cheerio.load(html)
  db.dropCollection("promos", (error, result) => {

    if(error)
      console.log("Collection created")
    else
      console.log("Refresh collection")

    let counter = 0
    $('ul#tabs li').each(async (index, value) => {
      const promo = new Promo({
        category: $(value).text()
      })
      $('#'+$(value).attr('title')).find('.promo-card').each((index, value) => {
        promo.product.push({
          title: $(value).find('h2').text(),
          date: $(value).find('.date').text(),
          banner: $(value).find('img').attr('src')
        })
      })
      await promo.save()
      if(++counter == $('ul#tabs li').length){
        console.log('Promo in each category has been inserted')
        process.exit(0)
      }
    })
  })
}