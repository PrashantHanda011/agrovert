import React, { useState,useEffect } from "react";
import { Pagination } from "react-bootstrap";
import OrderTable from "./OrderTable";

const OrderPageReusable = ({ orders,name,play,setPlay }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orderPerPage, setOrderPerPage] = useState(10);
  const indexOfLastPost = currentPage * orderPerPage;
  const indexOfFirstPost = indexOfLastPost - orderPerPage;

  useEffect(() => {
    if(name==="Pending Orders" && orders.length>0 && play===true){
      orders.forEach(order=>{
        const audioEl = document.getElementsByClassName("audio-element")[0] 
        audioEl.play()
        setPlay(false)
      })
    }
    
    return () =>{ }
  }, [orders])

  return (
    <>
    {(name==="Pending Orders")?<audio className="audio-element">
          <source src="https://firebasestorage.googleapis.com/v0/b/ecommerce-app-d0b68.appspot.com/o/Bell%20Notification%20Sound-%5BAudioTrimmer.com%5D.mp3?alt=media&token=41d93197-e5d9-4818-858d-e2e556aff5dc"></source>
    </audio>:<></>}
     
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
