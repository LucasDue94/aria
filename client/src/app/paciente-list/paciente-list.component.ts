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
  currentTab;

  constructor(private setorService: SetorService) {
  }

  ngOnInit(): void {
    this.currentTab = localStorage.getItem('pacienteTab') != undefined ? localStorage.getItem('pacienteTab') : 'APACHE II';
    localStorage.setItem('pacienteTab', this.currentTab);
    this.select(this.findTab(this.currentTab));
    this.setorService.list().subscribe(setores => {
      this.setores = setores
    });
    this.orderByName();
  }

  findTab = (tabName) => this.tabs.find(element => element.name == tabName);

  select(currentTab) {
    this.currentTab = currentTab;
    localStorage.setItem('pacienteTab', this.currentTab.name);
    this.tabs.forEach(tab => tab.actived = false);
    if (!currentTab.actived) currentTab.actived = true;
    history.pushState({tab: this.currentTab.name}, '', '');
  }

  orderByName() {
    this.tabs.sort(function (a, b) {
      return a.name > b.name ? 1 : -1
    })
  }
}
