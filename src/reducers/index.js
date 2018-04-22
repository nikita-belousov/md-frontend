import { combineReducers } from 'redux'

import paginatedPage from './paginatedPage'
import articlePage from './articlePage'
import specialsSlider from './specialsSlider'

export default combineReducers({
  paginatedPage,
  articlePage,
  specialsSlider
})
