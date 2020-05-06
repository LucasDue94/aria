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
    const nav = document.getElementsByClassName('aria-nav')[0]
    const mainContainer = document.getElementsByClassName('main-container')[0]
    this.render.setStyle(nav,'display','none');
    this.render.setStyle(mainContainer,'margin','0');
    this.render.setStyle(mainContainer,'margin-top','50px');
    this.refresh();
    // this.refresh();
    // setInterval(this.refresh, 60000);
  }

  refresh() {
    let jsonLeitos =[{"setorWpd":"cti - upo","numero":"upo01","tipo":"uti","status":"o"},{"setorWpd":"cti - upo","numero":"upo02","tipo":"uti","status":"o"},{"setorWpd":"cti - upo","numero":"upo03","tipo":"uti","status":"o"},{"setorWpd":"cti - upo","numero":"upo04","tipo":"uti","status":"o"},{"setorWpd":"cti - upo","numero":"upo05","tipo":"uti","status":"o"},{"setorWpd":"cti - upo","numero":"upo06","tipo":"uti","status":"o"},{"setorWpd":"cti - upo","numero":"upo07","tipo":"uti","status":"o"},{"setorWpd":"cti - upo","numero":"upo08","tipo":"uti","status":"l"},{"setorWpd":"cti - upo","numero":"upo09","tipo":"uti","status":"l"},{"setorWpd":"cti - upo","numero":"upo10","tipo":"uti","status":"o"},{"setorWpd":"cti - urte","numero":"urt01","tipo":"uti","status":"l"},{"setorWpd":"cti - urte","numero":"urt02","tipo":"uti","status":"l"},{"setorWpd":"cti - urte","numero":"urt03","tipo":"uti","status":"l"},{"setorWpd":"cti - urte","numero":"urt04","tipo":"uti","status":"l"},{"setorWpd":"day-clinic","numero":"101.c","tipo":"day-clinic","status":"l"},{"setorWpd":"day-clinic","numero":"102.c","tipo":"day-clinic","status":"l"},{"setorWpd":"day-clinic","numero":"103.c","tipo":"day-clinic","status":"o"},{"setorWpd":"day-clinic","numero":"104.c","tipo":"day-clinic","status":"o"},{"setorWpd":"emergencia cardiologia hcor","numero":"uc.1","tipo":"uti","status":"l"},{"setorWpd":"emergencia cardiologia hcor","numero":"uc.2","tipo":"uti","status":"o"},{"setorWpd":"emergencia cardiologia hcor","numero":"uc.3","tipo":"uti","status":"l"},{"setorWpd":"emergencia cardiologia hcor","numero":"uc.4","tipo":"uti","status":"l"},{"setorWpd":"emergencia cardiologia hcor","numero":"uc.5","tipo":"uti","status":"l"},{"setorWpd":"emergencia cardiologia hcor","numero":"uc.6","tipo":"uti","status":"l"},{"setorWpd":"emergencia cardiologia hcor","numero":"uc.7","tipo":"uti","status":"l"},{"setorWpd":"unidade i hcor","numero":"105.c","tipo":"apartamento","status":"o"},{"setorWpd":"unidade i hcor","numero":"106.c","tipo":"enf. pediatrica","status":"l"},{"setorWpd":"unidade i hcor","numero":"107.c","tipo":"enf. pediatrica","status":"l"},{"setorWpd":"unidade i hcor","numero":"108.c","tipo":"enf. pediatrica","status":"r"},{"setorWpd":"unidade i hcor","numero":"109.c","tipo":"enf. pediatrica","status":"l"},{"setorWpd":"unidade i hcor","numero":"110.c","tipo":"apartamento","status":"o"},{"setorWpd":"unidade i hcor","numero":"111.c","tipo":"apartamento","status":"o"},{"setorWpd":"unidade i hcor","numero":"112.c","tipo":"apartamento","status":"l"},{"setorWpd":"unidade ii","numero":"en205","tipo":"enfermaria","status":"o"},{"setorWpd":"unidade ii","numero":"en206","tipo":"enfermaria","status":"l"},{"setorWpd":"unidade ii","numero":"en207","tipo":"enfermaria","status":"o"},{"setorWpd":"unidade ii","numero":"en208","tipo":"enfermaria","status":"l"},{"setorWpd":"unidade ii","numero":"st230","tipo":"suite","status":"o"},{"setorWpd":"unidade ii","numero":"st235","tipo":"suite","status":"o"},{"setorWpd":"unidade ii","numero":"st236","tipo":"suite","status":"o"},{"setorWpd":"unidade ii","numero":"st237","tipo":"suite","status":"o"},{"setorWpd":"unidade ii","numero":"201 c","tipo":"apartamento","status":"l"},{"setorWpd":"unidade ii","numero":"202 c","tipo":"apartamento","status":"o"},{"setorWpd":"unidade ii","numero":"203 c","tipo":"apartamento","status":"l"},{"setorWpd":"unidade ii","numero":"204 c","tipo":"apartamento","status":"i"},{"setorWpd":"unidade ii","numero":"209 c","tipo":"apartamento","status":"o"},{"setorWpd":"unidade ii","numero":"210 c","tipo":"apartamento","status":"o"},{"setorWpd":"unidade ii","numero":"211.c","tipo":"apartamento","status":"o"},{"setorWpd":"unidade ii","numero":"212.c","tipo":"apartamento","status":"l"},{"setorWpd":"unidade ii","numero":"213.c","tipo":"apartamento","status":"l"},{"setorWpd":"unidade ii","numero":"214.c","tipo":"apartamento","status":"l"},{"setorWpd":"unidade ii","numero":"215.c","tipo":"apartamento","status":"l"},{"setorWpd":"unidade ii","numero":"216.c","tipo":"apartamento","status":"l"},{"setorWpd":"unidade ii","numero":"217.c","tipo":"apartamento","status":"l"},{"setorWpd":"unidade ii","numero":"218.c","tipo":"apartamento","status":"l"},{"setorWpd":"unidade ii","numero":"219.c","tipo":"apartamento","status":"l"},{"setorWpd":"unidade ii","numero":"220.c","tipo":"apartamento","status":"m"},{"setorWpd":"unidade ii","numero":"221.c","tipo":"apartamento","status":"l"},{"setorWpd":"unidade ii","numero":"222.c","tipo":"apartamento","status":"l"},{"setorWpd":"unidade ii","numero":"223.c","tipo":"apartamento","status":"l"},{"setorWpd":"unidade ii","numero":"224.c","tipo":"apartamento","status":"l"},{"setorWpd":"unidade ii","numero":"225.c","tipo":"apartamento","status":"l"},{"setorWpd":"unidade ii","numero":"226.c","tipo":"apartamento","status":"a"},{"setorWpd":"unidade ii","numero":"227.c","tipo":"apartamento","status":"o"},{"setorWpd":"unidade ii","numero":"228.c","tipo":"apartamento","status":"l"},{"setorWpd":"unidade ii","numero":"229.c","tipo":"apartamento","status":"l"},{"setorWpd":"unidade ii","numero":"231.c","tipo":"apartamento","status":"o"},{"setorWpd":"unidade ii","numero":"232.c","tipo":"apartamento","status":"l"},{"setorWpd":"unidade ii","numero":"233.c","tipo":"apartamento","status":"o"},{"setorWpd":"unidade ii","numero":"234.c","tipo":"apartamento","status":"o"},{"setorWpd":"uti hc","numero":"ugc.1","tipo":"uti","status":"o"},{"setorWpd":"uti hc","numero":"ugc10","tipo":"uti","status":"o"},{"setorWpd":"uti hc","numero":"ugc11","tipo":"uti","status":"o"},{"setorWpd":"uti hc","numero":"ugc12","tipo":"uti","status":"l"},{"setorWpd":"uti hc","numero":"ugc.2","tipo":"uti","status":"o"},{"setorWpd":"uti hc","numero":"ugc.3","tipo":"uti","status":"o"},{"setorWpd":"uti hc","numero":"ugc.4","tipo":"uti","status":"o"},{"setorWpd":"uti hc","numero":"ugc.5","tipo":"uti","status":"o"},{"setorWpd":"uti hc","numero":"ugc.6","tipo":"uti","status":"o"},{"setorWpd":"uti hc","numero":"ugc.7","tipo":"uti","status":"l"},{"setorWpd":"uti hc","numero":"ugc.8","tipo":"uti","status":"o"},{"setorWpd":"uti hc","numero":"ugc.9","tipo":"uti","status":"o"}];
    this.leitos = jsonLeitos.map((obj: any) =>new Leito (obj));
    let jsonPacientes = [{"leito":"ugc10","registro":"0233258","prontuario":"000387878","mae":"maria de albuquerque almeida","nome":"everaldo de albuquerque almeida","nascimento":"1951-12-23","convenio":"bradesco"},{"leito":"ugc.7","registro":"0233332","prontuario":"000403473","mae":"alaide severina ferreira","nome":"antonio basio do nascimento","nascimento":"1964-06-17","convenio":"bradesco"},{"leito":"upo01","registro":"0231030","prontuario":"000403597","mae":"maria barreiros reis","nome":"joaquim barreiros reis","nascimento":"1926-02-03","convenio":"bradesco"},{"leito":"ugc.5","registro":"0233281","prontuario":"000376473","mae":"dalila sales bezerra","nome":"jose hernesto sobrinho","nascimento":"1945-09-17","convenio":"camed"},{"leito":"st236","registro":"0233312","prontuario":"000352660","mae":"elza de freitas","nome":"pitagoras de freitas da silva","nascimento":"1967-03-21","convenio":"cassi"},{"leito":"ugc11","registro":"0233348","prontuario":"000404134","mae":"rosiene maria da silva","nome":"rn de rosiene maria da silva","nascimento":"2020-04-22","convenio":"fundacaocordial"},{"leito":"ugc.9","registro":"0233166","prontuario":"000404099","mae":"adriana borges de lima santana","nome":"bruno jose lima dos santos","nascimento":"2015-10-19","convenio":"fundacaocordial"},{"leito":"l2hge","registro":"0177181","prontuario":"000391033","mae":"maria laura da conceicao","nome":"maria augusta dos santos","nascimento":"1942-05-08","convenio":"fundacaocordial"},{"leito":"l1hge","registro":"0222812","prontuario":"000401921","mae":"otacilia da silva","nome":"heleno francisco da silva","nascimento":"1950-02-08","convenio":"fundacaocordial"},{"leito":"106.c","registro":"0233370","prontuario":"000404140","mae":"marilane da silva","nome":"nicolas gabriel silva de souza","nascimento":"2019-07-01","convenio":"fundacaocordial"},{"leito":"ugc.8","registro":"0233246","prontuario":"000404120","mae":"santina marques","nome":"maria jose de oliveira silva","nascimento":"1933-05-04","convenio":"geap"},{"leito":"111.c","registro":"0231921","prontuario":"000399210","mae":"nitecy goncalves de abreu","nome":"carolina goncalves de abreu valenca","nascimento":"1982-04-15","convenio":"geap"},{"leito":"211.c","registro":"0233185","prontuario":"000404098","mae":"terezinha de jesus cerqueira santos","nome":"ricardo hamilton cerqueira santos","nascimento":"1960-11-26","convenio":"particular"},{"leito":"upo10","registro":"0232731","prontuario":"000404002","mae":"josefa rodrigues de moraes","nome":"maria jose dos santos","nascimento":"1922-02-09","convenio":"petrobras "},{"leito":"ugc.6","registro":"0233100","prontuario":"000404091","mae":"luzinete sampaio de mello","nome":"jose dacio de mello","nascimento":"1939-01-08","convenio":"unimed"},{"leito":"ugc.4","registro":"0233262","prontuario":"000395250","mae":"luzia lima de araujo","nome":"cicero targino de lima neto","nascimento":"1963-10-20","convenio":"unimed"},{"leito":"ugc.3","registro":"0233293","prontuario":"000364085","mae":"ida stefanelli mortari","nome":"umberto roberto mortari","nascimento":"1943-02-16","convenio":"unimed"},{"leito":"ugc.2","registro":"0232946","prontuario":"000403366","mae":"sandra maria da silva bezerra","nome":"alexandre ramos de lima","nascimento":"1984-02-26","convenio":"unimed"},{"leito":"ugc.1","registro":"0232111","prontuario":"000383226","mae":"julia maria da silva","nome":"marlene maria da silva","nascimento":"1938-07-10","convenio":"unimed"},{"leito":"uc.2","registro":"0233317","prontuario":"000404127","mae":"marilia araujo gomes","nome":"marina gomes do espirito santo","nascimento":"1997-04-15","convenio":"unimed"},{"leito":"206","registro":"0001937","prontuario":"000344705","mae":"rita rodrigues de souza","nome":"luiza rodrigues dos santos","nascimento":"1923-12-08","convenio":"unimed"},{"leito":"upo07","registro":"0233171","prontuario":"000379999","mae":"darcy de araujo medeiros","nome":"dilma darcy medeiros","nascimento":"1943-10-27","convenio":"unimed"},{"leito":"upo06","registro":"0232694","prontuario":"000355316","mae":"maria de lourdes nogueira","nome":"zilta da silva nogueira","nascimento":"1938-05-27","convenio":"unimed"},{"leito":"upo05","registro":"0233245","prontuario":"000404114","mae":"enilde moraes rodas","nome":"jose robson de moraes rodas","nascimento":"1958-01-31","convenio":"unimed"},{"leito":"upo04","registro":"0233103","prontuario":"000404092","mae":"nazarita costa de oliveira","nome":"cleber costa de oliveira","nascimento":"1952-07-09","convenio":"unimed"},{"leito":"upo03","registro":"0233330","prontuario":"000385879","mae":"gloria xavier gamito","nome":"vera lucia gamito ribeiro","nascimento":"1952-07-05","convenio":"unimed"},{"leito":"upo02","registro":"0232050","prontuario":"000403825","mae":"diamantina lins peixoto","nome":"rubiao lins peixoto","nascimento":"1934-09-11","convenio":"unimed"},{"leito":"st237","registro":"0233023","prontuario":"000404073","mae":"ernestina marques de omena","nome":"rosita joaquim pontes","nascimento":"1932-07-25","convenio":"unimed"},{"leito":"st235","registro":"0233314","prontuario":"000404128","mae":"marina coelho araujo","nome":"valeria elodia coelho araujo gomes","nascimento":"1957-02-10","convenio":"unimed"},{"leito":"st230","registro":"0233172","prontuario":"000397823","mae":"maria ionete pereira andrade","nome":"diego pereira gregorio de andrade","nascimento":"1989-11-06","convenio":"unimed"},{"leito":"en207","registro":"0233054","prontuario":"000403477","mae":"maria da silva bravo","nome":"gessi silva bravo","nascimento":"1936-12-02","convenio":"unimed"},{"leito":"en206","registro":"0233263","prontuario":"000370666","mae":"manoel alves bezerra ","nome":"osvaldo santos bezerra","nascimento":"1945-03-12","convenio":"unimed"},{"leito":"en205","registro":"0233063","prontuario":"000382543","mae":"santina manoel de lima","nome":"roberto assis de lima","nascimento":"1958-12-29","convenio":"unimed"},{"leito":"234.c","registro":"0233065","prontuario":"000397270","mae":"ana lucia de oliveira n castro","nome":"vittor fernando de oliveira castro","nascimento":"1988-03-06","convenio":"unimed"},{"leito":"233.c","registro":"0233041","prontuario":"000404078","mae":"anita mota gomes","nome":"murilo mota gomes","nascimento":"1955-11-10","convenio":"unimed"},{"leito":"231.c","registro":"0233099","prontuario":"000359635","mae":"dagmar de oliveira rodrigues","nome":"ana nery de oliveira rodrigues","nascimento":"1968-03-31","convenio":"unimed"},{"leito":"227.c","registro":"0232021","prontuario":"000345479","mae":"maria dolores de melo","nome":"maria luiza de melo pedroza","nascimento":"1963-12-10","convenio":"unimed"},{"leito":"210 c","registro":"0232967","prontuario":"000400550","mae":"julia eugenio alves","nome":"jose francisco alves","nascimento":"1949-09-08","convenio":"unimed"},{"leito":"209 c","registro":"0232878","prontuario":"000404040","mae":"elizete pereira de souza","nome":"telma pereira de souza nogueira","nascimento":"1970-01-23","convenio":"unimed"},{"leito":"202 c","registro":"0233333","prontuario":"000404132","mae":"walma espinheira fausto","nome":"valda espinheira fausto","nascimento":"1959-02-22","convenio":"unimed"},{"leito":"110.c","registro":"0232732","prontuario":"000350561","mae":"ana viana dos santos","nome":"alda viana goncalves ferreira","nascimento":"1957-07-04","convenio":"unimed"},{"leito":"105.c","registro":"0233259","prontuario":"000348427","mae":"maria jose de mendonca","nome":"benedito mendonca","nascimento":"1937-04-29","convenio":"unimed"},{"leito":"104.c","registro":"0233283","prontuario":"000367591","mae":"maria gomes de lucena","nome":"antonio neto de lucena","nascimento":"1955-04-23","convenio":"unimed"},{"leito":"103.c","registro":"0233158","prontuario":"000404090","mae":"teodoro almeida","nome":"osmario cardoso almeida","nascimento":"1943-10-23","convenio":"unimed"}]
    this.pacientes = jsonPacientes.map((obj: any) =>new Paciente (obj));

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
        this.show()
      }
    }

    static findElement(element, searchElement) {
      let found = false;
      while (element != undefined) {
        if (element == searchElement) found = true;
        element = element.parentNode;
      }
      return found
    }

  showPaciente(leitoSpan) {
    const pacienteInfo = this.render.nextSibling(leitoSpan);
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
    const pacienteInfo = this.render.nextSibling(leitoSpan);
    this.render.setProperty(pacienteInfo, 'hidden', true);
  }
}
