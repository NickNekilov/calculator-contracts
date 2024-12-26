import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type CalculatorConfig = {};

export function calculatorConfigToCell(config: CalculatorConfig): Cell {
    return beginCell().endCell();
}

export class Calculator implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Calculator(address);
    }

    static createFromConfig(config: CalculatorConfig, code: Cell, workchain = 0) {
        const data = calculatorConfigToCell(config);
        const init = { code, data };
        return new Calculator(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
