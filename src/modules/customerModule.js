import {firestore} from '../Firebase'
class CustomerModule{

    async fetchCustomer(){
        const snapshot = await firestore.collection("users").get();
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

    async getProductsFromId(productIds) {
        let products = [];
        for (let productId of productIds) {
          await firestore
            .collection("products")
            .doc(productId)
            .get()
            .then((data) => {
              products.push(data.data());
            });
        }
    
        return products;
      }
}

export default CustomerModule