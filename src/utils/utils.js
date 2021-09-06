import { storage, firestore, auth } from "../Firebase";
import firebase from "firebase";

//* Logic For Products
export const uploadProduct = async (photo, product, addProduct, setClose) => {
  const storageRef = storage.ref(photo.name);
  const uploadTask = storageRef.put(photo);
  uploadTask.on("state_changed", console.log(), console.error, () => {
    storageRef.getDownloadURL().then((url) => {
      product.image_url = url;
      return firestore
        .collection("products")
        .add(product)
        .then(
          async (product) =>
            await product.get(product.id).then((product) => {
              const id = product.id;
              const data = product.data();
              addProduct({ id, ...data });
              setClose(true);
            })
        );
    });
  });
};

export const fetchProducts = async () => {
  const snapshot = await firestore.collection("products").get();
  return snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
};

export const updateProductWithId = async (
  id,
  photo,
  updatedProduct,
  updateProductWithGivenId,
  setClose
) => {
  const updateProduct = updatedProduct;
  if (photo) {
    const storageRef = storage.ref(photo.name);
    const uploadTask = storageRef.put(photo);
    uploadTask.on("state_changed", console.log(), console.error, () => {
      storageRef.getDownloadURL().then((url) => {
        updatedProduct.image_url = url;
        return firestore
          .collection("products")
          .doc(id)
          .update(updatedProduct)
          .then(() => {
            updateProductWithGivenId(id, updatedProduct);
            setClose(true);
          });
      });
    });
  } else {
    await firestore.collection("products").doc(id).update(updateProduct);

    updateProductWithGivenId(id, updateProduct);
    setClose(true);
  }
};

export const deleteProductWithId = (id, imageUrl) => {
  firestore.collection("products").doc(id).delete();
};

//* Logic For Categories
export const uploadCategory = (photo, category, addCategory, setClose) => {
  const storageRef = storage.ref(photo.name);
  const uploadTask = storageRef.put(photo);
  uploadTask.on("state_changed", console.log(), console.error, () => {
    storageRef.getDownloadURL().then((url) => {
      return firestore
        .collection("categories")
        .add({ category_name: category, image_url: url })
        .then(
          async (category) =>
            await category.get(category.id).then((category) => {
              const id = category.id;
              const data = category.data();
              addCategory({ id, ...data });
              setClose(true);
            })
        );
    });
  });
};

export const deleteCategoryWithId = (id) => {
  firestore.collection("categories").doc(id).delete();
};

export const updateCategory = async (
  id,
  photo,
  updatedCategory,
  updateCategoryWithGivenId,
  setClose
) => {
  const updateCategory = updatedCategory;
  if (photo) {
    const storageRef = storage.ref(photo.name);
    const uploadTask = storageRef.put(photo);
    uploadTask.on("state_changed", console.log(), console.error, () => {
      storageRef.getDownloadURL().then((url) => {
        updateCategory.image_url = url;
        return firestore
          .collection("categories")
          .doc(id)
          .update(updateCategory)
          .then(() => {
            updateCategoryWithGivenId(id, updateCategory);
            setClose(true);
          });
      });
    });
  } else {
    await firestore.collection("categories").doc(id).update(updateCategory);

    updateCategoryWithGivenId(id, updateCategory);
    setClose(true);
  }
};

export const fetchCategories = async () => {
  const snapshot = await firestore.collection("categories").get();
  return snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
};

//* Logic For Orders

export const fetchOrders = async () => {
  var ordersRef = firestore.collection("orders").orderBy("timestamp", "desc");
  var orders = [];
  var allOrders = await ordersRef.get();
  allOrders.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();
    orders.push({ id, ...data });
  });

  return orders;
};

export const getUserFromUserIdPromise = async (userId) => {
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
};

export const getUserFromUserId = (userId) => {
  return getUserFromUserIdPromise(userId).then((data) => {
    return data;
  });
};

export const getProductsFromId = async (productIds) => {

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
};

export const updateOrderStatus = async (updatedOrder, id, status) => {
  
  delete updatedOrder.id;


  await firestore.collection("orders").doc(id).update({
    status: status,
  });
};

//* Logic for Pincodes

export const addPincode = async (pincodeData, setPincodes, values) => {
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

export const fetchPincodes = async () => {
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

export const updatePinCode = async (id, data) => {
  await firestore.collection("pincodes").doc(id).update(data);
};

export const deletePinCode = async (id) => {
  await firestore.collection("pincodes").doc(id).delete();
};

//* Adding Admin

export const makeAdminFirestore = async (uid, name, number) => {
  await firestore
    .collection("admins")
    .doc(uid)
    .set({ id: uid, name, number, type: "ADMIN" });
};

export const fetchAdmins = async () => {
  let admins = [];
  const adminsDocs = await firestore.collection("admins").get();
  adminsDocs.forEach((doc) => {
    const data = doc.data();
    admins.push({ ...data });
  });
  return admins;
};

export const deleteAdmin = async (uid) => {
  
  await firestore.collection("admins").doc(uid).delete();
};