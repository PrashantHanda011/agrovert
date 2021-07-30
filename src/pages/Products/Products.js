import React,{useState,useContext,useEffect} from 'react'
import ProductForm from '../../components/ProductPageForms/ProductForm'
import Base from '../Base'
import { AppContext } from '../../Context'
import { auth } from '../../Firebase'
import { withRouter } from 'react-router-dom'
import CategoryForm from '../../components/ProductPageForms/CategoryForm'
import { fetchCategories, fetchProducts } from './utils'

const Products = () => {
    const {appState,addUser} = useContext(AppContext)
    console.log(appState)
    const [showProduct,setShowProduct] = useState(false)
    const [showCategory,setShowCategory] = useState(false)

    const handleShowProduct = () => {
        setShowProduct(true)
    }

    const handleCloseProduct = () =>{
        setShowProduct(false)
    }
    const handleShowCategory = () => {
        setShowCategory(true)
    }

    const handleCloseCategory = () =>{
        setShowCategory(false)
    }

    useEffect(()=>{
        console.log(fetchProducts())
        console.log(fetchCategories())
    },[])
    return (
        <Base>
        <div className="container-fluid">
            <div className="row">
            <div className="my-2 ml-5 col-4 offset-2">
                <button className="btn btn-primary" onClick={handleShowProduct}>Add Product</button>
            </div>
            <div className="my-2 ml-5 col-4 offset-2">
                <button className="btn btn-primary" onClick={handleShowCategory}>Add Category</button>
            </div>

            </div>
            {showProduct && <ProductForm show={showProduct} handleClose={handleCloseProduct}/>}
            {showCategory && <CategoryForm show={showCategory} handleClose={handleCloseCategory}/>}
        </div>
        </Base>
    )
}

export default withRouter(Products)
