import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-task-ind',
  templateUrl: './task-ind.component.html',
  styleUrls: ['./task-ind.component.scss']
})
export class TaskIndComponent implements OnInit {

  // This is the option that uses the package's AnimationOption interface 
  options: AnimationOptions = {    
    path: '../../../assets/lottie/87956-christmas-snowball.json'  
  }; 

  constructor() { }

  // This is the component function that binds to the animationCreated event from the package  
  onAnimate(animationItem: AnimationItem): void {    
  console.log(animationItem);  
  }

  ngOnInit() {
  }

}
