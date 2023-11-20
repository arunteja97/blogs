import { Children, createContext, useEffect, useState } from "react";

export const AppContext = createContext({
    blogs: [],
    setBlogs: () => {},
    category: null,
    setCategory: () => {},
    categories: [],
    setCategories: () => {},

})

export const AppProvider = ({children}) => {

    const [blogs, setBlogs] = useState([])
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
  
    useEffect(() => {
        fetch("http://localhost:5000/blogs", {
            method: "GET",
          })
            .then((response) => response.json())
            .then((data) => {
                setBlogs(data)
              console.log(data);
            })
            .catch((error) => console.log(error));
    },[])

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
          })
            .then((response) => response.json())
            .then((data) => {
                data.splice(0, 0, {
                    name: "All",
                    id: '0'
                })
                setCategories(data)
                setCategory('0')
              console.log(data);
            })
            .catch((error) => console.log(error));
    },[])    
    

    const value = {
        blogs,
        setBlogs,
        category,
        setCategory,
        categories,
        setCategories,
    }

    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    );
}