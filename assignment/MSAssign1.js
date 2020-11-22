// QUESTION 1: ASSIGNMENT
// The task is to create an API using HTTP Module

// The dataset is an array of objects and not a different file and each object in the array has the following properties {id, name, age, planet, weapons}.The API should have a create, update, delete and fetch superheroes features

// Make sure all request methods are correct.Test your API using the Insomnia API.You don't have to perform any file reading writing operations in this assignment the data should be just above all your functions


const http = require('http');
const url = require('url');
let Superheros =[
  {
    id:1,
    name:"Ironman",
    age:28,
    planet:"Earth",
    weapons:"AdvanceWeapons",
  },
  {
    id:2,
    name:"CaptionAmerica",
    age:35,
    planet:"Earth",
    weapons:"UnbreakableSheild",
  },
  {
    id:3,
    name:"Hulk",
    age:37,
    planet:"Earth",
    weapons:"Sword",
  },
  {
    id:4,
    name:"Thor",
    age:39,
    planet:"Agard",
    weapons:"Hammer",
  },
  {
    id:5,
    name:"Loki",
    age:31,
    planet:"Agard",
    weapons:"Magicalstick", 
  }
]

let Data=JSON.stringify(Superheros);
let parsedData = JSON.parse(Data);
const server = http.createServer((request,response)=>{
  const path = url.parse(request.url,true);

  if(path.pathname=="/" || path.pathname=="/superheros"){
    response.end(Data);
  }

  else if(path.pathname=="/superhero"){

    // applying POST METHOD to create

    if(request.method=="POST"){
      const id=path.query.id 

      let create ="";

      request.on('data',(info)=>{
        create+=info
      })
      request.on('end',()=>{
        let person=JSON.parse(create)
        parsedData.push(person)
        console.log(parsedData)
    })
    response.end(JSON.stringify(parsedData)); 
  }

    // Applying PUT METHOD to update

    else if (request.method=="PUT"){
      
      const id=path.query.id 

      let update ="";

      request.on('data',(info)=>{
        update+=info
      })

      request.on('end',()=>{
        let person=JSON.parse(update)
    
        parsedData.forEach((ele)=>{
          if(ele.id==id){
            ele.name=person.name;
            ele.age=person.age;
            ele.planet=person.planet;
            ele.weapons=person.weapons;
          }
        })
          console.log(parsedData);   
      }) 
      response.end(JSON.stringify(parsedData));
    }

    //  appling DELETE method to delete

     else if(request.method=="DELETE"){
      const id=path.query.id;
            parsedData.forEach((ele,index)=>{
           if(ele.id==id){
          parsedData.splice(index,1);
          }
       })
       console.log(parsedData)
       response.end(JSON.stringify(parsedData)); 
    }
    
  // Applying Get method to fetch   
  
  else if(request.method=="GET"){
    const id=path.query.id;
    const singledata = parsedData.filter((ele)=>{
      return ele.id==id;
      
    })
    console.log(singledata);
     response.end(JSON.stringify(singledata));
  }

  else{
  response.end(JSON.stringify({message:"URL not found"}));
   }
}
})
server.listen("5000","localhost",()=>{
  console.log("server is running");
});

