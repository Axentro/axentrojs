import axios, { AxiosInstance } from 'axios';
import { Transaction } from './Transaction';

export class AxentroNode {
  private axios: AxiosInstance;

  constructor(nodeUrl : string) {
    this.axios = axios.create({baseURL : nodeUrl});
  }

  public async broadcastTransaction(transaction : Transaction) {
    const response = await this.axios.post('/transaction', { transaction });
    return response.data;
  }
}
