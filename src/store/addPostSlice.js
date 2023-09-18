import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  priceId: "",
  category: ""
}

export const counterSlice = createSlice({
  name: 'addpost',
  initialState,
  reducers: {
    setPrice: (state, action) => {
        state.priceId = action.payload.priceId;
        state.category = action.payload.category;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setPrice } = counterSlice.actions

export default counterSlice.reducer