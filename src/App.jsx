import { Provider } from 'react-redux';

import AuthInit from 'app/modules/Auth';
import Router from 'app/routes/Router';

const App = ({ store }) => {
  return (
    <>
      <Provider store={store}>
        <AuthInit>
          <Router />
        </AuthInit>
      </Provider>
    </>
  );
};

export default App;
