import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../contexts/app.context";

const BlogView = () => {
    
    const {blogId} = useParams();
    const {blogs} = useContext(AppContext);
    const blog = blogs.find(item => item.id === blogId)

    if(!blog) return <h2>Blog doesn't exists</h2>

    const {title, content, category: {name}, id} = blog
    const navigate = useNavigate();
    
    const onDeleteHandler = async () => {
        const requestOptions = {
          method: 'DELETE',
          headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
          },    
          body: new URLSearchParams({
              'blogId': id
          })
        };
        
        await fetch('http://localhost:5000/deleteblog', requestOptions)
            .then(response => console.log(response.text()));
        navigate('/')
    }

    const onEditHandler = async () => {
        navigate(`../../editblog/${blogId}`, {relative: "path"})
    }
    return (
        <>
            
            <h1 class="capitalize mb-4 text-sm font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">{title}</h1>
            <p class="capitalize text-md font-normal text-gray-500 lg:text-xl dark:text-gray-400">{`Category: ${name}`}</p>
            <div className='flex pt-5 justify-end'>
                <button type="button" onClick={onEditHandler} class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">Edit</button>
                <button
                type="button" 
                onClick={onDeleteHandler}
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-200">Delete</button>
            </div>
            <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <p class="whitespace-pre-line whitext-lg pb-32 font-normal text-justify text-black lg:text-xl dark:text-gray-400">{content}</p>
        </>
    );
}

export default BlogView;