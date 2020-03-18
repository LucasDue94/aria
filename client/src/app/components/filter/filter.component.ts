import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import {FormBuilder} from "@angular/forms";
import {FilterService} from "../../core/filter/filter.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Output() params = new EventEmitter();
  @Input() hasSearch: boolean = true;
  @Input() hasDateInterval: boolean = true;
  @Input() hasSelect: boolean = true;
  @Input() items = [];
  @Input() bindLabel: string = 'descricao';
  @Input() bindValue: string = 'id';

  faIconSearch = faSearch;
  submitted;
  dateMessage = '';
  form = this.fb.group({
    busca: [''],
    inicio: [''],
    fim: [''],
    setor: [''],
  });

  constructor(private fb: FormBuilder, private filter: FilterService) {
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
  }

  isDateValid = (name: string) => this.getControl(name).value == ''
    && this.getControl(name == 'inicio' ? 'fim' : 'inicio').value != ''
}
