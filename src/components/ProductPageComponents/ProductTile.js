import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./productpagecomponents.module.css";
import { AppContext } from "../../context/Context";
const ProductTile = ({
  id,
  imageUrl,
  productName,
  price,
  description,
  file_name,
  handleShowProduct,
  setProduct,
  product,
}) => {
  const { appState, deleteProductWithGivenId } = useContext(AppContext);
  const image_url = imageUrl;
  return (
    <Card style={{ width: "18rem" }} className={styles.productCard}>
      <Card.Img variant="top" src={imageUrl} style={{ height: "200px" }} />
      <Card.Body>
        <Card.Title>
          {productName}
          <br />
          <div className="mt-1" style={{ fontSize: "14px" }}>
            ₹{price}
          </div>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
        <hr />
        <div className="row">
          <div className="col-6">
            <Button
              variant="danger"
              onClick={() => {
                deleteProductWithGivenId(id, image_url);
              }}>
              Delete
            </Button>
          </div>
          <div className="col-6">
            <Button
              variant="success"
              onClick={() => {
                handleShowProduct(2);
                setProduct(product);
              }}>
              Update
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductTile;
