import React,{useState,useContext} from 'react'
import Form from '../components/Form'
import Base from './Base'
import { AppContext } from '../Context'
import { auth } from '../Firebase'
import { withRouter } from 'react-router-dom'
const Products = () => {
    const {appState,addUser} = useContext(AppContext)
    console.log(appState)
    const [show,setShow] = useState(false)

    const handleShow = () => {
        setShow(true)
    }

    const handleClose = () =>{
        setShow(false)
    }
    const addUser_ = () =>{
        console.log(auth.currentUser)
        addUser({user:"anuj"})
    }
    return (
        <Base>
        <div className="container-fluid">
            <div className="my-2 ml-5">
                <button className="btn btn-primary" onClick={addUser_}>Add Product</button>
            </div>
            {show && <Form show={show} handleClose={handleClose}/>}
        </div>
        </Base>
    )
}

export default withRouter(Products)
