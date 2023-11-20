import { useNavigate } from "react-router-dom";

const BlogCard = ({blog}) => {
    const {title, content, id} = blog;
    const navigate = useNavigate();
    const readMoreHandler = () => {
      navigate(`blog/${id}`)
    }

    return (
      


      <div className='py-4'>
        <h2 class="capitalize text-3xl font-extrabold dark:text-white">{title}</h2>
        <p class="my-4 text-lg text-justify text-gray-500">{`${content.substring(0,300)}`}...</p>
        <button
        onClick={readMoreHandler}
        class="inline-flex items-center text-lg text-blue-600">
        Read more
        <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
        </button>
      </div>
    );
}

export default BlogCard;