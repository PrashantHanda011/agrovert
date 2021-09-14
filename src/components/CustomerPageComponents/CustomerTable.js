import React, { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";
import CustomerModule from "../../modules/customerModule";

const CustomerTable = () => {
  const [customers, setCustomers] = useState(null);
  const customerModule=  new CustomerModule()
  useEffect(()=>{
    const getCustomers = async() => {
      const customers_ = await customerModule.fetchCustomer()
      setCustomers(customers_)
    }
    getCustomers()
  },[])
  console.log(customers)
  return (
    <>
      {customers && (
        <div className="m-4">
          <div className="card shadow mb-4 mt-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Customers</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table" width="100%">
                  <thead>
                    <tr>
                      <th>S No.</th>
                      <th>Name</th>
                      <th>Phone Number</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{customer.name}</td>
                          <td>{customer.phone_number}</td>
                          <td>{Array.isArray(customer.addresses) && customer.addresses[0] && `${customer.addresses[0].street_address}, 
                           near ${customer.addresses[0].landmark}, 
                           ${customer.addresses[0].district}, 
                           ${customer.addresses[0].state} - ${customer.addresses[0].pin_code}`}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerTable;
