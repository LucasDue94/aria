import {AfterViewInit, Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {SetorService} from "../../core/setor/setor.service";
import {FormBuilder, Validators} from "@angular/forms";
import {SetorWpdService} from "../../core/setor-wpd/setorWpd.service";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {faCheck, faChevronCircleLeft, faExclamationCircle, faFrown} from "@fortawesome/free-solid-svg-icons";
import {SetorWpd} from "../../core/setor-wpd/setorWpd";
import {Setor} from "../../core/setor/setor";
import {AlertService} from "../../core/alert/alert.service";
import {TitleService} from "../../core/title/title.service";

@Component({
  selector: 'app-setor-create',
  templateUrl: './setor-create.component.html',
  styleUrls: ['./setor-create.component.scss']
})
export class SetorCreateComponent implements OnInit, AfterViewInit {

  @ViewChild('shadow', {static: false}) shadow;
  selectedSetor: SetorWpd;
  faArrowCircleLeft = faChevronCircleLeft;
  form = this.fb.group({
    codWpd: ['', Validators.required],
    descricao: ['', Validators.required],
    sigla: ['', Validators.required],
    tipo: ['', Validators.required]
  });
  newSetor = new Setor();

  constructor(private setorAriaService: SetorService, private render: Renderer2,
              private fb: FormBuilder, public setorWpdService: SetorWpdService,
              private location: Location, private router: Router,
              private alertService: AlertService, private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.send('Setor - Novo setor');
  }

  ngAfterViewInit(): void {
    let body = this.render.parentNode(this.render.parentNode(this.render.parentNode(this.shadow.nativeElement).offsetParent));
    this.render.appendChild(body, this.shadow.nativeElement)
  }

  back() {
    let body = this.render.parentNode((this.shadow.nativeElement));
    this.render.removeChild(body, this.shadow.nativeElement);
    this.router.navigate(['/setor', 'list']);
  }

  selectedData(event) {
    this.selectedSetor = event;
    this.render.setStyle(this.shadow.nativeElement, 'display', 'none');
    this.setForm();
  }

  setForm() {
    this.form.get('codWpd').setValue(this.selectedSetor.id);
    this.form.get('descricao').setValue(this.selectedSetor.descricao);
  }

  setValues() {
    this.newSetor.setorWpd.id = this.form.get('codWpd').value;
    this.newSetor.descricao = this.form.get('descricao').value;
    this.newSetor.sigla = this.form.get('sigla').value;
    this.newSetor.tipoSetor = this.form.get('tipo').value;
  }

  save() {
    this.setValues();
    if (this.form.valid) {
      this.setorAriaService.save(this.newSetor).subscribe(res => {
        let messageError = '';
        if (res.hasOwnProperty('error')) {
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
        } else {
          this.alertService.send({message: 'Novo setor cadastrado!', type: 'success', icon: faCheck});
          setTimeout(() => {
            this.router.navigate(['/setor', 'list']);
          }, 300);
        }
      });
    } else {
      this.alertService.send({
        message: 'Preencha todos os campos',
        type: 'warning',
        icon: faExclamationCircle
      });
    }
  }
}
