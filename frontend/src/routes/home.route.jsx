import BlogsList from "../components/blogs-list.component";
import CreateBlogCategory from "../components/create-blog-category.component";

import Header from "../components/header.component";

const Home = () => {
    return (
        <>
            <CreateBlogCategory/>
            <Header/>
            <BlogsList/>
        </>
    );
}

export default Home;