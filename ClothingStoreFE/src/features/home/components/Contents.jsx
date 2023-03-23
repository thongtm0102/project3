import React from 'react';
import {
  colors,
  Stack,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from '@mui/material';

import UserList from "src/features/User/UserList";
import Order from "src/features/Order/Order";
import Product from "src/features/Product/Product";

export default function Contents(props) {
  const indexTab = props.index;
  return (
    <Stack>
      <AppBar
        position="static"
        sx={{backgroundColor: colors.grey[100], height: 75}}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              fontSize={32}
              noWrap
              sx={{
                display: {xs: 'none', md: 'flex'},
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: colors.grey[900],
                textDecoration: 'none',
              }}
            >
              {(() => {
                switch (indexTab) {
                  case 0:
                    return 'Danh sách người dùng';
                  case 1:
                    return 'Danh sách đơn hàng';
                  case 2:
                    return 'Danh sách sản phẩm';
                }
              })()}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Stack>
        {(() => {
          switch (indexTab) {
            case 0:
              return <UserList/>;
            case 1:
              return <Order/>;
            case 2:
              return <Product/>;
          }
        })()}
      </Stack>
    </Stack>
  );
}
