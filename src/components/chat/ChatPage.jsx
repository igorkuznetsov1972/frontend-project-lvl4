/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRollbar } from '@rollbar/react';
import {
  Container, Row, Col, Nav, Spinner, Alert,
} from 'react-bootstrap';
import {
  Formik, Form, Field,
} from 'formik';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import * as filter from 'leo-profanity';
import axios from 'axios';
import { getServerState } from '../../slices/chat';
import { showModal, hideModal } from '../../slices/modal';
import useChat from '../../hooks/useChat';
import useAuth from '../../hooks/useAuth';
import ChannelModal from './modals/ChannelModal.jsx';
import {
  getModalState,
  getCurrentChannel,
  getChannels,
  getCurrentChannelMessages,
  getfetchStatus,
} from './selectors';
import routes from '../../routes';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();

  const fetchChat = () => async () => {
    try {
      const response = await axios.get(routes.chatPath(), { headers: { Authorization: `Bearer ${auth.user.token}` } });
      dispatch(getServerState({ ...response.data, status: 'fulfilled' }));
    } catch (e) {
      console.log(e.response.status);
      if (e.response.status === 401) {
        auth.logOut();
      } else dispatch(getServerState({ status: 'rejected' }));
    }
  };
  useEffect(fetchChat(), [auth.user]);

  const currentUser = auth.user.username;

  const messageRef = useRef(null);
  const rollbar = useRollbar();

  const {
    sendMessage, newChannel,
  } = useChat();

  const handleShowModal = (type) => () => dispatch(showModal(type));
  const handleHideModal = (type) => () => dispatch(hideModal(type));

  const channels = useSelector(getChannels);
  const currentChannelId = useSelector(getCurrentChannel);
  const status = useSelector(getfetchStatus);
  const currentChannelMessages = useSelector(getCurrentChannelMessages);

  const modalState = useSelector(getModalState);

  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));
  const { t } = useTranslation();

  switch (status) {
    case 'pending': {
      return (
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
          <Spinner animation="border" role="status" />
          <Alert variant="primary">
            <Alert.Heading>{t('loading')}</Alert.Heading>
          </Alert>
        </Container>
      );
    }
    case 'rejected': {
      rollbar.error('Network error');
      return (
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
          <Alert variant="danger">
            <Alert.Heading>{t('network_error')}</Alert.Heading>
          </Alert>
        </Container>
      );
    }
    case 'fulfilled': {
      return (
        <Container fluid className="h-100 my-4 overflow-hidden rounded shadow">
          <Row className="h-100 bg-white flex-md-row">
            <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
              <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                <span>{t('channels')}</span>
                <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={handleShowModal('new')}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                  <span className="visually-hidden">+</span>
                </button>
                <ChannelModal
                  name="new"
                  show={modalState.new}
                  onHide={handleHideModal('new')}
                  action={newChannel}
                />
              </div>
              <Nav
                as="ul"
                fill="true"
                className="px-2 d-inline text-truncate"
                variant="pills"
              >
                <Channels channels={channels} messageRef={messageRef} />
              </Nav>
            </Col>
            <Col className="p-0 h-100">
              <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                  <p className="m-0">
                    <b>
                      #
                      {' '}
                      {_.get(channels.find(({ id }) => id === currentChannelId), 'name')}
                    </b>
                  </p>
                  <span className="text-muted">
                    {currentChannelMessages.length}
                    {' '}
                    {t('message', { count: currentChannelMessages.length })}
                  </span>
                </div>
                <div id="messages-box" className="chat-messages overflow-auto px-5">
                  <Messages messages={currentChannelMessages} />
                </div>
                <div className="mt-auto px-5 py-3">
                  <Formik
                    initialValues={{
                      newMessage: '',
                    }}
                    onSubmit={({ newMessage }, actions) => {
                      sendMessage({
                        body: filter.clean(newMessage),
                        channelId: currentChannelId,
                        username: currentUser,
                      });
                      actions.resetForm();
                      messageRef.current.focus();
                    }}
                  >
                    { (props) => (
                      <Form
                        onSubmit={props.handleSubmit}
                        onChange={props.handleChange}
                        className="py-1 border rounded-2"
                      >
                        <div className="input-group has-validation">
                          <Field
                            autoFocus
                            innerRef={messageRef}
                            id="newMessage"
                            name="newMessage"
                            type="text"
                            aria-label="Новое сообщение"
                            placeholder={t('new_message')}
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
                    )}
                  </Formik>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      );
    }
    default: {
      return (
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
          <Alert variant="danger">
            <Alert.Heading>{t('general_error')}</Alert.Heading>
          </Alert>
        </Container>
      );
    }
  }
};

export default ChatPage;
