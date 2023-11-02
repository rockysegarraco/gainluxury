import { configureStore } from '@reduxjs/toolkit'
import addPostSlice from './addPostSlice'
import brandSerchSlice from './brandSerchSlice'

export const store = configureStore({
  reducer: {
    addPost: addPostSlice,
    brandSearch: brandSerchSlice,
  },
})