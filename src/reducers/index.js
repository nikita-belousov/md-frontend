import { combineReducers } from 'redux'

import paginatedPage from './paginatedPage'
import articlePage from './articlePage'
import specialsSlider from './specialsSlider'
import newsSlider from './newsSlider'
import changingReviews from './changingReviews'

export default combineReducers({
  paginatedPage,
  articlePage,
  specialsSlider,
  newsSlider,
  changingReviews
})
