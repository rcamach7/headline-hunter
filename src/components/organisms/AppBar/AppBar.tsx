import * as React from 'react';
import { useUserContext } from 'src/context/UserContext';
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
import { Search as SearchIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Search, SearchIconWrapper, StyledInputBase } from './AppBar.styled';
import DynamicLogo from './DynamicLogo';
import UserMenuItems from './UserMenuItems';
import CategoryMenuItems from './CategoryMenuItems';

export default function SearchAppBar() {
  const { user, preferences } = useUserContext();
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
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'background.default' }}>
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
                preferences={preferences}
                handleCloseNavMenu={handleCloseNavMenu}
              />
            </Menu>
          </Box>

          {/* Renders S/M Logo Based On ScreenSize */}
          <DynamicLogo />

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

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
              <UserMenuItems user={user} />
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
