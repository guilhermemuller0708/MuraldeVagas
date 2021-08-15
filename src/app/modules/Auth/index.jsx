import { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { logout } from './redux/slice';
import { actions } from './redux/slice';
import Loader from 'app/components/Loader';

const AuthInit = ({ children }) => {
  const didRequest = useRef(false);
  const dispatch = useDispatch();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    const requestUser = async (user) => {
      if (!didRequest.current) {
        dispatch(actions.getUserById(user))
          .then(unwrapResult)
          .then(() => {
            setShowSplashScreen(false);
          })
          .catch(() => {
            setShowSplashScreen(false);
            dispatch(logout());
          });
      }

      return () => (didRequest.current = true);
    };

    const user = JSON.parse(window.localStorage.getItem('authToken'));

    if (!!user) {
      requestUser(user);
    } else {
      dispatch(logout());
      setShowSplashScreen(false);
    }

    // eslint-disable-next-line
  }, [dispatch]);

  return showSplashScreen ? <Loader /> : <>{children}</>;
};

export default AuthInit;
