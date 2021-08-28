import React, { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";
import { fetchAdmins, deleteAdmin } from "../../utils/utils";
import AddButton from "./AddButton";
import UserForm from "./UserForm";

const UsersTable = () => {
  const [openForm, setOpenForm] = useState(false);
  const [admins, setAdmins] = useState(null);

  const handleOpen = () => {
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  const getAdmins = async () => {
    const admins_ = await fetchAdmins();
    setAdmins(admins_);
  };

  const deleteUser = async (id) => {
    console.log(id);
    const filteredAdmin = admins.filter((admin) => admin.id !== id);
    setAdmins(filteredAdmin);
    deleteAdmin(id);
  };

  useEffect(() => {
    getAdmins();
  }, []);
  return (
    <>
      {admins && (
        <div className="m-4">
          <AddButton name="Add Admin" handleShowProduct={handleOpen} />
          <div className="card shadow mb-4 mt-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Admins</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table" width="100%">
                  <thead>
                    <tr>
                      <th>S No.</th>
                      <th>Name</th>
                      <th>Phone Number</th>
                      <th>Type</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((admin, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{admin.name}</td>
                          <td>{admin.number}</td>
                          <td>
                            <Badge
                              className={
                                admin.type === "ADMIN"
                                  ? "badge-success"
                                  : "badge-primary"
                              }>
                              {admin.type}
                            </Badge>
                          </td>
                          {admin.type !== "SUPERADMIN" ? (
                            admin.id !==
                            JSON.parse(sessionStorage.getItem("user")).uid ? (
                              <td>
                                <div
                                  className="btn btn-danger"
                                  onClick={() => {
                                    deleteUser(admin.id);
                                  }}>
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                </div>
                              </td>
                            ) : (
                              <td>
                                <button
                                  className="btn btn-danger"
                                  disabled
                                  onClick={() => {}}>
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                </button>
                              </td>
                            )
                          ) : (
                            <td>
                              <button
                                className="btn btn-danger"
                                disabled
                                onClick={() => {}}>
                                <i class="fa fa-trash" aria-hidden="true"></i>
                              </button>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {openForm && (
            <UserForm
              show={openForm}
              handleClose={handleClose}
              admins={admins}
              updateAdmins={setAdmins}
            />
          )}
        </div>
      )}
    </>
  );
};

export default UsersTable;
