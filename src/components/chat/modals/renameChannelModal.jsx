/* eslint-disable no-shadow */
import { Modal, Alert } from 'react-bootstrap';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import cn from 'classnames';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';

const RenameChannelModal = (props) => {
  const { show, onHide, editChannel } = props;
  const { channels } = useSelector((state) => state.chat);
  const channelsNames = channels.map(({ name }) => name);
  const [validated, setValidated] = useState(true);
  const fieldClass = cn('form-control', {
    'is-invalid': !validated,
  });
  const newChannelSchema = Yup.object().shape({
    name: Yup.mixed()
      .notOneOf(channelsNames, 'Имя должно быть уникальным')
      .required('Введите название канала'),
  });
  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Добавить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={newChannelSchema}
          onSubmit={(values) => {
            const { name } = values;
            editChannel(name);
            onHide();
          }}
        >
          <Form>
            <div className="form-floating mb-3 form-group">
              <Field
                autoFocus
                validate={newChannelSchema}
                id="name"
                name="name"
                type="input"
                aria-label="Имя канала"
                className={fieldClass}
              />
              <ErrorMessage name="name">
                { (msg) => {
                  setValidated(false);
                  return (
                    <Alert variant="danger">{ msg }</Alert>
                  );
                } }

              </ErrorMessage>
              <div className="d-flex justify-content-end">
                <button type="button" onClick={onHide} className="me-2 btn btn-secondary">Отменить</button>
                <button type="submit" className="btn btn-primary">Отправить</button>
              </div>
            </div>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
export default RenameChannelModal;
