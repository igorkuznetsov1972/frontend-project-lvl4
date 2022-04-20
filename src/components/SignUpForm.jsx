/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import {
  Alert, Container, Row, Col, Card, Button,
} from 'react-bootstrap';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';
import routes from '../routes.js';
import chatSignUpImageURL from '../assets/chatSignUpImage.jpg';

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'short')
    .max(20, 'long')
    .required('required'),
  password: Yup.string()
    .min(6, 'short6')
    .required('required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export default (props) => {
  const auth = useAuth();
  const { setSigninUp } = props;
  const [validated, setValidated] = useState(true);
  const fieldClass = cn('form-control', {
    'is-invalid': !validated,
  });
  const { t } = useTranslation();
//  useLayoutEffect(() => () => setSigninUp(false));

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={chatSignUpImageURL} className="rounded-circle" alt="Регистрация" />
              </div>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  passwordConfirmation: '',
                }}
                validationSchema={SignUpSchema}
                onSubmit={async (values, { setErrors }) => {
                  try {
                    const response = await axios.post(routes.signupPath(), values);
                    const { token } = response.data;
                    const { username } = values;
                    localStorage.setItem('user', JSON.stringify({ token, username }));
                    auth.setUser({ token, username });
                  } catch (e) {
                    setValidated(false);
                    setErrors({ username: 'Username already exists' });
                  }
                }}
              >
                <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">Регистрация</h1>
                  <div className="form-floating mb-3 form-group">
                    <Field
                      name="username"
                      autoComplete="username"
                      validate={SignUpSchema}
                      placeholder="Имя пользователя"
                      id="username"
                      className={fieldClass}
                    />
                    <label className="form-label" htmlFor="username">Ваш ник</label>
                    <ErrorMessage name="username" render={(msg) => <Alert variant="danger">{t(msg)}</Alert>} />
                  </div>
                  <div className="form-floating mb-4 form-group">
                    <Field
                      id="password"
                      name="password"
                      autoComplete="current-password"
                      validate={SignUpSchema}
                      placeholder="Пароль"
                      type="password"
                      className={fieldClass}
                    />
                    <label className="form-label" htmlFor="password">Пароль</label>
                    <ErrorMessage name="password" render={(msg) => <Alert variant="danger">{t(msg)}</Alert>} />
                  </div>
                  <div className="form-floating mb-4 form-group">
                    <Field
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                      autoComplete="confirm-password"
                      validate={SignUpSchema}
                      placeholder="Подтвердите Пароль"
                      type="passwordConfirmation"
                      className={fieldClass}
                    />
                    <label className="form-label" htmlFor="passwordConfirmation">Пароль</label>
                    <ErrorMessage name="passwordConfirmation" render={(msg) => <Alert variant="danger">{t(msg)}</Alert>} />
                  </div>
                  <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('dosignup')}</Button>
                </Form>
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

  );
};
