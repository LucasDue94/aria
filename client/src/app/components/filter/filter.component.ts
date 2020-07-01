import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import {FormBuilder} from "@angular/forms";
import {FilterService} from "../../core/filter/filter.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() params = new EventEmitter();
  @Input() hasSearch: boolean = true;
  @Input() hasDateInterval: boolean = true;
  @Input() hasSelect: boolean = true;
  @Input() items = [];
  @Input() bindLabel: string = 'descricao';
  @Input() bindValue: string = 'id';
  @Output() statusSearch = new EventEmitter();

  isEmpty;
  submitted;
  dateMessage = '';
  faIconSearch = faSearch;
  form = this.fb.group({
    busca: [''],
    inicio: [''],
    fim: [''],
    setor: ['']
  });

  constructor(private fb: FormBuilder, private filter: FilterService) {
  }

  ngOnInit(): void {
    this.getStatusSearch();
  }

  getStatusSearch() {
    this.form.valueChanges.subscribe(control => {
      control.busca === '' || control.busca === null ? this.isEmpty = true : this.isEmpty = false;
      if(control.busca === '' || control.busca === null) {
        this.params.emit(this.buildReturnParams());
      }
      this.statusSearch.emit(this.isEmpty);
    });
  }

  removeUnusedControls() {
    this.form.removeControl(!this.hasSearch ? 'busca' : '');
    this.form.removeControl(!this.hasDateInterval ? 'inicio' : '');
    this.form.removeControl(!this.hasDateInterval ? 'fim' : '');
    this.form.removeControl(!this.hasSelect ? 'setor' : '');
  }

  isValid = (name) => this.getControl(name).valid;

  getControl = (name) => this.form.get(name);

  checkDateInterval() {
    this.submitted = false;
    let valid = true;
    this.dateMessage = '';
    if (this.hasDateInterval) {
      const inicio = new Date(this.getControl('inicio').value);
      const fim = new Date(this.getControl('fim').value);
      if (inicio.getTime() > fim.getTime()) this.dateMessage = 'A data inicial precisa ser menor que a data final.';
      valid = inicio.getTime() <= fim.getTime();
    }
    return valid
  }

  buildReturnParams() {
    let params = {};
    for (let controlsKey in this.form.controls) {
      params[controlsKey] = this.getControl(controlsKey).value;
    }
    return params;
  }

  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.params.emit(this.buildReturnParams());
    }
  }

  send() {
    this.removeUnusedControls();
    if (this.hasDateInterval) this.checkDateInterval();
    this.submitted = true;
    const params = this.buildReturnParams();
    this.params.emit(params);
    this.filter.send(params);
  }

  clear() {
    this.form.reset();
    this.dateMessage = '';
    this.submitted = false;
    this.params.emit(this.buildReturnParams());
  }

  isDateValid = (name: string) => this.getControl(name).value == ''
    && this.getControl(name == 'inicio' ? 'fim' : 'inicio').value != ''
}
