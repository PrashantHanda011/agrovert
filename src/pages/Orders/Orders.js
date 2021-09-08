import React, { useState,useEffect } from "react";
import Base from "../Base";
import OrderTable from "../../components/OrderPageComponents/OrderTable";
import Loading from "../../components/Base/Loading";
import FullOrderPage from "../../components/OrderPageComponents/FullOrderPage";
import { Pagination } from "react-bootstrap";
import OrderModule from '../../modules/orderModule'
import { firestore } from "../../Firebase";

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [open, setOpen] = useState(false);
  const orderModule = new OrderModule()

  useEffect(() => {
    const unsubscribe = firestore.collection('orders').orderBy("timestamp", "desc").onSnapshot((querySanpshot)=>{
      let orders_ = []
      querySanpshot.forEach(order=>{
        orders_.push(order.data())
      })
      setOrders(orders_)
    })
    return () => unsubscribe()
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderPerPage, setOrderPerPage] = useState(10);
  const indexOfLastPost = currentPage * orderPerPage;
  const indexOfFirstPost = indexOfLastPost - orderPerPage;



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
          <div style={{marginRight:"50%"}}>
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
          </div>
        </>
      )}
      {open && <FullOrderPage />}
    </Base>
  );
};

export default Orders;
