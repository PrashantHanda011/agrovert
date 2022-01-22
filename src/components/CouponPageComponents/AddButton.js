import React from "react";
import styles from "./couponpagecomponents.module.css";
const AddButton = ({ name, handleShowCouponForm }) => {
  return (
    <span className={styles.hover_btn} onClick={()=>{handleShowCouponForm()}}>
      <span
        className={`fas fa-plus fa-lg mx-3 ${styles.add_product_icon}`}></span>

      <span className={styles.pill}>{name}</span>
    </span>
  );
};

export default AddButton;
