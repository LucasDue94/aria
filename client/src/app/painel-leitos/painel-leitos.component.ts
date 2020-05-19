import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {LeitoService} from '../core/leito/leito.service';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {Paciente} from '../core/paciente/paciente';
import {Leito} from '../core/leito/leito';
import {PacienteService} from '../core/paciente/paciente.service';
import {RegistroLeitoService} from '../core/registroLeito/registro-leito.service';
import {Location, ViewportScroller} from '@angular/common';
import {SpinnerService} from '../core/spinner/spinner.service';
import {ErrorService} from '../core/error/error.service';

@Component({
  selector: 'app-painel-leitos',
  templateUrl: './painel-leitos.component.html',
  styleUrls: ['./painel-leitos.component.scss']
})
export class PainelLeitosComponent implements OnInit {

  @ViewChild('tabela', {static: false, read: ElementRef}) tabela: ElementRef;
  @ViewChild('buttonResumo', {static: false, read: ElementRef}) buttonResumo: ElementRef;
  icon = faInfoCircle;
  leitos: Leito[];
  pacientes: Paciente[];
  setores = new Array<String>(8);
  showTable = false;
  statusArray = [
    {id: 'o', desc: 'Ocupado', class: 'ocupado'},
    {id: 'l', desc: 'Liberado', class: 'liberado'},
    {id: 'h', desc: 'Higienização', class: 'higienizacao'},
    {id: 'm', desc: 'Manutenção', class: 'manutencao'},
    {id: 'i', desc: 'Interditado', class: 'interditado'},
    {id: 'r', desc: 'Reservado', class: 'reservado'},
    {id: 'a', desc: 'Alta', class: 'alta-adm'},
    {id: 'am', desc: 'Alta Médica', class: 'alta-medica'}];

  constructor(private leitoService: LeitoService, private render: Renderer2,
              private pacienteService: PacienteService, private registroLeitoService: RegistroLeitoService,
              private viewportScroller: ViewportScroller, private spinner: SpinnerService,
              private errorService: ErrorService, private location: Location) {
    this.refresh = this.refresh.bind(this);
  }


  ngOnInit() {
    this.spinner.show();
    this.buildLayout();
    this.refresh()
    setInterval(this.refresh, 30000);
  }

  buildLayout() {
    const nav = document.getElementsByClassName('aria-nav')[0];
    const mainContainer = document.getElementsByClassName('main-container')[0];
    this.render.setStyle(nav, 'display', 'none');
    this.render.setStyle(mainContainer, 'margin', '0');
    this.render.setStyle(mainContainer, 'margin-top', '50px');
    this.render.setStyle(mainContainer.firstChild, 'padding', '25px 0 0 0');
  }

  refresh() {
    this.leitoService.list().subscribe(leitos => {
      if (leitos.hasOwnProperty('error')) {
        this.errorService.sendError(leitos);
        this.location.back();
      } else {
        this.leitos = leitos;
        this.leitos.forEach((leito: Leito) => {
          leito.setor.descricao = PainelLeitosComponent.textTransform(leito.setor.descricao.toLowerCase());
          this.reArrangeSetores();
        });
      }
      this.spinner.hide();
    });
  }

  isFirstOfType(leito) {
    let leitosByTipo = this.filterLeitos(leito.setor.descricao).filter((el) => {
      return el.tipo == leito.tipo;
    });
    return leitosByTipo.indexOf(leito) == 0;
  }

  filterLeitos(setor): Leito[] {
    let leitos = [];
    if (this.leitos && this.leitos.length > 0) {

      leitos = this.leitos.filter((leito) => {
        return leito.setor.descricao == setor;
      });

      leitos.sort((a, b) => {
        const numbA = parseInt(this.removeChar(a.id));
        const numbB = parseInt(this.removeChar(b.id));
        if (numbA > numbB) return 1;
        if (numbA < numbB) return -1;
      });

      leitos.sort((a, b) => {
        if (a.tipo > b.tipo) return 1;
        if (a.tipo < b.tipo) return -1;
      });
    }
    return leitos;
  }

  static textTransform(text) {
    let newText = text.replace(/unidade ii.*/, 'unidade ii');
    newText = newText.replace(/hcor/, '');
    newText = newText.replace(/emergencia cardiologia/, 'uc');
    newText = newText.replace(/uti hc/, 'uti');
    return newText.toLowerCase().trim();
  }

  getColor(id) {
    let status = this.statusArray.find((status) => {
      return status.id == id.toLowerCase();
    });
    return status.class;
  }

  reArrangeSetores() {
    let array = [];
    array[0] = 'day-clinic';
    array[1] = 'unidade i';
    array[2] = 'unidade ii';
    array[3] = 'uti';
    array[4] = 'cti - urte';
    array[5] = 'cti - upo';
    array[6] = 'uc';
    array[7] = 'uti 3';
    this.setores = array;
  }

  removeChar = (text) => text.replace(/\D+/, '');

  padText = (text) => this.removeChar(text).padStart(3, '0');

  show() {
    this.showTable = !this.showTable;
    this.render.removeClass(this.tabela.nativeElement, this.showTable ? 'hide' : 'show');
    this.render.addClass(this.tabela.nativeElement, this.showTable ? 'show' : 'hide');
  }

  @HostListener('click', ['$event.target']) clickOut(event) {
    let element = event;
    let isTable = PainelLeitosComponent.findElement(element, this.tabela.nativeElement);
    let isButton = PainelLeitosComponent.findElement(element, this.buttonResumo.nativeElement);

    if (!isTable && !isButton && this.showTable) {
      this.show();
    }
  }

  static findElement(element, searchElement) {
    let found = false;
    while (element != undefined) {
      if (element == searchElement) found = true;
      element = element.parentNode;
    }
    return found;
  }

  showPaciente(event) {
    event.stopPropagation();
    const leitoSpan = event.target;
    let pacienteCard = this.render.nextSibling(leitoSpan);
    const row = leitoSpan.parentNode.parentNode;
    this.render.setStyle(pacienteCard, 'display', 'flex');
    if (window.innerWidth > 700) {
      this.setPositionCard(pacienteCard, leitoSpan);
    } else {
      this.render.setStyle(pacienteCard.firstChild, 'top', `${leitoSpan.getBoundingClientRect().top - row.getBoundingClientRect().top + 30}px`);
      leitoSpan.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
    }
  }

  hiddenPaciente(event) {
    const leitoSpan = event.target;
    let pacienteInfo = this.render.nextSibling(leitoSpan);
    this.render.setStyle(pacienteInfo, 'display', 'none');
  }

  setPositionCard(pacienteInfo, leitoSpan) {
    let pacienteCard = pacienteInfo.children[0];
    const body = document.getElementsByTagName('body')[0];
    const leitoDiv = this.render.parentNode(leitoSpan).getBoundingClientRect();

    if (pacienteCard) {
      if (leitoDiv.left + pacienteCard.offsetWidth >= body.offsetWidth) {
        if (leitoDiv.left - pacienteCard.offsetWidth <= 0) {
          this.render.setStyle(pacienteCard, 'left', `-200px`);
        } else {
          this.render.setStyle(pacienteCard, 'left', `-${pacienteCard.offsetWidth - 65}px`);
        }
      }
      if (leitoDiv.top + pacienteCard.offsetHeight > body.offsetHeight - 50) {
        this.render.setStyle(pacienteCard, 'top', `${-pacienteCard.offsetHeight - 10}px`);
      }
    }
  }


}
