// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'https://api.github.com/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const login = body => api.post('auth/local', body)
  const register = body => api.post('auth/local/register', body)
  const setToken = jwt => api.setHeader('Authorization', `Bearer ${jwt}`)
  const getDiary = date => api.get(`diaries/${date}`)
  const getWeightEntries = () => api.get('weightentries')
  const createWeightEntry = body => api.post('weightentries', body)
  const editWeightEntry = (id, body) => api.put(`weightentries/${id}`, body)
  const deleteWeightEntry = id => api.delete(`weightentries/${id}`)
  const searchName = name => api.get(`foods?name_contains=${name}`)
  const searchBarcode = barcode => api.get(`foods?barcode=${barcode}&_limit=1`)
  const getMyInfo = () => api.get('users/me')
  const updateMyInfo = body => api.put('users/me', body)
  const createFood = body => api.post('foods', body)
  const createEntry = body => api.post('diaryentries', body)
  const editEntry = (id, body) => api.put(`diaryentries/${id}`, body)
  const deleteEntry = id => api.delete(`diaryentries/${id}`)

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    login,
    setToken,
    register,
    getDiary,
    getWeightEntries,
    createWeightEntry,
    editWeightEntry,
    deleteWeightEntry,
    searchName,
    searchBarcode,
    getMyInfo,
    updateMyInfo,
    createFood,
    createEntry,
    editEntry,
    deleteEntry
  }
}

// let's return back our create method as the default.
export default {
  create
}
