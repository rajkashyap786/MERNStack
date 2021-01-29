// Create a backend API for the Movie and Actor project.

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// middleware
app.use(express.json());

// schema for movies
let moviesSchema = mongoose.Schema({
  "name":String,
  "rating":Number,
  "year":Number,
  "revenue":Number,
  "actor":[{type:mongoose.Schema.Types.ObjectId,ref:"actors"}]
})

// schema for actor
let actorsSchema = mongoose.Schema({
 "name":String,
 "age":Number,
 "country":String
})

// Creation of Model
const movieModel = new mongoose.model("movies",moviesSchema);

// creation of Model
const actorModel = new mongoose.model("actors",actorsSchema);

mongoose.connect("mongodb://127.0.0.1:27017/bollywood",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
  console.log("connected");
})

let dummyResponse={"message":"test successfull"};

// Handling movies route

app.get("/movies/all",(request,response)=>{

    movieModel.find().populate("actor")
    .then((movies)=>{
    response.send(movies);
  })

})

app.get("/movies/singleMovie/:id",(request,response)=>{

  let id = request.params.id;
  movieModel.findById(id).populate("actor")
  .then((movie)=>{
  response.send(movie);
})

})

app.post("/movies/create",(request,response)=>{

  let movie=request.body;
  let movieData=new movieModel(movie);
  movieData.save().then(()=>{
    response.send({"Message":"Movie Created"});
  })
    
})

app.put("/movies/update/:id",(request,response)=>{
  
  let id=request.params.id;
  let movie=request.body;
  movieModel.updateOne({"_id":id},{$set:movie}).then(()=>{
    response.send({"Message":"Movie Updated"});
  })
})

app.delete("/movies/delete/:id",(request,response)=>{

   let id=request.params.id;
   movieModel.deleteOne({"_id":id}).then(()=>{
     response.send({"Message":"Movie Deleted"});
   })
})

//Handling actors route

app.get("/actors/all",(request,response)=>{

  actorModel.find().then((actors)=>{
  response.send(actors);
})

})

app.get("/actors/singleActor/:id",(request,response)=>{

let id = request.params.id;
actorModel.findById(id).then((actor)=>{
response.send(actor);
})
})

app.post("/actors/create",(request,response)=>{

let actor=request.body;
let actorData=new actorModel(actor);
actorData.save().then(()=>{
  response.send({"Message":"Actor Created"});
})
})

app.put("/actors/update/:id",(request,response)=>{

let id=request.params.id;
let actor=request.body;
actorModel.updateOne({"_id":id},{$set:actor}).then(()=>{
  response.send({"Message":"Actor Updated"});
})
})

app.delete("/actors/delete/:id",(request,response)=>{

 let id=request.params.id;
 actorModel.deleteOne({"_id":id}).then(()=>{
   response.send({"Message":"Actor Deleted"});
 })
})

// start of server
app.listen(4000,()=>{
  console.log("server is running");
})
