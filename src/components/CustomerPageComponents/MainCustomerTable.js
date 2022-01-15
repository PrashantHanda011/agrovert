import React, { useState } from "react";
import { CSVLink } from "react-csv";

let styles = {
  customerInput: {
    marginLeft: "5px",
    width: "270px",
    marginBottom: "10px",
    borderRadius: "5px",
    borderColor: "#a9a9a9",
  },
};
const MainCustomerTable = ({
  customers,
  makeAndDownloadMasterCSV,
  data,
  csvLink,
  ordersPerPage,
  setOrdersPerPage,
  recordsList,
  makeAndDownloadCustomerOrderCSV,
  indexOfFirstPost,
  indexOfLastPost,
  dataCustomer,
  fileName,
  csvLink2,
  deleteCustomer,
}) => {
    const [name,setName] = useState(null)
    const [address,setAddress] = useState(null)

    const changeName = (event) => {
        let newName = event.target.value
        setName(newName)
    }

    const changeAddress = (event) => {
        let newAddress = event.target.value
        setAddress(newAddress)
    }


    const returnCustomers = () => {
        let finalCustomers = []
            let customersHavingAddressesField = customers
                .filter((customer) => {
                  if (Object.keys(customer).includes("addresses")) {
                    return  customer
                  }
                })
            if(!name && !address){
                finalCustomers = customersHavingAddressesField
            }else if(name && !address){
                finalCustomers = customersHavingAddressesField
                .filter(customer=>{
                    if(customer.name.toLowerCase().includes(name)){
                        return customer
                    }
                })
            }else if(!name && address){
                finalCustomers = customersHavingAddressesField
                .filter(customer=>{
                    const addressString = `${customer.addresses[0].street_address}, 
                    near ${customer.addresses[0].landmark}, 
                    ${customer.addresses[0].district}, 
                    ${customer.addresses[0].state} - ${customer.addresses[0].pin_code}`
                        if(addressString.toLowerCase().includes(address)){
                            return customer
                        }
                    
                })
            }else if(name && address){
                finalCustomers = customersHavingAddressesField
                .filter(customer=>{
                    if(customer.name.toLowerCase().includes(name)){
                        return customer
                    }
                })
                .filter(customer=>{
                    const addressString = `${customer.addresses[0].street_address}, 
                    near ${customer.addresses[0].landmark}, 
                    ${customer.addresses[0].district}, 
                    ${customer.addresses[0].state} - ${customer.addresses[0].pin_code}`
                        if(addressString.toLowerCase().includes(address)){
                            return customer
                        }
                    
                })
            }
                return finalCustomers.slice(indexOfFirstPost, indexOfLastPost)
                .map((customer, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{customer.name}</td>
                      <td>{customer.phone_number}</td>
                      <td>
                        {Array.isArray(customer.addresses) &&
                          customer.addresses[0] &&
                          `${customer.addresses[0].street_address}, 
                           near ${customer.addresses[0].landmark}, 
                           ${customer.addresses[0].district}, 
                           ${customer.addresses[0].state} - ${customer.addresses[0].pin_code}`}
                      </td>
                      <td>
                        <span>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => {
                              makeAndDownloadCustomerOrderCSV(customer.uid);
                            }}
                          >
                            <span>
                              <i
                                class="fa fa-download mr-2"
                                aria-hidden="true"
                              ></i>{" "}
                              Download
                            </span>
                          </button>

                          {
                            <CSVLink
                              data={dataCustomer}
                              filename={fileName}
                              className="hidden"
                              ref={csvLink2}
                              target="_blank"
                            />
                          }
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            deleteCustomer(customer);
                          }}
                        >
                          Delete User
                        </button>
                      </td>
                    </tr>
                  );
                })
        
    }
  return (
    <div className="card shadow mb-4 mt-4">
      <div className="card-header py-3">
        <span className="ml-3">
          <h6
            className="font-weight-bold text-primary mr-3 display-inline"
            style={{ display: "inline-block" }}
          >
            Customers
          </h6>

          <span>
            <button
              className="btn btn-primary"
              onClick={() => {
                makeAndDownloadMasterCSV();
              }}
            >
              <i class="fa fa-download mr-2" aria-hidden="true"></i> Download
              Master Excel
            </button>
            {
              <CSVLink
                data={data}
                filename="Master.csv"
                className="hidden"
                ref={csvLink}
                target="_blank"
              />
            }
          </span>
        </span>
      </div>
      <div className="card-body">
        <span>
          Per Page Records:
          <select
            className="ml-2"
            width="10%"
            onChange={(e) => {
              setOrdersPerPage(e.target.value);
            }}
            placeholder="Category"
            value={ordersPerPage}
          >
            <option disabled>Select</option>
            {recordsList &&
              recordsList.map((numRecords, index) => (
                <option id={index} value={numRecords}>
                  {numRecords}
                </option>
              ))}
          </select>
          <span style={{ marginLeft: "20px" }}>
            <strong>Search By Name:</strong>
            <input
              type="text"
              name="name-search"
              style={styles.customerInput}
              onChange={(e)=>changeName(e)}
              autoComplete="off"
            />
          </span>
          <span style={{ marginLeft: "20px" }}>
            <strong>Search By Address:</strong>
            <input
              type="text"
              name="address-search"
              style={styles.customerInput}
              onChange={(e)=>changeAddress(e)}
              autoComplete="off"
            />
          </span>
        </span>
        <div className="table-responsive">
          <table className="table" width="100%">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {returnCustomers()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainCustomerTable;
