import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  Tooltip,
  MenuItem,
  Avatar,
  IconButton,
} from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Search, SearchIconWrapper, StyledInputBase } from './AppBar.styled';
import DynamicLogo from './DynamicLogo';
import { signIn, signOut } from 'next-auth/react';
import { useUserContext } from 'src/context/UserContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

const pages = ['Products', 'Pricing', 'Blog'];
let pageOptions = [
  { path: '/', name: 'Home' },
  { path: '/news', name: 'News' },
  { path: '/account', name: 'Account' },
];

export default function SearchAppBar() {
  const router = useRouter();
  const { user, preferences } = useUserContext();

  React.useEffect(() => {
    if (router.pathname) {
      pageOptions = pageOptions.filter(
        (option) => option.path !== router.pathname
      );
    }
  }, [router]);

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
          {/* MOBILE MENU HAMBURGER BUTTON */}
          <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
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
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ background: 'background.default' }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
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
              {pageOptions.map((page, i) => (
                <MenuItem key={i}>
                  <Typography textAlign="center">
                    <Link href={page.path}>
                      <a style={{ textDecoration: 'none', color: 'inherit' }}>
                        {page.name}
                      </a>
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
              {user ? (
                <MenuItem onClick={() => signOut()}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={() => signIn()}>
                  <Typography textAlign="center">Sign In</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
