import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ProductShow from './ProductShow';

const BASE_PRODUCTS_URL = 'http://localhost:3000/api/products';


class Products extends React.Component{

  state = {
    products: [],
    loading: false,
    error: null

  };

  componentDidMount(){
    this.fetchProducts();

  }
  

  fetchProducts = async () => {
    this.setState({loading: true});
    try{
      const res = await axios.get(BASE_PRODUCTS_URL)
      ;
      this.setState({
        products: res.data,
        loading: false
      })
      console.log('check this array', this.state.products)
      // console.log('CHECK THIS response', res.data);
    } catch (err){
      console.log('Error loading AJAX', err);
      this.setState({error: err, loading: false})
    }
  }
  
  render(){
    
    const {loading, error, products} = this.state
    // console.log("CHECK Render PRODUCT", this.state)
    if (error){
      return <p>Error loading</p>
    }
  
    const productsList = products.map(p => 
        <li key={p.id}>
        name: {p.name} <br />
        description: {p.description} <br />
        price: {p.price} <br />
        stock: {p.stock} <br/>
        <Link to={ProductShow}>
        <img className="product_image" src={`http://localhost:3000/assets/${p.image}`} alt={p.name} />
        </Link>
    </li>
    )
  
    
      return(
          <div>
          <h1>All Products</h1>
            <ul>
                {
                this.state.loading
                ?
                <p>Loading results...</p>
                :
                <div className="productsIndex">
                    
                {productsList}
            
                </div>
                }
            </ul>



          </div>
          // <div>CHECKING IF WORKING</div>
      );
  };

}

export default Products;