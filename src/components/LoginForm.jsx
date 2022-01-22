import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Alert } from 'react-bootstrap';
import cn from 'classnames';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';
import chatLoginImageURL from './chatLoginImage.jpg';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(5, 'Too Short!')
    .required('Required'),
});

export default () => {
  const auth = useAuth();
  const [validated, setValidated] = useState(true);
  const fieldClass = cn('form-control', {
    'is-invalid': !validated,
  });
  return (
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img src={chatLoginImageURL} className="rounded-circle" alt="Войти" />
                  </div>
                  <Formik
                    initialValues={{
                      username: '',
                      password: '',
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={async (values, { setErrors }) => {
                      try {
                        const response = await axios.post(routes.loginPath(), values);
                        const { token } = response.data;
                        localStorage.setItem('userId', JSON.stringify({ token }));
                        console.log(localStorage.getItem('userId'));
                        auth.logIn();
                        // navigate(from);
                      } catch (e) {
                        setValidated(false);
                        setErrors({ password: 'Invalid username or password' });
                        console.log(localStorage.getItem('userId'));
                      }
                    }}
                  >
                    <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                      <h1 className="text-center mb-4">Войти</h1>
                      <div className="form-floating mb-3 form-group">
                        <label className="form-label" htmlFor="username">Ваш ник</label>
                        <Field
                          name="username"
                          autoComplete="username"
                          validate={LoginSchema}
                          placeholder="Ваш ник"
                          id="username"
                          className={fieldClass}
                        />
                        <ErrorMessage name="username" render={(msg) => <Alert variant="danger">{msg}</Alert>} />
                      </div>
                      <div className="form-floating mb-4 form-group">
                        <label className="form-label" htmlFor="password">Пароль</label>
                        <Field
                          id="password"
                          name="password"
                          autoComplete="current-password"
                          validate={LoginSchema}
                          placeholder="Пароль"
                          type="password"
                          className={fieldClass}
                        />
                        <ErrorMessage name="password" render={(msg) => <Alert variant="danger">{msg}</Alert>} />
                      </div>
                      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
                    </Form>
                  </Formik>
                </div>
                <div className="card-footer p-4">
                  <div className="text-center">
                    <span>Нет аккаунта?</span>
                    <a href="/signup">Регистрация</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};
