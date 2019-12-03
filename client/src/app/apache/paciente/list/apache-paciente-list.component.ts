import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {faFrown, faSearch} from "@fortawesome/free-solid-svg-icons";
import {Admissao} from "../../../core/setor/admissao";
import {Setor} from "../../../core/setor/setor";
import {ApacheService} from "../../../core/apache/apache.service";
import {SetorService} from "../../../core/setor/setor.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-apache-paciente-list',
  templateUrl: './apache-paciente-list.component.html',
  styleUrls: ['./apache-paciente-list.component.scss']
})

export class ApachePacienteListComponent implements OnInit {

  faFrown = faFrown;
  faSearch = faSearch;
  admissoesPacSetor: Admissao[];
  data: Admissao[];
  arrayListSetor: Setor[] = [];
  searchForm = this.fb.group({
    searchControl: ['']
  });
  setorId: any;

  constructor(private apacheService: ApacheService, private setorService: SetorService, private fb: FormBuilder, private render: Renderer2, private  element: ElementRef) {
  }



  ngOnInit() {
    this.setorService.list().subscribe(setores => {
      setores.forEach(setor => {
        if (setor.hasOwnProperty('tipoSetor') && setor['tipoSetor'] == 'UTI') {
          this.arrayListSetor.push(setor);
          this.setorId = setor['id'];
          this.apacheService.get(this.setorId).subscribe(registros => {
            this.data = registros;
            this.admissoesPacSetor = this.data;
          });
        }
      });
    });
  }

  search() {
    this.searchForm.get('searchControl').valueChanges.subscribe(res => {
      this.admissoesPacSetor = this.data.filter(function (obj) {
        return `${obj.registroAtendimento.id}`.includes(res.toUpperCase()) || obj.registroAtendimento.paciente.nome.includes(res.toUpperCase());
      });
    });
  }

  listPaciente(e) {
    this.setorId = e.target.value;
    this.apacheService.get(this.setorId).subscribe(registros => {
      this.data = registros;
      this.admissoesPacSetor = this.data;
    });
  }
}
