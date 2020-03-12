import {Component, OnInit} from '@angular/core';
import {SetorService} from "../core/setor/setor.service";

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.scss']
})

export class PacienteListComponent implements OnInit {

  tabs = [{name: 'APACHE II', actived: true}, {name: 'NAS', actived: false}, {name: 'FUGULIN', actived: false},
    {name: 'ECG', actived: false}, {name: 'PORTA BALÃO', actived: false}, {name: 'INCIDENTES', actived: false},
    {name: 'ESTRAT. RISCO', actived: false}];

  setores = [];

  constructor(private setorService: SetorService) {
  }

  ngOnInit(): void {
    this.setorService.list().subscribe(setores => {
      this.setores = setores
    });
    this.orderByName();
  }

  findTab = (tabName) => this.tabs.find(element => element.name == tabName);

  select(currentTab) {
    this.tabs.forEach(tab => tab.actived = false);
    if (!currentTab.actived) currentTab.actived = true
  }

  orderByName() {
    this.tabs.sort(function (a, b) {
      return a.name > b.name ? 1 : -1
    })
  }
}
