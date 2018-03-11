const fetch = require('node-fetch')
const fs = require('fs')

const categoriesToIds = {
  'терапия': '5aa011230c8d66733cd7524c',
  'детская стоматология': '5aa0113e0c8d66733cd75252',
  'ортопедическая стоматология': '5aa011170c8d66733cd7524a',
  'хирургическая стоматология': '5aa0112f0c8d66733cd7524f',
  'имплантация и операция на альвеолярном отростке': '5aa011110c8d66733cd75249',
  'пародонтологическая стоматология': '5aa185942e70495974bff013',
  'ортодонтия': '5aa185d82e70495974bff014'
}

let order
let prevCategory

fs.readFile('pricelist.json', 'utf-8', (err, data) => {
  JSON.parse(data).forEach(e => {
    if (e.category !== prevCategory) {
      order = 0
      prevCategory = e.category
    }

    fetch('http://localhost:1337/service', {
      method: 'POST',
      body: JSON.stringify({
        order: order++,
        title: e.service,
        category: categoriesToIds[e.category],
        price: e.price,
        isSocial: false
      }),
      headers: { 'content-type': 'application/json' }
    })
  })
})
