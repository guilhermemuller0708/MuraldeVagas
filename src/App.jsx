import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthInit from 'app/modules/Auth';
import Router from 'app/routes/Router';

const App = ({ store }) => {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <AuthInit>
          <Router />
        </AuthInit>
      </Provider>
    </>
  );
};

export default App;
