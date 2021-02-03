import { Transaction } from './Transaction';
export declare class AxentroNode {
    private axios;
    constructor(nodeUrl: string);
    broadCastTransaction(transaction: Transaction): Promise<any>;
}
