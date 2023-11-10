import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tab: "",
}

export const tabSlice = createSlice({
  name: 'tabSlice',
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.tab = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setTab } = tabSlice.actions

export default tabSlice.reducer