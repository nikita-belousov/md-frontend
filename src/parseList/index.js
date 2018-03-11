const fs = require('fs')
const htmlparser = require('htmlparser2')

const formatString = (str) => str
  .split('&nbsp;')
  .filter(e => e)
  .join(' ')
  .trim()
  .split(',')
  .map(e => e.trim())
  .join(', ')
  .split('.')
  .map(e => e.trim())
  .join('. ')
  .split('(')
  .map(e => e.trim())
  .join(' (')

const formatPrice = (price) => parseInt(
  price
    .split('')
    .filter(c => ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(c))
    .slice(0, -2)
    .join('')
)

let result = []

let currentType
let currentCategory
let currentService
let currentPrice

const parser = new htmlparser.Parser({
  onopentag(name, attributes) {
    switch(attributes.class) {
      case 'et5':
        currentType = 'category'
        break
      case 'et2':
        currentType = 'service'
        break
      case 'et6':
        currentType = 'price'
        break
      default:
        currentType = undefined
        break
    }
  },
  onclosetag(name, attributes) {
    if (currentType) currentType = undefined

    if (name === 'tr') {
      result.push({
        category: currentCategory,
        service: currentService,
        price: currentPrice
      })

      currentService = undefined
      currentPrice = undefined
    }
  },
  ontext(str) {
    switch(currentType) {
      case 'category':
        currentCategory = formatString(str).toLowerCase()
        break
      case 'service':
        currentService = formatString(str)
        break
      case 'price':
        currentPrice = formatPrice(str)
        break
      default:
        break
    }
  }
})

fs.readFile('source.txt', 'utf-8', (err, data) => {
  parser.write(data)

  result = result.filter(e => e.price)
  fs.writeFile('pricelist.json', JSON.stringify(result, null, 2), err => console.log)
})

parser.end()
