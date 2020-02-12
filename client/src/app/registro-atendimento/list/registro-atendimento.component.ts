import {Component, OnInit, ViewChild} from '@angular/core';
import {RegistroAtendimentoService} from "../../core/registroAtendimento/registroAtendimento.service";
import {RegistroAtendimento} from "../../core/registroAtendimento/registroAtendimento";
import {ErrorService} from "../../core/error/error.service";
import {faFrown, faSearch} from "@fortawesome/free-solid-svg-icons";
import {EcgService} from "../../core/ecg/ecg.service";
import {TitleService} from "../../core/title/title.service";
import {FormBuilder} from "@angular/forms";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-registro-atendimento',
  templateUrl: './registro-atendimento.component.html',
  styleUrls: ['./registro-atendimento.component.scss']
})
export class RegistroAtendimentoComponent implements OnInit {

  @ViewChild('routerCard', {static: false}) routerCard;
  registros: RegistroAtendimento[];
  showListScrollSpinner = false;
  offset = 0;
  max = 30;
  termo = '';
  faFrown = faFrown;
  searchForm = this.fb.group({
    searchControl: ['']
  });
  faSearch = faSearch;

  constructor(private ecgService: EcgService, private titleService: TitleService,
              private fb: FormBuilder, private spinner: SpinnerService,
              private errorService: ErrorService,
              private registroAtendimentoService: RegistroAtendimentoService) {
  }

  ngOnInit() {
    this.registroAtendimentoService.list(null, '', '').subscribe(registros => {
      this.registros = registros;
    });
  }

  scrollDown() {
    this.showListScrollSpinner = true;
    this.offset += 10;
    this.registroAtendimentoService.list(null, this.max, this.offset).subscribe(registros => {
      if (!this.errorService.hasError(registros)) {
        this.registros = this.registros.concat(registros);
      }
      this.showListScrollSpinner = false;
    });
  }

  search() {
    this.searchForm.get('searchControl').valueChanges.pipe(
      debounceTime(1000),
    ).subscribe(res => {
      this.spinner.hide();
    });
  }
}
