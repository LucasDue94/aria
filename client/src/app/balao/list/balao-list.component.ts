import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../core/title/title.service";
import {EcgService} from "../../core/ecg/ecg.service";
import {FormBuilder} from "@angular/forms";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {ErrorService} from "../../core/error/error.service";
import {debounceTime, switchMap} from "rxjs/operators";
import {faFrown, faSearch} from '@fortawesome/free-solid-svg-icons';
import {RegistroAtendimento} from "../../core/registroAtendimento/registroAtendimento";
import {RegistroAtendimentoService} from "../../core/registroAtendimento/registroAtendimento.service";
import {Router} from "@angular/router";
import {FilterService} from "../../core/filter/filter.service";

@Component({
  selector: 'balao-list',
  templateUrl: './balao-list.component.html',
  styleUrls: ['./balao-list.component.scss']
})
export class BalaoListComponent implements OnInit {

  internamentos: any = [];
  atendimentos: RegistroAtendimento[];
  showListScrollSpinner = false;
  offset = 0;
  max = 30;
  termo = '';
  setorId;
  listLoading: boolean = false;
  faFrown = faFrown;
  searchForm = this.fb.group({
    searchControl: ['']
  });
  faSearch = faSearch;

  constructor(private ecgService: EcgService, private titleService: TitleService,
              private fb: FormBuilder, private spinner: SpinnerService, private router: Router,
              private errorService: ErrorService, private registroAtendimentoService: RegistroAtendimentoService,
              private filterService: FilterService) {
    this.search = this.search.bind(this);
  }

  ngOnInit() {
    this.listLoading = true;
    this.titleService.send('Balão - Lista de Pacientes');
    this.registroAtendimentoService.listInternamentos('', '').subscribe(registros => {
      this.atendimentos = registros;
      this.listLoading = false;
    });
    this.filterService.receive().subscribe(this.search)
  }

  edit(registro: RegistroAtendimento) {
    this.router.navigate(['/balao', registro.balao ? 'edit' : 'create', registro.id]);
  }
//TODO scroll não está buscando pelo termo
  scrollDown() {
    this.showListScrollSpinner = true;
    this.offset += 10;
    this.registroAtendimentoService.listInternamentos(this.offset, this.max).subscribe(registros => {
      registros.forEach(atendimento => {
        this.atendimentos.push(atendimento)
      });
      this.showListScrollSpinner = false;
    });
  }

  search(params) {
    this.offset = 0;
    this.listLoading = true;
    this.internamentos = [];
    this.termo = params.busca;
    this.setorId = params.setor;
    if (params) {
      this.registroAtendimentoService.list(+this.setorId, this.offset, this.max).subscribe(internamentos => {
        this.internamentos = internamentos;
        this.listLoading = false;
      })
    }
  }
}
