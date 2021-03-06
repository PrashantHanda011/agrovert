import { storage, firestore } from "../Firebase";

class CategoryModule {
  async uploadCategory(photo, category, rank, addCategory, setClose) {
    const storageRef = storage.ref(photo.name);
    const uploadTask = storageRef.put(photo);
    uploadTask.on("state_changed", console.log(), console.error, () => {
      storageRef.getDownloadURL().then((url) => {
        return firestore
          .collection("categories")
          .add({ category_name: category, image_url: url,rank:rank })
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
  }

  deleteCategoryWithId(id) {
    firestore.collection("categories").doc(id).delete();
  }

  async updateCategory(
    id,
    photo,
    updatedCategory,
    updateCategoryWithGivenId,
    setClose
  ) {
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
  }

  async fetchCategories() {
    const snapshot = await firestore.collection("categories").get();
    return snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  }

  updateCategoriesInBulk(categoryList){
    categoryList.forEach(category_=>{
      const {id,...category} = category_
      firestore.collection('categories').doc(id).update(category)
    })
  }
}

export default CategoryModule