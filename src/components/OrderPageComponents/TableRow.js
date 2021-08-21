import React,{useState,useEffect} from 'react'
import { Badge, Button } from 'react-bootstrap'
import { getUserFromUserId, updateOrderStatus } from '../../utils/utils'
import FullOrderPage from './FullOrderPage'

const TableRow = ({Order,index}) => {
    const [order_,setOrder] = useState(Order)
    const [user,setUser] = useState(null)
    const [open,setOpen] = useState(false)
    const handleOpen = () =>{
        setOpen(true)
    }
    const handleClose = () =>{
        setOpen(false)
    }
    const approveOrder = () =>{
        setOrder({...order_,status:"DELIVERED"})
        console.log(order_)
        updateOrderStatus(order_,order_.id,"DELIVERED")
    }
    const cancelOrder = () =>{
        setOrder({...order_,status:"CANCELLED"})
        console.log(order_)
        updateOrderStatus(order_,order_.id,"CANCELLED")
    }
    useEffect(()=>{
        const getUser = async (id) =>{
            const data = await getUserFromUserId(id)
            setUser(data)
        }
        getUser(order_.user_id)
    },[])

    useEffect(()=>{setOrder(Order)},[Order])
    return (
        <>
        {user && <tr className="align-items-center">
            <td>{index+1}</td>
            <td>{order_.timestamp.toDate().toDateString()}</td>
            <td>{user.name}</td>
            <td>{user.phone_number}</td>
            <td>₹{order_.amount.toFixed(2)}</td>
            <td><Badge className={order_.status==="DELIVERED"?"badge-success":order_.status==="CANCELLED"?"badge-danger":"badge-primary"}>{order_.status}</Badge></td>
            <td><button className="btn btn-primary" onClick = {()=>{handleOpen()}}>Show</button></td>
            <td><button className="btn btn-success" disabled={order_.status==="DELIVERED"?true:false} onClick= {()=>{approveOrder()}}>Approve</button></td>
            <td><button className="btn btn-danger" disabled={order_.status==="CANCELLED"?true:false} onClick= {()=>{cancelOrder()}}>Cancel</button></td>
          </tr>}
          {open && <FullOrderPage order={order_} user={user} show={open} handleClose={handleClose}/>}
        </>
    )
}

export default TableRow
