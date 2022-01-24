import React from 'react';
import {
  Container, Row, Col, Nav, Button,
} from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';

export default () => (
  <Container className="h-100 my-4 overflow-hidden rounded shadow">
    <Row className="h-100 bg-white flex-md-row">
      <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
        <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
          <span>Каналы</span>
          <button type="button" className="p-0 text-primary btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            <span className="visually-hidden">+</span>
          </button>
        </div>
        <Nav as="ul" className="nav flex-column nav-pills nav-fill px-2">
          <Nav.Item as="li" className="w-100">
            <Button className="w-100 rounded-0 text-start btn btn-secondary">
              <span className="me-1">#</span>
              &quot;general&quot;
            </Button>
          </Nav.Item>
        </Nav>
      </Col>
      <Col className="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
              <b># general</b>
            </p>
            <span className="text-muted">4 сообщения</span>
          </div>
          <div id="messages-box" className="chat-messages overflow-auto px-5">
            <div className="text-break mb-2">
              <b>admin</b>
              :
              asdsad
            </div>
          </div>
          <div className="mt-auto px-5 py-3">
            <Formik
              initialValues={{
                newMessage: '',
              }}
              onSubmit={(values) => console.log(values.newMessage)}
            >
              <Form className="py-1 border rounded-2">
                <div className="input-group has-validation">
                  <Field
                    id="newMessage"
                    name="newMessage"
                    type="text"
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..."
                    className="border-0 p-0 ps-2 form-control"
                  />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-group-vertical" disabled="">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg>
                      <span className="visually-hidden">Отправить</span>
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </Col>
    </Row>
  </Container>
);
