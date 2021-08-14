import React,{useState,useEffect} from 'react'
import { Button } from 'react-bootstrap'
import { getUserFromUserId } from '../../utils/utils'
import FullOrderPage from './FullOrderPage'

const TableRow = ({order}) => {
    const [user,setUser] = useState(null)
    const [open,setOpen] = useState(false)
    const handleOpen = () =>{
        setOpen(true)
    }
    const handleClose = () =>{
        setOpen(false)
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
        {user && <tr className="align-items-center" onClick={() =>{handleOpen()}}>
            <td>{order.id}</td>
            <td>{order.timestamp.toDate().toDateString()}</td>
            <td>{user.name}</td>
            <td>{user.phone_number}</td>
            <td>₹{order.amount}</td>
            <td>{order.status}</td>
            <td><Button className="btn-success">Approve</Button></td>
            <td><Button className="btn-danger">Cancel</Button></td>
          </tr>}
          {open && <FullOrderPage order={order} user={user} show={open} handleClose={handleClose}/>}
        </>
    )
}

export default TableRow
