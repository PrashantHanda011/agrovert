import React,{createContext,useReducer} from 'react'
import AppReducer from './AppReducer'
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

    return (
        <AppContext.Provider value={{appState:state,toggleSideBar,addUser}}>
            {children}
        </AppContext.Provider>
    )
}

