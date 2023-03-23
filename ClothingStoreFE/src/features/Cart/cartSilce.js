import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "src/helpers/axios.helper";

const cartSilce = createSlice({
  name: 'cart' ,
  initialState : {
    status : null ,
    dataCart : [] ,
  },
  reducers: {
    addCard : (state, action) => {
      state.dataCart.push(action.payload) ;
    },
    upQuantity : (state,action) => {
      for (let i = 0; i < state.dataCart.length; i++) {
        if (state.dataCart[i].id === action.payload) {
          state.dataCart[i].quantity += 1;
        }
      }
    },
    downQuantity : (state,action) => {
      for (let i = 0; i < state.dataCart.length; i++) {
        if (state.dataCart[i].id === action.payload) {
          state.dataCart[i].quantity -= 1;
        }
      }
    },
    deleteCart : (state, action) => {
      state.dataCart = [] ;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchOrder.fulfilled,(state, action) => {
      state.dataCart = [];
      state.status = 'success' ;
    })
  }
})

export const fetchOrder = createAsyncThunk("cart/fetchOrder" , async (data) => {
  const res = await apiRequest.post("\add" , {data}) ;
  return res.data ;
})

export const fetchAddOrder = createAsyncThunk("cart/fetchAddOrder" , async (data) => {
  const res = await apiRequest.post(" " ,null,{params:data} ) ;
  return res.data ;
})

export default cartSilce


