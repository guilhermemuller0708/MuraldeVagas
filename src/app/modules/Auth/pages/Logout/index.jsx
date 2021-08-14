import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { logout } from '../../redux/slice';

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { hasAuthToken } = useSelector(
    ({ auth }) => ({
      hasAuthToken: Boolean(auth.authToken)
    }),
    shallowEqual
  );

  useEffect(() => {
    history.replace('/login');
    dispatch(logout());
  }, [dispatch, history]);

  if (hasAuthToken) {
    return <CircularProgress disableShrink />;
  }
};

export default Logout;
