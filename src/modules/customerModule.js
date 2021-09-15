import {firestore} from '../Firebase'
class CustomerModule{

    async fetchCustomers(){
        const snapshot = await firestore.collection("users").where("addresses","!=",null).get()
    return snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    }

    async fetchOrdersByCustomerUid(uid){
        const snapshot = await firestore.collection("orders").where("user_id",'==',uid).get()
        return snapshot.docs.map(doc=>{
            return {id:doc.id,...doc.data()}
        })
    }

    async fetchProducts(){
      const snapshot = await firestore.collection("products").get()
      let result = {}
      snapshot.docs.forEach(doc=>{
        result[doc.id] = doc.data()
      })
      return result
    }
}

export default CustomerModule