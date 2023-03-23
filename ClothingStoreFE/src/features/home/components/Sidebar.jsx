import React from 'react';
import {
  Button,
  colors,
  Stack,
  Avatar,
  Typography,
  Divider,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SettingsIcon from '@mui/icons-material/Settings';
import {useDispatch , useSelector} from "react-redux";
import authenSlice from "src/features/authen/authenSlice";
import {useNavigate} from "react-router-dom";
import HistoryIcon from '@mui/icons-material/History';
import {persistor} from "src/app/store";

export default function Sidebar(props) {
  const user = useSelector((state)=> state.authen.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = () => {
    // dispatch(authenSlice.actions.logout())
    persistor.purge();
    window.location.reload()
    // navigate('/authen/login');

  }

  const contentsSidebar = [
    { title: 'Danh sách người dùng', icon: <HomeIcon /> },
    { title: 'Danh sách đơn hàng', icon: <PeopleAltIcon /> },
    { title: 'Danh sách sản phẩm', icon: <LocalAtmIcon /> },
  ];

  const StyleTab = {
    height: 46,
    mr: 0.5,
    mt: 0.3,
    borderRadius: 1,
    color: colors.grey[500],
    '&:hover': {
      backgroundColor: colors.grey[800],
      color: colors.grey[200],
    },
    cursor: 'pointer',
  };
  const [numTab, setNumTab] = React.useState(0);
  return (
    <Stack>
      <Stack height="100%" color={colors.grey[200]}>
        <Stack className="tag-name" p={2}>
          <Stack
            direction="row"
            alignItems="center"
            p={2}
            bgcolor={colors.grey[800]}
            borderRadius={4}
            height={80}
          >
            <Avatar sx={{ height: 48, width: 48 }} src={''} />
            <Stack ml={1.5}>
              <Typography fontSize={16} fontWeight={500} color={colors.grey[100]}>
                {user !== null && user.username}
              </Typography>
              <Typography fontSize={13}> Chức vụ : Quản lý</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Divider sx={{ backgroundColor: colors.grey[500] }} />
        <Stack py={2}>
          {contentsSidebar.map((content, index) => (
            <Stack
              direction="row"
              pl={1}
              alignItems="center"
              key={index}
              sx={StyleTab}
              bgcolor={numTab === index ? colors.grey[800] : ''}
              color={colors.grey[300]}
              onClick={() => {
                setNumTab(index);
                props.handleIndexTab(index);
              }}
            >
              <Stack color={numTab === index ? colors.grey[100] : ''}>
                {content.icon}
              </Stack>
              <Typography
                color={numTab === index ? colors.grey[100] : ''}
                px={2}
                fontSize={17}
              >
                {content.title}
              </Typography>
            </Stack>
          ))}
        </Stack>
        <Divider sx={{ backgroundColor: colors.grey[500] }} />
        <Button sx={StyleTab} startIcon={<LoginIcon />} onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
    </Stack>
  );
}
