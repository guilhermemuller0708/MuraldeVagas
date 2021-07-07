import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import AuthInit from 'app/modules/Auth';
import Router from 'app/routes/Router';
import { store } from 'redux/store';

import { CircularProgress } from '@material-ui/core';

let persistor = persistStore(store);

const App = ({ store }) => {
  return (
    <>
      <Provider store={store}>
        <PersistGate
          loading={<CircularProgress disableShrink />}
          persistor={persistor}
        >
          <AuthInit>
            <Router />
          </AuthInit>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
