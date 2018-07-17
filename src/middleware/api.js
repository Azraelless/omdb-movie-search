import { camelizeKeys } from 'humps'

const createURL = (title, year) => {
  let yearParam = year ? "&y=" + year : ""
  return "http://www.omdbapi.com/?apikey=27d1b7e3&t=" + title + yearParam
}

const callApi = (title, year) => {
  let URL = createURL(title, year)

  return fetch(URL)
    .then(response =>
      response.json().then(json => {
        if (!response.ok || json.Response === "False") {
          return Promise.reject(json)
        }

        const camelizedJson = camelizeKeys(json)
        return Object.assign({}, camelizedJson)
      })
    )
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API'

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const { types, title, year } = callAPI

  if (typeof title !== 'string') {
    throw new Error('Specify a title.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(title, year).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.Error || 'Something bad happened'
    }))
  )
}
