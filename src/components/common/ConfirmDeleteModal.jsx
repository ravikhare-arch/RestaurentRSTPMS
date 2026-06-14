import Modal from './Modal'

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, title = 'Confirm Delete', message }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title}>
    <p className="modal__message">{message || 'Are you sure you want to delete this record?'}</p>
    <div className="modal__actions">
      <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
      <button type="button" className="btn btn-danger" onClick={onConfirm}>Delete</button>
    </div>
  </Modal>
)

export default ConfirmDeleteModal
