import express from 'express'
//import {Router} from 'express'

const blogposts = [
  {
    id: 1,
    title: "A blog post",
    content: "This is the content!.",
  },
  {
    id: 2,
    title: "Another blog post",
    content: "Lorem Ipsum.",
  },
];




const blogRouter=express.Router()
//const blogRouter=Router()


blogRouter.route('/').get((req,res)=>{
  res.send(blogposts)
})

blogRouter.route('/:id').get((req,res)=>{
  res.send(blogposts.find(post=>post.id==req.params.id))
}) 










export default blogRouter