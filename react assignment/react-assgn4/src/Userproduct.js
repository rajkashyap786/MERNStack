import React ,{Component} from 'react';
import "./Userproduct.css";
import Item from './Item';


class Userproduct extends Component{

  
  constructor(props){
    super(props);

    if(localStorage.getItem("userItem")==null){
     this.allItems=[];
      }
    else{
        this.allItems=JSON.parse(localStorage.getItem("userItem"));
       }
        
    this.state={
             items:this.allItems,
             errors:[
               {error:null},
               {error:null},
               {error:null},
               {error:null}
             ]
            };
  
      this.item={}; 
      this.field={};
     }

     fieldInputData=(event,key)=>{
       this.item[key]=event.target.value;
       this.field[key]=event.target;
       
     }
     
     formValidation=()=>{

      let errorcount=0;
      let errors = this.state.errors;
      let expQuantity = new RegExp("^[0-9]+$");
      let expName = new RegExp("^[a-zA-Z ]{2,30}$");
      let expPrice = new RegExp("(([0-9]+/,[0-9]+)|([0-9]+[.]?[0-9]*(?:L|Cr)?))$");
      let expColor = new RegExp("[Rr]ed|[Gg]reen|[Yy]ellow|[Oo]range|[Bb]lue|[Vv]iolet|[Bb]rown")
      
      if(this.item.name===" "|| this.item.name===undefined||!expName.test(this.item.name)||this.item.name.length<3 || this.item.name.length>20){
      errors[0].error="Name is required and shoud not have a number and it should not more than 3 or less than 20";
      errorcount++
      }
      else{
        errors[0].error=null;
         }

      if(this.item.price===" "|| this.item.price===undefined||!expPrice.test(this.item.price)){

        errors[1].error="price is required and should not accept white spaces,alphabets,negative values"
        errorcount++
      }
      else{
        errors[1].error=null;
      }
      
      if(this.item.quantity===" " || this.item.quantity===undefined||        !expQuantity.test(this.item.quantity)){ 
        
          errors[2].error="quantity is required and must be positive integer";
          errorcount++;     
          }
      else{
        errors[2].error=null;
      }

      if(this.item.color===" " || this.item.color===undefined||!expColor.test( this.item.color)){ 

        errors[3].error="color is required and should not accepted other than red green,yellow,orange,blue,violet,brown";
        errorcount++;                 
        }
      else{
        errors[3].error=null;
      }

       this.setState({errors:errors});
       
      if(errorcount === 0){
        return true;
      }
      return false;
     }

     addItem=()=>{
     if(this.formValidation()===true){
       let item=new Item(this.item);
       this.allItems.unshift(item);
       localStorage.setItem("userItem",JSON.stringify(this.allItems));
       this.setState({items: this.allItems});      

       this.field.name.value="";
       this.field.price.value="";
       this.field.quantity.value="";
       this.field.color.value="";
     }
     else{
       console.log("solve the error");
     }
    }

     deleteItem=(index)=>{

      this.allItems.splice(index,1);
      localStorage.setItem("userItem",JSON.stringify(this.allItems));
      this.setState({items : this.allItems});
     }

     searchItem=(event)=>{

      let SearchItem=event.target.value;
      let foundItem=this.allItems.filter((item)=>{
        return item.name.toLowerCase().includes(SearchItem.toLowerCase())
      })
      this.setState({items : foundItem});
     }

render(){
       let items=null;
    if(this.allItems.length!==0){
      items = this.state.items.map((item,index)=>{
      return(
       <div className="card" key={index} style={{width: "18rem", margin:"20px"}}>
         <ul className="list-group list-group-flush">
          <li className="list-group-item"><h3>{item.name}</h3></li>
          <li className="list-group-item">Price : {item.price}</li>
          <li className="list-group-item">Quantity : {item.quantity}</li>
          <li className="list-group-item">Color : {item.color}</li>
          <li className="list-group-item">
            <button className="btn btn-danger" onClick={()=>{this.deleteItem(index)}}>Delete</button>
          </li>
         </ul>
       </div>
      )
    })
  }
  else{

    items=(<div className="alert alert-danger notfound"><h3>No data found</h3></div>)

  }
 
  return(
    <div className="container">

      <div className="form-group">
        <input className="form-control"  type="search" placeholder="Search Here" onChange={(event)=>{this.searchItem(event)}}/>
      </div>
      <div className="row rightshift">
      <div className="form-group">
        <input className="form-control" type="text" placeholder="Name" onChange={(event)=>{this.fieldInputData(event,"name")}}/>
      </div>
      <div className="form-group">
        <input className="form-control" type="number" placeholder="Price" onChange={(event)=>{this.fieldInputData(event,"price")}}/>
      </div>
      <div className="form-group">
        <input className="form-control"  type="number" placeholder="Quantity" onChange={(event)=>{this.fieldInputData(event,"quantity")}}/>
      </div>
      <div className="form-group">
        <input className="form-control"  type="text" placeholder="Color" onChange={(event)=>{this.fieldInputData(event,"color")}}/>
      </div>
      <div className="form-group">
        <button className="btn btn-danger" onClick={()=>{this.addItem()}}>ADD</button>
      </div>
      </div>
      <div>
        {this.state.errors.map((errObj,index)=>{
          if(errObj.error!==null){
          return(<div className="alert alert-danger" key={index}>{errObj.error}</div>)
          }
          else{
            return null;
          }
        })}
      </div>
      <h2>All User Products </h2>
       <div className="row gap">
       {items}
     </div>    
    </div>
  )
}
}

export default Userproduct;