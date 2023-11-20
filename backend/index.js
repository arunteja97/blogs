import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config'

import { createUser, signInUser, signOutUser } from './utils/firebase/auth.utils.js';
import { getBlogs, addBlog, deleteBlog, updateBlog,
    getBlog, getCategories, addCategory } from './utils/firebase/firebase.utils.js';



const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/categories', async (req, res) => {
    const categories = await getCategories();
    res.status(200).send(categories)
})

app.post('/addcategory', async (req, res) => {
    const result = await addCategory(req.body.name)
    res.send(result)
})

app.get('/blogs', async (req, res) => {
    const blogs = await getBlogs();
    res.send(blogs);
});

app.post('/addblog', async (req, res) => {
    const response = await addBlog(req.body)
    res.status(200).send(response);
});

app.delete('/deleteblog', async(req, res) => {
    const response = await deleteBlog(req.body.blogId)
    res.status(200).send(response);
})
app.put('/updateblog', async(req, res) => {
    const response = await updateBlog(req.body)
    res.status(200).send(response);
})

app.get('/blog/:id', async(req, res) => {
    const blog = await getBlog(req.params.id)
    res.send(blog)
})

app.post('/signup', async (req, res) => {
    const user = await createUser(req.body.email, req.body.password);
    res.send('user created successfully')
})

app.get('/signout', async (req, res) => {
    const user = await signOutUser();
    res.send('user signedout')
})

app.post('/signin', async (req, res) => {
    const user = await signInUser(req.body.email, req.body.password);
    res.send(`user signedin`)
})

app.listen(port, async () => {
    console.log(`Listening on port ${port}`)
});

