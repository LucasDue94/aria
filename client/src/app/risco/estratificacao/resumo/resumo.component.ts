import {Component, Input, OnInit} from '@angular/core';
import {EstratificacaoRiscoFormComponent} from "../form/estratificacao-risco-form.component";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.scss']
})
export class ResumoComponent implements OnInit {

  @Input() stratification;
  @Input() risks_stratification;
  @Input() formGroupRisk;
  @Input() controlIsEmpty;
  @Input() tev_clinical;
  @Input() formGroupTevClinical;
  @Input() tev_surgical;
  @Input() formGroupTevSurgical: FormGroup;
  @Input() braden;
  @Input() formGroupBraden;
  @Input() bradenq;
  @Input() formGroupBradenq;
  @Input() escala_jh_frat;
  @Input() formGroupJhFrat;
  @Input() escala_humpty_dumpty;
  @Input() formGroupHumptyDumpty;

  constructor() { }

  ngOnInit() {
    console.log(this.formGroupTevSurgical);
  }

}
