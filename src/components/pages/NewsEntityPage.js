import React, { Component } from 'react'
import styles from './../../styles/components/pages/NewsEntityPage.css'
import Paragraph from './../common/Paragraph'
import NarrowPage from './NarrowPage'
import withFetch from './../HOCs/withFetch'

const NewsEntityPage = ({ fetchedData }) => {
  const { heading, text, datePublished } = fetchedData

  return (
    <NarrowPage
      textOnly
      heading={heading}
    >
      <Paragraph>{text}</Paragraph>
    </NarrowPage>
  )
}

export default withFetch(NewsEntityPage)
