import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {faFrown, faSearch} from "@fortawesome/free-solid-svg-icons";
import {Setor} from "../../../core/setor/setor";
import {ApacheService} from "../../../core/apache/apache.service";
import {SetorService} from "../../../core/setor/setor.service";
import {FormBuilder} from "@angular/forms";
import {TitleService} from "../../../core/title/title.service";
import {SpinnerService} from "../../../core/spinner/spinner.service";
import {debounceTime, switchMap} from 'rxjs/operators';
import {ErrorService} from "../../../core/error/error.service";
import * as moment from 'moment';

@Component({
  selector: 'app-apache-paciente-list',
  templateUrl: './apache-paciente-list.component.html',
  styleUrls: ['./apache-paciente-list.component.scss']
})

export class ApachePacienteListComponent implements OnInit {

  @ViewChild('dataList', {static: false}) dataList;
  faFrown = faFrown;
  faSearch = faSearch;
  showListScrollSpinner = false;
  listLoading = false;
  admissoesPacSetor: any = [];
  arrayListSetor: Setor[] = [];
  searchForm = this.fb.group({
    searchControl: ['']
  });
  setorId;
  offset = 0;
  max = 30;
  termo = '';

  constructor(private apacheService: ApacheService, private setorService: SetorService, private errorService: ErrorService,
              private titleService: TitleService, private fb: FormBuilder, private spinner: SpinnerService, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.spinner.show();
    this.titleService.send('Apache II - Lista de Pacientes');
    this.setorService.list('U', '', '').subscribe(setores => {
      if(this.errorService.hasError(setores)) {
        this.spinner.hide();
        this.errorService.hasError(setores);
      } else {
        setores.forEach(setor => {
          this.arrayListSetor.push(setor);
          this.setorId = setor.id;
        });
        this.apacheService.list(this.setorId, this.termo, '', 30).subscribe(registros => {
          if (this.errorService.hasError(registros)) {
            this.spinner.hide();
            this.errorService.sendError(registros);
          } else {
            this.admissoesPacSetor = registros;
            this.spinner.hide();
          }
        });
      }
    });
  }

  listAdmissoesSetor() {
    this.listLoading = true;
    this.admissoesPacSetor = [];
    this.offset = 0;
    this.renderer.setProperty(this.dataList.nativeElement, 'scrollTop', 0)
    this.apacheService.list(+this.setorId, this.termo, this.offset, this.max).subscribe(registros => {
      this.admissoesPacSetor = registros;
      this.listLoading = false;
    });
  }

  search() {
    this.searchForm.get('searchControl').valueChanges.pipe(
      debounceTime(1000),
      switchMap(changes => {
        this.listLoading = true;
        this.admissoesPacSetor = [];
        this.termo = changes;
        this.offset = 0;
        if (this.admissoesPacSetor != undefined) this.admissoesPacSetor.length = 0;
        return this.apacheService.search(this.setorId, changes, this.offset, this.max)
      })
    ).subscribe(res => {
      this.admissoesPacSetor = res;
      this.listLoading = false;
    });
  }

  scrollDown() {
    this.showListScrollSpinner = true;
    this.offset += 10;
    this.apacheService.list(+this.setorId, this.termo, this.offset, this.max).subscribe(registros => {
      registros.forEach(registro => {
        this.admissoesPacSetor.push(registro);
        this.showListScrollSpinner = false;
      });
    });
  }

  getRowClass(registro: any) {
    let rowClass = 'hiden';
    if(registro.apache) {
      rowClass = 'row-success';
    } else if(moment() > moment(registro.dataEntrada).add(24, 'hours')) { // Testa se passaram 24 horas da entrada
      rowClass = 'row-available';
      const setor = this.arrayListSetor.find( s => s.id == this.setorId)
      if(moment() > moment(registro.dataEntrada).add(24 + setor.prazoApache, 'hours')) { // Testa se alem das 24 horas, estourou o prazo do setor
        rowClass = 'row-alert';
      }
    }
    return rowClass;
  }
}
