import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'grupo-tev-cirurgico',
  templateUrl: './grupo-tev-cirurgico.component.html',
  styleUrls: ['./grupo-tev-cirurgico.component.scss']
})
export class GrupoTevCirurgicoComponent implements OnInit {

  @Input() TEV_SURGICAL;
  groupTevCirurgico = this.fb.group({
    tev_cirurgico_5: this.fb.control(false, Validators.required),
    tev_cirurgico_3: this.fb.control(false, Validators.required),
    tev_cirurgico_2: this.fb.control(false, Validators.required),
    tev_cirurgico_1: this.fb.control(false, Validators.required),
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
