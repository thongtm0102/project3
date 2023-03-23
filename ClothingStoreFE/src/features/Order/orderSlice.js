import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "src/helpers/axios.helper";


const orderSlice = createSlice({
  name : 'order' ,
  initialState : {
    status : null ,
    listOrder : [],
  },
  reducers : {} ,
  extraReducers : builder => {
    builder.addCase(fetchListOrder.fulfilled,(state, action)=>{
      state.listOrder = action.payload ;
    })
    builder.addCase(fetchDeleteOrder.fulfilled,(state, action)=>{
      state.listOrder = state.listOrder.filter(item => item.id !== action.payload.id) ;
    })
  }
})

export const fetchListOrder = createAsyncThunk("order/fetchlist" , async () => {
  const res = await apiRequest.get("Orders/getFullOrders");
  return res.data ;
})
export const fetchDeleteOrder = createAsyncThunk("order/fetchDeleteOrder" , async (data) => {
  const res = await apiRequest.delete("");
  return res.data ;
})

export const fetchAddOrder  = createAsyncThunk('order/fetchAddOrder' , async  (data) => {
  const res = await apiRequest.post('Orders',{
    "userFullName": data.userFullName,
    "address": data.address,
    "phoneNumber": data.phoneNumber,
    "totalPrice": data.totalPrice,
    "products": data.products
  }) ;
  return res.data
})



export default orderSlice


