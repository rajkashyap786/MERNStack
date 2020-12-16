fetch("http://localhost:5000/DataStorage")
.then((response)=>response.json())
.then((datas)=>{

  let productstring="";
  datas.forEach((item)=>{
   productstring+=`

<div class="card mb-3 productcard" style="max-width: 440px;">
    <div class="row g-0">
      <div class="col-md-4">
       <div class="card-title" style="font-size:50px; text-align:center; padding-top:50px">${item.emoji}</div>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Price : &#8377;${item.price}</li>
          <li class="list-group-item">Rating : ${item.rating}</li>
        </ul>
        <div class="card-body">
          <a href="singleproduct.html?id=${item.id}" class="card-link btn btn-success">VIEW</a>
        </div>
         
        </div>
      </div>
    </div>
`;
})
document.getElementById("showitem").innerHTML=productstring;
})