import { configureStore } from '@reduxjs/toolkit'
import addPostSlice from './addPostSlice'

export const store = configureStore({
  reducer: {
    addPost: addPostSlice
  },
})