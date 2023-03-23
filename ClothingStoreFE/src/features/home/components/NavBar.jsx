import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {colors, Stack} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {persistor} from "src/app/store";


export default function NavBar() {
  const navigate = useNavigate()
  const numberCart = useSelector(state => state.cart.dataCart.length);
  const handletoCart = () => {
    navigate('/cart')
  }
  const handleBack = () => {
    navigate('/')
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    persistor.purge();
    window.location.reload();
  }


  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="fixed" sx={{backgroundColor: colors.grey[900]}}>
        <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
              onClick={handleClick}
            >
              <MenuIcon/>
            </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
            <Stack onClick={handleBack} mr={3} sx={{cursor:'pointer'}}>
              <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                Shop Thong Hoi
              </Typography>
            </Stack>
          <IconButton onClick={handletoCart} sx={{color: colors.grey[100]}} aria-label="add to shopping cart">
            <Badge badgeContent={numberCart} color="primary">
              <AddShoppingCartIcon/>
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
