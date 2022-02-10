import { Platform } from '@angular/cdk/platform';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ContractService } from '../service/contract.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class NavBarComponent implements OnInit {
  // @ViewChild('drawer', {static: false}) drawer: any;
  menuIcon = 'menu';
  toggleScroll = new Subject<any>();
  opened = false;
  // showDrawer = false;

  address: string;
  ETHbalance: string;

  constructor(
    public platform: Platform,
    private contractService: ContractService
  ) {}

  ngOnInit(): void {
    console.log('ANDROID ' + this.platform.ANDROID);
    console.log('IOS: ' + this.platform.IOS);

    this.contractService.addressChanged.subscribe((address) => {
      this.address = address;
    });
  }

  toggleMenu() {
    this.opened = !this.opened;
    if (this.menuIcon == 'menu') {
      this.menuIcon = 'close';
      // document.body.className = "set-hidden";
    } else {
      this.menuIcon = 'menu';
      // document.body.className = "set-free";
    }
  }

  //Web 3

  onConnect() {
    this.contractService.onConnectWallet();
  }
}
