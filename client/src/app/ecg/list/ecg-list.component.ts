import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../core/title/title.service";
import {EcgService} from "../../core/ecg/ecg.service";
import {FormBuilder} from "@angular/forms";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {debounceTime, switchMap} from "rxjs/operators";
import {faFrown, faSearch} from '@fortawesome/free-solid-svg-icons';
import {Ecg} from "../../core/ecg/ecg";
import {RegistroAtendimento} from "../../core/registroAtendimento/registroAtendimento";
import {RegistroAtendimentoService} from "../../core/registroAtendimento/registroAtendimento.service";
import {ErrorService} from "../../core/error/error.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ecg-list',
  templateUrl: './ecg-list.component.html',
  styleUrls: ['./ecg-list-component.scss']
})
export class EcgListComponent implements OnInit {

  urgencias: any[] = [];
  registros: Ecg[];
  atendimentos: RegistroAtendimento[];
  showListScrollSpinner = false;
  offset = 0;
  max = 30;
  termo = '';
  faFrown = faFrown;
  listLoading: boolean = false;
  searchForm = this.fb.group({
    searchControl: ['']
  });
  faSearch = faSearch;

  constructor(private ecgService: EcgService, private titleService: TitleService,
              private fb: FormBuilder, private spinner: SpinnerService,
              private errorService: ErrorService, private router: Router,
              private registroAtendimentoService: RegistroAtendimentoService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.titleService.send('ECG - Lista de Pacientes');
    this.registroAtendimentoService.listUrgencias('', '').subscribe(res => {
      this.atendimentos = res;
      this.spinner.hide();
    });
  }

  edit(registro: RegistroAtendimento) {
    if (registro.ecg) {
      this.router.navigate(['/ecg', 'edit', registro.id]);
    } else {
      this.router.navigate(['/ecg', 'create', registro.id])
    }
  }

  scrollDown() {
    this.showListScrollSpinner = true;
    this.offset += 10;
    this.registroAtendimentoService.listUrgencias(this.offset, this.max).subscribe(registros => {
      registros.forEach(atendimento => {
        this.atendimentos.push(atendimento);
        this.showListScrollSpinner = false;
      });
    });
  }

  search() {
    this.searchForm.get('searchControl').valueChanges.pipe(
      debounceTime(1000),
      switchMap(changes => {
        this.listLoading = true;
        this.atendimentos = [];
        this.termo = changes;
        this.offset = 0;
        if (this.urgencias != undefined) this.urgencias.length = 0;
        return this.registroAtendimentoService.searchUrgencias(changes, this.offset, this.max);
      })
    ).subscribe(res => {
      this.atendimentos = res;
      this.listLoading = false;
    });
  }
}
