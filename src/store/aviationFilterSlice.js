import { createSlice } from '@reduxjs/toolkit'
import { AVIATIONMANUFACTURES } from '../utils/constants';

const initialState = {
  category: "All",
  manufecture: "All",
  manufectureData: AVIATIONMANUFACTURES,
  model: "All",
  modelData: [],
}

export const aviationFilterSlice = createSlice({
  name: 'aviationFilterSlice',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setManufecture: (state, action) => {
      state.manufecture = action.payload;
    },
    setModel: (state, action) => {
      state.model = action.payload;
    },
    setManufectureData: (state, action) => {
      state.manufectureData = action.payload;
    },
    setModelData: (state, action) => {
      state.modelData = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCategory, setManufecture, setManufectureData, setModel, setModelData } = aviationFilterSlice.actions

export default aviationFilterSlice.reducer