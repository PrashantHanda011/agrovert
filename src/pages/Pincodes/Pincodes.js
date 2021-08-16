import React, { useState, useEffect } from "react";
import Loading from "../../components/Base/Loading";
import AddButton from "../../components/PincodePageComponents/AddButton";
import { fetchPincodes } from "../../utils/utils";
import Base from "../Base";
import { addPincode } from "../../utils/utils";
import { Modal } from "react-bootstrap";

const Pincodes = () => {
  const [pincodes, setPincodes] = useState([]);
  const [open, setOpen] = useState(false);
  const types = ["SERVICABLE","NON-SERVICABLE"]
  const [values,setValues] = useState({pincode:"",type:""})

  const changeHandler = (name) => (event) =>{
      setValues({...values,[name]:event.target.value})
  }

  const formSubmit = (event) =>{
      event.preventDefault()
      setPincodes([...pincodes,values])
      console.log(pincodes)
      handleClose()
      addPincode(values)
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
      const pincodes = await fetchPincodes();
      setPincodes(pincodes);
    };
    getPincodes();
  }, []);
  console.log(pincodes);
  return <Base>{pincodes ? makeUI() : <Loading />}</Base>;
};

export default Pincodes;
