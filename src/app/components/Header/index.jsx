import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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

import './index.scss';
import { logout } from 'app/modules/Auth/redux/slice';
import { Link } from 'react-router-dom';
import './index.scss';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1
  }
}));

export default function MenuAppBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { user } = useSelector(
    ({ auth }) => ({ user: auth.user }),
    shallowEqual
  );

  const handleMenu = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleProfile = () => {
    return history.push('/profile');
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
  };

  return (
    <div className="backgroundHeaderStyle">
      <AppBar className="backgroundHeaderStyle" position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/vacancy">Mural de vagas</Link>
          </Typography>
          <div className="wrapper-user-context">
            <p className="user-email">{user?.nome}</p>
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
              <MenuItem value="profile" onClick={handleProfile}>
                Perfil
              </MenuItem>
              {user?.perfis?.includes('ADMIN') ? (
                <MenuItem value="vacancy">
                  <Link to="/vacancy/all">Gerenciar vagas</Link>
                </MenuItem>
              ) : (
                ''
              )}

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
