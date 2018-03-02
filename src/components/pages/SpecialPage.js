import React, { Component } from 'react'
import withFetch from './../HOCs/withFetch'
import NarrowPage from './NarrowPage'

const SpecialPage = ({ fetchedData }) => {
  const renderPage = (heading, content) => (
    <NarrowPage heading={heading}>
      {content}
    </NarrowPage>
  )

  return (fetchedData && fetchedData.title)
    ? renderPage(fetchedData.title, fetchedData.description)
    : null
}

export default withFetch(SpecialPage)
