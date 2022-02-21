import axios from "axios";
import React, {Component} from "react";
import '../App.css';
import { useHistory, useParams } from 'react-router-dom';


const BASE_PRODUCT_URL = "http://localhost:3000/api/products/"

class ProductShow extends React.Component{

    
    // state = {
    //     resultsProduct: [],
    //     error: null
        
    // }
    // componentDidMount(){
    //     this.revealProduct();

    // }

    // revealProduct = async (product_id) => {

    //     try {
    //         const res = await axios.get( BASE_PRODUCT_URL + `/${ this.props.match.params.id }` );
    //         console.log('response', res.data);
    //         this.setState({
    //             resultProducts: res.data,
    //             loading: false  // stop showing loading message
    //     });
    //     } catch( err ){
    //         console.log('Error in search AJAX: ', err);
    //         this.setState({ error: err, loading: false });
    //     }



    // };//revealProduct()



    render(){


        return(


            <div>

                Results for "{ this.props.match.params.id }":

            </div>


        )//return()




    } //render()



};// ProductShow class

export default ProductShow