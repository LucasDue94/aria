import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../core/title/title.service";
import {EcgService} from "../../core/ecg/ecg.service";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {faFrown, faSearch} from '@fortawesome/free-solid-svg-icons';
import {RegistroAtendimento} from "../../core/registroAtendimento/registroAtendimento";
import {RegistroAtendimentoService} from "../../core/registroAtendimento/registroAtendimento.service";
import {Router} from "@angular/router";
import {FilterService} from "../../core/filter/filter.service";

@Component({
  selector: 'ecg-list',
  templateUrl: './ecg-list.component.html',
  styleUrls: ['./ecg-list-component.scss']
})
export class EcgListComponent implements OnInit {

  atendimentos: RegistroAtendimento[];
  showListScrollSpinner = false;
  offset = 0;
  max = 30;
  faFrown = faFrown;
  faSearch = faSearch;
  listLoading: boolean = false;

  constructor(private ecgService: EcgService, private titleService: TitleService,
              private spinner: SpinnerService, private router: Router,
              private registroAtendimentoService: RegistroAtendimentoService,
              private filterService: FilterService) {
    this.search = this.search.bind(this);
  }

  ngOnInit() {
    this.filterService.receive().subscribe(this.search)
    this.listLoading = true;
    this.titleService.send('ECG - Lista de Pacientes');
    this.registroAtendimentoService.listUrgencias('', '').subscribe(res => {
      this.atendimentos = res;
      this.listLoading = false;
    });
  }

  edit(registro: RegistroAtendimento) {
    this.router.navigate(['/ecg', registro.ecg ? 'edit' : 'create', registro.id]);
  }
//TODO scroll não está buscando pelo termo
  scrollDown() {
    this.showListScrollSpinner = true;
    this.offset += 10;
    this.registroAtendimentoService.listUrgencias(this.offset, this.max).subscribe(registros => {
      this.findAndPushAtendimentos(registros)
    });
  }

  search(params) {
    this.offset = 0;
    this.listLoading = true;
    this.atendimentos = [];
    if (params) {
      this.registroAtendimentoService.searchUrgencias(params.busca, this.offset, this.max).subscribe(registros => {
        this.findAndPushAtendimentos(registros);
        this.listLoading = false;
      })
    }
  }

  findAndPushAtendimentos(registros) {
    registros.forEach(atendimento => {
      this.atendimentos.push(atendimento);
      this.showListScrollSpinner = false;
    });
  }
}
