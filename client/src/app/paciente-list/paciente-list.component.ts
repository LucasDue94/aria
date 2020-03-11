import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.scss']
})
export class PacienteListComponent implements OnInit {

  tabs = [{name: 'APACHE II', actived: false}, {name: 'NAS', actived: false}, {name: 'FUGULIN', actived: false},
    {name: 'ECG', actived: false}, {name: 'PORTA BALÃO', actived: false}, {name: 'INCIDENTES', actived: true}, {name: 'ESTRATIFICAÇÃO DE RISCO', actived: false}];

  constructor() {
  }

  ngOnInit() {
  }

  findTab = (tabName) => this.tabs.find(element => element.name == tabName);

  select(currentTab) {
    this.tabs.forEach(tab => tab.actived = false);
    if(!currentTab.actived) currentTab.actived = true
  }
}
