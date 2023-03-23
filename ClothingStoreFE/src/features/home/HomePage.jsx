import React, {useState} from 'react';
import {Box, colors, Stack} from '@mui/material';
import Sidebar from 'src/features/home/components/Sidebar';
import Contents from 'src/features/home/components/Contents';
import {useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {useEffect, useRef, useContext} from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {Helmet} from 'react-helmet';
import NavBar from "src/features/home/components/NavBar";
import ListItem from "src/features/home/components/ListItem";
import {useDispatch} from "react-redux";
import {fetchListProduct} from "src/features/Product/productSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertContext = React.createContext();
const HomePage = () => {
  const navigate = useNavigate()
  const [index, setIndex] = React.useState(0);
  const handleIndexTab = (index) => {
    setIndex(index);
  };
  const isLogin = useSelector((state) => state.authen.isLogin)
  useEffect(()=>{
    if (!isLogin) {
      navigate('/authen/login');
    }
  },[isLogin])

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


  const dispatch  = useDispatch();

  useEffect(()=>{
    dispatch(fetchListProduct()) ;
  },[])


  return (
    <AlertContext.Provider value={{handleAlert}}>
      <Stack direction={'column'}>
        <NavBar/>
        <Stack pt={10} px={2} direction={'row'} flexWrap={'wrap'} >
          <ListItem item />
        </Stack>
      </Stack>
    </AlertContext.Provider>
  );
};

export default HomePage;
