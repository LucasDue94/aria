import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cid} from '../core/cid/cid';
import {CidService} from '../core/cid/cid.service';
import {faClipboardCheck, faExclamationCircle, faMinusCircle, faPlus} from '@fortawesome/free-solid-svg-icons';
import {AlertService} from '../core/alert/alert.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'aria-diagnostico',
  templateUrl: './diagnostico-list.component.html',
  styleUrls: ['diagnostico-list.scss']
})
export class DiagnosticoListComponent implements OnInit {

  @Input() currentStep = 0;
  @Output() diagnostic: EventEmitter<any> = new EventEmitter();

  cids;
  faPlus = faPlus;
  cidList: Cid[] = [];
  cidsSelected: Cid[] = [];
  searchVisibility = true;
  faMinusCircle = faMinusCircle;
  faClipboardCheck = faClipboardCheck;
  form = this.formBuilder.group({
    atendimento: new FormControl('', Validators.required),
    cid: new FormControl('', Validators.required),
    problemaAtivo: new FormControl('', Validators.required),
    resultadoEsperado: new FormControl('', Validators.required),
    conduta: new FormControl('', Validators.required),
    prazo: new FormControl('', Validators.required)
  });

  constructor(private formBuilder: FormBuilder, private cidService: CidService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.cids = this.cidService;
    this.cidService.list().subscribe((cidList: Cid[]) => {
      this.cidList = cidList;
    });
    this.builderDiagnostic();
  }



  setCid(cid) {
    let isEqualCid;
    if (this.cidsSelected.length === 0) {
      this.cidsSelected.push(cid);
    } else {
      for (const item of this.cidsSelected) {
        isEqualCid = Object.entries(item).toString() === Object.entries(cid).toString();
      }
      if (!isEqualCid) {
        this.cidsSelected.push(cid);
      } else {
        this.alertService.send({
          message: 'O cid já foi escolhido!',
          type: 'warning',
          icon: faExclamationCircle
        });
      }
    }
  }

  removeCid(cid: Cid) {
    this.cidsSelected = this.cidsSelected.filter(c => c.id !== cid.id);
    if (this.cidsSelected.length === 0) {
      this.searchVisibility = true;
    }
  }

  getVisibility(fasSearchVisibility) {
    this.searchVisibility = fasSearchVisibility;
  }

  setShowListCid() {
    this.searchVisibility = true;
  }

  builderDiagnostic() {
    this.form.valueChanges.subscribe( diagnostic => {
      this.diagnostic.emit(diagnostic);
    });
  }
}
