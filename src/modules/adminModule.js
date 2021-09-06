import { storage, firestore } from "../Firebase";

class AdminModule {
  async makeAdminFirestore(uid, name, number) {
    await firestore
      .collection("admins")
      .doc(uid)
      .set({ id: uid, name, number, type: "ADMIN" });
  }

  async fetchAdmins() {
    let admins = [];
    const adminsDocs = await firestore.collection("admins").get();
    adminsDocs.forEach((doc) => {
      const data = doc.data();
      admins.push({ ...data });
    });
    return admins;
  }

  async deleteAdmin(uid) {
    await firestore.collection("admins").doc(uid).delete();
  }
}

export default AdminModule;
