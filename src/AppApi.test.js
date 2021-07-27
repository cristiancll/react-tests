import React from "react";
import {render, screen} from "@testing-library/react";
import api from "./api";
import App from "./App";

jest.mock('./api');

describe('Requisições para API', () => {
   it('Exibir lista de transações através da API', async () => {
       api.listTransactions.mockResolvedValue([
           {
               "value": "10",
               "transaction": "withdrawn",
               "date": "10/08/2020",
               "id": 1
           },
           {
               "transaction": "deposit",
               "value": "20",
               "date": "26/09/2020",
               "id": 2
           }
       ]); 
       render(<App/>);
       expect(await screen.findByText('withdrawn')).toBeInTheDocument();
       expect(screen.getByTestId("transactions").children.length).toBe(2);
   });
});