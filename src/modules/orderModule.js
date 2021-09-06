import { storage, firestore } from "../Firebase";

class OrderModule {
  async fetchOrders() {
    var ordersRef = firestore.collection("orders").orderBy("timestamp", "desc");
    var orders = [];
    var allOrders = await ordersRef.get();
    allOrders.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();
      orders.push({ id, ...data });
    });

    return orders;
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