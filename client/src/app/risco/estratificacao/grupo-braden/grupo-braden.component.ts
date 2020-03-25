import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'grupo-braden',
  templateUrl: './grupo-braden.component.html',
  styleUrls: ['./grupo-braden.component.scss']
})
export class GrupoBradenComponent implements OnInit {

  @Input() braden;
  @Input() formGroupBraden: FormGroup;

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
