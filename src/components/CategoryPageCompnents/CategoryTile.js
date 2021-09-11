import React,{ useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { AppContext } from "../../context/Context";
import styles from "./productpagecomponents.module.css";
const CategoryTile = ({ id,index,category_name,image_url,handleShowCategory }) => {
  const {deleteCategoryWithGivenId} = useContext(AppContext)
  return (
    <Card style={{ width: "18rem" }} className={styles.categoryCard}>
      <Card.Img variant="top" src={image_url} style={{ height: "150px" }} />
      <Card.Body>
        <Card.Title>{category_name}</Card.Title>
        <hr />
      <div className="row">
        <div className="col-6">
          <Button
            variant="danger"
            onClick={() => {
              deleteCategoryWithGivenId(index,id);
            }}>
            Delete
          </Button>
        </div>
        <div className="col-6">
          <Button
            variant="success"
            onClick={handleShowCategory}>
            Update
          </Button>
        </div>
      </div>
      </Card.Body>
      
    </Card>
  );
};

export default CategoryTile;
