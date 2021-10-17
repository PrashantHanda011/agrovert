import { firestore } from "../Firebase";
class CustomerModule {
  async fetchCustomers() {
    const snapshot = await firestore
      .collection("users")
      .where("addresses", "!=", null)
      .get();
    return snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  }

  async makeCustomerAdminFirestore(uid, number) {
    const data = await firestore
      .collection("users")
      .where("uid", "==", uid)
      .get()

    if (data.docs.length===0) {
      await firestore
        .collection("users")
        .doc(uid)
        .set({ uid: uid, phone_number: number, user_type:"ADMIN" });
    } else {
      console.log("already exists");
    }
  }

  deleteCustomerAdmin(uid){
    firestore.collection("users").doc(uid).delete()
  }

  async fetchOrdersByCustomerUid(uid) {
    try {
      const snapshot = await firestore
        .collection("orders")
        .where("user_id", "==", uid)
        .get();
      return snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    } catch (error) {
      console.log(error);
    }
  }

  async fetchProducts() {
    try {
      const snapshot = await firestore.collection("products").get();
      let result = {};
      snapshot.docs.forEach((doc) => {
        result[doc.id] = doc.data();
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async fetchCategories() {
    try {
      const snapshot = await firestore.collection("categories").get();
      let result = {};
      snapshot.docs.forEach((doc) => {
        result[doc.id] = doc.data();
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async updateCustomerTotalAmount(uid, amount) {
    try {
      const customer = await firestore.collection("users").doc(uid).get();
      const data = customer.data();
      let totalAmount = data.amount_spent;
      totalAmount += amount;
      firestore.collection("users").doc(uid).update({
        amount_spent: totalAmount,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default CustomerModule;
