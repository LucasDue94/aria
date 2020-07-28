import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {Cid} from '../../../core/cid/cid';
import {CidService} from '../../../core/cid/cid.service';
import {faClipboardCheck, faExclamationCircle, faMinusCircle, faPlus} from '@fortawesome/free-solid-svg-icons';
import {AtendimentoCid} from '../../../core/atendimento/atendimentoCid';
import {AlertService} from '../../../core/alert/alert.service';
import {Atendimento} from '../../../core/atendimento/atendimento';
import {ActivatedRoute} from '@angular/router';
import {PacienteService} from '../../../core/paciente/paciente.service';
import {EnumStatusCid} from '../../../core/cid/enumStatusCid';
import {element} from 'protractor';


@Component({
  selector: 'app-diagnostico-list',
  templateUrl: './diagnostico-list.component.html',
  styleUrls: ['./diagnostico-list.component.scss']
})
export class DiagnosticoListComponent implements OnInit {

  @Input() currentStep = 0;
  @Output() diagnostic: EventEmitter<any> = new EventEmitter();
  @ViewChild('listCidHTML', {static: false}) listCidHTML: ElementRef;

  faMinusCircle = faMinusCircle;
  faClipboardCheck = faClipboardCheck;
  faPlus = faPlus;
  cidsService;
  cidList: Cid[] = [];
  cidsSelected: Cid[] = [];
  diagnosticStatus = [
    {id: 1, status: 'Suspeita'},
    {id: 2, status: 'Confirmado'},
    {id: 3, status: 'Descartado'}
  ];
  atendimento: Atendimento;
  listAtendimentoCid: AtendimentoCid[] = [];
  fastSearchVisibility = true;

  constructor(private cidService: CidService, private alertService: AlertService, private render: Renderer2, private route: ActivatedRoute,
              private pacienteService: PacienteService) {
  }

  ngOnInit() {
    this.cidsService = this.cidService;
    this.cidService.list().subscribe((cidList: Cid[]) => {
      this.cidList = cidList;
    });
  }

  setCid(diagnostic: Cid) {
    let isEqualCid;
    this.currentStep = 1;
    if (Object.is(this.cidsSelected.length, 0)) {
      this.cidsSelected.push(diagnostic);
    } else {
      for (const item of this.cidsSelected) {
        isEqualCid = Object.entries(item).toString() === Object.entries(diagnostic).toString();
      }
      if (!isEqualCid) {
        this.cidsSelected.push(diagnostic);
      } else {
        this.alertService.send({
          message: 'O cid já foi escolhido!',
          type: 'warning',
          icon: faExclamationCircle
        });
      }
    }
  }

  removeCid(diagnostic: Cid) {
    this.cidsSelected = this.cidsSelected.filter(c => c.id !== diagnostic.id);
    if (this.cidsSelected.length === 0) {
      this.currentStep = 0;
      this.fastSearchVisibility = true;
    }
    this.listAtendimentoCid = this.listAtendimentoCid.filter(atendimentoCid => atendimentoCid.cid !== diagnostic);
    this.diagnostic.emit(this.listAtendimentoCid);
  }

  setStatusCid(status?, cid?, targetStatus?) {
    let diagnostic = null;
    this.diagnosticStatus.forEach(situation => {
      if (status === situation.status) {
        const statusResult = this.diagnosticStatus.filter(cidStatus => cidStatus.status === status).reduce(item => item);
        diagnostic = Object.assign(statusResult, cid);
      }
    });
    this.setCidStatusColors(diagnostic, targetStatus);
  }

  setCidStatusColors(diagnostic, targetStatus) {
    if (diagnostic.status === EnumStatusCid.SUSPEITA) {
      this.render.addClass(targetStatus.target, 'active-status-suspicious');
    }
    if (diagnostic.status === EnumStatusCid.CONFIRMADO) {
      this.render.addClass(targetStatus.target, 'active-status-confirm');
    }
    if (diagnostic.status === EnumStatusCid.DESCARTADO) {
      this.render.addClass(targetStatus.target, 'active-status-descarded');
    }

    const item = document.getElementById(`${diagnostic.id}`);

    console.log(item);

    if (item) {
    }
  }

  setShowListCid() {
    this.currentStep = 0;
    this.fastSearchVisibility = true;
  }

  getVisibilityFastSearch(fastSearchVisibility) {
    this.fastSearchVisibility = fastSearchVisibility;
  }
}
