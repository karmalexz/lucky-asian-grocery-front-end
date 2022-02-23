import React from 'react';
import '../App.css';
import axios from 'axios';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import ProductShow from './ProductShow';
import { prettyDOM } from '@testing-library/react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { cld } from '../config/index'

const BASE_PRODUCTS_URL = 'http://localhost:3000/api/products';


class Products extends React.Component {


  state = {
    products: [],
    loading: false,
    error: null

  };

  componentDidMount() {
    this.fetchProducts();

  }



  fetchProducts = async () => {
    this.setState({ loading: true });
    try {
      const res = await axios.get(BASE_PRODUCTS_URL)
        ;
      this.setState({
        products: res.data,
        loading: false
      })
      console.log('check this array', this.state.products)
      // console.log('CHECK THIS response', res.data);
    } catch (err) {
      console.log('Error loading AJAX', err);
      this.setState({ error: err, loading: false })
    }
  }

  render() {
<<<<<<< HEAD
    console.log(process.env.REACT_APP_CLOUD_NAME)
=======
    // const myImage = cld.image(this.state.products.image);

>>>>>>> 6455b50ad0a11a673bac56dadffbaa6cdc571b7f

    const { loading, error, products } = this.state
    // console.log("CHECK Render PRODUCT", this.state)
    if (error) {
      return <p>Error loading</p>
    }

    const productsList = products.map(p =>
      <li key={p.id}>
        name: {p.name} <br />
        description: {p.description} <br />
        price: {p.price} <br />
        stock: {p.stock} <br />
        <Link to={`./products/${p.id}`}>
        <AdvancedImage cldImg={cld.image(p.image)} />

        </Link>
      </li>
    )


    return (
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