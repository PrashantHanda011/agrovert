import React, { useEffect, useState } from 'react'
import CategoryList from '../../components/CategoryPageCompnents/CategoryList'
import CategoryModule from '../../modules/categoryModule'
import Base from '../Base'

const Category = () => {
    const [categories,setCategories] = useState([])
    const categoryModule = new CategoryModule()
    useEffect(()=>{
        const getCategories = async () =>{
            const categories_ = await categoryModule.fetchCategories().then(data=>data)
            setCategories(categories_)
        }
        getCategories()
    },[])
    return (
        <Base>
        <CategoryList categories={categories}/>
        </Base>
    )
}

export default Category
