function validID(){

  let id=document.getElementById("id").value;
  let exp = new RegExp("^[0-9]+$")

  if(id==""){
    document.getElementById("idError").innerText="ID should not be empty";
    return false;
  }
  if(!exp.test(id)){
    document.getElementById("idError").innerText="Id should not accept alphabets,Negative value ";
    return false;
  }
  document.getElementById("idError").innerText="";
  return true;
}

function validName(){
  let name=document.getElementById("name").value;
  let exp = new RegExp("^[a-zA-Z ]{2,30}$")

  if(name==""){
  document.getElementById("nameError").innerText="Name shoud not be empty";
   return false;
  }
 if(!exp.test(name)){
   document.getElementById("nameError").innerText="name shoud not have a number and it should have a space between names";
   return false;
 }
 document.getElementById("nameError").innerText="";
 return true;
}

function validDescription(){
  let description=document.getElementById("description").value;
  let exp = new RegExp("^(.|\s)*[a-zA-Z]+(.|\s)*$")

  if(description==""){
    document.getElementById("descriptionError").innerText="description should not be empty";
    return false;
  }
  if(!exp.test(description)){
    document.getElementById("descriptionError").innerText="description should not accept empty spaces";
    return false;
  }
  document.getElementById("descriptionError").innerText="";
  return true;
}

function validPrice(){

  let price=document.getElementById("price").value;
  let exp = new RegExp("(([0-9]+\,[0-9]+)|([0-9]+[.]?[0-9]*(?:L|Cr)?))$")

  if(price==""){
    document.getElementById("priceError").innerText="Price should not be empty";
    return false;
  }
  if(!exp.test(price)){
    document.getElementById("priceError").innerText="Price should not accept white spaces,alphabets,negative values";
    return false;
  }
  document.getElementById("priceError").innerText="";
  return true;
}

function validRating(){

  let rating=document.getElementById("rating").value;
  let ratingnumber = Number(rating) 
  
  if(rating==""){
    document.getElementById("ratingError").innerText="Rating should not be empty";
    return false;
  }
  if(ratingnumber<1 || ratingnumber>5){
    document.getElementById("ratingError").innerText="Rating should not accept more than 5 or less than 1";
    return false;
  }
  document.getElementById("ratingError").innerText="";
  return true;
}

function validType(){

  let type=document.getElementById("type").value;
  let exp = new RegExp("[Vv]egetable|[Ff]ruit|[Ff]lower")

  if(type==""){
    document.getElementById("typeError").innerText="Type should not be empty";
    return false;
  }
  if(!exp.test(type)){
    document.getElementById("typeError").innerText="Type should not accepted other than vegetable,fruit,flower";
    return false;
  }
  document.getElementById("typeError").innerText="";
  return true;
}

let errorcount=0;
function validateform(){

if (validID()==false){
    errorcount++;
  }
if (validName()==false){
    errorcount++;
  }
if(validDescription()==false){
  errorcount++;
}
if (validPrice()==false){
  errorcount++;
}
if(validRating()==false){
  errorcount++;
}
if(validType()==false){
  errorcount++;
}
 console.log(errorcount);
if(errorcount==0){
  console.log("form validation is completed successfully!!"); 
    
}
errorcount=0;
}