import { configureStore } from '@reduxjs/toolkit'
import addPostSlice from './addPostSlice'
import brandSerchSlice from './brandSerchSlice'
import aviationFilterSlice from './aviationFilterSlice';
import tabSlice from './tabSlice';

export const store = configureStore({
  reducer: {
    addPost: addPostSlice,
    brandSearch: brandSerchSlice,
    aviationFilter: aviationFilterSlice,
    tabSlice: tabSlice
  },
})