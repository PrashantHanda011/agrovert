import {storage,firestore} from '../Firebase'

class PincodeModule{
    async addPincode(pincodeData, setPincodes, values){
        await firestore
          .collection("pincodes")
          .add(pincodeData)
          .then((data) => {
            data.get().then((data) => {
              setPincodes([
                ...values,
                { id: data.id, pincode: data.data().pincode, type: data.data().type },
              ]);
            });
          });
      };
      
      async fetchPincodes(){
        var pincodesRef = firestore.collection("pincodes");
        var pincodes = [];
        var allPincodes = await pincodesRef.get();
        allPincodes.forEach((doc) => {
          const id = doc.id;
          const data = doc.data();
          pincodes.push({ id, ...data });
        });
      
        return pincodes;
      };
      
       async updatePinCode(id, data){
        await firestore.collection("pincodes").doc(id).update(data);
      };
      
       async deletePinCode(id){
        await firestore.collection("pincodes").doc(id).delete();
      };
}

export default PincodeModule