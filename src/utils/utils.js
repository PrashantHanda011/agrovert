import { storage, firestore } from "../Firebase";
const uploadProduct = async (photo, product, addProduct) => {
  const storageRef = storage.ref(photo.name);
  const uploadTask = storageRef.put(photo);
  uploadTask.on("state_changed", console.log(), console.error, () => {
    storageRef.getDownloadURL().then((url) => {
      product.image_url = url;
      product.file_name = photo.name;
      return firestore
        .collection("products")
        .add(product)
        .then((product) => product.get(product.id).then((product) =>{
          const id = product.id
          const data = product.data()
          addProduct({id,...data})
        }));
    });
  });
};

const fetchProducts = async () => {
  const snapshot = await firestore.collection("products").get();
  return snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
};

const updateProductWithId = async (id, updatedProduct) => {
  const res = await firestore
    .collection("products")
    .doc(id)
    .update({ updatedProduct });
  return res;
};

const deleteProductWithId = (id, imageUrl) => {
  firestore
    .collection("products")
    .doc(id)
    .delete()
    .then((deletedProduct) => {
      storage.refFromURL(imageUrl).delete();
    });
};

const uploadCategory = (image, category, setCategory, setFile) => {
  const storageRef = storage.ref(image.name);
  const uploadTask = storageRef.put(image);
  uploadTask.on("state_changed", console.log(), console.error, () => {
    storageRef.getDownloadURL().then((url) => {
      const category_ = { category_name: category, image_url: url };
      firestore.collection("categories").add(category_);
      setCategory("");
      setFile("");
    });
  });
};

const fetchCategories = async () => {
  const snapshot = await firestore.collection("categories").get();
  return snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
};

export {
  uploadProduct,
  uploadCategory,
  fetchProducts,
  fetchCategories,
  deleteProductWithId,
  updateProductWithId,
};
