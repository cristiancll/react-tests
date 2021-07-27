import React from "react";
import Account from "./Account";
import {fireEvent, render, screen} from "@testing-library/react";

describe('Componente de conta', () => {
   it('Exibir o saldo da conta como valor monetário', () => {
       render(<Account balance={1000}/>);
       const balance = screen.getByTestId('account-balance');
       expect(balance.textContent).toBe("R$ 1000");
   }); 
   
   it('Chama a função de realizar transação, quando o botão é clicado', () => {
       const doTransferFunction = jest.fn();
       render(<Account balance={1000} doTransfer={doTransferFunction}/>);
       
       fireEvent.click(screen.getByText('Realizar operação'));
       
       expect(doTransferFunction).toHaveBeenCalled();
   });
});
