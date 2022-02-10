import { Injectable } from '@angular/core';
import Web3 from 'web3';
import abi from '../abi/contract.json';
import { AbiItem } from 'web3-utils';
import { Subject } from 'rxjs';

declare const window: any;

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  window: any;
  web3 = new Web3(window.ethereum);
  public address: string;
  addressChanged = new Subject<string>();

  tempToken: any;

  maxSupply: number;

  constructor() {}

  public onConnectWallet = async () => {
    this.tempToken = new this.web3.eth.Contract(
      abi as AbiItem[],
      '0x79c817bE39666FC5C0A851C81A082115f04f431E'
    );
    if (this.getAccounts) {
      this.getAccounts().then((address) => {
        this.address = address[0];
        this.addressChanged.next(this.address);
      });
    }
  };

  private getAccounts = async () => {
    try {
      return await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (e) {
      return [];
    }
  };

  async getMaxSupply() {
    return await this.tempToken.methods.maxSupply().call();
  }

  async getName() {
    return await this.tempToken.methods.name().call();
  }

  async getSymbol() {
    return await this.tempToken.methods.symbol().call();
  }

  async checkWeb3() {
    const ethereum = window.ethereum;
    if (!ethereum || !ethereum.on) {
      console.log('This App Requires Metamask, Please Install Metamask');
    } else {
      console.log('Metamask is installed');
      this.setWeb3Environment();
    }
  }

  setWeb3Environment() {
    this.web3 = new Web3(window.ethereum);
    this.getNetwork();
  }

  async getNetwork() {
    let chainId = await this.web3.eth.net.getId();
    console.log(chainId);
    console.log('Active Network is ' + this.getNetworkName(chainId));
  }

  getNetworkName(chainId) {
    let networks = {
      1: 'Ethereum Mainnet',
      4: 'Ethereum Rinkeby',
      97: 'Binance Smart Chain Testnet',
      80001: 'Polygon Mumbai Testnet',
    };
    return networks[chainId];
  }

  async getEthBalance(address: string) {

    return this.web3.eth.getBalance(address);
  }

  async getCost(){
    return await this.tempToken.methods.cost().call();
  }

  async getTotalSupply(){
    return await this.tempToken.methods.totalSupply().call();
  }
}
