import React, { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logout } from '../../redux/slice';

const Logout = () => {
  const dispatch = useDispatch();
  const { hasAuthToken } = useSelector(
    ({ auth }) => ({
      hasAuthToken: Boolean(auth.authToken)
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  if (hasAuthToken) {
    return <CircularProgress disableShrink />;
  }

  return <Redirect to="/login" />;
};

export default Logout;
