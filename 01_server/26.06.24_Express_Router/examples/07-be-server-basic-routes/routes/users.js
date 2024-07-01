import {Router} from "express";
const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bobi Johnson", email: "johnson@example.com" },
];


const usersRouter=Router()

usersRouter.get('/',(req,res)=>{
  res.send(users)
})
usersRouter.get('/:id',(req,res)=>{
  res.send(users.find(user=>user.id==req.params.id))
})


export default usersRouter