import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {faFrown, faPlus, faSearch} from '@fortawesome/free-solid-svg-icons';
import {TitleService} from "../../core/title/title.service";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {ErrorService} from "../../core/error/error.service";
import {debounceTime, switchMap} from "rxjs/operators";
import {TipoIncidente} from "../../core/tipoIncidente/tipoIncidente";
import {TipoIncidenteService} from "../../core/tipoIncidente/tipoIncidente.service";

@Component({
  selector: 'tipo-incidente-list',
  templateUrl: './tipo-incidente-list.component.html',
  styleUrls: ['./tipo-incidente-list.component.scss']
})
export class TipoIncidenteListComponent implements OnInit {

  @ViewChild('dataList', {static: false}) dataList;

  searchForm = this.fb.group({
    searchControl: ['']
  });
  faSearch = faSearch;
  faPlus = faPlus;
  faFrown = faFrown;

  tiposIncidente: TipoIncidente[];
  offset = 0;
  max = 30;
  showListScrollSpinner = false;
  termo = '';

  constructor(private tipoIncidenteService: TipoIncidenteService, private titleService: TitleService,
              private spinner: SpinnerService, private errorService: ErrorService,
              private fb: FormBuilder, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.titleService.send('Lista de Tipos de Incidentes');
    this.fetchTipoIncidentes();
  }

  fetchTipoIncidentes() {
    this.spinner.show();
    this.tipoIncidenteService.list().subscribe(res => {
      if (this.errorService.hasError(res)) {
        this.errorService.sendError(res);
      } else {
        this.tiposIncidente = res;
      }
      this.spinner.hide();
    });
  }


  scrollDown() {
    this.showListScrollSpinner = true;
    this.offset += 10;
    this.tipoIncidenteService.list('', this.offset, this.termo).subscribe(res => {
      this.tiposIncidente = this.tiposIncidente.concat(res);
      this.showListScrollSpinner = false;
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
        return this.tipoIncidenteService.list('', this.offset, this.termo)
      })
    ).subscribe(res => {
      if (this.errorService.hasError(res)) this.errorService.sendError(res);
      this.tiposIncidente = res;
      this.spinner.hide();
    });
  }
}
