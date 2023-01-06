import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { TaskEp, AxeAnalyse } from '../task-ep.model';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-tasks-ep',
  templateUrl: './tasks-ep.component.html',
  styleUrls: ['./tasks-ep.component.css']
})

export class TasksEpComponent implements OnInit {
  public isLoading = false;
  public tasksEp: any;
  public filteredTasksEp: TaskEp[];
  public role: string;
  private jiraName: string;
  public dateFrom: Date = new Date(new Date().getFullYear(), 0, 1);
  public dateTo: Date = new Date(Date.now());
  private chartHeight: number;
  events: string[] = [];

  axesAnalyse: AxeAnalyse[] = [
    {value: 'employe-0', viewValue: 'Total par employé'},
    {value: 'employelangue-1', viewValue: 'Total par employé selon langue'},
    {value: 'operation-2', viewValue: 'Total par opération'},
    {value: 'tempsoperation-3', viewValue: 'Temps par opération'},
    {value: 'parmois-4', viewValue: 'Total par mois'},
  ];

  axeAnalyseSelected = 'employe-0';

  view: any[] = [700, 400];

  colorScheme = {
    // domain: ['#7030A0', '#A10A28', '#C7B42C', '#AAAAAA']
    // domain: ['#30A4A8', '#EB6C0A', '#85B9E0', '#FFAF00', '#B8D200', '#FFD200', '#FF87A3', '#7E649B', '#B77D0D', '#87911A']
    domain: ['#4B009B', '#FBCF65', '#88BAE5', '#F55A47', '#AADC9A', '#FFD200', '#FF87A3', '#7E649B', '#B77D0D', '#87911A']
  };

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.jiraName = localStorage.getItem('jiraName');
    this.role = localStorage.getItem('role');
    this.tasksService.getTasksEp(this.dateFrom, this.dateTo, this.axeAnalyseSelected).subscribe((resultat: any) => {
      this.isLoading = false;
      const dataEp = [];
      resultat.tasksEp.forEach((task) => {
      dataEp.push({'name': task._id.employe, 'series': [{'name': "cumulatif", 'value': task.nombre}]});
      });
      function compare( a, b ) {
        if ( a.series[0].value < b.series[0].value ){
          return 1;
        }
        if ( a.series[0].value > b.series[0].value ){
          return -1;
        }
        return 0;
      }
      dataEp.sort(compare);
      this.tasksEp = dataEp;
      this.chartHeight = this.tasksEp.length * 30;
      document.documentElement.style.setProperty('--chart-height', `${this.chartHeight}px`);
      console.log(this.tasksEp);
    }, error => {
      console.log(error);
    });
  }

  changeDateFrom(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.dateFrom = new Date(event.value);
  }

  changeDateTo(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.dateTo = new Date(event.value);
  }

  update() {
    console.log(this.dateFrom);
    console.log(this.dateTo);
    console.log(this.axeAnalyseSelected);
    this.isLoading = true;
    // TEST HASH TABLE
    // const map = new Map<string, Array<any>>();
    // const key = new Object();
    // map.set('Vicky Dubois', [{'name':'Vicky Dubois', 'series': [{'name': 'Français', 'value': 425}]}]);
    // const test = map.get('Vicky Dubois');
    // test.push({'name':'Vicky Dubois', 'series': [{'name': 'Espagnol', 'value': 425}]});
    // console.log(test);
    // console.log(map);
    // END TEST HASH TABLE
    this.tasksService.getTasksEp(this.dateFrom, this.dateTo, this.axeAnalyseSelected).subscribe((resultat: any) => {
      this.isLoading = false;
      const tasks = resultat.tasksEp;
      console.log(resultat.tasksEp);
      const dataEp = [];
      let series = [];
      if (this.axeAnalyseSelected === 'employe-0') {
        for (let task of tasks) {
          // dataEp.push({'name': task._id.employe, 'series': [{'name': task._id.année + "-" + task._id.mois,'value': task.nombre}]});
          // dataEp.push({'name': task._id.employe, 'series': [{'name': task._id.operation, 'value': task.nombre}]});
          dataEp.push({'name': task._id.employe, 'series': [{'name': "cumulatif", 'value': task.nombre}]});
          };
      }
      if (this.axeAnalyseSelected === 'employelangue-1') {
        const map = new Map();
        const taskArray = tasks;
        for (let task of tasks) {
          if (map.has(task._id.employe) === false) {
            let nom = task._id.employe;
            for (let t of taskArray) {
              if (t._id.employe === nom) {
                series.push({'name': t._id.langue, 'value': t.nombre});
              }
            }
            map.set(task._id.employe, {'name': task._id.employe, 'series': series});
            dataEp.push(map.get(task._id.employe));
            series = [];
          }
        }
        const mapValuesArray = [...map.values()];
        console.log(mapValuesArray);
      }
      if (this.axeAnalyseSelected === 'operation-2') {
        resultat.tasksEp.forEach((task) => {
          dataEp.push({'name': task._id.operation, 'series': [{'name': "cumulatif", 'value': task.nombre}]});
          });
      }
      if (this.axeAnalyseSelected === 'tempsoperation-3') {
        resultat.tasksEp.forEach((task) => {
          dataEp.push({'name': task._id.operation, 'series': [
            { 'name': 'Nombre de tâches (en centaines)', 'value': task.nombre },
            {'name': "Temps moy traitement (mins)", 'value': task.moyTempsTraitement / 60000},
          ]});
          });
      }
      if (this.axeAnalyseSelected === 'parmois-4') {
        resultat.tasksEp.forEach((task) => {
          dataEp.push({
            'name': task._id.annee + '-' + ('0' + task._id.mois).slice(-2),
            'sorter': task._id.annee * 100 + task._id.mois,
            'series': [{'name': "cumulatif", 'value': task.nombre}]});
          });
      }
      function compareNombre( a, b ) {
        if ( a.series[0].value < b.series[0].value ){
          return 1;
        }
        if ( a.series[0].value > b.series[0].value ){
          return -1;
        }
        return 0;
      }
      function compareNombreMulti( a, b ) {
        let aItem = 0;
        let bItem = 0;
        if (typeof a.series[1] === 'undefined') {} else {aItem = a.series[1].value};
        if (typeof b.series[1] === 'undefined') {} else {bItem = b.series[1].value};
        if ( a.series[0].value + aItem < b.series[0].value + bItem ){
          return 1;
        }
        if ( a.series[0].value + aItem > b.series[0].value + bItem ){
          return -1;
        }
        return 0;
      }
      function compareMois( a, b ) {
        if ( a.sorter < b.sorter ){
          return 1;
        }
        if ( a.sorter > b.sorter ){
          return -1;
        }
        return 0;
      }
      if (this.axeAnalyseSelected === 'parmois-4') {
        dataEp.sort(compareMois);
      } else if (this.axeAnalyseSelected === 'employelangue-1') {
        dataEp.sort(compareNombreMulti);
      } else { dataEp.sort(compareNombre); }
      const dataOperationEp = [];
      if (this.axeAnalyseSelected === 'operation-2') {
        for (let i = 0; i < 17; i++) {
          dataOperationEp.push({'name': dataEp[i].name, 'series': [{'name': "cumulatif", 'value': dataEp[i].series[0].value}]});
        }
        let nbAutres = 0;
        for (let i = 18; i < dataEp.length; i++) {
          nbAutres = nbAutres + dataEp[i].series[0].value;
        }
        dataOperationEp.push({'name': 'Autres', 'series': [{'name': "cumulatif", 'value': nbAutres}]});
      }
      if (this.axeAnalyseSelected === 'tempsoperation-3') {
        for (let i = 0; i < 17; i++) {
          dataOperationEp.push({'name': dataEp[i].name, 'series': [
            // {'name': "Nombre de tâches", 'value': dataEp[i].series[0].value},
            {'name': "Temps moy traitement (mins)", 'value': dataEp[i].series[1].value.toFixed(2)},
          ]});
        }
        let nbAutres = 0;
        let moyAcc = 0;
        let moyAutres = 0;
        for (let i = 18; i < dataEp.length; i++) {
          moyAcc = moyAcc + (dataEp[i].series[0].value * dataEp[i].series[1].value.toFixed(2));
          nbAutres = nbAutres + dataEp[i].series[0].value;
          moyAutres = moyAcc / nbAutres;
        }
        dataOperationEp.push({'name': 'Autres', 'series': [
          // {'name': "Nombre de tâches", 'value': nbAutres},
          {'name': "Temps moy traitement (mins)", 'value': moyAutres},
        ]});
      }
      if (this.axeAnalyseSelected === 'operation-2' || this.axeAnalyseSelected === 'tempsoperation-3') {
        this.tasksEp = dataOperationEp;
      } else { this.tasksEp = dataEp; }
      const distinctNames = [...new Set(this.tasksEp.map(x => x.name))];
      // this.chartHeight = this.tasksEp.length * 30;
      if (this.axeAnalyseSelected === 'employelangue-1') {
        this.chartHeight = distinctNames.length * 40;
      } else { this.chartHeight = distinctNames.length * 30; }
      document.documentElement.style.setProperty('--chart-height', `${this.chartHeight}px`);
      console.log(this.tasksEp);
    }, error => {
      console.log(error);
    });
  }
}
