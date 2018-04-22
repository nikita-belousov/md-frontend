import { combineReducers } from 'redux'
import paginatedPage from './paginatedPage'
import articlePage from './articlePage'

export default combineReducers({
  paginatedPage,
  articlePage
})
