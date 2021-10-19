import jsonexport from "jsonexport";
import React, { useState, useEffect, useRef } from "react";
import { Pagination } from "react-bootstrap";
import { CSVLink } from "react-csv";
import CustomerModule from "../../modules/customerModule";

const CustomerTable = () => {
  const [customers, setCustomers] = useState(null);
  const [data, setData] = useState("");
  const [dataCustomer, setDataCustomer] = useState("");
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [fileName, setFileName] = useState("");
  const csvLink = useRef();
  const csvLink2 = useRef();
  const customerModule = new CustomerModule();
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(10);
  const indexOfLastPost = currentPage * ordersPerPage;
  const indexOfFirstPost = indexOfLastPost - ordersPerPage;
  const recordsList = [10, 15, 20];

  useEffect(() => {
    const getCustomersAndProducts = async () => {
      const customers_ = await customerModule.fetchCustomers();
      setCustomers(customers_);
      const products_ = await customerModule.fetchProducts();
      setProducts(products_);
      const categories_ = await customerModule.fetchCategories();
      setCategories(categories_);
    };
    getCustomersAndProducts();
  }, []);

  const makeDataForCSV = () => {
    let result = [];
    customers.forEach((customer, index) => {
      let addresses = [];
      customer.addresses.forEach((address) => {
        addresses.push(
          `${address.street_address}, near ${address.landmark}, ${address.district}, ${address.state} - ${address.pin_code}`
        );
      });
      result.push({
        sno: index + 1,
        name: customer.name,
        phone_number: customer.phone_number,
        addresses: addresses,
        amount_spent: customer.amount_spent,
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
  const makeAndDownloadCustomerOrderCSV = async (uid) => {
    const orders = await customerModule.fetchOrdersByCustomerUid(uid);
    let resultOrders = [];
    if (orders.length > 0) {
      orders.forEach((order, index) => {
        if (order.status !== "CART") {
          order.timestamp = order.timestamp.toDate().toDateString();
          order.delivery_address = `${order.delivery_address.street_address}, near ${order.delivery_address.landmark}, ${order.delivery_address.district}, ${order.delivery_address.state} - ${order.delivery_address.pin_code}`;

          customers.forEach((customer) => {
            if (customer.uid === order.user_id) {
              setFileName(`${customer.name}-${customer.phone_number}.csv`);
              delete order.user_id;
            }
          });

          const products_ = order.products;
          const orderDate = order.timestamp;
          products_.forEach((product) => {
            resultOrders.push({
              "Serial No.": index + 1,
              "Order Date": orderDate,
              Category:
                categories[products[product.product_id].category_id]
                  .category_name,
              Item: products[product.product_id].name,
              Quantity: product.quantity,
              "Selling Price": products[product.product_id].offered_price,
              Sale:
                parseInt(products[product.product_id].offered_price) *
                product.quantity,
            });
          });
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

  const deleteCustomer = (customer) => {
    const newCustomers = customers.filter((customer_) => {
      if (customer.uid !== customer_.uid) {
        return customer_;
      }
    });
    setCustomers(newCustomers)
    customerModule.resetCustomer(customer);
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
                    {customers
                      .filter((customer) => {
                        if (Object.keys(customer).includes("addresses")) {
                          return customer;
                        }
                      })
                      .slice(indexOfFirstPost, indexOfLastPost)
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
                                    makeAndDownloadCustomerOrderCSV(
                                      customer.uid
                                    );
                                  }}
                                >
                                  <i
                                    class="fa fa-download mr-2"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Download Data
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
                              <button className="btn btn-danger btn-sm" onClick={()=>{deleteCustomer(customer)}}>
                                Delete User
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div style={{ marginRight: "50%" }}>
            <Pagination size="lg" style={{ marginLeft: "85%" }}>
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                }}
              />
              <Pagination.Item active>{currentPage}</Pagination.Item>
              <Pagination.Next
                disabled={
                  currentPage === Math.ceil(customers.length / ordersPerPage)
                }
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
              />
            </Pagination>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerTable;
