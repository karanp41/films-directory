/**
 * Created by Krishan Pal on 01-02-2020.
 */

import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { UserService } from './services/user.service';

@Component({
  selector: 'my-app',
  templateUrl: './app/base.html'
})

export class BaseComponent implements OnInit {
  title = 'Flims Directory';
  userdata: any;
  
  constructor(private userService: UserService, private router: Router) {
  }
  
  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
          this.userService.getProfile().subscribe(data => {
            if (data) {
              this.userdata = this.userService.getUserData();
            } else {
              this.userService.flush();
              this.userdata = null;
            }
          });
        }
      );
  }
}
