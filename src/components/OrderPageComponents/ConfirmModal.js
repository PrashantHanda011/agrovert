import React from 'react'
import { Modal } from 'react-bootstrap'

const ConfirmModal = ({show,handleClose,action}) => {
    return (
        <Modal show={show} onHide={()=>{handleClose();}} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h6><Modal.Title>Do You want to Confirm this action</Modal.Title></h6>
            <div className="row">
                <div className="btn btn-secondary col-4 offset-2 mr-3" onClick={handleClose}>No</div>
                <div className="btn btn-success col-4" onClick={action}>Yes</div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    )
}

export default ConfirmModal
