/* eslint-disable no-shadow */
import { Modal, Alert } from 'react-bootstrap';
import React from 'react';
import { useSelector } from 'react-redux';
import * as filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import cn from 'classnames';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';

const RenameChannelModal = (props) => {
  const {
    show, onHide, editChannel, id,
  } = props;
  const { channels } = useSelector((state) => state.chat);
  const channelsNames = channels.map(({ name }) => name);
  const { t } = useTranslation();
  const newChannelSchema = Yup.object().shape({
    name: Yup.mixed()
      .notOneOf(channelsNames, 'uniquechannelname')
      .required('required'),
  });
  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {t('rename')}
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
            editChannel(id, filter.clean(name, '*', 1));
            onHide();
          }}
        >
          {({ isValid }) => (
            <Form>
              <div className="form-floating mb-3 form-group">
                <Field
                  autoFocus
                  validate={newChannelSchema}
                  id="name"
                  name="name"
                  type="input"
                  aria-label="Имя канала"
                  className={cn('form-control', { 'is-invalid': !isValid })}
                />
                <ErrorMessage name="name">
                  { (msg) => (
                    <Alert variant="danger">{t(msg)}</Alert>
                  ) }

                </ErrorMessage>
                <div className="d-flex justify-content-end">
                  <button type="button" onClick={onHide} className="me-2 btn btn-secondary">{t('cancel')}</button>
                  <button type="submit" className="btn btn-primary">{t('send')}</button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
export default RenameChannelModal;
