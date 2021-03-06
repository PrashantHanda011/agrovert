import React from "react";
import styles from "./productpagecomponents.module.css";
const AddButton = ({ name, handleShowProduct }) => {
  return (
    <span className={styles.hover_btn} onClick={()=>{handleShowProduct(1)}}>
      <span
        className={`fas fa-plus fa-lg mx-3 ${styles.add_product_icon}`}></span>

      <span className={styles.pill}>{name}</span>
    </span>
  );
};

export default AddButton;
