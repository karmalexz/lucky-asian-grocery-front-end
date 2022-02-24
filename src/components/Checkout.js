import React from 'react';
import '../App.css';
import axios from 'axios';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

// BASE_CHECKOUT_URL = "http://localhost:3000/orders/:id"

class Checkout extends React.Component{


    state = {
        creditCardDetails: '',
        expiryDate: '',
        creditCardValid: false,
        expiryDateValid: false

    }

    handleCreditCardDetails = (ev) => {
        if(ev.target.value.length < 0){ //dummy conditional
            window.location.reload(true)
        }else{
        this.setState({creditCardDetails: ev.target.value}, {creditCardDetails: true})
    }}

    handleExpiryDate = (ev) => {
        if(ev.target.value.length < 0){ //dummy conditional
            window.location.reload(true)
        }else{
        this.setState({expiryDate: ev.target.value}, {expiryDateValid: true})
    }}
    // fetchCart = async () => {

    // try {
    //     const res = await axios.get(BASE_CHECKOUT_URL)
    //     console.log('Check this Response', res.data)
    // } catch (err) {
    //     console.log('Error with AJAX', err)

    // }} //fetchCart()

    handleSubmit = async(ev) => {
        ev.preventDefault();
        // this.setState({status: paid})
        // this.props.history.push(`/order/add/`);


    }

    
    render(){



        return(
        <div >
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Credit Card Details" onChange={this.handleCreditCardDetails}/>
                <input type="text" placeholder="Expiry Date" onChange={this.handleExpiryDate}/>

                <button>Purchase Asian Goodies</button>
                
            </form>   
        </div>
        )



    }






}
export default Checkout