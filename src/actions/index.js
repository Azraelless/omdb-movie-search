import { CALL_API } from '../middleware/api'

export const MOVIE_REQUEST = 'MOVIE_REQUEST'
export const MOVIE_SUCCESS = 'MOVIE_SUCCESS'
export const MOVIE_FAILURE = 'MOVIE_FAILURE'

const fetchMovie = (title, year) => ({
  [CALL_API]: {
    types: [ MOVIE_REQUEST, MOVIE_SUCCESS, MOVIE_FAILURE ],
    title: title,
    year: year,
  }
})

export const loadMovie = (title, year) => (dispatch, getState) => {
  return dispatch(fetchMovie(title, year))
}

export const RESET = "RESET"

export const reset = () => (dispatch, getState) => {
  return dispatch({ type: RESET })
}

