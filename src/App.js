import React, { useEffect, useState } from 'react';

import Account from './account/Account';
import Transactions from './transactions/Transactions';
import api from './api';

import './App.css';

export const calcNewBalance = (values, balance) => {
  if (values.transaction === 'deposit') {
    return balance + parseInt(values.value)
  } else {
    return balance - parseInt(values.value);
  }
}

function App() {
  const [balance, setBalance] = useState(1000);
  const [transactions, setTransactions] = useState([]);

  async function loadTransactions() {
    const transactions = await api.listTransactions();
    setTransactions(transactions);
  }

  async function getBalance() {
    setBalance(await api.getBalance());
  }

  function doTransfer(values) {  
    const newBalance = calcNewBalance(values, balance);

    api.setBalance(newBalance).catch((error) => console.error(error))
    api.setTransactions(values).catch((error) => console.error(error))
    
    setBalance(newBalance);
    setTransactions([values]);
  }

  useEffect(() => {
    getBalance();
    loadTransactions();
  }, [balance])

  return (
    <div className="App">
      <header className="App-header">
        <h1>ByteBank</h1>
      </header>

      <Account balance={balance} doTransfer={doTransfer}/>
      <Transactions transactions={transactions} />
    </div>
  );
}

export default App;
