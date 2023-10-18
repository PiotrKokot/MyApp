/**
 * @author Piotr Kokot
 * Main server express file 
 * */

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const user = require('./db/models/users')

const port = 8081
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/status',(req,res)=>{
    res.send({message:"Hello! Server is working!"})
})

/**
 * register new user and send all users
 * 
 * */
app.post('/register',(req,res)=>{
  
  const userData = {
    
    imie:req.body.imie,
    nazwisko:req.body.nazwisko,
    email:req.body.email

  }

  user.userSave(res,userData)

})

/**
 *
 * default get all users
 * */

app.get('/getAllUsers',(req,res)=>{
  
  user.getAllUsers(res)
})

/**
 *
 * delete user by id
 * */
app.delete('/deleteUser/:id_user',(req,res) => {
  
  const id_user = req.params.id_user
  user.userDelete(res,id_user)

})

/**
 *
 * get user info by id_user
 * */
app.get('/getUser/:id_user',(req,res)=>{
  const id_user = req.params.id_user
  user.getUser(res,id_user)
})

/**
 *
 * update user info 
 * */
app.post('/updateUser',(req,res)=> {
  
  const userData = {
    
    imie:req.body.imie,
    nazwisko:req.body.nazwisko,
    email:req.body.email,
    id_user:req.body.id_user

  }
  user.updateUser(res,userData)
})



app.listen(process.env.PORT || port)
console.log(`Server is running on port: ${port}`)
