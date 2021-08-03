import React,{createContext,useReducer} from 'react'
import AppReducer from './AppReducer'
import { fetchCategories, fetchProducts } from './utils/utils'
// import { db } from './Firebase'

// console.log(db)
const initialState = {
    toggle: false,
    user:null,
    products: [],
    pincodes:[],
    orders:[]
}

export const AppContext = createContext(initialState)

export const Context = ({children}) =>{
    const [state,dispatch] = useReducer(AppReducer,initialState)
    
    function toggleSideBar(state_){
        dispatch({
            type:"TOGGLE",
            payload:state_
        })
    }

    function addUser(user){
        dispatch({
            type:"ADD_USER",
            payload:user
        })
    }

    function addProduct(product){
        dispatch({
            type:"ADD_PRODUCT",
            payload:product
        })
    }

    function addCategory(category){
        dispatch({
            type:"ADD_CATEGORY",
            payload:category
        })
    }

    async function getProductsFromBackend(){
        let products = await fetchProducts()
        dispatch({
            type:"GET_PRODUCTS",
            payload:products
        })
    }
    async function getCategoriesFromBackend(){
        let categories = await fetchCategories()
        dispatch({
            type:"GET_CATEGORIES",
            payload:categories
        })
    }

    return (
        <AppContext.Provider value={{appState:state,addCategory,addProduct,addUser,getProductsFromBackend,getCategoriesFromBackend,toggleSideBar}}>
            {children}
        </AppContext.Provider>
    )
}

