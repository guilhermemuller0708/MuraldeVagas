import { useRef } from 'react';
import { object, string } from 'yup';
import { Link } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { CircularProgress } from '@material-ui/core';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import './index.scss';

import { Input } from 'app/components/Input';

import { actions } from '../../redux/slice';

const initialValues = {
  email: '',
  password: ''
};

const Schema = object().shape({
  email: string().required('Campo obrigatório'),
  password: string().required('Campo obrigatório')
});

const Login = () => {
  const dispatch = useDispatch();

  const { loginError, loading } = useSelector(
    ({ auth }) => ({ loginError: auth.loginError, loading: auth.loading }),
    shallowEqual
  );

  const handleLogin = (values, { setSubmitting }) => {
    const user = {
      email: values.email,
      senha: values.password
    };

    const promise = dispatch(actions.loginUser(user));

    setSubmitting(false);
    return () => {
      promise.abort();
    };
  };

  const btnRef = useRef();
  const saveFormClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  return (
    <>
      <div className="wrapper-login">
        <div className="login-form">
          {!!loginError ? (
            <div className="error-message-login">{loginError.message}</div>
          ) : (
            ''
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={Schema}
            onSubmit={handleLogin}
          >
            {({ handleSubmit, isSubmitting }) => {
              return (
                <>
                  <Form className="form">
                    <Field
                      name="email"
                      component={Input}
                      label="Usuário"
                      type="text"
                    />
                    <Field
                      name="password"
                      component={Input}
                      label="Senha"
                      type="password"
                    />

                    <button
                      type="submit"
                      style={{ display: 'none' }}
                      ref={btnRef}
                      disabled={isSubmitting}
                      onSubmit={handleSubmit}
                    ></button>
                  </Form>
                </>
              );
            }}
          </Formik>

          <div className="actions-sign-in">
            <div className="btn-login">
              {loading ? (
                <CircularProgress />
              ) : (
                <button type="submit" onClick={saveFormClick}>
                  Entrar
                </button>
              )}
            </div>
            <div className="btn-sign-up">
              <Link to="/signup">Cadastro</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
