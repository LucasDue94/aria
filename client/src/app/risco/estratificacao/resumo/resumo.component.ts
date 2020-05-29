import {Component, Input, OnInit} from '@angular/core';
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.scss']
})
export class ResumoComponent implements OnInit {

  @Input() form: any;
  @Input() groupRisks;
  @Input() risks_stratification;
  @Input() tevClinico;
  @Input() groupTevClinical;
  @Input() tevSurgical;
  @Input() groupTevSurgical;
  @Input() groupBraden;
  @Input() braden;
  @Input() groupBradenQ;
  @Input() bradenQ;
  @Input() groupJhfrat;
  @Input() groupHumptyDumpty;

  propertiesRisco = [];
  propertiesTevClinical = [];
  propertiesTevSurgical = [];
  propertiesBraden = [];
  propertiesBradenQ = [];
  faCheck = faCheckCircle;
  faTimesCircle = faTimesCircle;

  constructor() {
  }

  ngOnInit() {

    this.propertiesRisco = this.risks_stratification.map((risco, index) => {
      return {id: index + 1, descricao: risco.description, valor: null};
    });
    this.groupRisks.valueChanges.subscribe(risk => {
      const resultRisks = Object.values(risk);
      const obj = Object.values(resultRisks.map(result => {
        return {valor: result}
      }));
      this.propertiesRisco = this.propertiesRisco.map((risco, index) => Object.assign({}, risco, obj[index]));
    });

    this.propertiesTevClinical = this.tevClinico.map((tevClinico, index) => {
      return {id: index + 1, descricao: tevClinico.description, valor: null};
    });
    this.groupTevClinical.valueChanges.subscribe(tevClinico => {
      const resultTevClinico = Object.values(tevClinico);
      const obj = Object.values(resultTevClinico.map(result => {
        return {valor: result};
      }));
      this.propertiesTevClinical = this.propertiesTevClinical.map((tevClinico, index) => Object.assign({}, tevClinico, obj[index]));
    });

    this.propertiesTevSurgical = this.tevSurgical.map((tevSurgical, index) => {
      return {id: index + 1, descricao: tevSurgical.description, valor: null};
    });
    this.groupTevSurgical.valueChanges.subscribe(tevSurgical => {
      const resultTevSurgical = Object.values(tevSurgical);
      const obj = Object.values(resultTevSurgical.map(result => {
        return {valor: result};
      }));
      this.propertiesTevSurgical = this.propertiesTevSurgical.map((tevSurgical, index) => Object.assign({}, tevSurgical, obj[index]));
    });

    this.propertiesBraden = this.tevSurgical.map((braden, index) => {
      return {id: index + 1, descricao: braden.description, valor: null};
    });
    this.groupBraden.valueChanges.subscribe(braden => {
      const resultBraden = Object.values(braden);
      const obj = Object.values(resultBraden.map(result => {
        return {valor: result};
      }));
      this.propertiesBraden = this.propertiesBraden.map((braden, index) => Object.assign({}, braden, obj[index]));
    });

    this.propertiesBradenQ = this.propertiesBradenQ.map((bradenQ, index) => {
      return {id: index + 1, descricao: bradenQ.description, valor: null};
    });
    this.groupBradenQ.valueChanges.subscribe(bradenQ => {
      const resultBradenQ = Object.values(bradenQ);
      const obj = Object.values(resultBradenQ.map(result => {
        return {valor: result};
      }));
      this.propertiesBradenQ = this.propertiesBradenQ.map((bradenQ, index) => Object.assign({}, bradenQ, obj[index]));
    });


  }

}



