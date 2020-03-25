import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'grupo-humpty-dumpty',
  templateUrl: './grupo-humpty-dumpty.component.html',
  styleUrls: ['./grupo-humpty-dumpty.component.scss']
})
export class GrupoHumptyDumptyComponent implements OnInit {

  @Input() escala_humpty_dumpty;
  @Input() formGroupHumptyDumpty: FormGroup;

  constructor() { }

  ngOnInit() {
    this.createGroup();
  }

  createGroup() {
    this.formGroupHumptyDumpty.addControl('hd_diagnostico', new FormControl('', Validators.required));
    this.formGroupHumptyDumpty.addControl('hd_cirurgia_sedacao_anestesia', new FormControl('', Validators.required));
    this.formGroupHumptyDumpty.addControl('hd_deterioracao_cognitiva', new FormControl('', Validators.required));
    this.formGroupHumptyDumpty.addControl('hd_historia_pregressa', new FormControl('', Validators.required));
    this.formGroupHumptyDumpty.addControl('hd_uso_medicamentos', new FormControl('', Validators.required));
  }
}
