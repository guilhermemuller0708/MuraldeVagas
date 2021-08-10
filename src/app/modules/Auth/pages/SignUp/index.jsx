import { useRef } from 'react';
import { Field, Form, Formik } from 'formik';

import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import './index.scss';

import { Input } from 'app/components/Input';

import { actions } from '../../redux/slice';

const initialValues = {
  user: '',
  password: ''
};

const SignUp = () => {
  const dispatch = useDispatch();

  const handleSignUp = (values, { setSubmitting }) => {
    console.log('values', values);

    dispatch(actions.signUpUser(values))
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
          <Formik initialValues={initialValues} onSubmit={handleSignUp}>
            {({ handleSubmit, isSubmitting }) => {
              return (
                <>
                  <Form className="form">
                    <Field
                      name="user"
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
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
