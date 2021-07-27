import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Account.css'

const Account = ({ balance, doTransfer }) => {
    const [values, setValues] = useState({transaction: '', value: 0});

    function handleChange(e) {
        const { name, value } = e.target;
        console.log(e.target.type);
        console.log(e.target);
        const updatedValues = { ...values, [name]: value};
        console.log(updatedValues);
        setValues(updatedValues);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const transactionDate = new Date().toLocaleDateString('pt-br');
        doTransfer({...values, date: transactionDate});
    }

    return <div className="account-header">
        <h2>Conta</h2>
        <p>Saldo: <span data-testid="account-balance" className="balance-value">{`R$ ${balance}`}</span></p>
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Depósito
                    <input
                        type="radio"
                        name="transaction"
                        value="deposit"
                        onChange={handleChange}
                        data-testid="transaction"
                        checked={values.transaction === 'deposit'}   
                    />
                </label>
            </div>
            
            <div>
                <label>
                    Saque
                    <input
                        type="radio"
                        name="transaction"
                        value="withdrawn"
                        data-testid="transaction"
                        onChange={handleChange}
                        checked={values.transaction === 'withdrawn'}     
                    />
                </label>
            </div>

            <label>Valor:</label>
            <input
                type="text"
                name="value"
                value={values.value}
                data-testid="value"
                onChange={handleChange}
            ></input>

            <div>
                <button type="submit">
                    Realizar operação
                </button>
            </div>
        </form>
    </div>
};

Account.defaultProps = {
    balance: 0,
}

Account.propTypes = {
    balance: PropTypes.number,
};

export default Account;
