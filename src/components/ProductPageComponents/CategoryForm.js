import React,{useState} from 'react'
import {Modal} from "react-bootstrap"
import { uploadCategory } from '../../utils/utils'

const CategoryForm = ({show,handleClose}) => {
    const [category,setCategory] = useState("")
    const [file,setFile] = useState("")
    const [error,setError] = useState({image:false,category_name:false})
    const handleInput = e=>{
        setCategory(e.target.value)
    }

    const handleImage = event =>{
      const value = event.target.files[0]
      setFile(value)
    }

    const checkMissing = () =>{
      if(file===""){
        setError({...error,image:true})
      }
      if(category===""){
        setError({...error,category_name:true})
      }
  }
    const onSubmit = e =>{
        e.preventDefault()
        checkMissing()
        if(!(error.image && error.category_name)){
          uploadCategory(file,category,setCategory,setFile)
        handleClose()
        }
        else{
          return
        }
        
    }

    const createCategoryForm = () =>{
        return (
            <form>
              <div className="form-group">
                    <span><h6>Upload Image</h6></span>
                    <input type="file" name="image" className="form-control form-control-user" onChange={handleImage}/>
                    {error.image &&  <div className="text-danger text-sm">Please upload a photo</div>}
                </div>
                <div className="form-group">
                    <span><h6>Category</h6></span>
                    <input type="text" name="category" className="form-control form-control-user" value={category} onChange={handleInput}/>
                    {error.category_name &&  <div className="text-danger text-sm">Please add category name</div>}
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
