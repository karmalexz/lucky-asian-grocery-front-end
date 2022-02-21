import React, { Component } from 'react';
import axios from 'axios';

const BASE_PRODUCTS_URL = 'http//localhost:3000/products';

class Products extends React.Component {
  
  state = {
    allProducts:[],
    loading: false,
    error: null
  };

  componentDidMount(){
    this.showProductInfo();

  };

  showProductInfo = async() => {

    this.setState({loading: true});
    
    try {

      const res = await axios.get(BASE_PRODUCTS_URL);
      console.log('Products Response', res.data)

    } catch(err){

      console.log('Error', err)
    }

  }
  
  render() {


    return (
      <div>
        Product index page
      </div>
    );
  }
}

export default Products;