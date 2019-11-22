import {AfterViewInit, Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {SpinnerService} from "../../core/spinner/spinner.service";
import {SetorService} from "../../core/setor/setor.service";
import {FormBuilder} from "@angular/forms";
import {SetorWpdService} from "../../core/setor-wpd/setorWpd.service";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-setor-create',
  templateUrl: './setor-create.component.html',
  styleUrls: ['./setor-create.component.scss']
})
export class SetorCreateComponent implements OnInit, AfterViewInit {

  @ViewChild('shadow', {static: false}) shadow;
  form = this.fb.group({
    codWpd: [],
    descricao: [],
    sigla: [],
    tipo: []
  });

  constructor(private spinner: SpinnerService, private setorAriaService: SetorService,
              private render: Renderer2, private fb: FormBuilder, private setorWpdService: SetorWpdService,
              private location: Location, private router: Router) {
  }

  ngOnInit() {
    this.setorWpdService.list('', '').subscribe(res => console.log(res));
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


}
