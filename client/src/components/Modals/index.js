import { Modal } from 'react-bootstrap';

export default function Modals({ title, body, show, handleClose, close, save }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                {close}
                {save}
            </Modal.Footer>
        </Modal>
    );
}