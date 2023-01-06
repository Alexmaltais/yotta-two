import { TaskEp } from './task-ep.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class TasksService {

  constructor(private http: HttpClient) {}

  public getTasksEp(dateFrom: Date, dateTo: Date, axeAnalyse: string): Observable<any> {
    const params = new HttpParams()
      .set('dateFrom', dateFrom.toDateString())
      .set('dateTo', dateTo.toDateString())
      .set('axeAnalyse', axeAnalyse);
    console.log(params);
    return this.http.get<{tasksEp: any}>('http://localhost:3000/api/jiraEpargne', {params} );
      // .pipe(map((taskData) => {
      //   return taskData.tasksEp.map(task => {
      //     return {
      //       attribution: task.attribution,
      //       lastUser: task.lastUser,
      //       assqua: task.assqua,
      //       operation: task.operation,
      //       taskType: task.taskType,
      //       regime: task.regime,
      //       dateResolue: task.dateResolue,
      //       dateCreation: task.dateCreation,
      //     };
      //   });
      // }));
  }

}
