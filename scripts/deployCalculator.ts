import { toNano } from '@ton/core';
import { Calculator } from '../wrappers/Calculator';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const calculator = provider.open(Calculator.createFromConfig({}, await compile('Calculator')));

    await calculator.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(calculator.address);

    // run methods on `calculator`
}
