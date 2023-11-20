import { initializeApp } from "firebase/app";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    query,
    getDocs,
    deleteDoc
} from 'firebase/firestore';

import FIREBASE_CONFIG from "../../config/firebase.config.js";

/*
----------------------
         NOTE     
----------------------
Get the FIREBASE_CONFIG config by following the 
instructions on https://firebase.google.com/docs/web/learn-more#config-object
and add the object to the "../../conifg/firebase.config.js" file to import
*/

  
// Initialize Firebase
export const app = initializeApp(FIREBASE_CONFIG);
export const db = getFirestore();

export const getBlogs = async () => {
    try {
        const collectionRef = collection(db, "blogs")
        const q = query(collectionRef)
        const querySnapshot = await getDocs(q);
        
        return querySnapshot.docs.map(doc => (
            {
                ...doc.data(),
            }
        ))    
    } catch (error) {
        console.log(error)
        return []
    }
    
}

export const addBlog = async (blogData) => {
    try {
        const {title, content, categoryId} = blogData;
        const docRef = doc(collection(db, "blogs"))
        const categoryRef = doc(db, "blog_categories", categoryId)
        const categoryData = await getDoc(categoryRef)
        await setDoc(docRef, {
            id: docRef.id, title, content, category: categoryData.data()
        })    
        return `Blog added succesfully`
    } catch (error) {
        return `Create blog failed with error ${error.message}`
    }
    
}

export const deleteBlog = async (blogId) => {
    
    const docRef = doc(db, "blogs", blogId)
    const docSnapshot = await getDoc(docRef);
    try {
        if(!docSnapshot.exists()) throw new Error('document does not exists')
        await deleteDoc(docRef)
        return `Blog deleted successfully` 
    } catch (error) {
        return `Error ${error.message}`
    }
    
}

export const updateBlog = async (blogData) => {
    const { title, content, id, categoryId} = blogData;
    try {
        const docRef = doc(db, "blogs", id);

        const categoryData = await getDoc(doc(db, "blog_categories", categoryId))
        
        await setDoc(docRef, {
            id, title, content, category: categoryData.data()
        }, {merge:true});    
        return `Blog update success`
    } catch (error) {
        return `Blog update failed with error ${error.message}`
    }
    
    
}

export const getBlog = async (blogId) => {
    try {
        const blog = await getDoc(doc(db, "blogs", blogId))
        return blog.data();    
    } catch (error) {
        console.log(`Blog fetch failed with error ${error.message}`)
        return {}
    }
    
}

export const getCategories = async () => {
    try {
        const collectionRef = collection(db, "blog_categories")
        const q = query(collectionRef)
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs.map(document => document.data())    
    } catch (error) {
        console.log(error)
        return []
    }
    
    
}

export const addCategory = async (name) => {
    try {
        const categories = await getCategories();
        const categoryCheck = categories.find(cat => cat.name === name)
        if(categoryCheck) return `Category "${name}" already exists`

        const docRef = doc(collection(db, "blog_categories"))
        await setDoc(docRef, {
            id: docRef.id,
            name
        });
        
        return `Category ${name} added successfully`    
    } catch (error) {
        console.log(error)
        return `Add category failed with error ${error.message}`
    }
    
}

