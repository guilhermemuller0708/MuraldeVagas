import { useRef } from 'react';
import { object, string } from 'yup';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

import './index.scss';

import { Input } from 'app/components/Input';

import { actions } from '../../redux/slice';

const initialValues = {
  name: '',
  email: '',
  password: ''
};

const Schema = object().shape({
  name: string().required('Campo obrigatório'),
  email: string().email('Insira um e-mail').required('Campo obrigatório'),
  password: string()
    .min(5, 'Digite ao menos 5 caracteres')
    .required('Campo obrigatório')
});

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignUp = (values, { setSubmitting }) => {
    console.log('values', values);

    const user = {
      cpf: '00000000000',
      email: values.email,
      endereco: {
        cep: '0',
        cidade: ' ',
        complemento: ' ',
        estado: ' ',
        logradouro: ' ',
        numero: 0
      },
      nome: values.name,
      senha: values.password,
      telefones: [''],
      tipo: 'candidato'
    };

    dispatch(actions.signUpUser(user))
      .then(unwrapResult)
      .then((data) => {
        toast.success('Usuário criado com sucesso', {
          position: toast.POSITION.TOP_RIGHT
        });
        history.push('/login');
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
            onSubmit={handleSignUp}
          >
            {({ handleSubmit, isSubmitting }) => {
              return (
                <>
                  <Form className="form">
                    <Field
                      name="name"
                      component={Input}
                      label="Nome"
                      type="text"
                    />
                    <Field
                      name="email"
                      component={Input}
                      label="Email"
                      type="email"
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
          <div className="btn-sign-up">
            Já tenho conta, <Link to="/login">Entrar</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
