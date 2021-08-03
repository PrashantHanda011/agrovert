import React from "react";
import { Card, Button } from "react-bootstrap";
import styles from './productpagecomponents.module.css'
const ProductTile = ({imageUrl,productName,price,description}) => {
  return (
    <Card style={{ width: "18rem" }} className={styles.productCard}>
      <Card.Img variant="top" src={imageUrl} style={{height:"200px"}}/>
      <Card.Body>
        <Card.Title>{productName}<br/><div style={{fontSize:"14px"}}>{price}</div></Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductTile;
