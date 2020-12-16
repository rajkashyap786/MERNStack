fetch("http://localhost:5000/DataStorage")
.then((response)=>response.json())
.then((items)=>{
  let blankstring="";
  items.forEach((ele,index)=>{
    blankstring+=`
    <tr>
        <td>${index+1}</td>
        <td>${ele.name}</td>
        <td>${ele.description}</td>
        <td>${ele.price}</td>
        <td>${ele.rating}</td>
        <td>${ele.type}</td>
      <td>
      <button class="btn btn-success" onclick="fillupdateForm(${ele.id},this)">Update</button>
      <button class="btn btn-danger" onclick="deleteitem(${ele.id},this)">Delete</button>
      </td>
   
    </tr>`;
    
  })
   document.getElementById("adminTable").innerHTML=blankstring;
})

function deleteitem(id,ele){

  ele.parentNode.parentNode.style.display = "none"

  fetch("http://localhost:5000/DataStorageItem?id="+id,{
    method:"DELETE"
  })
  .then((response)=>response.json())
  .then((data)=>{
    document.getElementById("message").innerHTML=
   `<p class="alert alert-success">${data.message}</p>`;   
  })
}

let singledata;

function fillupdateForm(id,element){

// display the update form
document.getElementById("parent_popup").style.display="block";

  singledata=element.parentNode.parentNode.children;
  

  document.getElementById("id").value=id;
  document.getElementById("name").value=singledata[1].innerText;
  document.getElementById("description").value=singledata[2].innerText;
  document.getElementById("price").value=singledata[3].innerText;
  document.getElementById("type").value=singledata[5].innerText;
  
}

function closeupdateForm(event){

  if(event.target.className=="parent_popup"){
  document.getElementById("parent_popup").style.display="none";
   }
}

function updatedata(){

let item={};

let id=document.getElementById("id").value;
item.name=document.getElementById("name").value;
item.description=document.getElementById("description").value;
item.price=document.getElementById("price").value;
item.type=document.getElementById("type").value;

fetch("http://localhost:5000/DataStorageItem?id="+id,{
  method :"PUT",
  headers : {
    "Content-Type" : "application/json"
  },
  body : JSON.stringify(item),
})
.then((response)=>response.json())
.then((data)=>{
  document.getElementById("parent_popup").style.display="none";

  singledata[1].innerText=data.name;
  singledata[2].innerText=data.description;
  singledata[3].innerText=data.price;
  singledata[5].innerText=data.type;

  document.getElementById("message").innerHTML=
    `<p class="alert alert-success">Data Updation is Successful </p>`;

  
}).catch((err)=>{
  console.log(err);
})
}


