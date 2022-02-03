import { firestore } from "../Firebase";

export default class SubCategoryModule{

    async addSubCategory(subCategoryToAdd,subCategories,setSubCategories){
        const dataPromise = await firestore.collection('sub-categories').add(subCategoryToAdd)
        const id = await dataPromise.id
        const data = await (await dataPromise.get()).data()
        const newSubCategory = {id,...data}
        const newSubCategories = [...subCategories,newSubCategory]
        setSubCategories(newSubCategories)
    }

    async updateSubCategory(subCategoryId,subCategoryToUpdate){
        await firestore.collection('sub-categories').doc(subCategoryId).update({
            ...subCategoryToUpdate
        })
    }

    async deleteSubCategory(subCategoryId){
        await firestore.collection('sub-categories').doc(subCategoryId).delete()
    }

    async getSubCategories(categoryId,setSubCategories){
        const dataPromise = await firestore.collection('sub-categories').where('category_id','==',categoryId).get()
        const dataDocs = await dataPromise.docs
        const finalData = dataDocs.map(doc=>{
            const id = doc.id
            const data = doc.data()
            return {id,...data}
        })
        setSubCategories(finalData)
    }

    async getCategory(categoryId){
        const dataPromise = await firestore.collection('categories').doc(categoryId).get()
        const data = dataPromise.data()

        const id = dataPromise.id
        return {id,...data}
    }
}