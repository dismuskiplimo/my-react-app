/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Debits extends Component{
  constructor(props){
    super(props);

    this.state = {
      amount: 0,
      description: ""
    }

  }
  
  // Create the list of Debit items
  debitsView = () => {
    return this.props.debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      
      return(<tr key={debit.id}>
        <td>{date}</td>
        <td>${Number(debit.amount).toFixed(2)}</td>
        <td>{debit.description}</td>
      </tr>)
    });
  }

  // update the amount state when the user changes the amount
  updateAmount = (e) => {
    this.setState({amount: parseInt(e.target.value)})
  }

  // update the description state when the user changes the description
  updateDescription = (e) => {
    this.setState({description: e.target.value})
  }

  // generates an id tha is incremented by one from the last max id
  generateId = () => {
    let id = 0;

    this.props.debits.forEach((debit, index) => {
      if(debit.id > id){
        id = debit.id;
      }
    });

    return id + 1;
  }

  // handle the form submission
  handleSubmit = (e) => { 
    e.preventDefault(); // prevent the page from reloading after

    let date = new Date();

    // create a debit object
    let debit = {
      id: this.generateId(),
      amount: this.state.amount,
      description: this.state.description,
      date: date.toISOString(),
    }

    this.props.addDebit(debit);
  }
  
  render(){
    // Render the list of Debit items and a form to input new Debit item
    return (
      <div>
        <h1>Debits</h1>
        <h2>Account Balance ${Number(this.props.accountBalance).toFixed(2)}</h2>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Amount</label><br />
            <input type="number" name="amount" onChange={this.updateAmount} placeholder = "debit amount" required />
          </div>

          <div>
            <label>Description</label><br />
            <input type="text" name="description" onChange={this.updateDescription} placeholder = "description" required />
          </div>

          <button type="submit">Add Debit</button>
        </form>

        <h3>Previous Credits</h3>
        <table style={{margin: "0 auto"}}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {this.debitsView()}
          </tbody>
          
        </table>

        <br/>
        <Link to="/">Return to Home</Link>
      </div>
    );
  }
}

export default Debits;