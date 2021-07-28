import { storage,firestore } from "./Firebase";
const uploadData = (photo,product,values,setValues) =>{
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

 



export {uploadData}