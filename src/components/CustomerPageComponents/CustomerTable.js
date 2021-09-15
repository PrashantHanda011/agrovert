import jsonexport from "jsonexport";
import React, { useState, useEffect, useRef } from "react";
import { CSVLink } from "react-csv";
import CustomerModule from "../../modules/customerModule";

const CustomerTable = () => {
  const [customers, setCustomers] = useState(null);
  const [data, setData] = useState("");
  const [dataCustomer, setDataCustomer] = useState("");
  const [products, setProducts] = useState(null);
  const csvLink = useRef();
  const csvLink2 = useRef();
  const customerModule = new CustomerModule();
  useEffect(() => {
    const getCustomersAndProducts = async () => {
      const customers_ = await customerModule.fetchCustomers();
      setCustomers(customers_);
      const products_ = await customerModule.fetchProducts();
      setProducts(products_);
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
    jsonexport(result, async (err, csv) => {
      if (err) {
        throw err;
      }
      await setData(csv);
      csvLink.current.link.click();
    });
  };
  const makeAndDownloadMasterCSV = () => {
    makeDataForCSV();
  };
  console.log(products);
  const makeAndDownloadCustomerOrderCSV = async (uid) => {
    const orders = await customerModule.fetchOrdersByCustomerUid(uid);
    let resultOrders = [];
    console.log(orders);
    if (orders.length > 0) {
      orders.forEach((order) => {
        if (order.status !== "CART") {
          order.timestamp = order.timestamp.toDate().toDateString();
          order.delivery_address = `${order.delivery_address.street_address}, near ${order.delivery_address.landmark}, ${order.delivery_address.district}, ${order.delivery_address.state} - ${order.delivery_address.pin_code}`;
          order.products.forEach((product) => {
            product.name = products[product.product_id].name;
            delete product.product_id;
          });
          customers.forEach((customer) => {
            if (customer.uid === order.user_id) {
              order.user_name = customer.name;
              order.user_number = customer.phone_number;
              delete order.user_id;
            }
          });
          resultOrders.push(order);
        }
      });
      jsonexport(resultOrders, async (err, csv) => {
        if (err) {
          throw err;
        }
        await setDataCustomer(csv);
        csvLink2.current.link.click();
      });
    }
  };
  return (
    <>
      {customers && products && (
        <div className="m-4">
          <div className="card shadow mb-4 mt-4">
            <div className="card-header py-3">
              <span className="ml-3">
                <h6
                  className="font-weight-bold text-primary mr-3 display-inline"
                  style={{ display: "inline-block" }}>
                  Customers
                </h6>

                <span>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      makeAndDownloadMasterCSV();
                    }}>
                    <i class="fa fa-download mr-2" aria-hidden="true"></i>{" "}
                    Download Master Excel
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
              <div className="table-responsive">
                <table className="table" width="100%">
                  <thead>
                    <tr>
                      <th>S No.</th>
                      <th>Name</th>
                      <th>Phone Number</th>
                      <th>Address</th>
                      <th></th>
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
                          <td>
                            <span>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  makeAndDownloadCustomerOrderCSV(customer.uid);
                                }}>
                                <i
                                  class="fa fa-download mr-2"
                                  aria-hidden="true"></i>{" "}
                                Download Data
                              </button>

                              {
                                <CSVLink
                                  data={dataCustomer}
                                  filename={`${customers[index].uid}.csv`}
                                  className="hidden"
                                  ref={csvLink2}
                                  target="_blank"
                                />
                              }
                            </span>
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
