// Create a backend API with Authentication and authorization and protect the routes. The API will have 4 routes [/register, /login, /createproduct, /viewproduct] createproduct and viewproduct are the routes which you have to protect by verifying JWT tokens. The database will have two collections[users,products]. All routes should work according to their names and work with the database . e.g: /createproduct -create new product in the database in the respective collection.


const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();

// middleware
app.use(bodyparser.json());

// creation of user schema
let userSchema = mongoose.Schema({
  "name":String,
  "address":String,
  "age":Number,
  "email":String,
  "password":String
})

// creation for product schema
let productSchema = mongoose.Schema({
  "name":String,
  "price":Number,
  "description":String
})

// creation of product model
let productModel = new mongoose.model("products",productSchema)

// creation of user model
let userModel = new mongoose.model("users",userSchema)

// database connection
mongoose.connect("mongodb://127.0.0.1:27017/productDatabase",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
  console.log("connected to database")
})

// salt for password encryption
let key="secretkey";

// Handling routes
app.post("/api/v1/UserRegister",(request,response)=>{
 
  let userData=request.body;
  userData.password = crypto.pbkdf2Sync(userData.password,key,1000,64,'sha512').toString('hex');
    // console.log(userData)

  let userdetails = new userModel(userData);
  userdetails.save().then(()=>{
    response.send({"message":"user register"});
  })
 
})

app.post("/api/v1/userLogin",async (request,response)=>{
  
  let loginData = request.body;
  loginData.password = crypto.pbkdf2Sync(loginData.password,key,1000,64,'sha512').toString('hex');
  // console.log(loginData)
  
  
  let count = await userModel.find(loginData).countDocuments()
  console.log(count);
  if(count==1){

    jwt.sign({user:loginData},"importantkey",(err,token)=>{
      if(err==null){
        response.send({"token":token});
      }
      else{
        response.send({"message":"problem"})
      }
    })
  }
  else{
    response.send({"message":"invalid email and password"});
  }
 
})

app.post("/api/v1/createproduct",(request,response)=>{

  let productData=request.body;
  let productdetails = new productModel(productData);
  productdetails.save().then(()=>{
    response.send({"message":"product created"});
  })

})

app.get("/api/v1/viewproduct",tokenVerification,(request,response)=>{
  
  jwt.verify(request.token,"importantkey",async (err,productdata)=>{
    if(err==null){
      let allproduct = await productModel.find()
      response.send(allproduct)
    }
    else{
      response.status(403);
      response.send({"message":"no token"})
    }
  })

})

function tokenVerification(request,response,next){
  let headerData = request.headers['authorization']
  if(headerData!=undefined){
    let token = headerData.split(" ")[1]
    request.token=token;
    next();
  }
  else{
    response.status(403);
    response.send({"message":"no token"})
  }
}

// start the server
app.listen(4000);