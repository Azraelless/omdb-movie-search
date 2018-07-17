import merge from 'lodash/merge'
import { combineReducers } from 'redux'
import { RESET } from '../actions';

const entities = (state = {} , action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
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
  entities,
  errorMessage
})

export default rootReducer
