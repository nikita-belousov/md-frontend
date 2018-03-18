import React from 'react'
import Specials from './../sections/Specials'
import About from './../sections/About'

const HomePage = () => (
  <div>
    <Specials api='special?_sort=datePublished:desc' />
    <About />
  </div>
)

export default HomePage
