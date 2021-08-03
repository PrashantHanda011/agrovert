import React,{useEffect,useState} from 'react'
import { firestore } from '../../Firebase'
import Loading from '../Loading'
import ProductTile from './ProductTile'
import AddButton from './AddButton'
import ProductForm from './ProductForm'
const ProductList = ({products,categories}) => {
    const [productForm,setShowProductForm] = useState(false)

    const openForm = () =>{
        console.log(productForm)
        setShowProductForm(true)
    }

    const closeForm = () =>{
        setShowProductForm(false)
    }

    const makeUI = () =>{
        return (
            <>
            <AddButton className="mb-5" handleShowProduct = {openForm}/>
            <div className="row">
                
                {products.map(product=>{
                return <div className="col-lg-4 col-md-6 my-2"><ProductTile className="mt-3" productName={product.name} imageUrl={product.image_url} price={product.price} description={product.description}/> </div>
            })}
               
            </div>
            </>
        )
    }
    return (
        <div>
            {/* <AddButton className="mb-5" handleShowProduct = {openForm}/> */}
            {products ? makeUI(): <Loading/>}
            {productForm && <ProductForm show={productForm} handleClose={closeForm} categories={categories}/>}
        </div>
    )
}

export default ProductList
