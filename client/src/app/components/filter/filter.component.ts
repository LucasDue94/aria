import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import {FormBuilder, Validators} from "@angular/forms";

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
  intervalDateMessage = '';
  form = this.fb.group({
    busca: [''],
    inicio: ['', Validators.required],
    fim: ['', Validators.required],
    setor: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {
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
    this.intervalDateMessage = '';
    if (this.hasDateInterval && this.getControl('inicio').valid && this.getControl('fim').valid) {
      const inicio = new Date(this.getControl('inicio').value);
      const fim = new Date(this.getControl('fim').value);
      if (inicio.getTime() > fim.getTime())
        this.intervalDateMessage = 'A data inicial precisa ser menor que a data final.';
      return inicio.getTime() <= fim.getTime();
    }
    return false
  }

  buildReturnParams() {
    let params = {};
    for (let controlsKey in this.form.controls) {
      params[controlsKey] = this.getControl(controlsKey).value;
    }
    return params;
  }

  send() {
    this.submitted = true;
    this.removeUnusedControls();
    if (this.form.valid) {
      if (this.hasDateInterval) {
        if (this.checkDateInterval()) {
          this.params.emit(this.buildReturnParams());
        }
      }
    }
  }

  clear() {
    this.form.reset();
    this.intervalDateMessage = '';
    this.submitted = false;
  }
}
