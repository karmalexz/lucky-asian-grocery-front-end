import React, { Component } from 'react';
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
          cart: res.data.cart,
          product: res.data.product,
          loading:false
        })
    }catch(err){
      console.log('Error loading AJAX', err)
      this.setState({error: err, loading:false });
    }
  }

  matchImage = (product_id) =>{
    console.log("LOOK", this.state.product.filter((item)=> item.id === product_id)[0])
    return this.state.product.filter((item)=> item.id === product_id)[0]
  }

  render() {
    const {error, cart} = this.state;
    // console.log('check RENDER', this.state)

    if (error){
      return <p>Error loading</p>
    }

    const cartList = cart.map(c => (

      // console.log('Check image', this.matchImage(c.product_id).image)
      <li key={c.id}>
      <img className="cartImage" src={`http://localhost:3000/assets/${this.matchImage(c.product_id).image}`} alt="productName" />
      <p>Name:{this.matchImage(c.product_id).name}</p>
      <p>QTY:{c.qty}</p>
      

      




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

