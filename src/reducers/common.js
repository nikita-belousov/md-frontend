import {
  SERVICE_CATEGORIES_LOADED,
  SERVICE_CATEGORIES_UNLOADED
} from './../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case SERVICE_CATEGORIES_LOADED:
      return {
        ...state,
        serviceCategories: action.payload.docs || []
      }
    case SERVICE_CATEGORIES_UNLOADED:
      return {
        ...state,
        serviceCategories: []
      }
    default:
      return state
  }
}
