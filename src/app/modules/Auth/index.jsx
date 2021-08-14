import { useRef, useEffect, useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { logout } from './redux/slice';
import { actions } from './redux/slice';
import Loader from 'app/components/Loader';

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
    const requestUser = async (token) => {
      if (!didRequest.current) {
        dispatch(actions.getUserByToken(token))
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

    const token = JSON.parse(window.localStorage.getItem('authToken'));

    if (!!token) {
      requestUser(token);
    } else {
      dispatch(logout());
      setShowSplashScreen(false);
    }

    // eslint-disable-next-line
  }, [dispatch]);

  return showSplashScreen ? <Loader /> : <>{children}</>;
};

export default AuthInit;
