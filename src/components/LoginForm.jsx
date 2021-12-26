import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import chatLoginImageURL from './chatLoginImage.jpg';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .required('Required'),
});
export default () => (
  <div className="h-100" id="chat">
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">Hexlet Chat</a>
          <button type="button" className="btn btn-primary">Выйти</button>
        </div>
      </nav>
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
                  onSubmit={(values) => {
                    console.log(JSON.stringify(values, null, 2));
                  }}
                >
                  <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                    <h1 className="text-center mb-4">Войти</h1>
                    <div className="form-floating mb-3 form-group">
                      <label className="form-label" htmlFor="username">Ваш ник</label>
                      <Field
                        name="username"
                        autoComplete="username"
                        required=""
                        placeholder="Ваш ник"
                        id="username"
                        className="form-control"
                      />
                      <ErrorMessage name="username" />
                    </div>
                    <div className="form-floating mb-4 form-group">
                      <label className="form-label" htmlFor="password">Пароль</label>
                      <Field
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        required=""
                        placeholder="Пароль"
                        type="password"
                        className="form-control"
                      />
                      <ErrorMessage name="password" />
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
