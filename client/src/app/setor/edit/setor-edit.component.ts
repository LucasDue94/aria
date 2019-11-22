import {Component, OnInit, Renderer2} from '@angular/core';
import {SpinnerService} from "../../core/spinner/spinner.service";
import {SetorService} from "../../core/setor/setor.service";
import {FormBuilder} from "@angular/forms";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {Setor} from "../../core/setor/setor";

@Component({
  selector: 'app-setor-edit',
  templateUrl: './setor-edit.component.html',
  styleUrls: ['../create/setor-create.component.scss']
})
export class SetorEditComponent implements OnInit {
  form = this.fb.group({
    codWpd: [],
    descricao: [],
    sigla: [],
    tipo: []
  });

  setor: Setor;

  constructor(private spinner: SpinnerService, private setorAriaService: SetorService,
              private render: Renderer2, private fb: FormBuilder,
              private location: Location, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.setorAriaService.get(params['id']).subscribe(setor => {
        if (setor.hasOwnProperty('error')) {
          console.log('deu ruim!');
        } else {
          this.setor = setor;
          this.form.get('codWpd').setValue(this.setor.id);
          this.form.get('descricao').setValue(this.setor.descricao);
          this.form.get('sigla').setValue(this.setor.sigla);
          this.form.get('tipo').setValue(this.setor.tipoSetor);
        }
      });
    });
  }

  setValues() {
    this.setor.id = this.form.get('codWpd').value;
    this.setor.descricao = this.form.get('descricao').value;
    this.setor.sigla = this.form.get('sigla').value;
    this.setor.tipoSetor = this.form.get('tipoSetor').value;
  }

  save() {
    this.setValues();
    this.setorAriaService.save(this.setor).subscribe(res => console.log(res));
  }
}
