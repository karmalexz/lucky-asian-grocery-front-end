import React from 'react';
import '../App.css';
import axios from 'axios';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

const BASE_CHECKOUT_URL = "http://localhost:3000/api/order/"

class Checkout extends React.Component{


    state = {
        creditCardDetails: '',
        expiryDate: '',
        creditCardValid: false,
        expiryDateValid: false

    }

    componentDidMount(){
        
        this.fetchCart();
        console.log("WHAT", this.props.match)
    }

    handleCreditCardDetails = (ev) => {
        if(ev.target.value.length < 0){ //dummy conditional
            window.location.reload(true)
        }else{
        this.setState({creditCardDetails: ev.target.value})
        this.setState({creditCardDetails: true})
    }}

    handleExpiryDate = (ev) => {
        if(ev.target.value.length < 0){ //dummy conditional
            window.location.reload(true)
        }else{
        this.setState({expiryDate: ev.target.value})
        this.setState({expiryDateValid: true})
    }}
    
    fetchCart = async () => {
    // console.log("params". this.props)
    try {
        const res = await axios.get(BASE_CHECKOUT_URL + this.props.match.params.order_line_items_id)
        console.log('Check this Response', res.data)
    } catch (err) {
        console.log('Error with AJAX', err)

    }} //fetchCart()

    handleSubmit = async(ev) => {
        ev.preventDefault();
        // this.setState({status: paid})
        // this.props.history.push(`/order/add/`);


    }

    
    render(){



        return(
        <div >
            <br/>
            <br/>
            <br/>
            <br/>

            <form onSubmit={this.handleSubmit}>
                <strong>Credit Card Details</strong>
                <br/>
                <input type="text" placeholder="Credit Card Details" onChange={this.handleCreditCardDetails}/>
                <br/>
                <strong>Expiry Date</strong>
                <br/>
                <input type="text" placeholder="Expiry Date" onChange={this.handleExpiryDate}/>
                <br/>

                <button>Purchase Asian Goodies</button>
                
            </form>   
        </div>
        )



    }






}
export default Checkout