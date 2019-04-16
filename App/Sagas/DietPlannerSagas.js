/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put, select } from 'redux-saga/effects'
import DietPlannerActions from '../Redux/DietPlannerRedux'
import { Selectors } from '../Redux/DietPlannerRedux'
// import { DietPlannerSelectors } from '../Redux/DietPlannerRedux'

export function * login(api, action) {
  const { username, password } = action
  console.log(action, api, username, password)
  const response = yield call(api.login, { identifier: username, password })
  if (response.ok) {
    const { jwt, user } = response.data
    api.setToken(jwt)
    yield put(DietPlannerActions.updateMe(user))
    yield put(DietPlannerActions.loginSuccess())
  } else {
    yield put(DietPlannerActions.loginFailure(response.data.message))
  }

  console.log(response)
}

export function * register(api, action) {
  const { username, password, email } = action
  console.log(action, api, username, password)
  const response = yield call(api.register, { username, password, email })
  if (response.ok) {
    const { jwt, user } = response.data
    api.setToken(jwt)
    yield put(DietPlannerActions.updateMe(user))
    yield put(DietPlannerActions.registerSuccess())
  } else {
    yield put(DietPlannerActions.registerFailure(response.data.message))
  }
  console.log(response)
}

export function * requestDiary(api, action) {
  const { date } = action
  yield put(DietPlannerActions.setFetching(true))
  const response = yield call(api.getDiary, date)
  if (response.ok) {
    yield put(DietPlannerActions.setCurrentDiary(response.data))
  }
  yield put(DietPlannerActions.setFetching(false))
  console.log(response)
}

export function * searchName(api, action) {
  const { name } = action
  yield put(DietPlannerActions.setFetching(true))
  const response = yield call(api.searchName, name)
  if (response.ok) {
    yield put(DietPlannerActions.setSearchResults(response.data))
  }
  yield put(DietPlannerActions.setFetching(false))

  console.log(name, response)
}

export function * searchBarcode(api, action) {
  const { barcode } = action
  yield put(DietPlannerActions.setFetching(true))
  yield put(DietPlannerActions.resetCurrentFood())
  const response = yield call(api.searchBarcode, barcode)
  if (response.ok) {
    if (response.data.length > 0) {
      yield put(DietPlannerActions.setCurrentFood(response.data[0]))
    }
  } 
  yield put(DietPlannerActions.setFetching(false))
  console.log(response)
}

export function * editWeightEntry(api, action) {
  const { id, entry } = action
  yield put(DietPlannerActions.setFetching(true))
  const response = yield call(api.editWeightEntry, id, entry)
  if (response.ok) {

  }
  yield put(DietPlannerActions.setFetching(false))
  console.log(response)
}

export function * createWeightEntry(api, action) {
  const { entry } = action
  yield put(DietPlannerActions.setFetching(true))
  const response = yield call(api.createWeightEntry, entry)
  if (response.ok) {

  }
  yield put(DietPlannerActions.setFetching(false))
  console.log(response)
}

export function * createFood(api, action) {
  const { food, portions=1 } = action
  yield put(DietPlannerActions.setFetching(true))
  const response = yield call(api.createFood, food)
  if (response.ok) {
    const currentDiary = yield select(Selectors.selectCurrentDiary)
    const food = response.data
    const entry = {
      diary: currentDiary.id,
      food: food.id,
      portions
    }
    yield call(api.createEntry, entry)
    const date = yield select(Selectors.selectCurrentDate)
    const response2 = yield call(api.getDiary, date)
    if (response2.ok) {
      yield put(DietPlannerActions.setCurrentDiary(response2.data))
    }
  }
  yield put(DietPlannerActions.setFetching(false))
  console.log(response)
}

export function * updateMyInfo(api, action) {
  const { body } = action
  yield put(DietPlannerActions.setFetching(true))
  const response1 = yield call(api.updateMyInfo, body)
  console.log(response1)
  const response = yield call(api.getMyInfo)
  yield put(DietPlannerActions.updateMe(response.data))
  yield put(DietPlannerActions.setFetching(false))
  console.log(response)
}

export function * createEntry(api, action) {
  const { entry } = action
  yield put(DietPlannerActions.setFetching(true))
  const response = yield call(api.createEntry, entry)
  if (response.ok) {
    const date = yield select(Selectors.selectCurrentDate)
    const response2 = yield call(api.getDiary, date)
    if (response2.ok) {
      yield put(DietPlannerActions.setCurrentDiary(response2.data))
    }
  }
  yield put(DietPlannerActions.setFetching(false))
  console.log(response)
}

export function * editEntry(api, action) {
  const { id, entry } = action
  yield put(DietPlannerActions.setFetching(true))
  const response = yield call(api.editEntry, id, entry)
  if (response.ok) {
    const date = yield select(Selectors.selectCurrentDate)
    const response2 = yield call(api.getDiary, date)
    if (response2.ok) {
      yield put(DietPlannerActions.setCurrentDiary(response2.data))
    }
  }
  yield put(DietPlannerActions.setFetching(false))
  console.log(response)
}

export function * deleteEntry(api, action) {
  const { id } = action
  yield put(DietPlannerActions.setFetching(true))
  const response = yield call(api.deleteEntry, id)
  if (response.ok) {
    const date = yield select(Selectors.selectCurrentDate)
    const response2 = yield call(api.getDiary, date)
    if (response2.ok) {
      yield put(DietPlannerActions.setCurrentDiary(response2.data))
    }
  }
  yield put(DietPlannerActions.setFetching(false))
  console.log(response)
}