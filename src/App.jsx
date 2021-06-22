import AuthInit from 'app/modules/Auth';
import { Provider } from 'react-redux';

const App = ({ store }) => {
  return (
    <>
      <Provider store={store}>
        <AuthInit>
          <h1>ola mundo</h1>
        </AuthInit>
      </Provider>
    </>
  );
};

export default App;
