import {Component, OnInit} from '@angular/core';
import {Paciente} from '../../core/paciente/paciente';
import {ModalService} from '../../core/modal/modal.service';
import {PacienteService} from '../../core/paciente/paciente.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {SpinnerService} from '../../core/spinner/spinner.service';
import {ErrorService} from '../../core/error/error.service';
import {TitleService} from '../../core/title/title.service';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {CidService} from '../../core/cid/cid.service';

@Component({
  selector: 'app-evolucao',
  templateUrl: './evolucao.component.html',
  styleUrls: ['./evolucao.component.scss']
})
export class EvolucaoComponent implements OnInit {

  currentStep = 0;
  paciente: Paciente;
  diagnostic;
  faSearch = faSearch;
  evolucao = {
    conteudo: 'It is a long established fact that a reader will be distng \'Content here, content helike).\n' +
      '\n',
    medico: 'Patrícia Caldas de Oliveira',
    crm: '5320',
    data: '01/07/2019 10:13:44'
  };

  constructor(private modalService: ModalService, private pacienteService: PacienteService,
              private location: Location, private route: ActivatedRoute, private titleService: TitleService,
              private router: Router, private spinner: SpinnerService, private errorService: ErrorService,
              private cidService: CidService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.modalService.open();
    }, 300);
    const pacienteId = this.route.snapshot.params.id;
    this.titleService.send('Evolução');
    if (pacienteId !== undefined) {
      this.spinner.show();
      this.pacienteService.get(pacienteId).subscribe(res => {
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
    this.currentStep += 1;
  }

  previousStep() {
    this.currentStep -= 1;
  }

  getDiagnostic(diagnostic) {
    console.log(this.diagnostic = diagnostic);
  }

  save() {
    console.log(this.diagnostic);
  }
}
