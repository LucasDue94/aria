import {Component, OnInit} from '@angular/core';
import {Paciente} from '../../core/paciente/paciente';
import {PacienteService} from '../../core/paciente/paciente.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {SpinnerService} from '../../core/spinner/spinner.service';
import {ErrorService} from '../../core/error/error.service';
import {TitleService} from '../../core/title/title.service';
import {faExclamation, faSearch, faSmile} from '@fortawesome/free-solid-svg-icons';
import {AtendimentoService} from '../../core/atendimento/atendimento.service';
import {AlertService} from '../../core/alert/alert.service';
import {Atendimento} from '../../core/atendimento/atendimento';
import {Modal} from '../../core/modal/entities/modal';
import {ModalType} from '../../core/modal/entities/enumerators/modalType.enum';
import {ModalSize} from '../../core/modal/entities/enumerators/modalSize.enum';
import {Diagnostico} from '../../core/diagnostico/diagnostico';
import {AdmissaoService} from '../../core/admissao/admissao.service';
import {Admissao} from '../../core/admissao/admissao';

@Component({
  selector: 'app-evolucao',
  templateUrl: './evolucao.component.html',
  styleUrls: ['./evolucao.component.scss']
})
export class EvolucaoComponent implements OnInit {

  pacienteId;
  atendimentoId;
  currentStep = 0;
  hasAdmission = false;
  diagnostic: Diagnostico[];
  atendimento: Atendimento;
  planTherapeutic;
  sizeListDiagnostic;
  paciente: Paciente;
  faSearch = faSearch;
  statePlanTherapeutic;
  ultimaEvolucao = {
    conteudo: 'It is a long established fact that a reader will be distng \'Content here, content helike).\n' +
      '\n',
    medico: 'Patrícia Caldas de Oliveira',
    crm: '5320',
    data: '01/07/2019 10:13:44'
  };
  modalAdmissao = new Modal({title: 'Admissão', type: ModalType.CUSTOM, size: ModalSize.SMALL});
  modalPlanoTerapeutico = new Modal({
    title: 'Plano Terapêutico Multiprofissional',
    type: ModalType.CUSTOM,
    size: ModalSize.LARGER
  });

  constructor(private pacienteService: PacienteService, private atendimentoService: AtendimentoService,
              private location: Location, private route: ActivatedRoute, private titleService: TitleService,
              private alertService: AlertService, private router: Router, private spinner: SpinnerService,
              private errorService: ErrorService, private admissao: AdmissaoService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.modalAdmissao.open();
    }, 300);
    this.pacienteId = this.route.snapshot.params.id;
    this.titleService.send('Evolução');
    if (this.pacienteId !== undefined) {
      this.spinner.show();
      this.pacienteService.get(this.pacienteId).subscribe((paciente) => {
        this.atendimentoId = paciente.getUltimoRegistro().id;
        this.atendimento = paciente.getResgistrosInternacao().reduce(atendimento => atendimento);
        this.paciente = paciente;
        this.spinner.hide();
        if (!paciente.hasOwnProperty('error')) {
          this.paciente = paciente;
          this.titleService.send('Evolução - ' + this.paciente.nome);
        } else {
          this.errorService.sendError(paciente);
          this.location.back();
        }
      });
    }
  }

  cutText = (text, width) => text.length > 120 ? text.slice(0, width) + '...' : text;

  getIdade(nasc) {
    const nascimento = new Date(nasc);
    return Math.floor(Math.ceil(Math.abs(nascimento.getTime() - (new Date()).getTime()) / (1000 * 3600 * 24)) / 365.25);
  }

  setSizeListDiagnostic(size) {
    this.sizeListDiagnostic = size;
  }

  nextStep() {
    this.currentStep += 1;
  }

  previousStep() {
    this.currentStep -= 1;
  }

  setDiagnostic(diagnostic) {
    this.diagnostic = diagnostic;
  }

  setPlanTherapeutic(planTherapeutic) {
    this.planTherapeutic = planTherapeutic;
  }

  setStatePlanTherapeutic(statePlanTherapeutic) {
    this.statePlanTherapeutic = statePlanTherapeutic;
  }

  save() {
    const admission = new Admissao({
      atendimento: this.atendimentoId,
      data: new Date(),
      planoTerapeutico: this.planTherapeutic,
      diagnosticos: this.diagnostic
    });
    if (Object.is(this.statePlanTherapeutic, 'VALID')) {
      this.admissao.save(admission).subscribe(admissao => {
        if (admissao.hasOwnProperty('error')) {
          setTimeout(() => {
            this.alertService.send({
              message: 'O paciente já foi admitido!',
              icon: faExclamation,
              type: 'warning'
            });
          });
        } else {
          this.modalAdmissao.close();
          setTimeout(() => {
            this.alertService.send({message: 'Admissão realizada!', icon: faSmile, type: 'success'});
            this.router.navigate(['/paciente/show', this.pacienteId]);
          }, 300);
        }
      });
    } else {
      this.alertService.send({
        message: 'Por favor preencha todos os campos!',
        icon: faExclamation,
        type: 'warning'
      });
    }
  }

  showPlano() {
    this.modalPlanoTerapeutico.open();
  }
}
