import React, { useEffect,useState } from "react";
import { firestore } from "../../Firebase";
import TableRow from "./TableRow";

const OrderTable = ({ orders, ordersPerPage, setOrdersPerPage,name }) => {
  const recordsList = [10, 15, 20];

 
  return (
    <div className="m-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">{name}</h6>
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
            value={ordersPerPage}>
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
                  <th>Order ID</th>
                  <th>Order Date</th>
                  <th>User Name</th>
                  <th>User Ph. No.</th>
                  <th>Amount</th>
                  <th>Order Status</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  return <TableRow Order={order} index={index} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
