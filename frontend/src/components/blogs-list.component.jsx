import { useContext, useEffect, useState } from "react";
import BlogCard from "./blog-card.component";
import { AppContext } from "../contexts/app.context";

const BlogsList = () => {
    const [currentBlogs, setCurrentBlogs] = useState([])
    const {category, blogs, setBlogs, setCategories, setCategory} = useContext(AppContext)

    

    useEffect(() => {
        setCurrentBlogs(
            blogs.filter(blog => {
                if(category === '0' || blog.category.id === category) return blog;
            })
        )
    }, [category])

    
    return (
        <div className='grid grid-cols-3 space-x-10 grid-flow-row gap-4'>
            <div className='flex-row col-span-full divide-y-2'>
              
              {currentBlogs.map((blog) => {
                return <BlogCard key={blog.id} blog={blog}/>
              })}
              
            </div>
        </div>
    );
}

export default BlogsList;