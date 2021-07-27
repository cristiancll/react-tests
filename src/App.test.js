import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import App, {calcNewBalance} from "./App";
describe('Componente Principal', () => {
    describe('Quando eu abro o app do banco', () => {
        it('O nome é exibido', () => {
            render(<App/>);
            expect(screen.getByText('ByteBank')).toBeInTheDocument();
        });
        it('O saldo é exibido', () => {
            render(<App/>);
            expect(screen.getByText('Saldo:')).toBeInTheDocument();
        });
        it('O botão de realizar transação é exibido', () => {
            render(<App/>);
            expect(screen.getByText('Realizar operação')).toBeInTheDocument();
        });
    });
    describe('Quando eu realizo uma transação', () => {
       it('que é um saque, o valor vai diminuir', () => {
           expect(calcNewBalance({transaction: "withdrawn", value: 50}, 150)).toBe(100);
       });
       it('que é um depósito, o valor vai aumentar', () => {
           expect(calcNewBalance({transaction: "deposit", value: 50}, 150)).toBe(200);
       });
        it('que é um saque, a transação deve ser realizada', () => {
            render(<App/>);
            const balance = screen.getByText('R$ 1000');
            const transaction = screen.getByLabelText('Saque');
            const value = screen.getByTestId('value');
            const transactionButton = screen.getByText('Realizar operação');
            
            expect(balance.textContent).toBe("R$ 1000");
            fireEvent.click(transaction, {target: {value: 'withdrawn'}});
            fireEvent.change(value, {target: {value: 10}})
            fireEvent.click(transactionButton);
            expect(balance.textContent).toBe("R$ 990");
        });
    });
});
 