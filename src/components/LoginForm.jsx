import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import {
  Alert, Container, Row, Col, Card,
} from 'react-bootstrap';
import cn from 'classnames';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';
import chatLoginImageURL from '../assets/chatLoginImage.jpg';

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
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <img src={chatLoginImageURL} className="rounded-circle" alt="Войти" />
              </Col>
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
                    const { username } = values;
                    localStorage.setItem('user', JSON.stringify({ token, username }));
                    console.log(localStorage.getItem('user'));
                    auth.setUser({ token, username });
                  } catch (e) {
                    setValidated(false);
                    setErrors({ password: 'Invalid username or password' });
                    console.log(localStorage.getItem('user'));
                  }
                }}
              >
                <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <div className="form-floating mb-3 form-group">
                    <Field
                      name="username"
                      autoComplete="username"
                      validate={LoginSchema}
                      placeholder="Ваш ник"
                      id="username"
                      className={fieldClass}
                    />
                    <label className="form-label" htmlFor="username">Ваш ник</label>
                    <ErrorMessage name="username" render={(msg) => <Alert variant="danger">{msg}</Alert>} />
                  </div>
                  <div className="form-floating mb-4 form-group">
                    <Field
                      id="password"
                      name="password"
                      autoComplete="current-password"
                      validate={LoginSchema}
                      placeholder="Пароль"
                      type="password"
                      className={fieldClass}
                    />
                    <label className="form-label" htmlFor="password">Пароль</label>
                    <ErrorMessage name="password" render={(msg) => <Alert variant="danger">{msg}</Alert>} />
                  </div>
                  <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
                </Form>
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                <a href="/signup">Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>

  );
};
