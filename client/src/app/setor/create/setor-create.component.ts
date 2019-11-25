import {AfterViewInit, Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {SpinnerService} from "../../core/spinner/spinner.service";
import {SetorService} from "../../core/setor/setor.service";
import {FormBuilder, Validators} from "@angular/forms";
import {SetorWpdService} from "../../core/setor-wpd/setorWpd.service";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {faArrowCircleLeft, faCheck, faFrown} from "@fortawesome/free-solid-svg-icons";
import {SetorWpd} from "../../core/setor-wpd/setorWpd";
import {Setor} from "../../core/setor/setor";
import {AlertService} from "../../core/alert/alert.service";

@Component({
  selector: 'app-setor-create',
  templateUrl: './setor-create.component.html',
  styleUrls: ['./setor-create.component.scss']
})
export class SetorCreateComponent implements OnInit, AfterViewInit {

  @ViewChild('shadow', {static: false}) shadow;
  selectedSetor: SetorWpd;
  faArrowCircleLeft = faArrowCircleLeft;
  form = this.fb.group({
    codWpd: ['', Validators.required],
    descricao: ['', Validators.required],
    sigla: ['', Validators.required],
    tipo: ['', Validators.required]
  });
  newSetor = new Setor();

  constructor(private spinner: SpinnerService, private setorAriaService: SetorService,
              private render: Renderer2, private fb: FormBuilder, private setorWpdService: SetorWpdService,
              private location: Location, private router: Router, private alertService: AlertService) {
  }

  ngOnInit() {
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
    console.log(this.selectedSetor)
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
    console.log(this.newSetor)
  }

  save() {
    this.setValues();
    if (this.form.valid) {
      this.setorAriaService.save(this.newSetor).subscribe(res => {
        console.log(res);
        if (res.hasOwnProperty('error')) {
          // this.router.navigate(['/setor', 'list']);
          console.log(res.json);
          this.alertService.send({
            message: 'Ops... não foi possível cadastrar este novo setor!',
            type: 'error',
            icon: faFrown
          });
        } else if (!res.hasOwnProperty('error')) {
          this.alertService.send({message: 'Novo setor cadastrado!', type: 'success', icon: faCheck});
          setTimeout(() => {
            this.router.navigate(['/setor', 'list']);
          }, 300);
        }
      })
    }else{
      alert('opa')
    }
  }
}
