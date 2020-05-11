import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {LeitoService} from '../core/leito/leito.service';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {Paciente} from '../core/paciente/paciente';
import {Leito} from '../core/leito/leito';
import {PacienteService} from '../core/paciente/paciente.service';
import {RegistroLeitoService} from '../core/registroLeito/registro-leito.service';

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
  setoresFiltrados = new Set();
  setoresOrdenados = new Array<String>(7);
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
              private pacienteService: PacienteService, private registroLeitoService: RegistroLeitoService) {
    // this.refresh = this.refresh.bind(this);
  }


  ngOnInit() {
    this.buildLayout();
    this.refresh();
    // this.refresh();
    // setInterval(this.refresh, 60000);
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
    let jsonLeitos = [{'setorWpd': 'cti - upo', 'numero': 'upo01', 'tipo': 'uti', 'status': 'o'}, {
      'setorWpd': 'cti - upo',
      'numero': 'upo02',
      'tipo': 'uti',
      'status': 'o'
    }, {'setorWpd': 'cti - upo', 'numero': 'upo03', 'tipo': 'uti', 'status': 'o'}, {
      'setorWpd': 'cti - upo',
      'numero': 'upo04',
      'tipo': 'uti',
      'status': 'o'
    }, {'setorWpd': 'cti - upo', 'numero': 'upo05', 'tipo': 'uti', 'status': 'o'}, {
      'setorWpd': 'cti - upo',
      'numero': 'upo06',
      'tipo': 'uti',
      'status': 'o'
    }, {'setorWpd': 'cti - upo', 'numero': 'upo07', 'tipo': 'uti', 'status': 'o'}, {
      'setorWpd': 'cti - upo',
      'numero': 'upo08',
      'tipo': 'uti',
      'status': 'o'
    }, {'setorWpd': 'cti - upo', 'numero': 'upo09', 'tipo': 'uti', 'status': 'o'}, {
      'setorWpd': 'cti - upo',
      'numero': 'upo10',
      'tipo': 'uti',
      'status': 'o'
    }, {'setorWpd': 'cti - urte', 'numero': 'urt01', 'tipo': 'uti', 'status': 'o'}, {
      'setorWpd': 'cti - urte',
      'numero': 'urt02',
      'tipo': 'uti',
      'status': 'o'
    }, {'setorWpd': 'cti - urte', 'numero': 'urt03', 'tipo': 'uti', 'status': 'o'}, {
      'setorWpd': 'cti - urte',
      'numero': 'urt04',
      'tipo': 'uti',
      'status': 'o'
    }, {'setorWpd': 'day-clinic', 'numero': '101.c', 'tipo': 'day-clinic', 'status': 'o'}, {
      'setorWpd': 'day-clinic',
      'numero': '102.c',
      'tipo': 'day-clinic',
      'status': 'o'
    }, {'setorWpd': 'day-clinic', 'numero': '103.c', 'tipo': 'day-clinic', 'status': 'o'}, {
      'setorWpd': 'day-clinic',
      'numero': '104.c',
      'tipo': 'day-clinic',
      'status': 'o'
    }, {
      'setorWpd': 'emergencia cardiologia hcor',
      'numero': 'uc.1',
      'tipo': 'uti',
      'status': 'l'
    }, {
      'setorWpd': 'emergencia cardiologia hcor',
      'numero': 'uc.2',
      'tipo': 'uti',
      'status': 'l'
    }, {
      'setorWpd': 'emergencia cardiologia hcor',
      'numero': 'uc.3',
      'tipo': 'uti',
      'status': 'l'
    }, {
      'setorWpd': 'emergencia cardiologia hcor',
      'numero': 'uc.4',
      'tipo': 'uti',
      'status': 'l'
    }, {
      'setorWpd': 'emergencia cardiologia hcor',
      'numero': 'uc.5',
      'tipo': 'uti',
      'status': 'l'
    }, {
      'setorWpd': 'emergencia cardiologia hcor',
      'numero': 'uc.6',
      'tipo': 'uti',
      'status': 'l'
    }, {'setorWpd': 'emergencia cardiologia hcor', 'numero': 'uc.7', 'tipo': 'uti', 'status': 'l'}, {
      'setorWpd': 'unidade i hcor',
      'numero': '105.c',
      'tipo': 'apartamento',
      'status': 'o'
    }, {'setorWpd': 'unidade i', 'numero': '106.c', 'tipo': 'enf. pediatrica', 'status': 'o'}, {
      'setorWpd': 'unidade i hcor',
      'numero': '107.c',
      'tipo': 'enf. pediatrica',
      'status': 'l'
    }, {'setorWpd': 'unidade i hcor', 'numero': '108.c', 'tipo': 'enf. pediatrica', 'status': 'o'}, {
      'setorWpd': 'unidade i hcor',
      'numero': '109.c',
      'tipo': 'enf. pediatrica',
      'status': 'l'
    }, {'setorWpd': 'unidade i hcor', 'numero': '110.c', 'tipo': 'apartamento', 'status': 'o'}, {
      'setorWpd': 'unidade i hcor',
      'numero': '111.c',
      'tipo': 'apartamento',
      'status': 'o'
    }, {'setorWpd': 'unidade i hcor', 'numero': '112.c', 'tipo': 'apartamento', 'status': 'o'}, {
      'setorWpd': 'unidade ii',
      'numero': 'en205',
      'tipo': 'enfermaria',
      'status': 'l'
    }, {'setorWpd': 'unidade ii', 'numero': 'en206', 'tipo': 'enfermaria', 'status': 'l'}, {
      'setorWpd': 'unidade ii',
      'numero': 'en207',
      'tipo': 'enfermaria',
      'status': 'l'
    }, {'setorWpd': 'unidade ii', 'numero': 'en208', 'tipo': 'enfermaria', 'status': 'l'}, {
      'setorWpd': 'unidade ii',
      'numero': 'st230',
      'tipo': 'suite',
      'status': 'l'
    }, {'setorWpd': 'unidade ii', 'numero': 'st235', 'tipo': 'suite', 'status': 'o'}, {
      'setorWpd': 'unidade ii',
      'numero': 'st236',
      'tipo': 'suite',
      'status': 'l'
    }, {'setorWpd': 'unidade ii', 'numero': 'st237', 'tipo': 'suite', 'status': 'o'}, {
      'setorWpd': 'unidade ii',
      'numero': '201 c',
      'tipo': 'apartamento',
      'status': 'o'
    }, {'setorWpd': 'unidade ii', 'numero': '202 c', 'tipo': 'apartamento', 'status': 'o'}, {
      'setorWpd': 'unidade ii',
      'numero': '203 c',
      'tipo': 'apartamento',
      'status': 'l'
    }, {'setorWpd': 'unidade ii', 'numero': '204 c', 'tipo': 'apartamento', 'status': 'i'}, {
      'setorWpd': 'unidade ii',
      'numero': '209 c',
      'tipo': 'apartamento',
      'status': 'o'
    }, {'setorWpd': 'unidade ii', 'numero': '210 c', 'tipo': 'apartamento', 'status': 'o'}, {
      'setorWpd': 'unidade ii',
      'numero': '211.c',
      'tipo': 'apartamento',
      'status': 'o'
    }, {'setorWpd': 'unidade ii', 'numero': '212.c', 'tipo': 'apartamento', 'status': 'l'}, {
      'setorWpd': 'unidade ii',
      'numero': '213.c',
      'tipo': 'apartamento',
      'status': 'l'
    }, {'setorWpd': 'unidade ii', 'numero': '214.c', 'tipo': 'apartamento', 'status': 'o'}, {
      'setorWpd': 'unidade ii',
      'numero': '215.c',
      'tipo': 'apartamento',
      'status': 'o'
    }, {'setorWpd': 'unidade ii', 'numero': '216.c', 'tipo': 'apartamento', 'status': 'o'}, {
      'setorWpd': 'unidade ii',
      'numero': '217.c',
      'tipo': 'apartamento',
      'status': 'o'
    }, {'setorWpd': 'unidade ii', 'numero': '218.c', 'tipo': 'apartamento', 'status': 'l'}, {
      'setorWpd': 'unidade ii',
      'numero': '219.c',
      'tipo': 'apartamento',
      'status': 'l'
    }, {'setorWpd': 'unidade ii', 'numero': '220.c', 'tipo': 'apartamento', 'status': 'o'}, {
      'setorWpd': 'unidade ii',
      'numero': '221.c',
      'tipo': 'apartamento',
      'status': 'o'
    }, {'setorWpd': 'unidade ii', 'numero': '222.c', 'tipo': 'apartamento', 'status': 'l'}, {
      'setorWpd': 'unidade ii',
      'numero': '223.c',
      'tipo': 'apartamento',
      'status': 'o'
    }, {'setorWpd': 'unidade ii', 'numero': '224.c', 'tipo': 'apartamento', 'status': 'o'}, {
      'setorWpd': 'unidade ii',
      'numero': '225.c',
      'tipo': 'apartamento',
      'status': 'o'
    }, {'setorWpd': 'unidade ii', 'numero': '226.c', 'tipo': 'apartamento', 'status': 'l'}, {
      'setorWpd': 'unidade ii',
      'numero': '227.c',
      'tipo': 'apartamento',
      'status': 'o'
    }, {'setorWpd': 'unidade ii', 'numero': '228.c', 'tipo': 'apartamento', 'status': 'o'}, {
      'setorWpd': 'unidade ii',
      'numero': '229.c',
      'tipo': 'apartamento',
      'status': 'o'
    }, {'setorWpd': 'unidade ii', 'numero': '231.c', 'tipo': 'apartamento', 'status': 'o'}, {
      'setorWpd': 'unidade ii',
      'numero': '232.c',
      'tipo': 'apartamento',
      'status': 'l'
    }, {'setorWpd': 'unidade ii', 'numero': '233.c', 'tipo': 'apartamento', 'status': 'l'}, {
      'setorWpd': 'unidade ii',
      'numero': '234.c',
      'tipo': 'apartamento',
      'status': 'o'
    }, {'setorWpd': 'uti hc', 'numero': 'ugc.1', 'tipo': 'uti', 'status': 'o'}, {
      'setorWpd': 'uti hc',
      'numero': 'ugc10',
      'tipo': 'uti',
      'status': 'o'
    }, {'setorWpd': 'uti hc', 'numero': 'ugc11', 'tipo': 'uti', 'status': 'o'}, {
      'setorWpd': 'uti hc',
      'numero': 'ugc12',
      'tipo': 'uti',
      'status': 'l'
    }, {'setorWpd': 'uti hc', 'numero': 'ugc.2', 'tipo': 'uti', 'status': 'l'}, {
      'setorWpd': 'uti hc',
      'numero': 'ugc.3',
      'tipo': 'uti',
      'status': 'o'
    }, {'setorWpd': 'uti hc', 'numero': 'ugc.4', 'tipo': 'uti', 'status': 'o'}, {
      'setorWpd': 'uti hc',
      'numero': 'ugc.5',
      'tipo': 'uti',
      'status': 'o'
    }, {'setorWpd': 'uti hc', 'numero': 'ugc.6', 'tipo': 'uti', 'status': 'o'}, {
      'setorWpd': 'uti hc',
      'numero': 'ugc.7',
      'tipo': 'uti',
      'status': 'l'
    }, {'setorWpd': 'uti hc', 'numero': 'ugc.8', 'tipo': 'uti', 'status': 'o'}, {
      'setorWpd': 'uti hc',
      'numero': 'ugc.9',
      'tipo': 'uti',
      'status': 'o'
    }, {'setorWpd': 'uti 3', 'numero': 'uti.1', 'tipo': 'uti', 'status': 'l'}, {
      'setorWpd': 'uti 3',
      'numero': 'uti.2',
      'tipo': 'uti',
      'status': 'l'
    }, {'setorWpd': 'uti 3', 'numero': 'uti.3', 'tipo': 'uti', 'status': 'l'}, {
      'setorWpd': 'uti 3',
      'numero': 'uti.4',
      'tipo': 'uti',
      'status': 'l'
    }];
    this.leitos = jsonLeitos.map((obj: any) => new Leito(obj));
    let jsonPacientes = [{
      'leito': 'upo07',
      'registro': '0233615',
      'prontuario': '000354535',
      'mae': 'lidalva barbosa vasconcelos',
      'nome': 'marco antonio barbosa vasconcelos',
      'nascimento': '1962-06-29',
      'convenio': 'amil'
    }, {
      'leito': '111.c',
      'registro': '0233811',
      'prontuario': '000404238',
      'mae': 'grinauria ramos de oliveira',
      'nome': 'edvaldo ramos de oliveira',
      'nascimento': '1953-03-12',
      'convenio': 'asfal saude'
    }, {
      'leito': 'ugc.3',
      'registro': '0233432',
      'prontuario': '000349120',
      'mae': 'julieta maia fernandes',
      'nome': 'jairon maia fernandes',
      'nascimento': '1934-01-05',
      'convenio': 'bradesco'
    }, {
      'leito': 'urt03',
      'registro': '0233694',
      'prontuario': '000404225',
      'mae': 'maria jose dos santos albuquerque',
      'nome': 'danielle patricia albuquerque dantas',
      'nascimento': '1975-03-09',
      'convenio': 'bradesco'
    }, {
      'leito': 'upo09',
      'registro': '0233657',
      'prontuario': '000404214',
      'mae': 'maria josefa da conceicao',
      'nome': 'manoel jose dos santos',
      'nascimento': '1959-07-18',
      'convenio': 'bradesco'
    }, {
      'leito': 'upo02',
      'registro': '0233482',
      'prontuario': '000404170',
      'mae': 'elza lisboa lima',
      'nome': 'jose odilon lisboa lima',
      'nascimento': '1942-09-19',
      'convenio': 'bradesco'
    }, {
      'leito': 'upo01',
      'registro': '0231030',
      'prontuario': '000403597',
      'mae': 'maria barreiros reis',
      'nome': 'joaquim barreiros reis',
      'nascimento': '1926-02-03',
      'convenio': 'bradesco'
    }, {
      'leito': '229.c',
      'registro': '0233818',
      'prontuario': '000404261',
      'mae': 'elionai lima do nascimento',
      'nome': 'daysianne carla lima do nascimento',
      'nascimento': '1991-04-04',
      'convenio': 'bradesco'
    }, {
      'leito': '211.c',
      'registro': '0233879',
      'prontuario': '000404277',
      'mae': 'maria cristina goncalves da silva cordeiro',
      'nome': 'gabriela cristina goncalves da silva cordeiro',
      'nascimento': '1999-11-17',
      'convenio': 'bradesco'
    }, {
      'leito': '210 c',
      'registro': '0233868',
      'prontuario': '000366039',
      'mae': 'maria geruza malta rocha',
      'nome': 'antonino malta da rocha cavalcanti',
      'nascimento': '1963-06-07',
      'convenio': 'bradesco'
    }, {
      'leito': '112.c',
      'registro': '0233258',
      'prontuario': '000387878',
      'mae': 'maria de albuquerque almeida',
      'nome': 'everaldo de albuquerque almeida',
      'nascimento': '1951-12-23',
      'convenio': 'bradesco'
    }, {
      'leito': 'l2hge',
      'registro': '0177181',
      'prontuario': '000391033',
      'mae': 'maria laura da conceicao',
      'nome': 'maria augusta dos santos',
      'nascimento': '1942-05-08',
      'convenio': 'fundacaocordial'
    }, {
      'leito': 'l1hge',
      'registro': '0222812',
      'prontuario': '000401921',
      'mae': 'otacilia da silva',
      'nome': 'heleno francisco da silva',
      'nascimento': '1950-02-08',
      'convenio': 'fundacaocordial'
    }, {
      'leito': 'ugc11',
      'registro': '0233842',
      'prontuario': '000381128',
      'mae': 'maria analia de abreu',
      'nome': 'antonio barbosa abreu',
      'nascimento': '1935-06-13',
      'convenio': 'geap'
    }, {
      'leito': 'ugc10',
      'registro': '0233586',
      'prontuario': '000404196',
      'mae': 'maria correa pinto',
      'nome': 'maria das neves pinto almeida',
      'nascimento': '1940-01-24',
      'convenio': 'geap'
    }, {
      'leito': 'ugc.5',
      'registro': '0233520',
      'prontuario': '000348410',
      'mae': 'januaria guedes cavalcante',
      'nome': 'antonia cleonice cavalcante',
      'nascimento': '1926-08-30',
      'convenio': 'geap'
    }, {
      'leito': 'upo04',
      'registro': '0233876',
      'prontuario': '000359901',
      'mae': 'jacira rufino de araujo',
      'nome': 'jose mussoline brandao',
      'nascimento': '1939-12-27',
      'convenio': 'geap'
    }, {
      'leito': '103.c',
      'registro': '0231921',
      'prontuario': '000399210',
      'mae': 'nitecy goncalves de abreu',
      'nome': 'carolina goncalves de abreu valenca',
      'nascimento': '1982-04-15',
      'convenio': 'geap'
    }, {
      'leito': '102.c',
      'registro': '0233885',
      'prontuario': '000404287',
      'mae': 'janira tenorio ribeiro',
      'nome': 'maria aparecida dos santos davino',
      'nascimento': '1971-05-30',
      'convenio': 'geap'
    }, {
      'leito': 'upo10',
      'registro': '0232731',
      'prontuario': '000404002',
      'mae': 'josefa rodrigues de moraes',
      'nome': 'maria jose dos santos',
      'nascimento': '1922-02-09',
      'convenio': 'petrobras '
    }, {
      'leito': 'upo08',
      'registro': '0233453',
      'prontuario': '000404161',
      'mae': 'maria do socorro de melo agra',
      'nome': 'eduardo henrique de melo agra',
      'nascimento': '1954-01-05',
      'convenio': 'saude caixa'
    }, {
      'leito': 'urt01',
      'registro': '0233850',
      'prontuario': '000356008',
      'mae': 'maria tamar de melo lopes',
      'nome': 'luiz guilherme de melo lopes',
      'nascimento': '1978-10-14',
      'convenio': 'sul america'
    }, {
      'leito': '223.c',
      'registro': '0233670',
      'prontuario': '000404205',
      'mae': 'nencia de fatima de holanda lessa',
      'nome': 'leticia de holanda lessa',
      'nascimento': '1998-09-17',
      'convenio': 'sul america'
    }, {
      'leito': 'ugc.9',
      'registro': '0233769',
      'prontuario': '000393059',
      'mae': 'marieta barros da silva',
      'nome': 'indalecio magalhaes',
      'nascimento': '1966-11-20',
      'convenio': 'unimed'
    }, {
      'leito': 'ugc.8',
      'registro': '0233800',
      'prontuario': '000404268',
      'mae': 'maria de lourdes oliveira de vasconcellos',
      'nome': 'roseane maria vasconcellos macias',
      'nascimento': '1957-12-17',
      'convenio': 'unimed'
    }, {
      'leito': 'ugc.6',
      'registro': '0233759',
      'prontuario': '000404257',
      'mae': 'raimunda arres de araujo',
      'nome': 'erivan barros de araujo',
      'nascimento': '1943-12-24',
      'convenio': 'unimed'
    }, {
      'leito': 'ugc.4',
      'registro': '0233755',
      'prontuario': '000404254',
      'mae': 'vandete de oliveira mota',
      'nome': 'christine mary mota alcides',
      'nascimento': '1950-11-10',
      'convenio': 'unimed'
    }, {
      'leito': 'ugc.1',
      'registro': '0233732',
      'prontuario': '000386176',
      'mae': 'josefa martins silva',
      'nome': 'dinario fernandes silva',
      'nascimento': '1937-08-15',
      'convenio': 'unimed'
    }, {
      'leito': '206',
      'registro': '0001937',
      'prontuario': '000344705',
      'mae': 'rita rodrigues de souza',
      'nome': 'luiza rodrigues dos santos',
      'nascimento': '1923-12-08',
      'convenio': 'unimed'
    }, {
      'leito': 'urt04',
      'registro': '0233476',
      'prontuario': '000376823',
      'mae': 'rosa maria magalhaes villela',
      'nome': 'roberto carlos magalhaes villela',
      'nascimento': '1966-02-23',
      'convenio': 'unimed'
    }, {
      'leito': 'urt02',
      'registro': '0233103',
      'prontuario': '000404092',
      'mae': 'nazarita costa de oliveira',
      'nome': 'cleber costa de oliveira',
      'nascimento': '1952-07-09',
      'convenio': 'unimed'
    }, {
      'leito': 'upo06',
      'registro': '0232694',
      'prontuario': '000355316',
      'mae': 'maria de lourdes nogueira',
      'nome': 'zilta da silva nogueira',
      'nascimento': '1938-05-27',
      'convenio': 'unimed'
    }, {
      'leito': 'upo05',
      'registro': '0233477',
      'prontuario': '000365897',
      'mae': 'leurides braga magalhaes',
      'nome': 'rosa maria magalhaes villela',
      'nascimento': '1942-03-03',
      'convenio': 'unimed'
    }, {
      'leito': 'upo03',
      'registro': '0233775',
      'prontuario': '000381906',
      'mae': 'ivonilde r cajueiro',
      'nome': 'carlos antonio ramos cajueiro',
      'nascimento': '1951-11-26',
      'convenio': 'unimed'
    }, {
      'leito': 'st237',
      'registro': '0233023',
      'prontuario': '000404073',
      'mae': 'ernestina marques de omena',
      'nome': 'rosita joaquim pontes',
      'nascimento': '1932-07-25',
      'convenio': 'unimed'
    }, {
      'leito': 'st235',
      'registro': '0233314',
      'prontuario': '000404128',
      'mae': 'marina coelho araujo',
      'nome': 'valeria elodia coelho araujo gomes',
      'nascimento': '1957-02-10',
      'convenio': 'unimed'
    }, {
      'leito': '234.c',
      'registro': '0233507',
      'prontuario': '000370094',
      'mae': 'francisca ferreira da costa ferro',
      'nome': 'carlos romerio costa ferro',
      'nascimento': '1977-01-29',
      'convenio': 'unimed'
    }, {
      'leito': '231.c',
      'registro': '0233614',
      'prontuario': '000404047',
      'mae': 'edleusa da rocha marques',
      'nome': 'raphaella da rocha marques',
      'nascimento': '1980-06-23',
      'convenio': 'unimed'
    }, {
      'leito': '228.c',
      'registro': '0232050',
      'prontuario': '000403825',
      'mae': 'diamantina lins peixoto',
      'nome': 'rubiao lins peixoto',
      'nascimento': '1934-09-11',
      'convenio': 'unimed'
    }, {
      'leito': '227.c',
      'registro': '0233774',
      'prontuario': '000404244',
      'mae': 'suzana rocha de souza leao',
      'nome': 'natalia de souza leao oliveira',
      'nascimento': '1985-09-20',
      'convenio': 'unimed'
    }, {
      'leito': '225.c',
      'registro': '0233750',
      'prontuario': '000403959',
      'mae': 'ilsarlette alves conceicao andrade',
      'nome': 'cristiano alves de andrade',
      'nascimento': '1977-08-03',
      'convenio': 'unimed'
    }, {
      'leito': '224.c',
      'registro': '0233525',
      'prontuario': '000404175',
      'mae': 'talma pereira de albuqueruqe',
      'nome': 'silvana martha pereira de albuquerque',
      'nascimento': '1966-09-05',
      'convenio': 'unimed'
    }, {
      'leito': '221.c',
      'registro': '0233593',
      'prontuario': '000373170',
      'mae': 'stela maria bezerra',
      'nome': 'lucilene bezerra calheiros',
      'nascimento': '1982-01-15',
      'convenio': 'unimed'
    }, {
      'leito': '220.c',
      'registro': '0233578',
      'prontuario': '000404191',
      'mae': 'maria helena cavalcante de lima',
      'nome': 'suely cavalcante de lima',
      'nascimento': '1966-07-10',
      'convenio': 'unimed'
    }, {
      'leito': '217.c',
      'registro': '0233330',
      'prontuario': '000385879',
      'mae': 'gloria xavier gamito',
      'nome': 'vera lucia gamito ribeiro',
      'nascimento': '1952-07-05',
      'convenio': 'unimed'
    }, {
      'leito': '216.c',
      'registro': '0233435',
      'prontuario': '000404155',
      'mae': 'edna cavalcanti de oliveira',
      'nome': 'aryana cavalcanti de oliveira magalhaes villela',
      'nascimento': '1972-03-15',
      'convenio': 'unimed'
    }, {
      'leito': '215.c',
      'registro': '0233527',
      'prontuario': '000404179',
      'mae': 'maria santina da conceicao',
      'nome': 'maria jose da conceicao silva',
      'nascimento': '1939-10-16',
      'convenio': 'unimed'
    }, {
      'leito': '214.c',
      'registro': '0233472',
      'prontuario': '000350505',
      'mae': 'edilia omena de freitas',
      'nome': 'arakem damara de omena freitas',
      'nascimento': '1934-09-07',
      'convenio': 'unimed'
    }, {
      'leito': '209 c',
      'registro': '0233293',
      'prontuario': '000364085',
      'mae': 'ida stefanelli mortari',
      'nome': 'umberto roberto mortari',
      'nascimento': '1943-02-16',
      'convenio': 'unimed'
    }, {
      'leito': '202 c',
      'registro': '0233528',
      'prontuario': '000404181',
      'mae': 'leidjane maria de albuquerque medeiros',
      'nome': 'raphael warner de albuquerque medeiros',
      'nascimento': '1985-10-26',
      'convenio': 'unimed'
    }, {
      'leito': '201 c',
      'registro': '0233878',
      'prontuario': '000404282',
      'mae': 'maria aparecida barros de souza camara',
      'nome': 'camilo barros de souza camara',
      'nascimento': '1982-12-19',
      'convenio': 'unimed'
    }, {
      'leito': '110.c',
      'registro': '0232732',
      'prontuario': '000350561',
      'mae': 'ana viana dos santos',
      'nome': 'alda viana goncalves ferreira',
      'nascimento': '1957-07-04',
      'convenio': 'unimed'
    }, {
      'leito': '108.c',
      'registro': '0232111',
      'prontuario': '000383226',
      'mae': 'julia maria da silva',
      'nome': 'marlene maria da silva',
      'nascimento': '1938-07-10',
      'convenio': 'unimed'
    }, {
      'leito': '106.c',
      'registro': '0233855',
      'prontuario': '000371038',
      'mae': 'lindinalva tavares pereira',
      'nome': 'roberto tavares pereira',
      'nascimento': '1950-07-06',
      'convenio': 'unimed'
    }, {
      'leito': '105.c',
      'registro': '0232021',
      'prontuario': '000345479',
      'mae': 'maria dolores de melo',
      'nome': 'maria luiza de melo pedroza',
      'nascimento': '1963-12-10',
      'convenio': 'unimed'
    }, {
      'leito': '104.c',
      'registro': '0233171',
      'prontuario': '000379999',
      'mae': 'darcy de araujo medeiros',
      'nome': 'dilma darcy medeiros',
      'nascimento': '1943-10-27',
      'convenio': 'unimed'
    }, {
      'leito': '101.c',
      'registro': '0233776',
      'prontuario': '000404266',
      'mae': 'vandete avelino barbosa ',
      'nome': 'josue avelino barbosa',
      'nascimento': '1964-01-30',
      'convenio': 'unimed'
    }];
    this.pacientes = jsonPacientes.map((obj: any) => new Paciente(obj));

    this.leitos.forEach((leito: Leito) => {
      leito.paciente = this.findPaciente(leito.numero);
      leito.setorWpd = PainelLeitosComponent.textTransform(leito.setorWpd);
      this.setoresFiltrados.add(leito.setorWpd);
      this.sortSetor();
    });

    /* this.leitoService.listPainel().subscribe(leitos => {
       this.leitos = leitos;
       console.log(leitos);
       this.leitoService.listPacientes().subscribe(pacientes => {
         this.pacientes = pacientes;
         console.log(pacientes);
         this.leitos.forEach((leito: Leito) => {
           leito.paciente = this.findPaciente(leito.numero);
           leito.setorWpd = PainelLeitosComponent.textTransform(leito.setorWpd);
           this.setoresFiltrados.add(leito.setorWpd);
     this.sortSetor();
         });
       });
     });*/
  }

  findPaciente(leito): Paciente {
    let paciente = new Paciente();
    this.pacientes.forEach((pac: Paciente) => {
      if (pac.leito.toLowerCase() === leito.toLowerCase()) {
        paciente = pac;
      }
    });
    return paciente;
  }

  isFirstOfType(leito) {
    let leitosByTipo = this.filterLeitos(leito.setorWpd).filter((el) => {
      return el.tipo == leito.tipo;
    });
    return leitosByTipo.indexOf(leito) == 0;
  }

  filterLeitos(setor): Leito[] {
    let leitos = [];
    if (this.leitos) leitos = this.leitos.filter((leito) => leito.setorWpd.toLowerCase() == setor.toLowerCase());

    leitos.sort((a, b) => {
      const numbA = parseInt(this.removeChar(a.numero));
      const numbB = parseInt(this.removeChar(b.numero));
      if (numbA > numbB) return 1;
      if (numbA < numbB) return -1;
    });

    leitos.sort((a, b) => {
      if (a.tipo > b.tipo) return 1;
      if (a.tipo < b.tipo) return -1;
    });
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
      return status.id.toLocaleLowerCase() == id;
    });
    return status.class;
  }

  sortSetor() {
    let array = Array.from(this.setoresFiltrados);
    array[0] = 'day-clinic';
    array[1] = 'unidade i';
    array[2] = 'unidade ii';
    array[3] = 'uti';
    array[4] = 'cti - urte';
    array[5] = 'cti - upo';
    array[6] = 'uc';
    array[7] = 'uti 3';
    this.setoresOrdenados = array;
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

  showPaciente(leitoSpan) {
    let pacienteInfo = this.render.nextSibling(leitoSpan);
    this.render.setProperty(pacienteInfo, 'hidden', false);
    this.setPositionCard(pacienteInfo, leitoSpan);
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

  hiddenPaciente(leitoSpan) {
    let pacienteInfo = this.render.nextSibling(leitoSpan);
    this.render.setProperty(pacienteInfo, 'hidden', true);
  }
}
