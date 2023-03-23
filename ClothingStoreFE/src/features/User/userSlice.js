import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiRequest} from "src/helpers/axios.helper";
import axios from "axios";

const userSlice = createSlice({
  name: 'userManager',
  initialState: {
    userInfo: [],
  },
  reducers: {},
  extraReducers: builder => {
  builder.addCase(fetchListUser.fulfilled, (state, action) => {
    state.userInfo = action.payload;
  })
  builder.addCase(fetchDeleteUser.fulfilled, (state, action) => {
    state.userInfo = state.userInfo.filter(item => item.id !== action.payload)
  })
}})

export const fetchListUser = createAsyncThunk("user/getList", async () => {
  const res = await apiRequest.get('Users');
  return res.data;
})

export const fetchDeleteUser = createAsyncThunk("user/deleteSUer", async (id) => {
  const res = await  apiRequest.delete(`Users/${id}`) ;
  return id;
})

export default userSlice;
