import { storage, firestore } from "../Firebase";

class AdminModule {
  async fetchAdmins() {
    let admins = [];
    const adminsDocs = await firestore.collection("users").where("user_type","==","ADMIN").get();
    adminsDocs.forEach((doc) => {
      const data = doc.data();
      admins.push({ ...data });
    });
    return admins;
  }

  async deleteAdmin(uid) {
    await firestore.collection("users").doc(uid).update({user_type:""});
  }
}

export default AdminModule;
