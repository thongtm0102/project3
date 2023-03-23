import React, {useEffect} from 'react'
import {
  Button, colors,
  Dialog, Divider, Stack, Typography, IconButton, TextField
} from '@mui/material';
import NiceModal, {useModal} from '@ebay/nice-modal-react';
import WarningIcon from '@mui/icons-material/Warning';
import {useSelector, useDispatch} from "react-redux";
import {fetchDeleteUser} from "src/features/User/userSlice";



const DeleteUSer = NiceModal.create(({id}) => {
  const modal = useModal();
  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(fetchDeleteUser(id)) ;
    modal.hide() ;
  }

  return (
    <Dialog open={modal.visible} onClose={() => modal.hide()}>
      <Stack alignItems='center' p={0.7}>
        <Typography fontSize={28} fontWeight={500}>Thông báo</Typography>
      </Stack>
      <Divider sx={{backgroundColor: colors.grey[500]}}/>
      <Stack height={80} width={400} p={2} direction='row' alignItems="center" spacing={1}>
        <WarningIcon sx={{color: colors.orange[500]}} fontSize="large"/>
        <Typography fontWeight={410}>Bạn có chắc chắn muốn xóa ?</Typography>
      </Stack>
      {/*<Divider sx={{backgroundColor:colors.grey[500]}}/>*/}
      <Stack direction='row-reverse' spacing={1} p={1}>
        <Button variant='contained' onClick={handleDelete}>Xóa</Button>
        <Button variant='outlined' onClick={() => modal.hide()}>Hủy</Button>
      </Stack>

    </Dialog>
  );
})

export default DeleteUSer
