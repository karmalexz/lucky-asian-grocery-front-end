import axios from "axios";
import React, {Component} from "react";
import '../App.css';
import { HashRouter as Router, Route, Link } from 'react-router-dom';


const BASE_PRODUCT_URL = "http://localhost:3000/api";

class ProductShow extends React.Component{

    
    state = {
        resultsProduct: [],
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
            console.log('response', res.data);
            this.setState({
                resultsProduct: res.data,
                loading: false  // stop showing loading message
        });
        } catch( err ){
            console.log('Error in search AJAX: ', err);
            this.setState({ error: err, loading: false });
        }



    };//revealProduct()

    
    render(){
        
        // const {loading, error, resultsProduct} = this.state
        // console.log("resultsProduc", this.state)
        // if (error){
        //     return <p>Error loading</p>
        // }

        return(


            <div>

                <h2>Hi</h2>

            </div>


        )//return()




    } //render()



};// ProductShow class

export default ProductShow