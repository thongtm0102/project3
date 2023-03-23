import * as React from 'react';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  useTheme,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useDispatch , useSelector} from "react-redux";
import {fetchLogin} from "src/features/authen/authenSlice";
import {useEffect} from "react";
import Copyright from 'src/commons/components/Copyright';
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
  const isLogin = useSelector(state => state.authen?.isLogin);
  const useAuthen = useSelector(state => state.authen?.userData) ;
  const navigate = useNavigate()
  const theme = useTheme();
  const themeMode = theme.palette.mode;
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      userName : data.get('email'),
      password : data.get('password')
    }
    dispatch(fetchLogin(userData))
    // navigate('/')

  };
  useEffect(()=>{
    if(isLogin){
      if(useAuthen?.role === 1){
      navigate('/') ;
      } else {
        navigate('/admin');
      }
    }
  },[isLogin]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: themeMode === 'light' ? 'primary.light' : 'primary.dark',
          }}
        >
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Welcome
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/authen/register" variant="body2">
                {"Don't have an account? Create one now"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
