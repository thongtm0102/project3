import React, {useEffect, useRef} from 'react'
import {
  Button,
  Dialog, Divider, Stack, Typography, TextField, InputLabel, Select, MenuItem, FormControl, IconButton, colors
} from '@mui/material';
import NiceModal, {useModal} from '@ebay/nice-modal-react';
import ClearIcon from '@mui/icons-material/Clear';
import CardMedia from "@mui/material/CardMedia";


const ShowOrder = NiceModal.create(({data}) => {
  const modal = useModal();
  console.log(data.item);


  return (
    <Dialog open={modal.visible} onClose={() => modal.hide()} >
      <Stack position='absolute' sx={{right: 6, top: 6}}>
        <IconButton onClick={() => {
          modal.hide();
        }} aria-label="delete">
          <ClearIcon sx={{color: colors.grey[900]}}/>
        </IconButton>
      </Stack>
      <Stack maxWidth={980} minWidth={600}>
        <Stack textAlign='center' pt={1}>
          <Typography fontWeight={700} fontSize={28}>Thông tin đơn hàng</Typography>
        </Stack>
        <Divider/>
        <Stack p={2} spacing={0.5} pb={3}>
          <Stack direction={'row'}>
            <Typography fontSize={20} fontWeight={450} width={'50%'}> Mã đơn hàng : {data.id}</Typography>
            <Typography fontSize={20} fontWeight={450}> Tên người nhận : {data.userFullName}</Typography>
          </Stack>
          <Typography fontSize={20} fontWeight={450}> Địa chỉ người nhận : {data.address}</Typography>
          <Typography fontSize={20} fontWeight={450}> Tổng số tiền : {data.totalPrice}</Typography>
          <Typography fontSize={20} fontWeight={450}> Chi tiết sản phẩm : </Typography>
          {data.orderDetails.map(item => (
            <Stack direction={'row'} p={1} alignItems={'center'} bgcolor={colors.grey[300]} borderRadius={4} m={1}
                   p={1}  justifyContent={'space-between'} key ={item.id}>
              <Stack direction={'row'}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="60"
                  image={item.imgUrl}
                  sx={{width: 80, marginRight: 3}}
                />
                <Stack>
                  <Typography fontSize={19} fontWeight={500} sx={{marginRight: 3}}>{item.productTitle}</Typography>
                  <Typography fontSize={19} fontWeight={500}>{item.price} VND x số lượng : {item.quantity}</Typography>
                </Stack>
              </Stack>
            </Stack>
          ))}

        </Stack>
      </Stack>
    </Dialog>

  )
})

export default ShowOrder
