import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {TitleService} from "../../core/title/title.service";
import {RiscoService} from "../../core/risco/risco.service";
import {Risco} from "../../core/risco/risco";
import {ErrorService} from "../../core/error/error.service";
import {AlertService} from "../../core/alert/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {faCheck, faFrown} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'risco-form',
  templateUrl: './risco-form.component.html',
  styleUrls: ['./risco-form.component.scss']
})
export class RiscoFormComponent implements OnInit {
  form = this.fb.group({
    nome: ['', Validators.required],
  });
  risco: Risco;
  url = this.route.snapshot.url[0].path;

  constructor(private fb: FormBuilder, private titleService: TitleService,
              private render: Renderer2,
              private riscoService: RiscoService, private errorService: ErrorService,
              private alertService: AlertService, private route: ActivatedRoute,
              private router: Router, private spinner: SpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.url == 'create' ? this.titleService.send('Risco - Novo Risco') : this.titleService.send('Risco - Editar Risco');

    const id = this.route.snapshot.params['id'];
    if (id != undefined) {
      this.riscoService.get(id).subscribe(res => {
        if (res.hasOwnProperty('error')) {
          this.errorService.sendError(res)
        } else {
          this.risco = res;
          this.form.get('nome').setValue(res.nome);
        }
      });
    }
    this.spinner.hide();
  }

  save() {
    let id = this.route.snapshot.params['id'];
    const risco = new Risco({
      id: id,
      nome: this.form.get('nome').value
    });

    this.riscoService.save(risco).subscribe((res) => {
      if (!res.hasOwnProperty('error')) {
        this.url == 'create' ?
          this.alertService.send(
            {message: 'Risco Criado!', type: 'success', icon: faCheck}
          ) :  this.alertService.send(
          {message: 'Risco Aterado!', type: 'success', icon: faCheck}
          ) ;

        setTimeout(() => {
          this.router.navigate(['/risco']);
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
