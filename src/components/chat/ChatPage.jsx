import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRollbar } from '@rollbar/react';
import {
  Container, Row, Col, Nav, Button, Spinner, Alert, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import {
  Formik, Form, Field,
} from 'formik';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import * as filter from 'leo-profanity';
import { fetchChat, changeCurrentChannel } from './slices/chatSlice';
import useChat from '../../hooks/useChat';
import useAuth from '../../hooks/useAuth';
import AddChannelModal from './modals/addChannelModal.jsx';
import RenameChannelModal from './modals/renameChannelModal.jsx';
import DeleteChannelModal from './modals/deleteChannelModal.jsx';

export default () => {
  const dispatch = useDispatch();

  const {
    sendMessage, newChannel, editChannel, deleteChannel,
  } = useChat();
  const auth = useAuth();
  const currentUser = auth.user.username;

  useEffect(() => {
    dispatch(fetchChat());
  }, []);

  const messageRef = useRef(null);
  const rollbar = useRollbar();

  const handleClick = (id) => (e) => {
    e.preventDefault();
    dispatch(changeCurrentChannel(id));
    messageRef.current.focus();
  };

  const {
    channels, messages, currentChannelId, status,
  } = useSelector((state) => state.chat);
  const currentChannelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  const [newChannelModalShow, setNewChannelModalShow] = React.useState(false);
  const [renameChannelModalShow, setRenameChannelModalShow] = React.useState(false);
  const [deleteChannelModalShow, setDeleteChannelModalShow] = React.useState(false);

  const isActiveChannel = (id) => id === currentChannelId;

  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  switch (status) {
    case 'pending': {
      const { t } = useTranslation();
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
      const { t } = useTranslation();
      rollbar.error('Network error');
      return (
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
          <Alert variant="danger">
            <Alert.Heading>{t('network error')}</Alert.Heading>
          </Alert>
        </Container>
      );
    }
    case 'fulfilled': {
      const { t } = useTranslation();
      return (
        <Container fluid className="h-100 my-4 overflow-hidden rounded shadow">
          <Row className="h-100 bg-white flex-md-row">
            <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
              <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                <span>{t('channels')}</span>
                <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => setNewChannelModalShow(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                  <span className="visually-hidden">+</span>
                </button>
                <AddChannelModal
                  show={newChannelModalShow}
                  onHide={() => setNewChannelModalShow(false)}
                  newChannel={newChannel}
                />
              </div>
              <Nav
                as="ul"
                fill="true"
                className="px-2 d-inline text-truncate"
                variant="pills"
              >
                { channels.map(({ id, name, removable }) => (removable
                  ? (
                    <Nav.Item as="li" className="w-100" key={name}>
                      <Dropdown as={ButtonGroup} className="w-100 d-flex d-inline">
                        <Button
                          variant={isActiveChannel(id) ? 'secondary' : 'light'}
                          className="w-100 rounded-0 text-start text-truncate"
                          onClick={handleClick(id)}
                        >
                          {`#${name}`}
                        </Button>
                        <span className="visually-hidden">Управление каналом</span>
                        <Dropdown.Toggle split variant={ isActiveChannel(id) ? 'secondary' : 'light' } id={ id.toString() } />
                        <span className="visually-hidden">Управление каналом</span>
                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="1" onClick={() => setRenameChannelModalShow(true)}>{t('rename')}</Dropdown.Item>
                          <RenameChannelModal
                            show={renameChannelModalShow}
                            onHide={() => setRenameChannelModalShow(false)}
                            editChannel={editChannel}
                            id={id}
                          />
                          <Dropdown.Item eventKey="2" onClick={() => setDeleteChannelModalShow(true)}>{t('delete')}</Dropdown.Item>
                          <DeleteChannelModal
                            show={deleteChannelModalShow}
                            onHide={() => setDeleteChannelModalShow(false)}
                            deleteChannel={deleteChannel}
                            id={id}
                          />
                        </Dropdown.Menu>

                      </Dropdown>
                    </Nav.Item>
                  )
                  : (
                    <Nav.Item as="li" className="w-100" key={name}>
                      <Button
                        className="w-100 rounded-0 text-start"
                        variant={isActiveChannel(id) ? 'secondary' : 'light'}
                        key={id.toString()}
                        onClick={handleClick(id)}
                      >
                        {`#${name}`}
                      </Button>
                    </Nav.Item>
                  ))) }
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
                  {currentChannelMessages.map(({ username, body, id }) => (
                    <div className="text-break mb-2" key={id}>
                      <b>{username}</b>
                      :
                      {body}
                    </div>
                  ))}
                </div>
                <div className="mt-auto px-5 py-3">
                  <Formik
                    initialValues={{
                      newMessage: '',
                    }}
                    onSubmit={({ newMessage }, actions) => {
                      console.log('Submitting new message');
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
                            placeholder={t('new message')}
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
      const { t } = useTranslation();
      return (
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
          <Alert variant="danger">
            <Alert.Heading>{t('general error')}</Alert.Heading>
          </Alert>
        </Container>
      );
    }
  }
};
