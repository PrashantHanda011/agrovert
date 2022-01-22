import {  firestore } from "../Firebase";

class CouponModule{
    async getCoupons(){
        const res = await (await firestore.collection('coupons').get()).docs
        const data = res.map(doc=>{
            const id = doc.id
            return {...doc.data(),id}
        })
        return data
    }

    async updateCoupon(newCoupon,id){
        await firestore.collection('coupons').doc(id).update({
            ...newCoupon
        })
    }

    async fetchCategories() {
        try {
          const snapshot = await firestore.collection("categories").get();
          let result = {};
          snapshot.docs.forEach((doc) => {
            result[doc.id] = doc.data().category_name;
          });
          return result;
        } catch (error) {
          console.log(error);
        }
      }
}

export default CouponModule