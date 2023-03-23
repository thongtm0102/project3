import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import {apiRequest} from "src/helpers/axios.helper";

const productSlice = createSlice({
  name: 'product' ,
  initialState: {
    status : null ,
    dataProduct : [
    ] ,
  },
  reducers : {} ,
  extraReducers : builder => {
    builder.addCase(fetchListProduct.fulfilled,(state, action) => {
      state.dataProduct = action.payload ;
    })
    builder.addCase(fetchAdd.fulfilled,(state, action) => {
      state.dataProduct.push(action.payload);
    })
    builder.addCase(fetchUpdate.fulfilled,(state, action) => {
      state.dataProduct = state.dataProduct.map(obj => obj.id === action.payload.id ? action.payload : obj);
    })
    builder.addCase(fetchDeleteProduct.fulfilled,(state, action) => {
      state.dataProduct = state.dataProduct.filter(item => item.id !== action.payload) ;
    })
  }

})


export const fetchListProduct = createAsyncThunk("product/fetchListProduct" , async (data) => {
  const res = await apiRequest.get('Products') ;
  return res.data ;
})

export const fetchAdd = createAsyncThunk("product/fetchAdd" , async (data) => {
  const res = await apiRequest.post('Products', {
    title: data.title,
    description: data.description,
    imgUrl: data.imgUrl,
    price: data.price
  }) ;
  return res.data ;
})

export const fetchUpdate = createAsyncThunk("product/update" , async (data) => {
  const res = await apiRequest.put(`Products/${data.id}`,{
    id : data.id ,
    title: data.title,
    description: data.description,
    imgUrl: data.imgUrl,
    price: data.price
  }) ;
  console.log("log add " + res.data);
  return data ;
})
export const fetchDeleteProduct = createAsyncThunk("product/fetchDeleteProduct" , async (id) => {
  const res = await apiRequest.delete(`Products/${id}`) ;
  return id ;
})


export default productSlice
