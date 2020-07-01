import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {TitleService} from "../../../core/title/title.service";
import {ErrorService} from "../../../core/error/error.service";
import {AlertService} from "../../../core/alert/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SpinnerService} from "../../../core/spinner/spinner.service";
import {faCheck, faFrown} from "@fortawesome/free-solid-svg-icons";
import {TipoIncidente} from "../../../core/tipoIncidente/tipoIncidente";
import {TipoIncidenteService} from "../../../core/tipoIncidente/tipoIncidente.service";
import {RiscoService} from "../../../core/risco/risco.service";

@Component({
  selector: 'tipo-incidente-form',
  templateUrl: './tipo-incidente-form.component.html',
  styleUrls: ['./tipo-incidente-form.component.scss']
})
export class TipoIncidenteFormComponent implements OnInit {
  form = this.fb.group({
    nome: ['', Validators.required],
  });

  tipoIncidente: TipoIncidente = new TipoIncidente();
  riscos = [];

  constructor(private fb: FormBuilder, private titleService: TitleService,
              private render: Renderer2,
              private tipoIncidenteService: TipoIncidenteService, private errorService: ErrorService,
              private alertService: AlertService, private route: ActivatedRoute,
              private router: Router, private spinner: SpinnerService,
              private riscoService: RiscoService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.route.snapshot.url[0].path == 'create' ? this.titleService.send('Tipo de Incidente - Novo Tipo de Incidente') : this.titleService.send('Tipo de Incidente - Editar Tipo de Incidente');
    this.riscoService.list().subscribe(res => {
      if (res.hasOwnProperty('error')) {
        this.errorService.sendError(res);
      } else {
        this.riscos = res;
      }
    });
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.tipoIncidenteService.get(id).subscribe(res => {
        if (res.hasOwnProperty('error')) {
          this.errorService.sendError(res)
        } else {
          this.tipoIncidente = res;
          this.form.get('nome').setValue(res.nome);
        }
      });
    }

    this.spinner.hide();
  }

  save() {
    let subject = Object.create({});
    subject.id = this.route.snapshot.params['id'];
    subject.nome = this.form.get('nome').value;
    subject.riscos = this.tipoIncidente.riscos.map((r) => {return {id: r.id}})

    this.tipoIncidenteService.save(subject).subscribe((res) => {
      if (!res.hasOwnProperty('error')) {
        this.route.snapshot.url[0].path == 'create' ?
          this.alertService.send(
            {message: 'Tipo de Incidente Criado!', type: 'success', icon: faCheck}
          ) :  this.alertService.send(
          {message: 'Tipo de Incidente Alterado!', type: 'success', icon: faCheck}
          ) ;

        setTimeout(() => {
          this.router.navigate(['/tipo-incidente']);
        }, 300);
      } else {
        let messageError = '';
        if (res.error.error.hasOwnProperty('_embedded')) {
          res.error.error._embedded.errors.forEach(error => {
            messageError += error.message + '. \n';
          });
        } else {
          messageError = res.error.error.message;
        }
        this.alertService.send({
          message: messageError,
          type: 'error',
          icon: faFrown
        });
      }
    });
  }

  getItemsSelected(riscos: any) {
    this.tipoIncidente.riscos = riscos;
  }

  get f() { return this.form.controls; }
}
