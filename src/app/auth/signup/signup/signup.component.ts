import { Subscription } from 'rxjs';
import { AuthService } from './../../auth.service';
import { StateService } from 'src/app/state.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  role: string;
  private authStatusSub: Subscription;

  constructor(
    private stateService: StateService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.stateService.myMode.next('notCreate');
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false;
    });
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, this.role, form.value.jiraName, form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
