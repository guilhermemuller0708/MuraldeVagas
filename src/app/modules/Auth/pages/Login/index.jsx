import { useRef } from 'react';
import { Field, Form, Formik } from 'formik';

import './index.scss';
import { Link } from 'react-router-dom';
import { Input } from 'app/components/Input';

const initialValues = {
  user: '',
  password: ''
};

const Login = () => {
  const handleLogin = (values) => {
    console.log('values', values);
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
          <Formik initialValues={initialValues} onSubmit={handleLogin}>
            {({
              handleSubmit,
              setFieldValue,
              getFieldProps,
              isSubmitting,
              touched,
              errors,
              values
            }) => {
              return (
                <>
                  <Form autoComplete="off" className="form">
                    <Field name="user" component={Input} label="Usuário" />
                    <Field name="password" component={Input} label="Senha" />

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
              <button onClick={saveFormClick}>Entrar</button>
            </div>
            <div className="btn-sign-up">
              <Link to="">Cadastro</Link>
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
