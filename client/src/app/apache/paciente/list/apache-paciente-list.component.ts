import {Component, OnInit} from '@angular/core';
import {faFrown, faSearch} from "@fortawesome/free-solid-svg-icons";
import {Setor} from "../../../core/setor/setor";
import {ApacheService} from "../../../core/apache/apache.service";
import {SetorService} from "../../../core/setor/setor.service";
import {FormBuilder} from "@angular/forms";
import {TitleService} from "../../../core/title/title.service";
import {SpinnerService} from "../../../core/spinner/spinner.service";
import {debounceTime, switchMap} from 'rxjs/operators';
import {RegistroAtendimentoLeito} from "../../../core/registroAtendimentoLeitos/registroAtendimentoLeito";

@Component({
  selector: 'app-apache-paciente-list',
  templateUrl: './apache-paciente-list.component.html',
  styleUrls: ['./apache-paciente-list.component.scss']
})

export class ApachePacienteListComponent implements OnInit {

  faFrown = faFrown;
  faSearch = faSearch;
  admissoesPacSetor: RegistroAtendimentoLeito[] = [];
  arrayListSetor: Setor[] = [];
  searchForm = this.fb.group({
    searchControl: ['']
  });
  setorId;
  offset = 0;
  max = 20;
  termo = '';

  constructor(private apacheService: ApacheService, private setorService: SetorService,
              private titleService: TitleService, private fb: FormBuilder, private spinner: SpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.titleService.send('Apache - Lista de pacientes');
    this.setorService.list('U', '', '').subscribe(setores => {
      setores.forEach(setor => {
        this.arrayListSetor.push(setor);
        this.setorId = setor.id;
      });

      this.apacheService.list(this.setorId, this.termo, '', '').subscribe(registros => {
        this.admissoesPacSetor = registros;
        this.spinner.hide();
      });
    });
  }

  listAdmissoesSetor() {
    this.spinner.show();
    this.apacheService.list(+this.setorId, this.termo, this.offset, this.max).subscribe(registros => {
      this.admissoesPacSetor = registros;
      this.spinner.hide();
    });
  }

  search() {
    this.searchForm.get('searchControl').valueChanges.pipe(
      debounceTime(1000),
      switchMap(changes => {
        this.spinner.show();
        this.offset = 0;
        if (this.admissoesPacSetor != undefined) this.admissoesPacSetor.length = 0;
        return this.apacheService.search(this.setorId, changes, this.offset, this.max)
      })
    ).subscribe(res => {
      this.admissoesPacSetor = res;
      this.spinner.hide();
    });
  }

  scrollDown() {
    this.spinner.show();
    this.offset += 10;
    this.apacheService.list(+this.setorId, this.termo, this.offset, this.max).subscribe(registros => {
      registros.forEach(registro => {
        this.admissoesPacSetor.push(registro);
        this.spinner.hide();
      });
    });
  }
}
