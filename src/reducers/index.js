import merge from 'lodash/merge'
import { combineReducers } from 'redux'
import { RESET } from '../actions';

const movie = (state = {} , action) => {
  if (action.response) {
    return merge({}, state, action.response)
  }
  if (action.type === RESET)
    return {}

  return state
}

const errorMessage = (state = null, action) => {
  const { type, error } = action

  if (type === RESET)
    return null

  if (error) {
    return error
  }

  return state
}

const rootReducer = combineReducers({
  movie,
  errorMessage
})

export default rootReducer
