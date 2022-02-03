import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubCategoryTable from "../../components/SubCategoryPageComponents/SubCategoryTable";
import SubCategoryModule from "../../modules/subCategoryModule";
import Base from "../Base";
import Loading from "../../components/Base/Loading";
const SubCategories = () => {
  let { category_id } = useParams();
  useEffect(() => {
    
  });
  return (
    <Base>
      {category_id === null ? (
        <Loading />
      ) : (
        <SubCategoryTable
          category_id={category_id}
        />
      )}
    </Base>
  );
};

export default SubCategories;
