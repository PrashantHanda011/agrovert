import { storage, firestore } from "../Firebase";

class OrderModule {
  fetchOrders(setOrders) {
    return firestore.collection('orders').orderBy("timestamp", "desc").onSnapshot((querySanpshot)=>{
      let orders_ = []
      querySanpshot.forEach(order=>{
        orders_.push({id:order.id,...order.data()})
      })
      setOrders(orders_)
    })
  }

  async getUserFromUserIdPromise(userId) {
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
  }

  getUserFromUserId(userId) {
    return this.getUserFromUserIdPromise(userId).then((data) => {
      return data;
    });
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

  async updateOrderStatus(updatedOrder, id, status) {
    delete updatedOrder.id;

    await firestore.collection("orders").doc(id).update({
      status: status,
    });
  }
}

export default OrderModule