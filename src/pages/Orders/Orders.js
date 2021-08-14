import React,{useState} from 'react'
import Base from '../Base'
import { fetchOrders } from '../../utils/utils'
import OrderTable from '../../components/OrderPageComponents/OrderTable'
import Loading from '../../components/Base/Loading'
import { firestore } from '../../Firebase'
import FullOrderPage from '../../components/OrderPageComponents/FullOrderPage'

const Orders = () => {
    const [orders, setOrders] = useState(null)
    const [open,setOpen] = useState(false)
    
    useState(async()=>{
        const getOrders = async () =>{
            return await fetchOrders()
        }
        const fetchedOrders = await getOrders()
        console.log(fetchedOrders)
        setOrders(fetchedOrders)
    },[])
    console.log(orders)
    return (
        <Base>
        {!orders  && <Loading/>}
        {orders  && <OrderTable orders={orders.filter(order=>order.status!=="CART")}/>}
        {open && <FullOrderPage/>}
        </Base>
    )
}

export default Orders
