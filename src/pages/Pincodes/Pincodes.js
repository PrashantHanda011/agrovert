import React, { useState, useEffect } from "react";
import Loading from "../../components/Base/Loading";
import AddButton from "../../components/PincodePageComponents/AddButton";
import Base from "../Base";
import { Modal } from "react-bootstrap";
import PincodeModule from '../../modules/pincodeModule'

const Pincodes = () => {
  const [pincodes, setPincodes] = useState([]);
  const [open, setOpen] = useState(false);
  const types = ["SERVICABLE","NON-SERVICABLE"]
  const [values,setValues] = useState({pincode:"",type:""})
  const pincodeModule = new PincodeModule()


  const changeHandler = (name) => (event) =>{
      setValues({...values,[name]:event.target.value})
  }

  const formSubmit = (event) =>{
      event.preventDefault()
    
      handleClose()
      pincodeModule.addPincode(values,setPincodes,pincodes)
  }

  const deletePincode = (id) => {
    const updatedPincodes = pincodes.filter(pincode=>pincode.id!==id)
    setPincodes(updatedPincodes)
    pincodeModule.deletePinCode(id)
  }

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

const makeModal = ()  =>{ 

    return (
        <Modal show={open} onHide={handleClose}>
            
          <Modal.Header  closeButton>
            <Modal.Title>Add a Pincode</Modal.Title>
          </Modal.Header>
          <Modal.Body>{makeForm()}</Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
    
          </Modal.Footer>
        </Modal>
      );
}

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const makeUI = () => {
    return (
      <div className="m-4">
        <AddButton name="Add Pincode" handleShowProduct={handleOpen} />
        <div className="m-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Pincodes</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Pincode</th>
                      <th>Pincode Status</th>
                      <th></th>
                    </tr>
                    
                  </thead>
                  <tbody>
                    {pincodes.length>0 &&
                      pincodes.map((pincode, index) => {
                        return (
                          <tr>
                            <td>{pincode.pincode}</td>
                            <td>
                              <div
                                className={
                                  pincode.type === "SERVICABLE"
                                    ? "badge badge-success"
                                    : "badge badge-danger"
                                }>
                                {pincode.type}
                              </div>
                            </td>
                            <td><div className="btn btn-danger" onClick={()=>{deletePincode(pincode.id)}}><i class="fa fa-trash" aria-hidden="true"></i></div></td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {open && (
            makeModal()
        )}
      </div>
    );
  };
  useEffect(() => {
    const getPincodes = async () => {
      const pincodes = await pincodeModule.fetchPincodes();
      setPincodes(pincodes);
    };
    getPincodes();
  }, []);

  return <Base>{pincodes ? makeUI() : <Loading />}</Base>;
};

export default Pincodes;
