import { storage, firestore } from "../Firebase";

class OrderModule {
  fetchOrders(setOrders) {
    try {
      return firestore.collection('orders').orderBy("timestamp", "desc").onSnapshot((querySanpshot)=>{
        let orders_ = []
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

  async updateOrderStatus(id, status) {
    try {
      await firestore.collection("orders").doc(id).update({
        status: status,
      });
    } catch (error) {
      console.log(error)
    }
  }
}

export default OrderModule