import React,{useState} from 'react'
import {Modal} from "react-bootstrap"
import { uploadCategory } from './utils'

const CategoryForm = ({show,handleClose}) => {
    const [category,setCategory] = useState("")

    const handleInput = e=>{
        setCategory(e.target.value)
    }

    const onSubmit = e =>{
        e.preventDefault()
        uploadCategory(category,setCategory)
        handleClose()
    }

    const createCategoryForm = () =>{
        return (
            <form>
                <div className="form-group">
                    <span><h6>Category</h6></span>
                    <input type="text" name="category" className="form-control form-control-user" value={category} onChange={handleInput}/>
                </div>
            </form>
        )
    }
    return (
        <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>{createCategoryForm()}</Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          Close
        </button>
        <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-success my-3 mb-3">
        Create Product
      </button>
      </Modal.Footer>
    </Modal>
    )
}

export default CategoryForm
