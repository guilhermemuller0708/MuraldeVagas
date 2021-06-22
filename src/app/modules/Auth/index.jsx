import { useRef, useEffect, useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

const AuthInit = ({ children }) => {
  const didRequest = useRef(false);
  const dispatch = useDispatch();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const { state } = useSelector(
    (state) => ({
      state: state
    }),
    shallowEqual
  );

  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          //request user
        }
      } catch (error) {
        console.error(error);
        if (!didRequest.current) {
          //   dispatch(logout());
        }
      } finally {
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true);
    };

    if (false) {
      requestUser();
    } else {
      //   dispatch(fulfillUser(undefined));
      setShowSplashScreen(false);
      console.log('state', state);
    }

    // eslint-disable-next-line
  }, []);

  return showSplashScreen ? 'loading' : <>{children}</>;
};

export default AuthInit;
