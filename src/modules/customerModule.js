import {firestore} from '../Firebase'
class CustomerModule{

    async fetchCustomer(){
        const snapshot = await firestore.collection("users").get();
    return snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    }
}

export default CustomerModule