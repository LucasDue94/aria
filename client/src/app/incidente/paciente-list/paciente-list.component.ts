import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {faFrown, faSearch} from '@fortawesome/free-solid-svg-icons';
import {TitleService} from "../../core/title/title.service";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {ErrorService} from "../../core/error/error.service";
import {debounceTime, switchMap} from "rxjs/operators";
import {Paciente} from "../../core/paciente/paciente";
import {PacienteService} from "../../core/paciente/paciente.service";
import {SetorService} from "../../core/setor/setor.service";

@Component({
  selector: 'incidente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.scss']
})
export class PacienteListComponent implements OnInit {

  @ViewChild('dataList', {static: false}) dataList;

  searchForm = this.fb.group({
    searchControl: ['']
  });
  faSearch = faSearch;
  faFrown = faFrown;

  pacientes: Paciente[];
  offset = 0;
  max = 30;
  showListScrollSpinner = false;
  termo = '';
  setorId = '';
  setores = [];

  constructor(private pacienteService: PacienteService, private titleService: TitleService,
              private spinner: SpinnerService, private errorService: ErrorService,
              private fb: FormBuilder, private renderer: Renderer2,
              private setorService: SetorService) {
  }

  ngOnInit() {
    this.titleService.send('Lista de Pacientes');
    this.setorService.list().subscribe((setores)=> {
      this.setores = setores;
      this.list();
    });
  }

  scrollDown() {
    this.showListScrollSpinner = true;
    this.offset += 10;
    this.pacienteService.list(this.max, this.offset, this.termo).subscribe(incidentes => {
      this.pacientes = this.pacientes.concat(incidentes);
      this.showListScrollSpinner = false;
    });
  }

  list() {
    this.spinner.show();
    this.pacienteService.list(this.max, '', this.termo, this.setorId).subscribe(pacientes => {
      if (this.errorService.hasError(pacientes)) {
        this.errorService.sendError(pacientes);
      } else {
        this.pacientes = pacientes;
      }
      this.spinner.hide();
    });
  }

  search() {
    this.searchForm.get('searchControl').valueChanges.pipe(
      debounceTime(1000),
      switchMap(changes => {
        this.spinner.show();
        this.termo = changes;
        this.offset = 0;
        this.renderer.setProperty(this.dataList.nativeElement, 'scrollTop', 0);
        return this.pacienteService.list(this.max, this.offset, this.termo, this.setorId)
      })
    ).subscribe(res => {
      if (this.errorService.hasError(res)) this.errorService.sendError(res);
      this.pacientes = res;
      this.spinner.hide();
    });
  }
}
