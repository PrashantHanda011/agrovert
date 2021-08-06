import React from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./productpagecomponents.module.css";
const CategoryTile = ({ category_name, image_url }) => {
  return (
    <Card style={{ width: "18rem" }} className={styles.categoryCard}>
      <Card.Img variant="top" src={image_url} style={{ height: "150px" }} />
      <Card.Body>
        <Card.Title>{category_name}</Card.Title>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default CategoryTile;
