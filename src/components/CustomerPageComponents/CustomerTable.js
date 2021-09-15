import jsonexport from "jsonexport";
import React, { useState, useEffect, useRef } from "react";
import { CSVLink } from "react-csv";
import CustomerModule from "../../modules/customerModule";
import Loading from "../Base/Loading";


const CustomerTable = () => {
  const [customers, setCustomers] = useState(null);
  const [data,setData] = useState("")
  const [products,setProducts] = useState(null)
  const csvLink = useRef();
  const customerModule = new CustomerModule();
  useEffect(() => {
    const getCustomersAndProducts = async () => {
      const customers_ = await customerModule.fetchCustomers();
      setCustomers(customers_);
      const products_ = await customerModule.fetchProducts()
      setProducts(products_)
    };
    getCustomersAndProducts();
  }, []);
  
  const makeDataForCSV = () => {
    let result = [];
    customers.forEach((customer) => {
      let addresses = [];
      customer.addresses.forEach((address) => {
        addresses.push(
          `${address.street_address}, near ${address.landmark}, ${address.district}, ${address.state} - ${address.pin_code}`
        );
      });
      result.push({
        id: customer.uid,
        name: customer.name,
        phone_number: customer.phone_number,
        addresses: addresses,
      });
    });
   jsonexport(result,async (err,csv)=>{
     if(err){throw err}
    await setData(csv)
    csvLink.current.link.click()
   })
  };
  const makeAndDownloadMainCSV = () => {
    makeDataForCSV();
  };
  return (
    <>
      {customers && products &&(
        <div className="m-4">
          <div className="card shadow mb-4 mt-4">
            <div className="card-header py-3">
              <span className="ml-3">
                <h6
                  className="font-weight-bold text-primary mr-3 display-inline"
                  style={{ display: "inline-block" }}>
                  Customers
                </h6>

                <div>
                  <button className="btn btn-primary" onClick={()=>{makeAndDownloadMainCSV()}}>
                    Download Master Excel
                  </button>
                  {<CSVLink
                    data={data}
                    filename="Master.csv"
                    className="hidden"
                    ref={csvLink}
                    target="_blank"
                  />}
                </div>
              </span>
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
                          <td>
                            {Array.isArray(customer.addresses) &&
                              customer.addresses[0] &&
                              `${customer.addresses[0].street_address}, 
                           near ${customer.addresses[0].landmark}, 
                           ${customer.addresses[0].district}, 
                           ${customer.addresses[0].state} - ${customer.addresses[0].pin_code}`}
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
      )}
    </>
  );
};

export default CustomerTable;
