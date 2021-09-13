import { storage, firestore } from "../Firebase";

class ProductModule {
  async uploadProduct(photo, product, addProduct, setClose) {
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
  }

  async fetchProducts() {
    const snapshot = await firestore.collection("products").get();
    return snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  }

  async updateProduct(
    id,
    photo,
    updatedProduct,
    updateProductWithGivenId,
    setClose
  ) {
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
  }

  async deleteProduct(id, imageUrl) {
    firestore.collection("products").doc(id).delete();
  }

   fetchProductsByCategory(categoryId,setProducts){
    firestore.collection('products').where("category_id","==",categoryId).get().then(
      data=>{
        let products_ = []
        data.docs.forEach(doc=>{
          products_.push({id:doc.id,...doc.data()})
        })

        setProducts(products_)
      }
    )
  }

  updateProuductsInBulk(productList){
    productList.forEach(product=>{
      const id = product.id
      delete product.id
      firestore.collection('products').doc(id).update(product)
    })
  }
}

export default ProductModule;
