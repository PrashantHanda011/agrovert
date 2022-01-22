import React, { useRef } from "react";
import ReactToPdf from "react-to-pdf";
import useIntersection from "../../hooks/useIntersection";
const MakeBill = ({ order, user, products }) => {
  const ref = useRef();
  const inViewPort = useIntersection(ref,'200px')
  const getTotalQuantity = (order) => {
    let sum = 0;
    order.products.map((product) => {
      sum += product.quantity;
    });
    return sum;
  };
  return (
    <>
      <div
        className="m-auto"
        id="bill"
        style={{ width: "3in", border: "1px solid black" }}
        ref={ref}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "21px",
            marginTop: "10px",
            fontWeight: "bolder",
          }}
        >
          PANWARI WHOLESALE
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            marginTop: "-9px",
          }}
        >
          New Delhi
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            marginTop: "-7px",
          }}
        >
          Delhi [07]
        </p>
        <p style={{ marginLeft: "10px" }}>
          <strong>Tel No. : </strong> 8076421573
        </p>
        <hr style={{ borderTop: "2px solid #000", width: "100%" }} />
        <p style={{ marginLeft: "8px" }}>
          <strong>Invoice No. : </strong> {order.id}
        </p>
        <p style={{ marginLeft: "10px" }}>
          <strong>Invoice Date : </strong>{" "}
          {order.timestamp.toDate().toDateString()}{" "}
          {order.timestamp.toDate().toTimeString()}
        </p>
        <hr style={{ borderTop: "2px solid black", width: "100%" }} />
        <p style={{ marginLeft: "10px" }}>
          <strong>Name : </strong> {user.name}
        </p>
        <p style={{ marginLeft: "10px" }}>
          <strong>Phone Number : </strong> {user.phone_number}
        </p>

        <p style={{ marginLeft: "10px" }}>
          <strong>Phone Number : </strong> {user.phone_number}
        </p>

        <p style={{ marginLeft: "10px" }}>
          <strong>Address : </strong> {order.delivery_address.street_address},
          near {order.delivery_address.landmark},{" "}
          {order.delivery_address.district}, {order.delivery_address.state} -{" "}
          {order.delivery_address.pin_code}
        </p>
        <hr style={{ borderTop: "2px solid #000", width: "100%" }} />

        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Item Name</th>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr>
              <th />
              <th>Rate</th>
              <td></td>
              <td></td>
              <th>Qty</th>
              <td></td>
              <td></td>
              <th>Amount</th>
            </tr>
            <tr style={{ borderBottom: "2px solid black" }}>
              <td style={{ columnSpan: "200%" }}></td>
            </tr>
          </thead>
          <tbody>
            {order.products.map((product) => (
              <>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr>
                  <td>
                    <strong>{products[product.product_id].name}</strong>
                  </td>
                </tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr>
                  <td></td>
                  <td>{products[product.product_id].offered_price}</td>
                  <td></td>
                  <td></td>
                  <td>{product.quantity}</td>
                  <td></td>
                  <td></td>
                  <td>
                    {product.quantity *
                      products[product.product_id].offered_price}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        <hr style={{ borderTop: "2px solid #000", width: "100%" }} />
        <p>
          <span style={{ marginLeft: "30px" }}>
            <strong>Items: </strong>
            {order.products.length}
          </span>
          <span style={{ marginLeft: "30px" }}>
            <strong>Quantity: </strong>
            {getTotalQuantity(order)}
          </span>
        </p>
        <p style={{ marginLeft: "30px" }}>
          <strong>Total: </strong> {order.amount}
        </p>
      </div>
      {inViewPort &&    
        <ReactToPdf
          targetRef={ref}
          filename={`${user.name}-${user.phone_number}-${order.timestamp.toDate().toDateString()}`}
          options={{
            orientation: "receipt",
            unit: "in",
            format: [
              3,
              Number(document.getElementById("bill").offsetHeight / 96),
            ],
          }}
        >
          {({ toPdf }) => (
            <button onClick={toPdf} className="mt-3 btn btn-success" style={{marginLeft:"150px"}}>
              Download Bill
            </button>
          )}
        </ReactToPdf>
      }
    </>
  );
};

export default MakeBill;
