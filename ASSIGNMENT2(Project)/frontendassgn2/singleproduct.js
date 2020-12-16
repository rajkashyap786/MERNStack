let url=location.href;
let id= url.split("?")[1].split("=")[1];



let dummyrating="";
for(let i=1;i<=5;i++)
{
  dummyrating+=`<i class="fa fa-star myrate notrated" style="font-size:20px" aria-hidden="true"></i>`
}
let ratingString="";
      
  for(let i=1;i<=5;i++){
      {
       ratingString+=`<i class="fa fa-star rated" style="font-size:20px"   aria-hidden="true"></i>`;
      }
    }


fetch("http://localhost:5000/DataStorageItem?id="+id)
    .then((response)=>response.json())
    .then((item)=>{

   
      let myRating="";
      for(let i=1;i<=5;i++)
      {
        myRating+=`<i class="fa fa-star myrate notrated" onclick="submitrating(${item.id})" onmouseover="markRating(${i})" onmouseout="markUnrating()" style="font-size:20px" aria-hidden="true"></i>`;
      }
    
          
    let averageRating=item.rating/item.rating_count;
    let widthpercentage=Math.round((averageRating/5)*100);

    document.getElementById("productname").innerText=item.name;
    
    let productstring=`

    <div class="card mb-3 productcard" style="max-width: 650px;">
        <div class="row g-0">
          <div class="col-md-4">
          <div class="card-title" style="font-size:80px; text-align:center; padding-top:50px">${item.emoji}</div>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">${item.description}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Price : &#8377; ${item.price}</li>
              <li class="list-group-item" style="height:40px">
              
              <div id="Rating" style="width:95px; position:absolute">
                
                <div class="dummystars" style="width:100%;  position:absolute">
                 ${dummyrating};
                 </div>
               <div class="dummystars" style="width:${widthpercentage}%; height:33px; position:absolute; white-space:nowrap; overflow:hidden">
                   ${ratingString}
                </div>
              </div>
         
               <div id="rating_count" style="position:absolute;left:120px">
               (${item.rating_count} rating)
               </div>
     
              
              </li>
              <li class="list-group-item" id="myrating">${myRating}{Rate Here}</li>
              <li class="list-group-item">Type : ${item.type}</li>
            </ul>
            <div class="card-body">
            <a href="#" class="card-link btn btn-success">Buy Now</a>
          </div>              
            </div>
          </div>
        </div>`;
        document.getElementById("showitem").innerHTML=productstring;
    }) 
 
    function markRating(index){

      let stars = document.getElementById("myrating").children;
  
      for(let i=0;i<stars.length;i++)
      {
        stars[i].classList.remove("rated");
        stars[i].classList.add("notrated");
      }
      for(let i=0;i<index;i++)
      {
        stars[i].classList.remove("notrated");
        stars[i].classList.add("rated");
      }
    }


    function markUnrating(){

      let stars = document.getElementById("myrating").children;
  
      for(let i=0;i<stars.length;i++)
      {
        stars[i].classList.remove("rated");
        stars[i].classList.add("notrated");
      }
    }



    function submitrating(id)
    {
      let rating=document.getElementById("myrating").getElementsByClassName("rated").length;
      console.log(JSON.stringify({rating:rating}));
    
      fetch("http://localhost:5000/updateRating?id="+id,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({rating:rating})
      })
       .then((response)=>response.json())
        .then((item)=>{
          
          let averageRating=item.rating/item.rating_count;
          let widthpercentage=Math.round((averageRating/5)*100);
      
          document.getElementById("Rating").innerHTML=`
          <div class="dummystars" style="width:100%;  position:absolute">
              ${dummyrating};
          </div>
          <div class="dummystars" style="width:${widthpercentage}%; height:33px; position:absolute; white-space:nowrap; overflow:hidden">
            ${ratingString}
          </div>`;

         document.getElementById("rating_count").innerHTML=`(${item.rating_count} rating)`;
        })
        .catch((err)=>{
          console.log(err)
        
      })
      
    }