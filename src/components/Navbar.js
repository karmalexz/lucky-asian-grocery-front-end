import React, { Component } from 'react';


class NavBar extends React.Component {
  render() {
    return (
      <div>
        NavBar is here
      </div>
    );
  }
}

export default NavBar;



class Products extends React.Component{

  render(){
      const {product} = this.props;
      return(
          <Link className="product" to={`/url/${product.id}`}>
              <img 
                  className="xxxx" 
                  src={product.image} 
                  alt="xxx">
              </img>
              
              <h3>{product.name}</h3>
              <h4 className="price">${product.price}</h4>
          </Link>
      );
  };

}