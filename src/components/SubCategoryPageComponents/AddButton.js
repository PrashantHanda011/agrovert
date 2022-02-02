import React from "react";
import styles from "./subcategorypagecomponents.module.css";
const AddButton = ({ name, handleShowSubCategory }) => {
  return (
    <span className={styles.hover_btn} onClick={()=>{handleShowSubCategory()}}>
      <span
        className={`fas fa-plus fa-lg mx-3 ${styles.add_product_icon}`}></span>

      <span className={styles.pill}>{name}</span>
    </span>
  );
};

export default AddButton;
