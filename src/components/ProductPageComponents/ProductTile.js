import React,{useContext} from "react";
import { Card, Button } from "react-bootstrap";
import styles from './productpagecomponents.module.css'
import { AppContext } from "../../Context";
const ProductTile = ({id,imageUrl,productName,price,description}) => {
  const {appState,deleteProductWithGivenId} = useContext(AppContext)
  return (
    <Card style={{ width: "18rem" }} className={styles.productCard}>
      <Card.Img variant="top" src={imageUrl} style={{height:"200px"}}/>
      <Card.Body>
        <Card.Title>{productName}<br/><div style={{fontSize:"14px"}}>{price}</div></Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Button variant="primary" onClick={()=>{deleteProductWithGivenId(id)}}>Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductTile;
