import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'grupo-tev-cirurgico',
  templateUrl: './grupo-tev-cirurgico.component.html',
  styleUrls: ['./grupo-tev-cirurgico.component.scss']
})
export class GrupoTevCirurgicoComponent implements OnInit {

  @Input() tev_surgical;
  @Input() formGroupTevSurgical: FormGroup;

  constructor() {

  }

  ngOnInit() {
    this.createGroup();
  }

  createGroup() {
    this.formGroupTevSurgical.addControl('tev_cirurgico_5', new FormControl(false, Validators.required));
    this.formGroupTevSurgical.addControl('tev_cirurgico_3', new FormControl(false, Validators.required));
    this.formGroupTevSurgical.addControl('tev_cirurgico_2', new FormControl(false, Validators.required));
    this.formGroupTevSurgical.addControl('tev_cirurgico_1', new FormControl(false, Validators.required));
  }

}
