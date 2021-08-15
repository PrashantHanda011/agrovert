import React,{useState,useEffect} from "react";
import { Modal } from "react-bootstrap";
import { addPincode } from "../../utils/utils";

const PincodeForm = ({ show, handleClose,pincodes,setPincodes }) => {
    const types = ["SERVICABLE","NON-SERVICABLE"]
    const [values,setValues] = useState({pincode:"",type:""})
    const [close,setClose] = useState(false)
    const changeHandler = (name) => (event) =>{
        setValues({...values,[name]:event.target.value})
    }

    const formSubmit = (event) =>{
        event.preventDefault()
        setPincodes(pincodes.push(values))
        addPincode(values,setClose)
    }
    useEffect(()=>{
        if(close===true){
          handleClose()
        }
      },[close])
    const makeForm = () =>{
        return (
            <form>
        <div className="form-group">
          <span>
            <h6>Pincode</h6>
          </span>
          <input
            type="text"
            name=""
            className="form-control form-control-user"
           onChange={changeHandler("pincode")}
          />
          
        </div>
       <div className="form-group my-3">
        <select
          onChange={changeHandler("type")}
          className="form-control"
          placeholder="Category">
          <option>Select</option>
          {types &&
            types.map((type, index) => (
              <option id={index} value={type}>
                {type}
              </option>
            ))}
        </select>
      </div>
      <button className="btn btn-success" onClick={formSubmit}>Add Pincode</button>
      </form>
        )
    }
  return (
    <Modal show={show} onHide={handleClose}>
        
      <Modal.Header  closeButton>
        <Modal.Title>Add a Pincode</Modal.Title>
      </Modal.Header>
      <Modal.Body>{makeForm()}</Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          Close
        </button>
        {/* <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-success my-3 mb-3">
          Create Product
        </button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default PincodeForm;
