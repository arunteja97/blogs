import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/app.context";

const CreateCategory = () => {
    const {categories} = useContext(AppContext);
    const [addStart, setAddStart] = useState(false);
    const [categoryName, setCategoryName] = useState('')
    
    const navigate = useNavigate();
    const onChangeHandler = (e) => {
        const {name, value} = e.target;
        setCategoryName(value)
    }
    const addCategoryHandler = async (e) => {
        e.preventDefault();
        setAddStart(true);
        const categoryExists = categories.filter(category => {
            return category.name.toLowerCase() === categoryName.toLowerCase()
        })
        if(categoryExists.length > 0 || categoryName === ''){
            alert(`Category exists or invalid category, please choose a different name`)
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'name': categoryName
            })
        };
        fetch('http://localhost:5000/addCategory', requestOptions)
            .then(response => console.log(response));
        navigate('/')
            
    }

    return (
        <form>
            <div class="mb-6">
                <label for="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create Category</label>
                <input type="text" 
                required 
                id="default-input" 
                name="addCategory" 
                onChange={onChangeHandler}
                value={categoryName}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
            </div>
            <button onClick={addCategoryHandler} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Create</button>
        </form>
    );
}

export default CreateCategory;