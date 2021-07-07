import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  MenuItem,
  Menu
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { logout } from 'app/modules/Auth/redux/slice';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1
  }
}));

export default function MenuAppBar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { user } = useSelector(
    ({ auth }) => ({ user: auth.user }),
    shallowEqual
  );

  const handleMenu = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Mural de vagas
          </Typography>

          <div>
            {user?.name}
            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              <MenuItem value="profile" onClick={handleClose}>
                Perfil
              </MenuItem>
              <MenuItem value="logout" onClick={handleLogout}>
                LogOut
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
