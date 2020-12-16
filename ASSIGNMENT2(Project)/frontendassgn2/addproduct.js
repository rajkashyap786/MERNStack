function createproduct(){
  let item={}
   
  item.id=document.getElementById("id").value;
  item.name=document.getElementById("name").value;
  item.description=document.getElementById("description").value;
  item.price=document.getElementById("price").value;
  item.rating=document.getElementById("rating").value;
  item.type=document.getElementById("type").value;
  //console.log(item);


  fetch("http://localhost:5000/DataStorageItem",{
  method : "POST",
  headers : {
    "Content-Type" : "application/json"
  },
  body : JSON.stringify(item)
  })
  .then((response)=>response.json())
  .then((data)=>{

    document.getElementById("clear").reset;
    document.getElementById("message").innerHTML=
    `<p class="alert alert-success">${data.message}</p>`;

  //console.log(data);
  }).catch((err)=>{
  console.log(err)
  })
}
