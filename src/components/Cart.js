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

  componentDidMount() {
    this.fetchCarts();
  }



  fetchCarts = async () => {
    this.setState({ loading: true });
    try {
      const res = await axios.get(BASE_CART_URL);
      // console.log('CHECK!!Response', res.data)
      this.setState({
        cart: res.data,
        loading: false
      })
    } catch (err) {
      console.log('Error loading AJAX', err)
      this.setState({ error: err, loading: false });
    }
  }

  updateCart = async (item) => {
    this.setState({loading: true})
    // console.log('check this out',  this.state.cart)
    // let cartEmpty = [];
    // this.state.cart.map((item)=>{
    //   cartEmpty.push(item.product_id)
    //   console.log('cartEmpth', cartEmpty)
    //   return cartEmpty
    //   // console.log('inidivudal item', item)
    // })

    try{
      console.log('thiscart',)
      const updateRes = await axios.post(`http://localhost:3000/api/cart/update_qty/${ item.product_id}`, {qty:item.qty})
      console.log('update cart Let See Response', updateRes.data)
    }catch(err){
      console.log('Error loading AJAX')
    }
  //Post request to update_cart_qty_path qty and product
}


  // matchItem = (lineItemId) =>{
  //   // console.log("LOOK", this.state.product.filter((item)=> item.id === product_id)[0])
  //   return this.state.cart.find((item)=> item.id === lineItemId)
  //   //find instead of filter 
  // } //we Might NOT NEED THIS. this is Jia code

  // handleDelete 

  onClickMinus = (lineItemId) => {
    // const item = this.matchItem(lineItemId)
    // console.log("quantity state", item);
    // //check if lower zero
    // item.qty--;
    //setState replace an array 
    // console.log("minus qty", item);
    //just change qty - map over state 
    this.setState({
      cart: this.state.cart.map(currentItem => {
        //use map to see item ID or other items which we ignore 
        if (currentItem.id === lineItemId) {
          //this is the current we update 
          //return new object
          const newItem = { ...currentItem, qty: currentItem.qty - 1}
          this.updateCart(newItem); // this updatese backend but doesnt actually change the state which is done in the next line
          return newItem //the state update
          //save variable then pss that variable intot he update
          //Question: how to put in post request if return function is here
          //updated:true if we were smart enough to do it by sending data back tha has been updated
        } else {
          return currentItem; //return other cartItems unchanged if it doesnt match the ID
        }
        //updateCart function here
      })

    })

  }//onClickMinus()

  // TODO: need an update and send data to backend with the quantities. Minimise data to backend and send back just quantity. of item changed. Just send back within the loop above. use the updated true property to send back the items that have changed  

  //TODO: just send data back then at the end and would just send back the product id and qty and use map to extract those values and send those back. 

  //TODO: get update button to work and get the state and get the appropriate post request. Each loop in the backend that for each of the lineitems that are sent and update the quantity. Just extract qty and cartlineItem by id. Make sure it works when you test it. 

  onClickPlus = (lineItemId) => {
    // console.log("uantity state", this.state.cart.id)
    this.setState({
      cart: this.state.cart.map(currentItem => {
        //use map to see item ID or other items which we ignore 
        if (currentItem.id === lineItemId) {
          //this is the current we update 
          //return new object
          return { ...currentItem, qty: currentItem.qty + 1 }
          //POSTREQUEST---------------------------------------------------

          //updated:true if we were smart enough to do it by sending data back tha has been updated
        } else {
          return currentItem; //return other cartItems unchanged if it doesnt match the ID
        }
        //UPDATECARTFUNCTION HERE
      })
    })

  }//onClickPlus()

  onClickRemove = (lineItemId) => {

    const arr = this.state.cart;

    const index = arr.findIndex(object => {
      return object.id === lineItemId;
    });

    if (index !== -1) {
      arr.splice(index, 1);
      this.setState({ cart: arr });
      
    }

  } //onClickRemove()

  handleSubmit = async (ev) => {
    ev.preventDefault();
    console.log('handleSubmit()', this.state.cart)

    try {
        const orderRes = await axios.post(`http://localhost:3000/api/order/add/`, this.state.cart);
        console.log('SHOW CART DATA', orderRes.data);
        // this.props.history.push(`/order`)
    }catch (err){
        console.log('Error in search AJAX:', err);
    }

  }//handleSubmit()


  render() {
    const { error, cart } = this.state;
    // console.log('check RENDER', this.state)

    if (error) {
      return <p>Error loading</p>
    }

    const cartList = cart.map(c => (

      // console.log('Check image', this.matchImage(c.product_id).image)
      <li key={c.id}>
        <img className="cartImage" src={`http://localhost:3000/assets/${c.product.image}`} alt="productName" />
        <p>Name:{c.product.name}</p>
        <div>

          <p>
            <button onClick={() => this.onClickMinus(c.id)}>-</button>
            QTY:{c.qty}
            <button onClick={() => this.onClickPlus(c.id)}>+</button>
          </p>
          <br />
            <button onClick={() => this.onClickRemove(c.id)}>Remove Item</button>

        </div>

      </li>
    )

    )

    return (
      <div>

        {cartList}

        <form onSubmit={this.handleSubmit}>
          <button type="submit">Checkout</button>
        </form>

      </div>
    );
  }
}

export default Cart;


//TODO: Make each click do a post request. Then checkout handleSubmit button redirects and doesnt do anything
//TODO: Possible to make an onchange function which then uses https://www.storyblok.com/tp/how-to-send-multiple-requests-using-axios

