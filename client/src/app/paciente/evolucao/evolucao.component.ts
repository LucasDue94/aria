import {Component, OnInit} from '@angular/core';
import {Paciente} from '../../core/paciente/paciente';
import {ModalService} from '../../core/modal/modal.service';
import {PacienteService} from '../../core/paciente/paciente.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {SpinnerService} from '../../core/spinner/spinner.service';
import {ErrorService} from '../../core/error/error.service';
import {TitleService} from '../../core/title/title.service';
import {faCheck, faExclamationCircle, faSearch} from '@fortawesome/free-solid-svg-icons';
import {Atendimento} from '../../core/atendimento/atendimento';
import {AtendimentoService} from '../../core/atendimento/atendimento.service';
import {Planoterapeutico} from '../../core/planoTerapeutico/planoterapeutico';
import {AtendimentoCid} from '../../core/atendimento/atendimentoCid';
import {AlertService} from '../../core/alert/alert.service';

@Component({
  selector: 'app-evolucao',
  templateUrl: './evolucao.component.html',
  styleUrls: ['./evolucao.component.scss']
})
export class EvolucaoComponent implements OnInit {

  currentStep = 0;
  paciente: Paciente;
  registroAtendimento;
  pacienteId;
  atendimento = new Atendimento();
  planTherapeutic = new Planoterapeutico({});
  diagnostic: AtendimentoCid[] = [];
  faSearch = faSearch;
  evolucao = {
    conteudo: 'It is a long established fact that a reader will be distng \'Content here, content helike).\n' +
      '\n',
    medico: 'Patrícia Caldas de Oliveira',
    crm: '5320',
    data: '01/07/2019 10:13:44'
  };

  constructor(private modalService: ModalService, private pacienteService: PacienteService, private atendimentoService: AtendimentoService,
              private location: Location, private route: ActivatedRoute, private titleService: TitleService, private alertService: AlertService,
              private router: Router, private spinner: SpinnerService, private errorService: ErrorService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.modalService.open();
    }, 300);
    this.pacienteId = this.route.snapshot.params.id;
    this.titleService.send('Evolução');
    if (this.pacienteId !== undefined) {
      this.spinner.show();
      this.pacienteService.get(this.pacienteId).subscribe(res => {
        this.spinner.hide();
        if (!res.hasOwnProperty('error')) {
          this.paciente = res;
          this.titleService.send('Evolução - ' + this.paciente.nome);
        } else {
          this.errorService.sendError(res);
          this.location.back();
        }
      });
    }
  }

  cutText(text, max) {
  }

  getIdade(nasc) {
    const nascimento = new Date(nasc);
    return Math.floor(Math.ceil(Math.abs(nascimento.getTime() - (new Date()).getTime()) / (1000 * 3600 * 24)) / 365.25);
  }

  nextStep() {
    this.diagnostic.forEach(diagnostic => {
      if (diagnostic.status !== '') {
        this.currentStep += 1;
      } else {
        this.alertService.send({message: 'Selecione um status!', type: 'warning', icon: faCheck});
      }
    });
  }

  previousStep() {
    this.currentStep -= 1;
  }

  getPlanTherapeutic(plan) {
    this.planTherapeutic = plan;
  }

  getDiagnostic(diagnostic) {
    this.diagnostic = diagnostic;
  }

  getAttendance(attendanceRegister) {
    this.registroAtendimento = attendanceRegister;
  }

  buildAdmission(plan, diagnostic, attendanceRegister) {
    this.atendimento.id = attendanceRegister;
    this.atendimento.atendimentoCid = diagnostic;
    this.atendimento.planosTerapeutico = plan;
  }

  save() {
    this.buildAdmission(this.planTherapeutic, this.diagnostic, this.registroAtendimento);
    this.atendimentoService.save(this.atendimento).subscribe(atendimento => {
      if (atendimento.hasOwnProperty('error')) {
        this.alertService.send({
          message: 'teste',
          icon: faExclamationCircle,
          type: 'Warning'
        });
      } else {
        this.alertService.send({message: 'Admissão realizada com sucesso!', type: 'success', icon: faCheck});
        setTimeout(() => {
          this.modalService.close();
        }, 300);
      }
    });
  }
}
