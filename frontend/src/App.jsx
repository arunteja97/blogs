import { Route, Routes } from 'react-router-dom'; 
import NavBar from './routes/nav-bar.route';
import Home from "./routes/home.route";
import CreateCategory from './routes/create-category.route';
import CreateBlog from './routes/create-blog.route';
import EditBlog from './routes/edit-blog.route';
import BlogView from './routes/blog-view.route';
export default function App() {
  return (
    <Routes>
      <Route path='/' element={<NavBar/>}>
        <Route index element={<Home/>}/>
        <Route path='/createcategory' element={<CreateCategory/>}/>
        <Route path='/createblog' element={<CreateBlog/>}/>
        <Route path='/blog/:blogId' element={<BlogView/>}/>
        <Route path='/editblog/:blogId' element={<EditBlog/>}/>
          
        
        
      </Route>  
      
    </Routes>
  )
}
