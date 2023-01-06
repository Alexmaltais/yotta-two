import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public myMode = new Subject<string>();
  // public myMode = this.modeSource.asObservable();

  constructor() { }

  // public modeListener(): Observable<string> {
  //   // this.myMode.next(mode);
  // return this.myMode.asObservable();
  // }
}
