import { configureStore } from "@reduxjs/toolkit"
import thunk from 'redux-thunk'

import { initializeUser } from "./user/userSlice"
import userReducer from './user/userSlice'
import { initializePost } from "./post/postSlice"
import postReducer from './post/postSlice'


const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer
  },
  middleware: [thunk]
})

store.dispatch(initializeUser())
store.dispatch(initializePost())

export default store