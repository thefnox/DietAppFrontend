import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { DietPlannerTypes } from '../Redux/DietPlannerRedux'
import { StartupTypes } from '../Redux/StartupRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { 
  login, 
  register,
  requestDiary,
  searchName,
  searchBarcode,
  editWeightEntry,
  createWeightEntry,
  createFood,
  createEntry,
  editEntry,
  deleteEntry,
  updateMyInfo
} from './DietPlannerSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create('https://dietschemer.com')

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup, api),
    takeLatest(DietPlannerTypes.LOGIN, login, api),
    takeLatest(DietPlannerTypes.REGISTER, register, api),
    takeLatest(DietPlannerTypes.REQUEST_DIARY, requestDiary, api),
    takeLatest(DietPlannerTypes.SEARCH_NAME, searchName, api),
    takeLatest(DietPlannerTypes.SEARCH_BARCODE, searchBarcode, api),
    takeLatest(DietPlannerTypes.EDIT_WEIGHT_ENTRY, editWeightEntry, api),
    takeLatest(DietPlannerTypes.CREATE_WEIGHT_ENTRY, createWeightEntry, api),
    takeLatest(DietPlannerTypes.CREATE_FOOD, createFood, api),
    takeLatest(DietPlannerTypes.CREATE_ENTRY, createEntry, api),
    takeLatest(DietPlannerTypes.EDIT_ENTRY, editEntry, api),
    takeLatest(DietPlannerTypes.DELETE_ENTRY, deleteEntry, api),
    takeLatest(DietPlannerTypes.UPDATE_MY_INFO, updateMyInfo, api)
  ])
}
