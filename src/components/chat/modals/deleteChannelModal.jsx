/* eslint-disable no-shadow */
import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';

const DeleteChannelModal = (props) => {
  const {
    show, onHide, deleteChannel, id,
  } = props;
  const { t } = useTranslation();
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
          {t('delete')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('sure')}
      </Modal.Body>
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
    </Modal>
  );
};
export default DeleteChannelModal;
