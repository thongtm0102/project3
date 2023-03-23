import React, {useState} from 'react';
import {Box, colors, Stack} from '@mui/material';
import Sidebar from 'src/features/home/components/Sidebar';
import Contents from 'src/features/home/components/Contents';
import {useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {useEffect, useRef, useContext} from "react";
import MuiAlert from '@mui/material/Alert';
import {useDispatch} from "react-redux";
import {fetchListProduct} from "src/features/Product/productSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertContext = React.createContext();
const Admin = () => {

  const isLogin = useSelector((state) => state.authen?.isLogin)
  const useAuthen = useSelector(state => state.authen?.userData)
  useEffect(()=>{
    if (!isLogin) {
      navigate('/authen/login');
    }else{
      if(useAuthen?.role === 1){
        navigate('/') ;
      }
    }
  },[isLogin])

  const navigate = useNavigate()
  const [index, setIndex] = React.useState(0);
  const handleIndexTab = (index) => {
    setIndex(index);
  };
  const homeRef = useRef();
  const [open, setOpen] = React.useState(false);

  const handleAlert = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const dispatch = useDispatch() ;
useEffect(() => {
  dispatch(fetchListProduct()) ;
},[])
  return (
    <AlertContext.Provider value={{handleAlert}}>
      <Stack minWidth={1200} minHeight={710} height='100vh' ref={homeRef}>
        <Stack height='100%'  direction="row">
          <Box height='100%' bgcolor={colors.grey[900]}  width={320}>
            <Sidebar handleIndexTab={handleIndexTab} />
          </Box>
          <Box height='100%' width="100%">
            <Contents index={index} />
          </Box>
        </Stack>
      </Stack>

    </AlertContext.Provider>
  );
};

export default Admin;
