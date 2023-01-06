import { AuthService } from './../auth/auth.service';
import { StateService } from '../state.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public mode: string;
  private postSub: Subscription;
  public userIsAuthenticated = false;
  public userIsAdmin = false;
  private authListenerSub: Subscription;
  private adminListenerSub: Subscription;


  constructor(
    private stateService: StateService,
    private authService: AuthService
    ) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.postSub = this.stateService.myMode.subscribe((mode: string) => {
    this.mode = mode;
    console.log(this.mode);
    });
    this.authListenerSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.adminListenerSub = this.authService
      .getAdminStatusListener()
      .subscribe(isAdmin => {
        this.userIsAdmin = isAdmin;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
    this.authListenerSub.unsubscribe();
    this.adminListenerSub.unsubscribe();
  }
}


