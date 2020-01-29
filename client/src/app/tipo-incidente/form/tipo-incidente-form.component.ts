import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {TitleService} from "../../core/title/title.service";
import {ErrorService} from "../../core/error/error.service";
import {AlertService} from "../../core/alert/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {faCheck, faFrown} from "@fortawesome/free-solid-svg-icons";
import {TipoIncidente} from "../../core/tipoIncidente/tipoIncidente";
import {TipoIncidenteService} from "../../core/tipoIncidente/tipoIncidente.service";

@Component({
  selector: 'tipo-incidente-form',
  templateUrl: './tipo-incidente-form.component.html',
  styleUrls: ['./tipo-incidente-form.component.scss']
})
export class TipoIncidenteFormComponent implements OnInit {
  form = this.fb.group({
    nome: ['', Validators.required],
  });
  tipoIncidente: TipoIncidente;
  url = this.route.snapshot.url[0].path;

  constructor(private fb: FormBuilder, private titleService: TitleService,
              private render: Renderer2,
              private tipoIncidenteService: TipoIncidenteService, private errorService: ErrorService,
              private alertService: AlertService, private route: ActivatedRoute,
              private router: Router, private spinner: SpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.url == 'create' ? this.titleService.send('Tipo de Incidente - Novo Tipo de Incidente') : this.titleService.send('Tipo de Incidente - Editar Tipo de Incidente');

    const id = this.route.snapshot.params['id'];
    if (id != undefined) {
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
    let id = this.route.snapshot.params['id'];
    const tipoIncidente = new TipoIncidente({
      id: id,
      nome: this.form.get('nome').value
    });

    this.tipoIncidenteService.save(tipoIncidente).subscribe((res) => {
      if (!res.hasOwnProperty('error')) {
        this.url == 'create' ?
          this.alertService.send(
            {message: 'Tipo de Incidente Criado!', type: 'success', icon: faCheck}
          ) :  this.alertService.send(
          {message: 'Tipo de Incidente Aterado!', type: 'success', icon: faCheck}
          ) ;

        setTimeout(() => {
          this.router.navigate(['/tipo-incidente']);
        }, 300);
      } else {
        this.alertService.send({
          message: res.error.error.message,
          type: 'error',
          icon: faFrown
        });
      }
    });
  }
}
