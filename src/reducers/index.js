import { combineReducers } from 'redux'

import paginatedPage from './paginatedPage'
import articlePage from './articlePage'
import specialsSlider from './specialsSlider'
import newsSlider from './newsSlider'

export default combineReducers({
  paginatedPage,
  articlePage,
  specialsSlider,
  newsSlider
})
