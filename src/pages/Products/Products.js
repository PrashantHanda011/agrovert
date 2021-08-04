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
            <TabComponent/>
        </div>
        </Base>
    )
}

export default withRouter(Products)
