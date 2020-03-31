import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'grupo-braden',
  templateUrl: './grupo-braden.component.html',
  styleUrls: ['./grupo-braden.component.scss']
})
export class GrupoBradenComponent implements OnInit {

  @Input() braden;
  @Input() formGroupBraden: FormGroup;
  @Input() controlIsEmpty: Boolean;
  faEclamation = faExclamationCircle;

  constructor() {
  }

  ngOnInit() {
    this.createGroup();
  }

  createGroup() {
    this.formGroupBraden.addControl('braden_percepcao_sensorial', new FormControl('', Validators.required));
    this.formGroupBraden.addControl('braden_umidade', new FormControl('', Validators.required));
    this.formGroupBraden.addControl('braden_atividade', new FormControl('', Validators.required));
    this.formGroupBraden.addControl('braden_mobilidade', new FormControl('', Validators.required));
    this.formGroupBraden.addControl('braden_nutricao', new FormControl('', Validators.required));
    this.formGroupBraden.addControl('braden_friccao_cisalhamento', new FormControl('', Validators.required));
  }
}
