import { useRef, useEffect, useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';

import { logout } from './redux/slice';
import { actions } from './redux/slice';

const AuthInit = ({ children }) => {
  const didRequest = useRef(false);
  const dispatch = useDispatch();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const { authToken } = useSelector(
    ({ auth }) => ({
      authToken: auth.authToken
    }),
    shallowEqual
  );

  useEffect(() => {
    const requestUser = async () => {
      if (!didRequest.current) {
        dispatch(actions.getUserByToken())
          .then(unwrapResult)
          .then(() => {
            setShowSplashScreen(false);
          })
          .catch(() => {
            dispatch(logout());
          });
      }

      return () => (didRequest.current = true);
    };

    if (authToken) {
      requestUser();
    } else {
      // dispatch(logout());
      setShowSplashScreen(false);
    }

    // eslint-disable-next-line
  }, [dispatch]);

  return showSplashScreen ? (
    <CircularProgress disableShrink />
  ) : (
    <>{children}</>
  );
};

export default AuthInit;
