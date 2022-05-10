/* eslint-disable no-shadow */
import { Modal, Alert, Button } from 'react-bootstrap';
import React from 'react';
import { useSelector } from 'react-redux';
import * as filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import cn from 'classnames';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';

const ChannelModal = (props) => {
  const {
    name, show, onHide, action, id = null,
  } = props;
  const { channels } = useSelector((state) => state.chat);
  const channelsNames = channels.map(({ name }) => name);
  const { t } = useTranslation();
  const channelNameSchema = Yup.object().shape({
    name: Yup.mixed()
      .notOneOf(channelsNames, 'uniquechannelname')
      .required('required'),
  });
  const handleClick = () => {
    action(id);
    onHide();
  };

  const modalsContent = {
    new: {
      body: () => (
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={channelNameSchema}
          onSubmit={(values) => {
            const { name } = values;
            action(filter.clean(name, '*', 1));
            onHide();
          }}
        >
          {({ isValid }) => (
            <Form>
              <div className="form-floating mb-3 form-group">
                <Field
                  autoFocus
                  validate={channelNameSchema}
                  id="name"
                  name="name"
                  type="input"
                  aria-label="Имя канала"
                  className={cn('mb-2 form-control', { 'is-invalid': !isValid })}
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
      ),
      title: () => t('add'),
      footer: () => null,
    },
    rename: {
      body: () => (
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={channelNameSchema}
          onSubmit={(values) => {
            const { name } = values;
            action(id, filter.clean(name, '*', 1));
            onHide();
          }}
        >
          {({ isValid }) => (
            <Form>
              <div className="form-floating mb-3 form-group">
                <Field
                  autoFocus
                  validate={channelNameSchema}
                  id="name"
                  name="name"
                  type="input"
                  aria-label="Имя канала"
                  className={cn('mb-2 form-control', { 'is-invalid': !isValid })}
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
      ),
      title: () => t('rename'),
      footer: () => null,
    },
    delete: {
      body: () => t('sure'),
      title: () => t('delete'),
      footer: () => (
        <Modal.Footer>
          <div className="d-flex justify-content-end">
            <Button type="button" onClick={onHide} className="me-2 btn btn-secondary">{t('cancel')}</Button>
            <Button
              className="btn btn-primary"
              onClick={handleClick}
            >
              {t('deletebutton')}
            </Button>
          </div>
        </Modal.Footer>
      ),
    },
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {modalsContent[name].title()}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalsContent[name].body()}
      </Modal.Body>
      {modalsContent[name].footer()}
    </Modal>
  );
};
export default ChannelModal;
