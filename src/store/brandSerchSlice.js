import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  brand: "All",
  model: "All",
  modelData: []
}

export const brandSlice = createSlice({
  name: 'brandSearch',
  initialState,
  reducers: {
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setModel: (state, action) => {
      state.model = action.payload;
    },
    setModelData: (state, action) => {
      state.modelData = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setBrand, setModel, setModelData } = brandSlice.actions

export default brandSlice.reducer