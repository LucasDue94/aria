import {Component, OnInit} from '@angular/core';
import {PacienteService} from "../../../core/paciente/paciente.service";
import {Paciente} from "../../../core/paciente/paciente";
import {faSearch, faFrown} from "@fortawesome/free-solid-svg-icons";
import {ErrorService} from "../../../core/error/error.service";

@Component({
  selector: 'estratificacao-list',
  templateUrl: './estratificacao-list.component.html',
  styleUrls: ['./estratificacao-list.component.scss']
})
export class EstratificacaoListComponent implements OnInit {

  offset = 0;
  max = 30;
  termo = '';
  pacientes: Paciente[];
  faSearch = faSearch;
  faFrown = faFrown;
  showListScrollSpinner = false;
  listLoading: boolean = false;

  constructor(private pacienteService: PacienteService, private errorService: ErrorService) {
  }

  ngOnInit() {
    this.listLoading = true;
    this.pacienteService.list().subscribe(pacientes => {
      this.pacientes = pacientes;
      this.listLoading = false;
    });
  }

  scrollDown() {
    this.showListScrollSpinner = true;
    this.offset += 10;
    this.pacienteService.list(this.max, this.offset, this.termo).subscribe(pacientes => {
      if (!this.errorService.hasError(pacientes)) {
        this.pacientes = this.pacientes.concat(pacientes);
      }
      this.showListScrollSpinner = false;
    });
  }

}
