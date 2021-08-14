import React,{useState,useEffect} from 'react'
import { Button } from 'react-bootstrap'
import { getUserFromUserId, updateOrderStatus } from '../../utils/utils'
import FullOrderPage from './FullOrderPage'

const TableRow = ({Order}) => {
    const [order,setOrder] = useState(Order)
    const [user,setUser] = useState(null)
    const [open,setOpen] = useState(false)
    const handleOpen = () =>{
        setOpen(true)
    }
    const handleClose = () =>{
        setOpen(false)
    }
    const approveOrder = () =>{
        setOrder({...order,status:"DELIVERED"})
        console.log(order)
        updateOrderStatus(order,order.id,"DELIVERED")
    }
    const cancelOrder = () =>{
        setOrder({...order,status:"CANCELLED"})
        console.log(order)
        updateOrderStatus(order,order.id,"CANCELLED")
    }
    useEffect(()=>{
        const getUser = async (id) =>{
            const data = await getUserFromUserId(id)
            setUser(data)
        }
        getUser(order.user_id)
    },[])
    return (
        <>
        {user && <tr className="align-items-center">
            <td>{order.id}</td>
            <td>{order.timestamp.toDate().toDateString()}</td>
            <td>{user.name}</td>
            <td>{user.phone_number}</td>
            <td>₹{order.amount}</td>
            <td>{order.status}</td>
            <td><Button className="btn btn-primary" onClick = {()=>{handleOpen()}}>Show</Button></td>
            <td><Button className="btn btn-success" onClick= {()=>{approveOrder()}}>Approve</Button></td>
            <td><Button className="btn btn-danger" onClick= {()=>{cancelOrder()}}>Cancel</Button></td>
          </tr>}
          {open && <FullOrderPage order={order} user={user} show={open} handleClose={handleClose}/>}
        </>
    )
}

export default TableRow
