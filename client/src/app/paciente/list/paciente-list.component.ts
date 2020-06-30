import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {SetorService} from "../../core/setor/setor.service";
import {PacienteService} from "../../core/paciente/paciente.service";
import {Paciente} from "../../core/paciente/paciente";
import {Setor} from "../../core/setor/setor";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {TitleService} from "../../core/title/title.service";

@Component({
  selector: 'paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.scss']
})

export class PacienteListComponent implements OnInit {

  @ViewChild('collapse', {static: false}) collapse: ElementRef;
  setores: Setor[] = [];
  faPlus = faPlus;
  faMin = faMinus;
  listLoading;
  pacientes: Paciente[] = [];

  constructor(private titleService: TitleService, private setorService: SetorService, private pacienteService: PacienteService, private render: Renderer2) {
  }

  ngOnInit(): void {
    this.titleService.send('Evoluções - Pacientes Internos');
    this.setorService.list().subscribe(setor => {
      this.setores = setor;
    });
    this.pacienteService.list().subscribe(paciente => {
      this.pacientes = paciente;
    })
  }

  scrollDown() {

  }

  open(id?: any) {
    this.collapse.nativeElement.childNodes.forEach(node => {
      if (node.id === id) {
        if (node.lastChild.classList.contains('collapse-none')) {
          this.render.removeClass(node.lastChild, 'collapse-none');
          this.render.addClass(node.childNodes[0].lastChild, 'collapse-none');
        }
      }
    });
  }

  close(id: any) {
    this.collapse.nativeElement.childNodes.forEach(node => {
      if (node.id === id) {
        if (node.lastChild.classList.contains('collapse-content')) {
          this.render.addClass(node.lastChild, 'collapse-none');
          this.render.removeClass(node.childNodes[0].lastChild, 'collapse-none');
        }
      }
    });
  }
}
