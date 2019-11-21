import {AfterViewChecked, Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {SpinnerService} from "../../core/spinner/spinner.service";
import {SetorService} from "../../core/setor/setor.service";
import {FormBuilder} from "@angular/forms";
import {SetorWpdService} from "../../core/setor-wpd/setorWpd.service";

@Component({
  selector: 'app-setor-create',
  templateUrl: './setor-create.component.html',
  styleUrls: ['./setor-create.component.scss']
})
export class SetorCreateComponent implements OnInit, AfterViewChecked {

  @ViewChild('shadow', {static: false}) shadow;
  form = this.fb.group({
    codWpd: [],
    descricao: [],
    sigla: [],
    tipo: []
  });

  constructor(private spinner: SpinnerService, private setorAriaService: SetorService,
              private render: Renderer2, private fb: FormBuilder, private setorWpdService: SetorWpdService) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
        let body = this.render.parentNode(this.render.parentNode(this.render.parentNode(this.shadow.nativeElement).offsetParent));
        this.render.appendChild(body, this.shadow.nativeElement)
  }

}
