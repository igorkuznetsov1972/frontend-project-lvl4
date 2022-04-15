/* eslint-disable no-shadow */
import { Modal, Button } from 'react-bootstrap';
import React from 'react';

const DeleteChannelModal = (props) => {
  const {
    show, onHide, deleteChannel, id,
  } = props;
  const handleClick = () => {
    deleteChannel(id);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Удалить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Уверены?
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-end">
          <Button type="button" onClick={onHide} className="me-2 btn btn-secondary">Отменить</Button>
          <Button
            className="btn btn-primary"
            onClick={handleClick}
          >
            Удалить
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default DeleteChannelModal;
