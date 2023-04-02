/*==================================================
src/components/AccountBalance.js

The AccountBalance component displays account balance. It is included in other page views.
==================================================*/
import React, {Component} from 'react';

class AccountBalance extends Component {
  // Display account balance
  render() {
    return (
      <div>
        Balance: ${Number(this.props.accountBalance).toFixed(2)}
      </div>
    );
  }
}

export default AccountBalance;