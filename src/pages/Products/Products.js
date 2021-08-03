import React,{useState,useContext,useEffect} from 'react'
import ProductForm from '../../components/ProductPageComponents/ProductForm'
import Base from '../Base'
import { AppContext } from '../../Context'
import { auth } from '../../Firebase'
import { withRouter } from 'react-router-dom'
import CategoryForm from '../../components/ProductPageComponents/CategoryForm'

import TabComponent from '../../components/ProductPageComponents/TabComponent'

const Products = () => {
    const context = useContext(AppContext)

    const [showProduct,setShowProduct] = useState(false)
    const [showCategory,setShowCategory] = useState(false)
    console.log(context)
   console.log( context.getAllProductsFromBackend)
    useEffect(()=>{
    //   getAllProductsFromBackend()
    },[])
    return (
        <Base>
        <div className="container-fluid">
            <div className="row">
            {/* <div className="my-2 ml-5 col-4 offset-2">
                <button className="btn btn-primary" onClick={handleShowProduct}>Add Product</button>
            </div>
            <div className="my-2 ml-5 col-4 offset-2">
                <button className="btn btn-primary" onClick={handleShowCategory}>Add Category</button>
            </div> */}

            </div>
           
            {/* {showCategory && <CategoryForm show={showCategory} handleClose={handleCloseCategory}/>} */}
            <TabComponent/>
        </div>
        </Base>
    )
}

export default withRouter(Products)
