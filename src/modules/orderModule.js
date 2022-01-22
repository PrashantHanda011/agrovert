import { storage, firestore } from "../Firebase";

class OrderModule {
  fetchOrders(setOrders,setPlay) {
    try {
      return firestore.collection('orders').orderBy("timestamp", "desc").onSnapshot((querySanpshot)=>{
        let orders_ = []
        querySanpshot.docs[0].data().status==="PENDING"?setPlay(true):setPlay(false)
        querySanpshot.forEach(order=>{
          orders_.push({id:order.id,...order.data()})
        })
        setOrders(orders_)
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getUserFromUserIdPromise(userId) {
    try {
      const res = await firestore
      .collection("users")
      .where("uid", "==", userId)
      .get();
    const data = await res.docs.map((doc) => {
      const id = doc.id;
      const data = doc.data();
      return { id, ...data };
    });
    return data[0];
    } catch (error) {
      console.log(error)
    }
  }

  getUserFromUserId(userId) {
    try {
      return this.getUserFromUserIdPromise(userId).then((data) => {
        return data;
      });
    } catch (error) {
      console.log(error)
    }
  }

  async getProductsFromId(productIds) {
    try {
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
    } catch (error) {
      console.log(error)
    }
  }

  async updateOrderStatus(id, status,products,order) {
    try {

      await firestore.collection("orders").doc(id).update({
        status: status,
        read:true,
      });
      if(status==='ACCEPTED'){
        let promises = []
        order.products.map(product=>{
          promises.push(firestore.collection('products').doc(product.product_id).update({
            quantity: products[product.product_id].quantity-product.quantity,
            in_stock: products[product.product_id].quantity-product.quantity>5
          }))
        })
        const data = await Promise.all(promises)
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default OrderModule