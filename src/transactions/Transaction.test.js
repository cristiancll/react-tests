import React from "react";
import Transaction from "./Transaction";
import {render, screen} from "@testing-library/react";

describe('Componente de transação do extrato', () => {
    it('O snapshot do componente deve permanecer sempre o mesmo', () => {
        const {container} = render(<Transaction date={"08/09/2020"} type={"withdrawn"} value={"20.00"}/>);
        expect(container.firstChild).toMatchSnapshot();
    });
}); 