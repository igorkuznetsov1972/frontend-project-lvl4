/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useRollbar } from '@rollbar/react';
import axios from 'axios';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Alert, Container, Row, Col, Card, Button,
} from 'react-bootstrap';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';
import routes from '../routes.js';
import chatLoginImageURL from '../assets/chatLoginImage.jpg';

export default () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(true);
  const fieldClass = cn('form-control', {
    'is-invalid': !validated,
  });
  const { t } = useTranslation();
  const rollbar = useRollbar();

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
                onSubmit={async (values, { setErrors }) => {
                  try {
                    const response = await axios.post(routes.loginPath(), values);
                    const { token } = response.data;
                    const { username } = values;
                    localStorage.setItem('user', JSON.stringify({ token, username }));
                    auth.setUser({ token, username });
                    navigate('/');
                  } catch (e) {
                    setValidated(false);
                    rollbar.error('Error loggin in', e);
                    if (e.message === 'Network Error') toast.error(t('network error'));
                    else setErrors({ password: t('Invalid username or password') });
                  }
                }}
              >
                <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <div className="form-floating mb-3 form-group">
                    <Field
                      name="username"
                      autoComplete="username"
                      placeholder="Ваш ник"
                      id="username"
                      className={fieldClass}
                    />
                    <label className="form-label" htmlFor="username">{t('nickname')}</label>
                    <ErrorMessage name="username" render={(msg) => <Alert variant="danger">{t(msg)}</Alert>} />
                  </div>
                  <div className="form-floating mb-4 form-group">
                    <Field
                      id="password"
                      name="password"
                      autoComplete="current-password"
                      placeholder="Пароль"
                      type="password"
                      className={fieldClass}
                    />
                    <label className="form-label" htmlFor="password">{t('password')}</label>
                    <ErrorMessage name="password" render={(msg) => <Alert variant="danger">{t(msg)}</Alert>} />
                  </div>
                  <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('login')}</button>
                </Form>
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>
                  { t('not registered') }
                  {' '}
                </span>
                <Link to="/signup">{t('signup')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>

  );
};
