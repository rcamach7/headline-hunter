import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Menu,
  Tooltip,
  Avatar,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Thunderstorm as ThunderstormIcon,
} from '@mui/icons-material';
import axios from 'axios';

import { useUserContext } from '@/context';
import { Category } from '@/lib/types';
import DynamicLogo from './DynamicLogo';
import UserMenuItems from './UserMenuItems';
import CategoryMenuItems from './CategoryMenuItems';
import Search from './Search';

export default function SearchAppBar() {
  const { user, userPreferences, toggleWeatherWidget } = useUserContext();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const isWindowDesktop = useMediaQuery('(min-width:600px)');

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleWeatherWidgetToggle = () => {
    toggleWeatherWidget();
  };

  React.useEffect(() => {
    axios
      .get('/api/category')
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        id="app-bar-mui"
        position="static"
        sx={{ backgroundColor: 'background.default' }}
      >
        <Toolbar sx={{ pl: { xs: 0, sm: 2, md: 3 } }}>
          <Box sx={{ display: 'flex' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              MenuListProps={{
                dense: isWindowDesktop ? false : true,
              }}
            >
              <CategoryMenuItems
                user={user}
                handleCloseNavMenu={handleCloseNavMenu}
                categories={categories}
              />
            </Menu>
          </Box>

          {/* Renders S/M Logo Based On ScreenSize */}
          <DynamicLogo />

          <Box sx={{ pr: 1 }}>
            <IconButton
              size="small"
              aria-label="toggle weather widget"
              aria-controls="toggle-weather"
              aria-haspopup="false"
              color={`${
                userPreferences.showWeatherWidget ? 'primary' : 'secondary'
              }`}
              onClick={handleWeatherWidgetToggle}
            >
              <ThunderstormIcon />
            </IconButton>
          </Box>

          <Search categories={categories} />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, pl: 1 }}>
                <Avatar
                  alt={user ? user.name : 'Guest'}
                  src={user ? user.image : null}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <UserMenuItems
                user={user}
                toggleWeatherWidget={toggleWeatherWidget}
                userPreferences={userPreferences}
              />
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
