import React, { Component } from 'react';
import Address from './Address.jsx';

<<<<<<< 1756e3ada96052e2e523e0bb35d8ce205a41d5ba
class Addresses extends Component {
  constructor(props) {
    super(props);
    this.state = { //refactor with redux
       number: 1,
       address: ''      
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleAddressText = this.handleAddressText.bind(this);
  }

  handleAdd(e) {
    this.setState(prevState => {
      return { 'number': prevState.number + 1 }
    });
  }

  handleAddressText(e) {
    this.setState({
      address: e.target.value
    });
  }


  render() {
    let addresses = [];
    for (let i = 0; i < this.state.number; i++) {
      addresses.push(<Address key={i}/>);
    }

    return (
      <div className="Addresses">
        {addresses}
        <input type="text" onChange={this.handleAddressText}></input>        
        {this.state.number === 4 ? (
            <input type="submit" disabled="disabled" value="Add Address"></input>
          ) : (
            <input type="submit" onClick={this.handleAdd} value="Add Address"></input>
          )
        }
      </div>
    );
  }
}
=======
const Addresses = ({handleAddress}) => (
  <div className="Addresses">
    <input type="text" onChange={handleAddress} placeholder='Input address'></input>
    <input type="submit" value="Add Address"></input>
  </div>
);
>>>>>>> Add function to take centralize inputed address

export default Addresses;