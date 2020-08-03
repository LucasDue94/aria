import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faExclamationCircle, faPlus} from '@fortawesome/free-solid-svg-icons';
import {Cid} from '../../core/cid/cid';
import {CidService} from '../../core/cid/cid.service';
import {Diagnostico} from '../../core/diagnostico/diagnostico';
import {EnumStatusCid} from '../../core/cid/enumStatusCid';
import {AlertService} from '../../core/alert/alert.service';
import {Usuario} from '../../core/usuario/usuario';
import {PacienteService} from '../../core/paciente/paciente.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-diagnostico-list',
  templateUrl: './diagnostico-list.component.html',
  styleUrls: ['./diagnostico-list.component.scss']
})
export class DiagnosticoListComponent implements OnInit {

  /*** events*/
  @Output() diagnostic: EventEmitter<any> = new EventEmitter();
  @Output() sizeListDiagnostic: EventEmitter<any> = new EventEmitter();
  @Input() title;

  /*** icons*/
  faPlus = faPlus;

  /*** lists*/
  cidList: Cid[] = [];
  diagnosticSelectedList: Diagnostico[] = [];

  /*** variables*/
  paciente;
  pacienteId;

  /*** Instances*/
  user: Usuario = new Usuario();

  /*** flags*/
  cidsService;
  statusDiagnostic;
  step = 0;
  fastSearchVisibility = true;

  constructor(private cidService: CidService, private route: ActivatedRoute, private alertService: AlertService, private pacienteService: PacienteService) {
  }

  ngOnInit() {
    this.pacienteId = this.route.snapshot.params.id;
    this.cidsService = this.cidService;
    this.cidService.list().subscribe((cidList: Cid[]) => {
      this.cidList = cidList;
    });

    this.pacienteService.get(this.pacienteId).subscribe(paciente => {
      this.paciente = paciente;
    });

    this.sizeListDiagnostic.emit(this.diagnosticSelectedList.length = 0);
  }


  getAttendanceLast() {
    return this.paciente.getUltimoRegistro().id;
  }

  setDiagnostic(internationalCod: Cid) {
    const diagnostic = new Diagnostico({
      status: EnumStatusCid.SUSPEITA,
      cid: internationalCod,
      profissional: this.user.getProfessional().id,
      atendimento: this.getAttendanceLast()
    });

    if (!this.isExistDiagnostic(diagnostic)) {
      this.diagnosticSelectedList.push(diagnostic);
      this.diagnostic.emit(this.diagnosticSelectedList);
      this.sizeListDiagnostic.emit(this.diagnosticSelectedList.length);
    } else {
      this.alertService.send({
        message: 'Cid já foi escolhido!',
        icon: faExclamationCircle,
        type: 'warning'
      });
    }
  }

  isExistDiagnostic = (diagnostic: Diagnostico) => this.diagnosticSelectedList.find(dig => dig.cid.id === diagnostic.cid.id) !== undefined;

  showListCid() {
    this.step = 0;
    this.fastSearchVisibility = true;
  }

  isEmptyListDiagnostic() {
    this.diagnosticSelectedList.length === 0 ? this.fastSearchVisibility = true : this.fastSearchVisibility = false;
  }

  getStatusDiagnostic(statusDiagnostic) {
    this.statusDiagnostic = statusDiagnostic;
  }

  removeDiagnostic(diagnostic) {
    const index = this.diagnosticSelectedList.indexOf(diagnostic);
    this.diagnosticSelectedList.splice(index, 1);
    this.isEmptyListDiagnostic();
    this.sizeListDiagnostic.emit(this.diagnosticSelectedList.length);
  }

  getVisibilityFastSearch(fastSearchVisibility) {
    this.fastSearchVisibility = fastSearchVisibility;
  }
}
