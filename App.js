import React, { Component } from 'react'

const digitToLetter = {
  '0': ['н', 'ф'],
  '1': ['к', 'л'],
  '2': ['л', 'щ'],
  '3': ['т', 'р', 'м'],
  '4': ['ч', 'з'],
  '5': ['п', 'й'],
  '6': ['ш', 'ц'],
  '7': ['с', 'б'],
  '8': ['в', 'г'],
  '9': ['д', 'ж']
}

const wordBaseFile = 'noun-base.txt'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { data: this.initData() }
  }

  initData() {
    
  }

  render() {

  }
}

export default App
