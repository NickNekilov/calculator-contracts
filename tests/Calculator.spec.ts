import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Calculator } from '../wrappers/Calculator';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Calculator', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Calculator');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let calculator: SandboxContract<Calculator>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        calculator = blockchain.openContract(Calculator.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await calculator.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: calculator.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and calculator are ready to use
    });
});
