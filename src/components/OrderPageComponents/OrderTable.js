import { Button } from "react-bootstrap";
import React from "react";
import { getUserFromUserId } from "../../utils/utils";
import TableRow from "./TableRow";

const OrderTable = ({orders}) => {     
    
  return (
    <div className="m-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Orders
          </h6>
        </div>
        <div className="card-body">
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
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                    return <TableRow order={order} />
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTable