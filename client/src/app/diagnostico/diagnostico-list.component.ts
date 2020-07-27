import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {Cid} from '../core/cid/cid';
import {CidService} from '../core/cid/cid.service';
import {faClipboardCheck, faExclamationCircle, faMinusCircle, faPlus} from '@fortawesome/free-solid-svg-icons';
import {AlertService} from '../core/alert/alert.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {AtendimentoCid} from '../core/atendimento/atendimentoCid';
import {PacienteService} from '../core/paciente/paciente.service';
import {ActivatedRoute} from '@angular/router';
import {Atendimento} from '../core/atendimento/atendimento';

@Component({
  selector: 'aria-diagnostico',
  templateUrl: './diagnostico-list.component.html',
  styleUrls: ['diagnostico-list.scss']
})
export class DiagnosticoListComponent implements OnInit {

  @Input() currentStep = 0;
  @ViewChild('btnCidStatus', {static: false}) btnCidStatus: ElementRef;
  @Output() diagnostic: EventEmitter<any> = new EventEmitter();
  @Output() registroAtendimento: EventEmitter<any> = new EventEmitter();
  @Output() planTherapeutic: EventEmitter<any> = new EventEmitter();

  cids;
  faPlus = faPlus;
  cidList: Cid[] = [];
  cds = new Set<Cid>();
  listAtendimentoCid: AtendimentoCid[] = [];
  cidsSelected: Cid[] = [];
  atendimento: Atendimento;
  atendimentoId;
  searchVisibility = true;
  faMinusCircle = faMinusCircle;
  faClipboardCheck = faClipboardCheck;
  form = this.formBuilder.group({
    problemaAtivo: new FormControl('', Validators.required),
    resultadoEsperado: new FormControl('', Validators.required),
    conduta: new FormControl('', Validators.required),
    prazo: new FormControl('', Validators.required),
    atendimento: new FormControl('', Validators.required)
  });
  diagnosticStatus = [
    {id: 1, description: 'Suspeita', cid: ''},
    {id: 2, description: 'Confirmado', cid: ''},
    {id: 3, description: 'Descartado', cid: ''}
  ];

  constructor(private formBuilder: FormBuilder, private render: Renderer2, private cidService: CidService,
              private alertService: AlertService, private pacienteService: PacienteService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.cids = this.cidService;
    const pacienteId = this.route.snapshot.params.id;
    this.cidService.list().subscribe((cidList: Cid[]) => {
      this.cidList = cidList;
    });
    this.pacienteService.get(pacienteId).subscribe(paciente => {
      this.atendimento = paciente.getUltimoRegistro();
      this.builderDiagnostic();
    });
  }

  setCid(diagnostic: Cid) {
    let isEqualCid;
    this.currentStep = 1;
    if (this.cidsSelected.length === 0) {
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

    const atendimentoCid = new AtendimentoCid({status: '', cid: diagnostic, atendimento: this.atendimento.id});
    this.listAtendimentoCid.push(atendimentoCid);
    this.diagnostic.emit(this.listAtendimentoCid);
  }

  removeCid(diagnostic: Cid) {
    this.cidsSelected = this.cidsSelected.filter(c => c.id !== diagnostic.id);
    if (this.cidsSelected.length === 0) {
      this.currentStep = 0;
      this.searchVisibility = true;
    }
    this.listAtendimentoCid = this.listAtendimentoCid.filter(atendimentoCid => atendimentoCid.cid !== diagnostic);
    this.diagnostic.emit(this.listAtendimentoCid);
  }

  setStatus(status?, cid?, event?) {
    this.listAtendimentoCid.forEach(atendimentoCid => {
      if (atendimentoCid.cid === cid) {
        atendimentoCid.status = status;
        if (atendimentoCid.status === 'Suspeita') {
          this.render.addClass(event.target, 'active-status-suspicious');
        }
        if (atendimentoCid.status === 'Confirmado') {
          this.render.addClass(event.target, 'active-status-confirm');
        }
        if (atendimentoCid.status === 'Descartado') {
          this.render.addClass(event.target, 'active-status-descarded');
        }

        const targetElement = event.target.textContent;
        const targetElementText = event.target;
        this.setStatusColors(atendimentoCid, targetElement, targetElementText);
      }
    });
  }

  setStatusColors(atendimentoCid, targetElement, tagertElementText) {
    this.btnCidStatus.nativeElement.childNodes.forEach(btn => {
      if (btn.className !== tagertElementText.className && atendimentoCid.cid.id === btn.id) {
        const listBtnStatus = btn.childNodes.item(1).childNodes;
        listBtnStatus.forEach(span => {
          if (!Object.is(span.classList, undefined) && !Object.is(span.classList, '')) {
            if (span.textContent !== targetElement) {
              this.render.addClass(span, 'disable-status');
            } else {
              if (span.classList.contains('disable-status')) {
                this.render.removeClass(span, 'disable-status');
              }
            }
          }
        });
      }
    });
  }

  getVisibilityFastSearch(fastSearchVisibility) {
    this.searchVisibility = fastSearchVisibility;
  }

  setShowListCid() {
    this.currentStep = 0;
    this.searchVisibility = true;
  }

  builderDiagnostic() {
    this.atendimentoId = this.atendimento.id;
    this.form.get('atendimento').setValue(this.atendimentoId);
    this.registroAtendimento.emit(this.atendimentoId);
    this.form.valueChanges.subscribe(plan => {
      const planTherapeutic = [];
      planTherapeutic.push(plan);
      if (this.form.valid && this.form.value !== '') {
        this.planTherapeutic.emit(planTherapeutic);
      } else {
        this.planTherapeutic.emit(this.form.status);
      }
    });
  }

  get f() {
    return this.form.controls;
  }
}
