import React, { useState } from "react";
import Base from "../Base";
import { fetchOrders } from "../../utils/utils";
import OrderTable from "../../components/OrderPageComponents/OrderTable";
import Loading from "../../components/Base/Loading";
import { firestore } from "../../Firebase";
import FullOrderPage from "../../components/OrderPageComponents/FullOrderPage";
import { Pagination } from "react-bootstrap";

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [open, setOpen] = useState(false);

  useState(async () => {
    const getOrders = async () => {
      return await fetchOrders();
    };
    const fetchedOrders = await getOrders();
    setOrders(fetchedOrders);
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderPerPage, setOrderPerPage] = useState(10);
  const indexOfLastPost = currentPage * orderPerPage;
  const indexOfFirstPost = indexOfLastPost - orderPerPage;

  console.log(indexOfFirstPost, indexOfLastPost);

  return (
    <Base>
      {!orders && <Loading />}
      {orders && (
        <>
          <OrderTable
            orders={orders
              .filter((order) => order.status !== "CART")
              .slice(indexOfFirstPost, indexOfLastPost)}
            ordersPerPage={orderPerPage}
            setOrdersPerPage={setOrderPerPage}
          />
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
                currentPage === Math.round(orders.length / orderPerPage)
              }
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            />
          </Pagination>
        </>
      )}
      {open && <FullOrderPage />}
    </Base>
  );
};

export default Orders;
