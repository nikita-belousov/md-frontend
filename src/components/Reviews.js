import React from 'react'
import Review from './Review'
import withFetch from './HOCs/withFetch'

const Reviews = (props) => (
  <div>
    {props.fetchedData.map(review =>
      <Review
        key={review._id}
        {...review}
      />
    )}
  </div>
)

export default withFetch(Reviews)
