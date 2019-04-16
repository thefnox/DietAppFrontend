import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  login: ['username', 'password'],
  setFetching: ['fetching'],
  register: ['username', 'email', 'password'],
  requestDiary: ['date'],
  createWeightEntry: ['entry'],
  editWeightEntry: ['id', 'entry'],
  searchName: ['name'],
  searchBarcode: ['barcode'],
  updateMe: ['me'],
  updateMyInfo: ['body'],
  createFood: ['food', 'portions'],
  createEntry: ['entry'],
  editEntry: ['id', 'entry'],
  deleteEntry: ['id'],
  setCurrentDiary: ['diary'],
  setSearchResults: ['searchResults'],
  setCurrentEntry: ['entry'],
  setCurrentFood: ['food'],
  resetCurrentFood: null,
  setWeightEntries: ['weightentries'],
  setSearchString: ['search'],
  loginFailure: ['message'],
  registerFailure: ['message'],
  loginSuccess: null,
  logOut: null,
  registerSuccess: null,
  userFailure: null
})

export const DietPlannerTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  me: {
    username: '',
    weight: 0,
    calorieTarget: 0,
    carbTarget: 0,
    proteinTarget: 0,
    fatTarget: 0
  },
  currentDate: '',
  currentDiary: {
    diaryentries: [],
    date: new Date(),
    user: null
  },
  searchString: '',
  searchResults: [],
  weightEntries: [],
  currentEntry: {
    portions: 1,
    food: {
      barcode: null,
      name: '',
      description: '',
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
  },
  currentFood: {
    barcode: null,
    name: '',
    description: '',
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
  },
  loggedIn: false,
  fetching: null,
  error: null,
  username: null,
  password: null,
  email: null
}

/* ------------- Selectors ------------- */

export const Selectors = {
  authed: state => state.dietplanner.loggedIn,
  getError: state => state.dietplanner.error,
  fetching: state => state.dietplanner.fetching,
  selectMe: state => state.dietplanner.me,
  selectCurrentDate: state => state.dietplanner.currentDate,
  selectCurrentDiary: state => state.dietplanner.currentDiary,
  selectCurrentEntry: state => state.dietplanner.currentEntry,
  selectCurrentFood: state => state.dietplanner.currentFood,
  selectSearchResults: state => state.dietplanner.searchResults,
  selectSearchString: state => state.dietplanner.searchString,
  selectWeightEntries: state => state.dietplanner.weightEntries
}

/* ------------- Reducers ------------- */

export const request = (state, { date }) =>
  Object.assign({}, state, { error: null,  fetching: true, date, currentDiary: null })

// successful avatar lookup
export const success = (state, action) => {
  const { avatar } = action
  return Object.assign({}, state, {  error: null, fetching: false, error: null, avatar })
}

export const setDiary = (state, { diary }) => {
  return Object.assign({}, state, { error: null,  fetching: false, currentDiary: diary })
}

export const setSearchResults = (state, { searchResults }) => {
  return Object.assign({}, state, { error: null,  fetching: false, searchResults })
}

export const setCurrentEntry = (state, { entry }) => {
  return Object.assign({}, state, { error: null,  fetching: false, currentEntry: entry })
}

export const setCurrentFood = (state, { food }) => {
  return Object.assign({}, state, {  error: null, error: null,  fetching: false, currentFood: food })
}

export const resetCurrentFood = (state) => {
  return Object.assign({}, state, { error: null,  fetching: false, currentFood: {
    barcode: null,
    name: '',
    description: '',
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
  }})
}

export const setWeightEntries = (state, { weightentries }) => {
  return Object.assign({}, state, {  error: null, fetching: false, weightEntries: weightentries })
}

export const updateMe = (state, { me }) => {
  return Object.assign({}, state, { me })
}

export const setSearchString = (state, { search }) => {
  return Object.assign({}, state, {  error: null, fetching: false, searchString: search })
}

export const login = (state, { username, password }) => {
  return Object.assign({}, state, { username, password })
}

export const register = (state, { username, email, password }) => {
  return Object.assign({}, state, { username, email, password })
}

export const loginFailure = (state, { message }) => {
  return Object.assign({}, state, { error: message })
}

export const registerFailure = (state, { message }) => {
  return Object.assign({}, state, { error: message })
}

export const loginSuccess = (state) => {
  return Object.assign({}, state, { loggedIn: true })
}

export const logOut = (state) => {
  return Object.assign({}, state, { loggedIn: false, me: {
    username: '',
    weight: 0,
    calorieTarget: 0,
    carbTarget: 0,
    proteinTarget: 0,
    fatTarget: 0
  }, username: null, email: null, password: null})
}

export const registerSuccess = (state) => {
  return Object.assign({}, state, { loggedIn: true })
}

export const requestDiary = (state, {date}) => {
  return Object.assign({}, state, {currentDate: date })
}

export const setFetching = (state, { fetching }) => {
  return Object.assign({}, state, { fetching })
}

// failed to get the avatar
export const failure = (state) =>
  Object.assign({}, state, { fetching: false, error: true, avatar: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_DIARY]: requestDiary,
  [Types.SET_CURRENT_DIARY]: setDiary,
  [Types.SET_SEARCH_RESULTS]: setSearchResults,
  [Types.SET_CURRENT_ENTRY]: setCurrentEntry,
  [Types.SET_CURRENT_FOOD]: setCurrentFood,
  [Types.RESET_CURRENT_FOOD]: resetCurrentFood,
  [Types.SET_WEIGHT_ENTRIES]: setWeightEntries,
  [Types.SET_SEARCH_STRING]: setSearchString,
  [Types.LOGIN]: login,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.REGISTER]: register,
  [Types.REGISTER_SUCCESS]: registerSuccess,
  [Types.REGISTER_FAILURE]: registerFailure,
  [Types.UPDATE_ME]: updateMe,
  [Types.LOG_OUT]: logOut,
  [Types.SET_FETCHING]: setFetching
})
