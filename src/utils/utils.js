import { storage, firestore } from "../Firebase";

//* Logic For Products
export const uploadProduct = async (photo, product, addProduct,setClose) => {
  const storageRef = storage.ref(photo.name);
  const uploadTask = storageRef.put(photo);
  uploadTask.on("state_changed", console.log(), console.error, () => {
    storageRef.getDownloadURL().then((url) => {
      product.image_url = url;
      product.file_name = photo.name;
      return firestore
        .collection("products")
        .add(product)
        .then(
          async (product) =>
            await product.get(product.id).then((product) => {
              const id = product.id;
              const data = product.data();
              addProduct({ id, ...data });
              setClose(true)
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

export const updateProductWithId = async (id, updatedProduct) => {
  if (updatedProduct.photo) {

  } else {
    const res = await firestore
      .collection("products")
      .doc(id)
      .update({ updatedProduct });
    return res;
  }
};

export const deleteProductWithId = (id, imageUrl) => {
  firestore.collection("products").doc(id).delete();
};

//* Logic For Categories
export const uploadCategory = (image, category, setCategory, setFile) => {
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

export const fetchCategories = async () => {
  const snapshot = await firestore.collection("categories").get();
  return snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
};

//* Logic For Orders

export const fetchOrders = async () =>{
  var ordersRef = firestore.collection("orders")
  var orders = []
  var allOrders = await ordersRef.get()
  allOrders.forEach(doc=>{
    const id = doc.id
    const data = doc.data()
    orders.push({id,...data})
  })

  return orders
}

export const getUserFromUserIdPromise = async (userId) =>{
  const res = await firestore.collection("users").where("uid","==",userId).get()
  const data = await res.docs.map(doc=>{const id=doc.id;const data=doc.data();return {id, ...data}})
  return data[0]
}


export const getUserFromUserId = (userId) =>{
  return getUserFromUserIdPromise(userId).then(data=>{return data})
}

export const getProductsFromId = async (productIds) =>{
  console.log(productIds)
  let products = []
  for(let productId of productIds){
    await firestore.collection("products").doc(productId).get().then(data=>{
      console.log(data.data())
      products.push(data.data())
    })
  }
  console.log(products)
  return products
}

export const updateOrderStatus = async (updatedOrder,id,status) =>{
  console.log(id)
  delete updatedOrder.id
  console.log(updatedOrder)
  
  
  await firestore.collection("orders").doc(id).update({
    status:status
  })
}

//* Logic for Pincodes

export const addPincode = async (pincodeData) =>{
  await firestore.collection("pincodes").add(pincodeData)

}

export const fetchPincodes = async () =>{
  var pincodesRef = firestore.collection("pincodes")
  var pincodes = []
  var allPincodes = await pincodesRef.get()
  allPincodes.forEach(doc=>{
    const id = doc.id
    const data = doc.data()
    pincodes.push({id,...data})
  })

  return pincodes
}