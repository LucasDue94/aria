import {Component, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {ModalService} from "../../core/modal/modal.service";
import {faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'aria-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() footer: string;
  @Input() theme: string; // info, danger, warning
  @Input() size: string; //small, medium, larger
  @Output() clickedElement = new EventEmitter();
  @ViewChild('modalContainer', {static: false}) modalContainer;
  @ViewChild('header', {static: false}) header;
  faTimes = faTimes
  private status: boolean;
  private width: string;
  private height: string;

  constructor(private modalService: ModalService, private render: Renderer2) {
  }

  ngOnInit() {
    this.modalService.listen().subscribe(status => {
      this.status = status
      this.handleModal(this.status);
      this.setSize();
      this.setTheme();
    })
  }

  setTheme() {
    switch (this.theme) {
      case 'info':
        this.render.setStyle(this.header.nativeElement, 'background-color', '#007bff');
        this.render.setStyle(this.header.nativeElement, 'color', '#FFFFFF');
        break;
      case 'warning':
        this.render.setStyle(this.header.nativeElement, 'background-color', '#d48c00');
        this.render.setStyle(this.header.nativeElement, 'color', '#FFFFFF');
        break;
      case 'danger':
        this.render.setStyle(this.header.nativeElement, 'background-color', '#c26267');
        this.render.setStyle(this.header.nativeElement, 'color', '#FFFFFF');
        break;
      default :
        this.render.setStyle(this.header.nativeElement, 'background-color', '#2D9DD1');
        this.render.setStyle(this.header.nativeElement, 'color', '#FFFFFF');
        break;
    }
  }

  setSize() {
    switch (this.size) {
      case 'small':
        this.width = '30%';
        this.height = '21%';
        break;
      case 'medium':
        this.width = '55%';
        this.height = '45%';
        break;
      case 'larger':
        this.width = '80%';
        this.height = '56%';
        break;
      default:
        this.width = '30%';
        this.height = '21%';
        break;
    }
  }

  handleModal(open: boolean) {
    const call = open ? 'addClass' : 'removeClass';
    const parent = this.render.parentNode(this.modalContainer.nativeElement);
    const root = document.getElementsByTagName('app-root');
    const backgroundModal = document.getElementById('background-modal');
    const mainBody = document.getElementById('body-app');
    this.render[call](parent, 'modal-open')
    this.render[call](backgroundModal, 'active-background-modal');
    this.render[call](mainBody, 'blur');
    this.render.appendChild(root[0], this.modalContainer.nativeElement);
  }

  @HostListener('document:click', ['$event']) clickout(event) {
    this.clickedElement.emit(event.target);
    const backgroundModal = document.getElementById('background-modal');
    if (event.target == backgroundModal) {
      this.status = false
      this.handleModal(false);
    }
  }

  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
    if (event.key == "Escape") {
      this.close();
    }
  }

  close = () => {
    this.status = false;
    this.handleModal(this.status);
  }
}
