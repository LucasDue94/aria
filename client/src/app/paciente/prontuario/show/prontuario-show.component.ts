import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../../core/modal/modal.service';
import {PacienteService} from '../../../core/paciente/paciente.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SpinnerService} from '../../../core/spinner/spinner.service';
import {ErrorService} from '../../../core/error/error.service';
import {Location} from '@angular/common';
import {Paciente} from '../../../core/paciente/paciente';
import {Atendimento} from '../../../core/atendimento/atendimento';

@Component({
  selector: 'prontuario',
  templateUrl: './prontuario-show.component.html',
  styleUrls: ['./prontuario-show.component.scss']
})
export class ProntuarioShowComponent implements OnInit {
  paciente: Paciente;
  pacienteId;
  notAdmission;
  evolucao = {
    conteudo: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\n' +
      '\n',
    medico: 'Patrícia Caldas de Oliveira',
    crm: '5320',
    data: '01/07/2019 10:13:44'
  };

  constructor(private modalService: ModalService, private pacienteService: PacienteService,
              private location: Location, private route: ActivatedRoute,
              private router: Router, private spinner: SpinnerService, private errorService: ErrorService) {
  }

  ngOnInit(): void {
    this.pacienteId = this.route.snapshot.params.id;
    if (this.pacienteId !== undefined) {
      this.spinner.show();
      this.pacienteService.get(this.pacienteId).subscribe(res => {
        this.spinner.hide();
        if (!res.hasOwnProperty('error')) {
          this.paciente = res;
        } else {
          this.errorService.sendError(res);
          this.location.back();
        }
      });
    }
    this.getAttendance();
  }

  cutText = (text, width) => text.length > 120 ? text.slice(0, width) + '...' : text;

  openModal() {
    if (this.notAdmission) {
      this.router.navigate(['/paciente/evolucao/', this.paciente.id]);
    }
  }

  click() {
    alert('foon');
  }

  getAttendance() {
    let lastRegister: Atendimento;
    this.pacienteService.get(this.pacienteId).subscribe(attendance => {
      lastRegister = attendance.getUltimoRegistro();
      lastRegister.planosTerapeutico.length === 0 && lastRegister.atendimentoCid.length === 0 ? this.notAdmission = true : this.notAdmission = false;
    });
  }

  getIdade(nasc) {
    const nascimento = new Date(nasc);
    return Math.floor(Math.ceil(Math.abs(nascimento.getTime() - (new Date()).getTime()) / (1000 * 3600 * 24)) / 365.25);
  }
}
