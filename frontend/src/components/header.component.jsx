import { useContext} from "react"
import { AppContext } from "../contexts/app.context";

const Category = ({category, activeCategory, setCategory}) => {
    const onCategoryChangeHandler = () => {
        setCategory(category.id)
    }
    if(category.id === activeCategory){
        return (
            <li class="me-2">
                <button 
                    aria-current="page" 
                    className="capitalize inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active"
                    onClick={onCategoryChangeHandler}
                >
                        {category.name}</button>
            </li>
        );
    }


    return (
        <>
            <li class="me-2">
                <button
                onClick={onCategoryChangeHandler} 
                className="capitalize inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50">
                    {category.name}</button>
            </li>
        </>
    );
}

const Header = () => {
    const {categories, category, setCategory} = useContext(AppContext);
    const activeCategory = category;
    return (
        <header className='min-h-full py-4 pb-4'>
            <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
                {categories.map(category => (
                    <Category 
                        category={category} 
                        activeCategory={activeCategory} 
                        setCategory={setCategory}
                        key={category.id}
                        />
                ))}
            </ul>
            
        </header>
    );
}
export default Header;