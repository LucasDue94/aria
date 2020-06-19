import {Component, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ModalService} from "../../core/modal/modal.service";

@Component({
  selector: 'aria-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  private currentStatus: boolean;
  private previousStatus: boolean
  @ViewChild('modalContainer', {static: false}) modalContainer;

  constructor(private modalService: ModalService, private render: Renderer2) {
  }

  ngOnInit() {
    this.modalService.listen().subscribe(status => {
      this.currentStatus = status
      this.previousStatus = this.previousStatus != this.currentStatus ? this.currentStatus : this.previousStatus
      this.handleModal(this.currentStatus);
    })
  }

  handleModal(open: boolean) {
    const call = open ? 'addClass' : 'removeClass';
    const parent = this.render.parentNode(this.modalContainer.nativeElement);
    const backgroundModal = document.getElementById('background-modal');
    this.render[call](backgroundModal, 'active-background-modal');
    this.render[call](parent, 'modal-open')
  }

  @HostListener('document:click', ['$event']) clickout(event) {
    const backgroundModal = document.getElementById('background-modal');
    if (event.target == backgroundModal) {
      this.handleModal(false);
    }
  }
}
