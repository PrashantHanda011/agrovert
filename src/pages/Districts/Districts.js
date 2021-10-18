import React, { useState, useEffect } from "react";
import Loading from "../../components/Base/Loading";
import AddButton from "../../components/DistrictPageComponents/AddButton";
import Base from "../Base";
import { Modal } from "react-bootstrap";
import DistrictModule from "../../modules/districtModule";

const Districts = () => {
  const districtModule = new DistrictModule();

  const [districts, setDistricts] = useState([]);
  const [open, setOpen] = useState(false);
  const types = ["SERVICABLE", "NON-SERVICABLE"];
  const [values, setValues] = useState({ district: "", type: "" });

  const changeHandler = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const formSubmit = (event) => {
    event.preventDefault();

    handleClose();
    districtModule.addDistrict(values, setDistricts, districts);
  };

  const deleteDistrict = (id) => {
    const updatedDistricts = districts.filter((district) => district.id !== id);
    setDistricts(updatedDistricts);
    districtModule.deleteDistrict(id);
  };

  const makeForm = () =>{
    return (
        <form>
    <div className="form-group">
      <span>
        <h6>District</h6>
      </span>
      <input
        type="text"
        name=""
        className="form-control form-control-user"
       onChange={changeHandler("district")}
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
  <button className="btn btn-success" onClick={formSubmit}>Add District</button>
  </form>
    )
}

const makeModal = ()  =>{ 

    return (
        <Modal show={open} onHide={handleClose}>
            
          <Modal.Header  closeButton>
            <Modal.Title>Add a District</Modal.Title>
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
        <AddButton name="Add District" handleShowProduct={handleOpen} />
        <div className="m-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Districts</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>District</th>
                      <th>District Status</th>
                      <th></th>
                    </tr>
                    
                  </thead>
                  <tbody>
                    {districts.length>0 ?
                      districts.map((district, index) => {
                        return (
                          <tr>
                            <td>{district.district}</td>
                            <td>
                              <div
                                className={
                                  district.type === "SERVICABLE"
                                    ? "badge badge-success"
                                    : "badge badge-danger"
                                }>
                                {district.type}
                              </div>
                            </td>
                            <td><div className="btn btn-danger" onClick={()=>{deleteDistrict(district.id)}}><i class="fa fa-trash" aria-hidden="true"></i></div></td>
                          </tr>
                        );
                      }):<h4>No Districts to load</h4>}
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
    const getDistricts = async () => {
      const districts = await districtModule.fetchDistricts();
      setDistricts(districts);
    };
    getDistricts();
  }, []);

  return <Base>{districts ? makeUI() : <Loading />}</Base>;
};

export default Districts;
