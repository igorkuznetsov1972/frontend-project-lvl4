import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Nav, Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as filter from 'leo-profanity';
import { changeCurrentChannel } from '../../slices/chat';
import { showModal, hideModal } from '../../slices/modal';
import useChat from '../../hooks/useChat';
import ChannelModal from './modals/ChannelModal.jsx';
import {
  getModalState,
  getCurrentChannel,
} from './selectors';

const Channels = (props) => {
  const { channels } = props;
  const dispatch = useDispatch();

  const { messageRef } = props;

  const {
    editChannel, deleteChannel,
  } = useChat();

  const currentChannelId = useSelector((state) => getCurrentChannel(state));

  const modalState = useSelector((state) => getModalState(state));

  const isActiveChannel = (id) => id === currentChannelId;

  const handleShowModal = (type) => () => dispatch(showModal(type));
  const handleHideModal = (type) => () => dispatch(hideModal(type));
  const handleClick = (id) => (e) => {
    e.preventDefault();
    dispatch(changeCurrentChannel(id));
    messageRef.current.focus();
  };

  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));
  const { t } = useTranslation();

  return (
    <>
      {
      channels.map(({ id, name, removable }) => (removable
        ? (
          <Nav.Item as="li" className="w-100" key={name}>
            <Dropdown as={ButtonGroup} className="w-100 d-flex d-inline">
              <Button
                variant={isActiveChannel(id) ? 'secondary' : 'light'}
                className="w-100 rounded-0 text-start text-truncate"
                onClick={handleClick(id)}
              >
                { `#${name}` }
              </Button>
              <Dropdown.Toggle split name="Управление каналом" variant={isActiveChannel(id) ? 'secondary' : 'light'} id={id.toString()}>
                <span className="visually-hidden">Управление каналом</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1" onClick={handleShowModal('rename')}>{ t('rename') }</Dropdown.Item>
                <ChannelModal
                  name="rename"
                  show={modalState.rename}
                  onHide={handleHideModal('rename')}
                  action={editChannel}
                  id={id}
                />
                <Dropdown.Item eventKey="2" onClick={handleShowModal('delete')}>{ t('delete') }</Dropdown.Item>
                <ChannelModal
                  name="delete"
                  show={modalState.delete}
                  onHide={handleHideModal('delete')}
                  action={deleteChannel}
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
              { `#${name}` }
            </Button>
          </Nav.Item>
        )))
      }
    </>
  );
};

export default Channels;
