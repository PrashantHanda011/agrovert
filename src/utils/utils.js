import { storage,firestore } from "../Firebase";
const uploadProduct = (photo,product,values,setValues) =>{
    const storageRef = storage.ref(photo.name);
    const uploadTask = storageRef.put(photo)
    uploadTask.on("state_changed",console.log(),console.error,()=>{
        storageRef.getDownloadURL()
        .then(url=>{
            product.image_url = url
            firestore.collection("products").add(product)
            setValues({
                ...values,
                name:"",
                description:"",
                margin:"",
                quantity:"",
                price:"",
                slabs:[],
                slab1:"",
                slab2:"",
                weight:"",
                photo:"",
                image_url:""})
        })
    })
  }

  const uploadCategory = (image,category,setCategory,setFile) =>{
      const storageRef = storage.ref(image.name)
      const uploadTask = storageRef.put(image)
      uploadTask.on("state_changed",console.log(),console.error,()=>{
        storageRef.getDownloadURL()
        .then(url=>{
          const category_ = {category_name:category,image_url:url}
          firestore.collection("categories").add(category_)
          setCategory("")
          setFile("")
        })
      })

  }

  const fetchProducts = async () =>{
    const snapshot = await firestore.collection('products').get()
    return snapshot.docs.map(doc=>{return {id:doc.id,...doc.data()}});
}

const fetchCategories = async () =>{
  const snapshot = await firestore.collection('categories').get()
  return snapshot.docs.map(doc=>{return {id:doc.id,...doc.data()}});
}



export {uploadProduct,uploadCategory,fetchProducts,fetchCategories}