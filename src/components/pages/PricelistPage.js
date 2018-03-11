import React from 'react'
import NarrowPage from './NarrowPage'
import PricelistContainer from './../containers/PricelistContainer'

const PricelistPage = ({ api }) => (
  <NarrowPage heading='прайслист'>
    <PricelistContainer api={api} />
  </NarrowPage>
)

export default PricelistPage
