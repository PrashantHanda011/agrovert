import { firestore } from "../../Firebase"

const fetchProducts = () =>{
    let products = []
    firestore.collection("products").get()
    .then(querySnapshot=>{
        querySnapshot.forEach(product=>{
            products.push(product.data())
        })
    })
    return products
}

const fetchCategories = () =>{
    let categories = []
    firestore.collection("categories").get()
    .then(querySnapshot=>{
        querySnapshot.forEach(category=>{
            categories.push(category.data())
        })
    })
    return categories
}


export {fetchProducts,fetchCategories}