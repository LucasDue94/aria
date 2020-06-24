import {Component} from '@angular/core';
import {ModalService} from "../core/modal/modal.service";

@Component({
  selector: 'prontuario',
  templateUrl: './prontuario.component.html',
  styleUrls: ['./prontuario.component.scss']
})
export class ProntuarioComponent {
  paciente = {
    nome: 'Joaquim José da Silva Xavier',
    sexo: 'Masculino',
    nascimento: '11/06/1960 (60 anos)',
    prontuario: '38465468',
    registro: '056546',
    convenio: 'Unimed',
    mae: 'Maria José da Silva Xavier da Silva Sauro',
    status: 'internado',
    setor: 'UTI',
    leito: '02'
  }

  evolucao = {
    conteudo: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\n' +
      '\n',
    medico: 'Patrícia Caldas de Oliveira',
    crm: '5320',
    data: '01/07/2019 10:13:44'
  }

  constructor(private modalService: ModalService) {
  }

  cutText = (text, width) => text.length > 120 ? text.slice(0, width) + '...' : text;

  openModal() {
    this.modalService.open();
  }

  click(){
    alert('foon')
  }
}
