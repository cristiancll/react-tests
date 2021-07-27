const API_URL = 'http://localhost:3001';
const TRANSACTIONS_URI = `${API_URL}/transactions`;
const ACCOUNT_URI = `${API_URL}/account`;

const connect = (uri, options = {}) => {
  return fetch(uri, options).then(async (response) => {
    if (response.ok) {
      const data = await response.json();
      return data;
    }

    console.log(response)
    throw new Error(response);
  })
}

const listTransactions = () => connect(TRANSACTIONS_URI);

const getBalance = () => connect(ACCOUNT_URI).then(data => data.balance);

const setBalance = (balance) => connect(ACCOUNT_URI, {
  method: 'POST',
  headers: {'Content-Type': 'application/json;charset=utf-8'},
  body: JSON.stringify({balance: balance}),
});

const setTransactions = (data) => connect(TRANSACTIONS_URI, {
  method: 'POST',
  headers: {'Content-Type': 'application/json;charset=utf-8'},
  body: JSON.stringify(data),
});

const api = {
  listTransactions,
      getBalance,
      setBalance: setBalance,
      setTransactions: setTransactions,
};

export default api;
