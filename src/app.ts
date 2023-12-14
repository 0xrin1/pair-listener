import routerABI from './abis/router.json' assert { type: 'json' };
import factoryABI from './abis/factory.json' assert { type: 'json' };
import { createPublicClient, http } from 'viem';
import { avalanche } from 'viem/chains';

const JOE_ADDRESS = '0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10';

const initMessage: string = 'Joe Pair Listener started';

const client = createPublicClient({
    chain: avalanche,
    transport: http('https://avalanche.drpc.org'),
})

async function getBlockNumber() {
    return client.getBlockNumber();
}

(async () => {
    console.log('blockNumber', await getBlockNumber());

    client.watchContractEvent({
        abi: factoryABI,
        address: JOE_ADDRESS,
        eventName: 'PairCreated',
        onLogs: (event) => {
            console.log('PairCreated', event);
        },
    })
})();

console.log(initMessage);