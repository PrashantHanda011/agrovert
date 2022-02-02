import React from 'react';
import { useParams } from 'react-router-dom';
import SubCategoryTable from '../../components/SubCategoryPageComponents/SubCategoryTable';
import Base from '../Base';
const SubCategories = () => {
    let {category_id} = useParams()
    
  return (<Base>
  <SubCategoryTable category_id={category_id}/>
  </Base>)
};

export default SubCategories;
