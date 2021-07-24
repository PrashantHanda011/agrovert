import React,{createContext,useReducer} from 'react'
import AppReducer from './AppReducer'

const initialState = {
    toggle: false,
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

    return (
        <AppContext.Provider value={{appState:state,toggleSideBar}}>
            {children}
        </AppContext.Provider>
    )
}

