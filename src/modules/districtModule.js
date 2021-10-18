import {storage,firestore} from '../Firebase'

class DistrictModule{
    async addDistrict(districtData, setDistricts, values){
        await firestore
          .collection("districts")
          .add(districtData)
          .then((data) => {
            data.get().then((data) => {
              setDistricts([
                ...values,
                { id: data.id, district: data.data().district, type: data.data().type },
              ]);
            });
          });
      };
      
      async fetchDistricts(){
        var pincodesRef = firestore.collection("districts");
        var pincodes = [];
        var allPincodes = await pincodesRef.get();
        allPincodes.forEach((doc) => {
          const id = doc.id;
          const data = doc.data();
          pincodes.push({ id, ...data });
        });
      
        return pincodes;
      };
      
       async updateDistrict(id, data){
        await firestore.collection("districts").doc(id).update(data);
      };
      
       async deleteDistrict(id){
        await firestore.collection("districts").doc(id).delete();
      };
}

export default DistrictModule