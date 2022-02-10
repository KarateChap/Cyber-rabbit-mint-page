import { Platform } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import { ContractService } from './service/contract.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(public platform: Platform, private contractService: ContractService){

  }

  ngOnInit(): void {
    console.log('ANDROID ' + this.platform.ANDROID);
    console.log('IOS: ' + this.platform.IOS);

    this.contractService.onConnectWallet();


  }
}
