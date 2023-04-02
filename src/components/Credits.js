/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Component } from 'react';
import {Link} from 'react-router-dom';

class Credits extends Component {
  constructor(props){
    super(props);

    this.state = {
      amount: 0,
      description: "",
    }
  }

  // sets the credit amount
  setAmount = (e) => {
    this.setState({amount: parseInt(e.target.value)});
  }

  // sets the credit description
  setDescription = (e) => {
    this.setState({description: e.target.value});
  }

  // adds the transaction once the submit button has been clicked
  handleSubmit = (e) => {
    e.preventDefault(); // prevent the page from reloading after form is submitted

    let date = new Date(); // create a new date instance
    
    // create a credit object
    let credit = {
      id: this.generateId(),
      amount: this.state.amount,
      description: this.state.description,
      date: date.toISOString(),
    }

    // add the credit to the records
    this.props.addCredit(credit);
  }

  // generates an id tha is incremented by one from the last max id
  generateId = () => {
    let id = 0;

    this.props.credits.forEach((credit, index) => {
      if(credit.id > id){
        id = credit.id;
      }
    });

    return id + 1;
  }

  // Create the list of Credit items
  creditsView = () => {
    return this.props.credits.map((credit) => {  // Extract "id", "amount", "description" and "date" properties of each credit JSON array element
      let date = credit.date.slice(0,10);
      
      return(<tr key={credit.id}>
        <td>{date}</td>
        <td>${Number(credit.amount).toFixed(2)}</td>
        <td>{credit.description}</td>
      </tr>)
    });
  }

  render(){
    return (
      <div>
        <h1>Credits</h1>
        <h2>Account Balance: ${Number(this.props.accountBalance).toFixed(2)}</h2>
  
        <h3>Add Credit</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Credit Amount</label><br/>
            <input type = "number" name = "amount" required placeholder="credit amount" onChange={this.setAmount} />
          </div>
  
          <div>
            <label >Description</label><br/>
            <textarea name = "description" required placeholder="description" onChange={this.setDescription} />
          </div>
  
          <button type = "submit">Add Credit</button>
  
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
              {this.creditsView()}
            </tbody>
        </table>
        
        <br/>
        <Link to="/">Return to Home</Link>
      </div>
    );
  }
}

export default Credits;