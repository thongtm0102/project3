import * as React from 'react' ;
import {colors, Stack, Button, Divider, TextField, Grid, Link, Box,IconButton} from "@mui/material";
import NavBar from "src/features/home/components/NavBar";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from "react-redux";
import cartSilce from "src/features/Cart/cartSilce";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import {useState} from "react";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {fetchAddOrder} from "src/features/Order/orderSlice";
import {useNavigate} from "react-router-dom";

const Cart = () => {
  const dataCart = useSelector(state => state.cart.dataCart);
  const  newDataCart  =  dataCart.map(({id, quantity}) => ({productId: id, quantity}));
  const dispatch = useDispatch()
  const handleDeleteCart = (e) => {
    dispatch(cartSilce.actions.deleteCard(e));
  }
  const navigate = useNavigate() ;
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataFetch = {
      products : newDataCart ,
      userFullName: data.get('name'),
      address: data.get('address'),
      phoneNumber: data.get('phonenumber'),
      totalPrice : total,
    }
    console.log(dataFetch) ;

    dispatch(fetchAddOrder(dataFetch)) ;
    dispatch(cartSilce.actions.deleteCart()) ;
    navigate('/') ;
  };

  let total = 0;

// Tính tổng số tiền
  for (let i = 0; i < dataCart.length; i++) {
    total += dataCart[i].quantity * dataCart[i].price;
  }


  return (
    <>
      <NavBar/>
      <Stack pt={15} px={5} direction={'row'} justifyContent={'space-around'} >
        <Stack width={700} direction={'column'}>
          <Stack height={50} bgcolor={colors.grey[600]} alignItems={'center'} direction={'row'}
                 justifyContent={'center'}>
            <Typography color={'white'} fontSize={24} fontWeight={700}>
              Danh sách giỏ hàng
            </Typography>
          </Stack>
          <Stack bgcolor={colors.grey[200]}>
            {dataCart.map(e => (
              <Stack direction={'row'} p={1} alignItems={'center'} bgcolor={colors.grey[300]} borderRadius={4} m={2}
                     p={2} justifyContent={'space-between'} key={e.id}>
                <Stack direction={'row'}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="70"
                    image={e.imgUrl}
                    sx={{width: 100, marginRight: 3}}
                  />
                  <Stack>
                    <Typography fontSize={21} fontWeight={500} sx={{marginRight: 3}}>{e.title}</Typography>
                    <Typography fontSize={21} fontWeight={500}>{e.price} VND</Typography>
                    <Stack direction={'row'} alignItems={"center"} spacing={1}>
                      <IconButton sx={{height:30,width:30}} aria-label="delete" onClick={() => {
                        dispatch(cartSilce.actions.downQuantity(e.id))
                      }} >
                        <ArrowLeftIcon fontSize={"large"} />
                      </IconButton>
                      <Typography fontSize={20}>{e.quantity}</Typography>
                      <IconButton sx={{height:30,width:30}} aria-label="delete" onClick={() => {
                        dispatch(cartSilce.actions.upQuantity(e.id))
                      }}>
                        <ArrowRightIcon fontSize={"large"} />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Stack>
                <Button onClick={() => handleDeleteCart(e.id)} color={'error'} variant="outlined"
                        startIcon={<DeleteIcon/>}>
                  Delete
                </Button>
              </Stack>
            ))}
            <Divider></Divider>
            <Stack p={2} direction={'row'} justifyContent={'space-between'}>
              <Typography fontSize={24} fontWeight={500}>Tổng số tiền:</Typography>
              <Typography fontSize={24} fontWeight={500}>{total} VND</Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack width={700} direction={'column'}>

          <Stack height={50} bgcolor={colors.grey[600]} alignItems={'center'} direction={'row'}
                 justifyContent={'center'}>
            <Typography color={'white'} fontSize={24} fontWeight={700}>
              Thông tin đơn hàng
            </Typography>
          </Stack>
          <Stack bgcolor={colors.grey[200]} component="form" onSubmit={handleSubmit} p={2}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Tên người nhận"
              name="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="address"
              label="Địa chỉ người nhận"
              id="address"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phonenumber"
              label="Số điện thoại người nhận"
              id="phonenumber"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
              Đặt hàng
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}

export default Cart
