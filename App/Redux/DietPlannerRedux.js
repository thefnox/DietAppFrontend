import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userRequest: ['username'],
  userSuccess: ['avatar'],
  userFailure: null
})

export const GithubTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  me: {
    username: '',
    weight: 0,
    calorieTarget: 0,
    carbTarget: 0,
    proteinTarget: 0,
    fatTarget: 0
  },
  currentDiary: {
    diaryEntries: [],
    date: new Date(),
    user: null
  },
  currentEntry: {
    portions: 1
    food: {}
  },
  currentFood: {
    barcode: null,
    name: '',
    description: ''
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
    sodium: 0,
    sugar: 0,
    fiber: 1,
    vitaminA: 0,
    vitaminC: 0,
    vitaminB12: 0,
    vitaminD: 0,
    potassium: 0,
    saturatedFat: 0,
    transFat: 0,
    portion: 1
  }
  fetching: null,
  error: null,
  username: null
})

/* ------------- Selectors ------------- */

export const GithubSelectors = {
  selectMe: state => state.me,
  selectCurrentDiary: state => state.currentDiary,
  selectCurrentEntry: state => state.currentEntry,
  selectAvatar: state => state.github.avatar
}

/* ------------- Reducers ------------- */

// request the avatar for a user
export const request = (state, { username }) =>
  state.merge({ fetching: true, username, avatar: null })

// successful avatar lookup
export const success = (state, action) => {
  const { avatar } = action
  return state.merge({ fetching: false, error: null, avatar })
}

// failed to get the avatar
export const failure = (state) =>
  state.merge({ fetching: false, error: true, avatar: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: request,
  [Types.USER_SUCCESS]: success,
  [Types.USER_FAILURE]: failure
})
