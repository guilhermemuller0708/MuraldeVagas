import { useRef } from 'react';
import { object, string } from 'yup';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { unwrapResult } from '@reduxjs/toolkit';

import './index.scss';

import { Input } from 'app/components/Input';

import { actions } from '../../redux/slice';

const initialValues = {
  name: '',
  password: ''
};

const Schema = object().shape({
  name: string().required('Campo obrigatório'),
  password: string().required('Campo obrigatório')
});

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = (values, { setSubmitting }) => {
    console.log('values', values);

    dispatch(actions.loginUser(values))
      .then(unwrapResult)
      .then((data) => {
        console.log('data', data);
        setSubmitting(false);
      })
      .catch((error) => {
        console.warn(error);
      });
    setSubmitting(false);
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
                      name="name"
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
              <button type="submit" onClick={saveFormClick}>
                Entrar
              </button>
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

{
  /* <div className="form-group row">
  <label className="col-xl-3 col-lg-3 col-form-label">Customer Name</label>
  <div className="col-lg-9 col-xl-6">
    <input
      disabled
      name="name"
      type="text"
      placeholder="Name"
      className={`form-control form-control-lg form-control-solid ${getInputClasses(
        touched,
        errors,
        'name'
      )}`}
      onChange={(e) => setFieldValue('name', e.target.value)}
      {...getFieldProps('name')}
    />
    {touched.name && errors.name ? <code>{errors.name}</code> : null}
  </div>
</div>; */
}
