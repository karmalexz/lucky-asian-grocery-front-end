import React from 'react';
import '../App.css';
import axios from 'axios';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Cart from './Cart'


const BASE_ORDER_URL = "http://localhost:3000/api/order/"
class Order extends React.Component {


    // componentDidMount(){
    //     this.fetchCart()
    // }

    // fetchCart = async () => {

    // try {
    //     const res = await axios.get(BASE_ORDER_URL)
    //     console.log('Check this Response', res.data)
    // } catch (err) {
    //     console.log('Error with AJAX', err)

    // }
    // }

    state = {
        name: '',
        address: '',
        payment: '',
        error: '',
        loading: '',
        cart: []
    };

    handleInputName = (ev) => {
        // console.log('input', ev.target.value);
        this.setState({ name: ev.target.value })
    }

    handleInputAddress = (ev) => {
        // console.log('input', ev.target.value);
        this.setState({ address: ev.target.value })
    }
    handleInputPayment = (ev) => {
        // console.log('input', ev.target.value);
        this.setState({ payment: ev.target.value })
    }


    handleSubmit = async (ev) => {
        ev.preventDefault();
        console.log('submit', this.state);
        // this.fetchCart();
        //axios request to backend
        try{
            const orderRes = await axios.post(`http://localhost:3000/orders`, this.state)
            console.log('Order Create Response', orderRes.data)
          }catch(err){
            console.log('Error Creating Order', err)
          }

    } //handleSubmit()


    // fetchCart = async () => {

    //     try{
    //         const res = await axios.get(BASE_ORDER_URL);
    //         console.log('CART response:', res.data);
    //         // debugger;
    //         this.setState({
    //             cart: res.data
    //         });
    //     } catch(err){
    //         console.log('Error Loading AJAX', err);
    //         // this.setState({error: err});
    //     }
    // }; //fetchFlights()

    render() {


        return (

            <div>
            <h2></h2>
            <Cart hideEditControls={true} /> 

                <h4>Order Details:</h4>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="name" onChange={this.handleInputName} />
                    <br /><br />
                    <input type="text" placeholder="address" onChange={this.handleInputAddress} />
                    <br /><br />
                    <input type="text" placeholder="payment type" onChange={this.handleInputPayment} />
                    <br /><br />
                    <button>Finalise Payment</button>

                </form>

            </div>



        ) //return








    }//render()





}
export default Order