import {
  STAFF_PAGE_LOADED
} from './../constants/actionTypes'

export default (state = {}, action) => {
  switch(action.type) {
    case STAFF_PAGE_LOADED:
      return {
        ...state,
        staff: action.payload.docs || [],
        count: action.payload.count || 0
      }
    case STAFF_PAGE_LOADED:
      return {}
    default:
      return state
  }
}
