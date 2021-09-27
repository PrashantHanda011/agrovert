import React, { useState } from "react";
import { Pagination } from "react-bootstrap";
import OrderTable from "./OrderTable";

const OrderPageReusable = ({ orders,name }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orderPerPage, setOrderPerPage] = useState(10);
  const indexOfLastPost = currentPage * orderPerPage;
  const indexOfFirstPost = indexOfLastPost - orderPerPage;
  
  return (
    <>
      <OrderTable
        name={name}
        orders={orders.slice(indexOfFirstPost, indexOfLastPost)}
        ordersPerPage={orderPerPage}
        setOrdersPerPage={setOrderPerPage}
      />
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
            disabled={currentPage === Math.ceil(orders.length / orderPerPage)||orders.length===0}
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          />
        </Pagination>
      </div>
    </>
  );
};

export default OrderPageReusable;
