import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";

const ModalContainer = ({ children, heading, show, close }) => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-5">{children}</Modal.Body>
    </Modal>
  );
};

ModalContainer.propTypes = {
  heading: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default ModalContainer;
