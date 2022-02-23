import React from 'react';
import axios from 'axios';
import '../App.css';

const BASE_CART_URL = "http://localhost:3000/api/cart";

class Cart extends React.Component {

  state = {
    cart: [],
    product: [],
    loading: false,
    error: null  
  }

  componentDidMount(){
    this.fetchCarts();
  }

  fetchCarts = async () =>{
    this.setState({loading: true});
    try{ 
        const res = await axios.get(BASE_CART_URL);
        console.log('CHECK!!Response', res.data)
        this.setState({
          cart: res.data,
          loading:false
        })
    }catch(err){
      console.log('Error loading AJAX', err)
      this.setState({error: err, loading:false });
    }
  }

  // matchItem = (lineItemId) =>{
  //   // console.log("LOOK", this.state.product.filter((item)=> item.id === product_id)[0])
  //   return this.state.cart.find((item)=> item.id === lineItemId)
  //   //find instead of filter 
  // } //we Might NOT NEED THIS

  // handleDelete 

  onClickMinus = (lineItemId) => {
    // const item = this.matchItem(lineItemId)
    // console.log("quantity state", item);
    // //check if lower zero
    // item.qty--;
    //setState replace an array 
    // console.log("minus qty", item);
    //just change qty - map over state 
    this.setState({cart: this.state.cart.map(currentItem => {
      //use map to see item ID or other items which we ignore 
      if(currentItem.id === lineItemId){
        //this is the current we update 
        //return new object
        return {...currentItem, qty: currentItem.qty - 1}
        //updated:true if we were smart enough to do it by sending data back tha has been updated
      }else{
        return currentItem; //return other cartItems unchanged if it doesnt match the ID
      }
    })})

  }//onClickMinus()

  //TODO:need an update and send data to backend with the quantities. Minimise data to backend and send back just quantity. of itme changeed. Just sned back within the loop above. use the updated truee property to send back the items that have chnged  

  //TODO: just send data back then at the end and would just send back the product id and qty and use map to extract those values and send those back. 

  //TODO: get update button to work and get the stae and get the appropriate post request. Each loop in the backend that for each of the lineitems that are sent and update the quantity. Just extract qty and cartlineItem by id. Make sure it works when you test it. 

  onClickPlus = (lineItemId) => {
    // console.log("uantity state", this.state.cart.id)
    this.setState({cart: this.state.cart.map(currentItem => {
      //use map to see item ID or other items which we ignore 
      if(currentItem.id === lineItemId){
        //this is the current we update 
        //return new object
        return {...currentItem, qty: currentItem.qty + 1}
        //updated:true if we were smart enough to do it by sending data back tha has been updated
      }else{
        return currentItem; //return other cartItems unchanged if it doesnt match the ID
      }
    })})
    
  }//onClickPlus()

  onClickRemove =(lineItemId) =>{

    const arr = this.state.cart;

    const index = arr.findIndex(object => {
      return object.id === lineItemId;
    });

    if (index !== -1) {
        arr.splice(index, 1);
        this.setState({cart: arr});
    }

  } //onClickRemove()

  
  // onClickRemove = (lineItemId) => {

  //   console.log("lineItemId", lineItemId)

  //   console.log("Hii", this.state.cart)
  // //   this.setState({cart: this.state.cart.map(currentItem => {
  // //     //use map to see item ID or other items which we ignore 
  // //     if(currentItem.id === lineItemId){
  // //       //this is the current we update 
  // //       //return new object
  // //       console.log("currentItem.id", currentItem)
  // //       // return currentItem.splice(currentItem, currentItem.id)
  // //       // {...currentItem, qty: currentItem.qty + 1}
  // //       //updated:true if we were smart enough to do it by sending data back tha has been updated
  // //     }else{
  // //       return currentItem; //return other cartItems unchanged if it doesnt match the ID
  // //     }
  // // })})

  // }

  render() {
    const {error, cart} = this.state;
    // console.log('check RENDER', this.state)

    if (error){
      return <p>Error loading</p>
    }

    const cartList = cart.map(c => (

      // console.log('Check image', this.matchImage(c.product_id).image)
      <li key={c.id}>
      <img className="cartImage" src={`http://localhost:3000/assets/${c.product.image}`} alt="productName" />
      <p>Name:{c.product.name}</p>
      <div>
      <p>
        <button onClick={()=>this.onClickMinus(c.id)}>-</button>
        QTY:{c.qty}
        <button onClick={()=>this.onClickPlus(c.id)}>+</button>
      </p>
      <br />
      <button onClick={()=>this.onClickRemove(c.id)}>Remove Item</button>


      </div>
      




      </li>
    )

    )

    return (
      <div>
        {cartList}
      </div>
    );
  }
}

export default Cart;



// should have componentdidmount and get axios request api cart
// axios get '/api/cart' => 'api_cart_line_items#index'

