import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  from: "",
  tab: "",
  selected: "Home"
}

export const routeSlice = createSlice({
  name: 'routeSlice',
  initialState,
  reducers: {
    setFrom: (state, action) => {
      state.from = action.payload;
    },
    setTab: (state, action) => {
      state.tab = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFrom, setSelected, setTab } = routeSlice.actions

export default routeSlice.reducer