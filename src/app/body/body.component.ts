import { Platform } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContractService } from '../service/contract.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  address: string;
  ETHbalance;
  constructor(
    public platform: Platform,
    private snackBar: MatSnackBar,
    private contractService: ContractService
  ) {}
  quantity = 1;
  cost;
  maxSupply;
  totalSupply;

  ngOnInit(): void {
    console.log('ANDROID ' + this.platform.ANDROID);
    console.log('IOS: ' + this.platform.IOS);

    this.contractService.getCost().then(cost => {
      this.cost = (+cost / 1000000000000000000).toString();
    });

    this.contractService.getTotalSupply().then(totalSupply => {
      this.totalSupply = totalSupply;
    })

    this.contractService.getMaxSupply().then(maxSupply => {
      this.maxSupply = maxSupply;
    })

    this.contractService.addressChanged.subscribe((address) => {
      this.address = address;
      this.contractService.getEthBalance(this.address).then((balance) => {
        this.ETHbalance = (+balance / 1000000000000000000).toString();
        console.log(this.ETHbalance)
      });
    });
  }

  minus() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    } else {
      this.openSnackBar('Quantity cannot be less than 1');
    }
  }
  add() {
    if (this.quantity < 2) {
      this.quantity += 1;
    } else {
      this.openSnackBar('Quantity cannot be greater than 2');
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['snack-bar', 'login-snackbar'],
    });
  }

  // Web3

  onConnect() {
    this.contractService.onConnectWallet();
  }
}
