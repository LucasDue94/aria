import {Component, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ModalService} from "../../core/modal/modal.service";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";

@Component({
  selector: 'aria-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  faTimes = faTimes
  private status: boolean;
  @ViewChild('modalContainer', {static: false}) modalContainer;

  constructor(private modalService: ModalService, private render: Renderer2) {
  }

  ngOnInit() {
    this.modalService.listen().subscribe(status => {
      this.status = status
      this.handleModal(this.status);
    })
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
