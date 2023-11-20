import { useState, useContext } from "react";
import { AppContext } from "../contexts/app.context";
import { useNavigate } from "react-router-dom";
const defaultFormFields = {
    title: '',
    content: '',
    categoryId: ''
}

const CreateBlog = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {title, content, categoryId} = formFields;
    const {categories} = useContext(AppContext);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };
    

    const handleCreate = (e) => {
        e.preventDefault();
        
        if(categoryId === '' || title === '' || content === ''){
            alert(`Please fill all the fields`)
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams(formFields)
        };
        fetch('http://localhost:5000/addblog', requestOptions)
            .then(response => console.log(response));
        navigate('/')
        navigate(0)
    }

    return (
        <form>
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a category</label>
            <select onChange={handleChange} name="categoryId" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected value="">Choose a category</option>
                {categories.filter(cat => cat.id!='0').map(category => {
                    return <option
                    key={category.id}
                    className="capitalize"
                    value={category.id}>{category.name}</option>
                })}
            </select>
            <div className="pt-2 space-y-2">
                <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input onChange={handleChange} type="text" name="title" value={title} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" required/>

                <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Blog</label>
                <textarea onChange={handleChange} id="content" value={content} name="content" rows="20" required className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your blog here..."></textarea>
                <button onClick={handleCreate} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Create</button>
            </div>
            
        </form>
    );
}
export default CreateBlog;