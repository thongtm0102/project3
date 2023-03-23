import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {hideLoadingModal,showLoadingModal} from "src/helpers/modal.helper";
import {apiRequest} from "src/helpers/axios.helper";

const authenSlice = createSlice({
  name: 'authen',
  initialState: {
    isLogin : false ,
    status : null,
    userData : null,
    listUser : null ,
    accessToken: null,
  },
  reducers : {
    logout : (state, action) => {
      state.isLogin  = false;
      state.status = null ;
      state.userData = null;
      state.accessToken = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchLogin.pending,(state,action)=>{
      state.status = 'loading';
      showLoadingModal();
    })
    builder.addCase(fetchLogin.fulfilled,(state, action)=>{
      if(action.payload.id){
      state.status = null ;
      state.userData = action.payload;
      state.isLogin = true ;
      }else{
        state.status = 'error'
      }
      hideLoadingModal();
    })
    builder.addCase(fetchLogin.rejected,(state, action)=>{
      state.status = 'Đăng nhập thất bại'
    })
    builder.addCase(fetchListUser.fulfilled, (state, action) => {
      state.listUser = action.payload ;
    })
  }
})


export const fetchLogin = createAsyncThunk ("authen/login", async (data) => {
  const res = await apiRequest.post('Users/Login',null,{params:data});
  return res.data ;
})

export const fetchListUser = createAsyncThunk("authen/fetchist" , async () => {
  const res = await apiRequest.get("Users") ;
  return res.data
})


export default authenSlice;





