import axios from "axios";
import React, {Component} from "react";
import '../App.css';
import { HashRouter as Router, Route, Link } from 'react-router-dom';


const BASE_PRODUCT_URL = "http://localhost:3000/api";

class ProductShow extends React.Component{

    
    state = {
        resultsProduct: {},
        error: null,
        loading: false
        
    }
    componentDidMount(){
        this.revealProduct();

    }

    revealProduct = async () => {
        this.setState({loading: true});
        try {
            const res = await axios.get( `http://localhost:3000/api/products/${ this.props.match.params.id }`);
            console.log('RES.DATA response', res.data);
            this.setState({
                resultsProduct: res.data,
                loading: false  // stop showing loading message
        });
        } catch( err ){
            console.log('Error in search AJAX: ', err);
            this.setState({ error: err, loading: false });
        }

    };//revealProduct()

    handleSubmit = async (ev) => {
        ev.preventDefault();
        console.log('handleSubmit()', this.state.resultsProduct.id)
        try {
            const cartRes = await axios.post(`http://localhost:3000/api/cart/add/${this.state.resultsProduct.id}`);
            this.props.history.push(`/cart`)
            console.log('SHOW CART DATA', cartRes.data);
        }catch (err){
            console.log('Error in search AJAX:', err);
        }

    }

    
    render(){
        
        const {name, description, image, price, stock} = this.state.resultsProduct;

        // const {loading, error, resultsProduct} = this.state
        // console.log("resultsProduct", this.state.resultsProduct.name)
        if (this.state.error){
            return <p>Error loading</p>
        }


        return(


            <div>

                <h2>{name}</h2>
                <img className="product_image_show" src={`http://localhost:3000/assets/${image}`} alt={name} />
                <br/>
                <strong>Description</strong>
                <p>{description}</p>
                <br/>
                <strong>Stock</strong>
                <p>{stock}</p>
                <strong>Price</strong>
                <br/>
                <p>${price}</p>
                <br/>
                <form onSubmit={ this.handleSubmit }>
                    <button type="submit">Add to Cart</button>
                </form>
            </div>


        )//return()




    } //render()



};// ProductShow class

export default ProductShow
