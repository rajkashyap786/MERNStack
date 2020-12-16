const http = require('http');
const fs = require('fs');
const url = require('url');

const data= fs.readFileSync("./DataStorage.json","utf-8");
const parsedData=JSON.parse(data);


//creation of server
const server=http.createServer((request,response)=>{
  const path=url.parse(request.url,true);
  //console.log(url.parse(request.url))

  response.writeHead(200,{
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods":"OPTIONS,POST,PUT,PATCH,GET,DELETE",
    "Access-Control-Allow-Headers":"*",
    "Content-Type":"application/json"
  })
 
  if(request.method=="OPTIONS"){
    response.end();
  }
  
    if (path.pathname=="/"||path.pathname=="/DataStorage"){

      response.end(data);
    }
    
      else if(path.pathname=="/DataStorageItem"){

          if(request.method=="GET"){

            const id=path.query.id;
            const singledata=parsedData.find((ele)=>{
             return ele.id==id;
          })
           response.end(JSON.stringify(singledata));
         }
     
        else if(request.method=="POST"){

            let update="";
            request.on('data',(chunk)=>{
             update+=chunk;
           })

           request.on('end',()=>{
           let product=JSON.parse(update);
           parsedData.push(product)
           fs.writeFile("./DataStorage.json",JSON.stringify(parsedData),(err)=>{
            response.end(JSON.stringify({message:"product added"}));
           })
        })
      }
      
        else if(request.method=="PUT"){
           const id=path.query.id;

            let update="";
             request.on('data',(chunk)=>{
             update+=chunk;
           })

            request.on('end',()=>{
             let product=JSON.parse(update);
              parsedData.forEach((ele)=>{
            if(ele.id==id){
              ele.name=product.name;
              ele.price=product.price;
              ele.type=product.type;
              ele.description=product.description;
             
            }
          })
          
          fs.writeFile("./DataStorage.json",JSON.stringify(parsedData),(err)=>{
            const updatedproduct=parsedData.find((ele)=>{
                return ele.id==id;
            })
            response.end(JSON.stringify(updatedproduct));
          });
        })
      }
         else if(request.method=="DELETE"){
             
          const id=path.query.id;
            
          parsedData.forEach((ele,index)=>{
              if(ele.id==id)
              {
                parsedData.splice(index,1);
              }
            })
            console.log(parsedData);
           fs.writeFile("./DataStorage.json",JSON.stringify(parsedData),(err)=>{ 
              response.end(JSON.stringify({message:"product deleted"}));
            });
         }
      }
      else if(path.pathname=="/updateRating"){

      if (request.method=="PUT"){

          const id=path.query.id;

          let update="";
          request.on('data',(chunk)=>{
          update+=chunk;
        })
        request.on('end',()=>{
          let product=JSON.parse(update);
           parsedData.forEach((ele)=>{
         
           if(ele.id==id){
           ele.rating=Number(ele.rating)+Number(product.rating);
           ele.rating_count=Number(ele.rating_count)+1;
         }
       })
       
       fs.writeFile("./DataStorage.json",JSON.stringify(parsedData),(err)=>{
         const updatedproduct=parsedData.find((ele)=>{
             return ele.id==id;
         })
         response.end(JSON.stringify(updatedproduct));
       });
     })
                
      }
    }

    else{
      response.writeHead(404,{
        "Content-type":"application/json"
      });
      response.end(JSON.stringify({message:"URL not found"}))
    }
  
});

    server.listen("5000","localhost",()=>{
  console.log("server is running");
})
