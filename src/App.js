/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';
import axios from 'axios';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  // adds a credit to the users records and updates the account balance
  addCredit = (credit) => {
    const newCreditList = this.state.creditList; // get the current array of credits
    newCreditList.push(credit); // add the new credit to the credits array
    this.setState({creditList: newCreditList}); // update the credits state
    
    this.updateAccountBalance(); // update the account balance state
    
  }

  // adds a debit to the users records and updates the account balance
  addDebit = (debit) => {
    const newDebitList = this.state.debitList; // get the current array of debits
    newDebitList.push(debit); // add the new debit to the debits array
    this.setState({debitList: newDebitList}); // update the debits state
    
    this.updateAccountBalance(); // update the account balance state 
  }

  // updates the account balance
  updateAccountBalance = () => {
    let newBalance = 0;

    // loop through the credits
    this.state.creditList.forEach(credit => {
      newBalance += credit.amount;
    });

    // loop through the credits
    this.state.debitList.forEach(debit => {
      newBalance -= debit.amount;
    });

    // update the accountBalance
    this.setState({accountBalance: newBalance});
  }

  // load credits and debits from API
  async componentDidMount(){
    let linkToCredits = "https://johnnylaicode.github.io/api/credits.json";
    let linkToDebits = "https://johnnylaicode.github.io/api/debits.json";

    // Await for promise (completion) returned from API call
    try {  // Accept success response as array of JSON objects (users)
      let response = await axios.get(linkToCredits);

      // update the account balance
      this.updateAccountBalance();
      
      // get JSON data from response
      this.setState({creditList: response.data});  // Store the data in the credits state
    } 
    catch (error) {  // Print out errors at console when there is an error response
      if (error.response) {
        // The request was made, and the server responded with error message and status code.
        console.log(error.response.data);  // Print out error message (e.g., Not Found)
        console.log(error.response.status);  // Print out error status code (e.g., 404)
      }    
    }

    // Await for promise (completion) returned from API call
    try {  // Accept success response as array of JSON objects (users)
      let response = await axios.get(linkToDebits);

      // update the account balance
      this.updateAccountBalance();
      
      // get JSON data from response
      this.setState({debitList: response.data});  // Store the data in the debits state
    } 
    catch (error) {  // Print out errors at console when there is an error response
      if (error.response) {
        // The request was made, and the server responded with error message and status code.
        console.log(error.response.data);  // Print out error message (e.g., Not Found)
        console.log(error.response.status);  // Print out error status code (e.g., 404)
      }    
    }
    
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={this.addCredit} accountBalance={this.state.accountBalance} />) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit} accountBalance={this.state.accountBalance} />) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/my-react-app">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;