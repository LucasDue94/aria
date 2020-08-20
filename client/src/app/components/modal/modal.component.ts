import {
  Component,
  DoCheck,
  ElementRef,
  HostListener,
  Input,
  KeyValueDiffers,
  OnChanges, OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ModalService} from '../../core/modal/modal.service';
import {Modal} from '../../core/modal/entities/modal';
import {ModalType} from '../../core/modal/entities/enumerators/modalType.enum';
import {ModalSize} from '../../core/modal/entities/enumerators/modalSize.enum';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'aria-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

/**
 * @classdesc Modal Component is a class responsible for to render custom-modal.
 * @property Modal property describes a modal type instance
 * @property modalContainer property is the main modal container
 * @property modifiedObject checks changes in modal instance
 */
export class ModalComponent implements DoCheck, OnChanges, OnInit {
  @Input() modal: Modal;
  @ViewChild('modalContainer', {read: ElementRef, static: false}) modalContainer: ElementRef;
  @ViewChild('modalBackground', {read: ElementRef, static: false}) modalBackground: ElementRef;
  modifiedObject: any;
  open: boolean;
  readonly MODAL_INTERNAL_STATUS_PROPERY = 'internalStatus';
  modalParent: ElementRef;
  body: Element;
  currentUrl;
  modalTag;

  /**
   *
   * @param render is a custom renderer to bypass Angular's templating and make custom UI changes that can't be expressed declaratively.
   * @param differs is a helper to deal with differences. It will be used to detect changes in the modal instance properties.
   * @param modalService is a service that is responsible for listening and sending modals' answers.
   * @param router
   */
  constructor(private modalService: ModalService, private render: Renderer2, private differs: KeyValueDiffers,
              private router: Router) {
    this.modifiedObject = differs.find({}).create();
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (this.currentUrl === undefined) {
          this.currentUrl = e.url;
        }
      }
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        if (this.currentUrl !== e.url) {
          this.handleModal(false);
        }
      }
    });
  }

  /**
   * @description event used to detect changes in modal controlled by the service.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (this.modal) {
      if (this.modal.type === ModalType.CONFIRM) {
        this.handleModal(true);
      }
    }
  }

  /**
   * @description The method was created to append modal in body or move to origin parent.
   * @param open is a boolean. If open is true then append in body else append in origin parent.
   */
  handleAppend(open: boolean) {
    if (this.modalContainer) {
      if (open) {
        this.modalTag = this.render.parentNode(this.modalBackground.nativeElement);
        this.modalParent = this.render.parentNode(this.modalTag);
        const body = document.getElementsByTagName('body')[0];
        this.render.appendChild(body, this.modalTag);
      } else {
        if (this.modalParent && this.modalTag) {
          this.render.appendChild(this.modalParent, this.modalTag);
        }
      }
    }
  }

  /**
   * @description The method was created to apply ou remove blur in modal.
   * @param useBlur is a boolean. If useBlur is true then apply the blur else remove the blur.
   */
  handleBlur(useBlur: boolean) {
    const appRoot = document.getElementsByTagName('app-root')[0];
    this.render[useBlur ? 'addClass' : 'removeClass'](appRoot, 'blur');
  }

  /**
   * @description event used to detect changes in modal instance properties that are not detected in OnChanges
   */
  ngDoCheck() {
    const changes = this.modifiedObject.diff(this.modal);

    if (changes) {
      changes.forEachChangedItem(propertyChange => {
        if (propertyChange.key === this.MODAL_INTERNAL_STATUS_PROPERY) {
          this.handleModal(propertyChange.currentValue ? propertyChange.currentValue : false);
        }
      });
    }
  }

  /**
   * @description The method was created to open or close the modal.
   * @param open is a boolean. If open is true then open modal else close the modal.
   */
  handleModal(open: boolean) {
    const appRoot = document.getElementsByTagName('app-root')[0];
    this.render[open ? 'addClass' : 'removeClass'](appRoot, 'open-modal');
    this.open = open;
    if (open) {
      this.modalTag = this.render.parentNode(this.modalBackground);
    }
    if (this.modal && this.modal.blur) {
      this.handleAppend(this.open);
      this.handleBlur(this.open);
    }
  }

  /**
   * @description This method listens for keyboard events and checks if you clicked 'escape' to close the modal.
   */
  @HostListener('document:keydown', ['$event']) handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      if (this.modal) {
        this.sendAnswer(false);
        this.modal.close();
      }
    }
  }

  /**
   * @description This method get default modal size.
   */
  getDefaultSize = () => this.modal && this.modal.size ? this.modal.size : ModalSize.SMALL;

  /**
   * @description This method apply modal color theme.
   */
  applyTheme = () => this.modal && this.modal.theme ? `${this.modal.theme}-theme` : '';

  /**
   * @description This method return if type modal is custom.
   */
  isCustom = () => this.modal && this.modal.type === ModalType.CUSTOM;

  /**
   * @description This method returns a boolean with the response to modal calls: confirm, dialog and prompt.
   */
  sendAnswer(answer: boolean) {
    this.modalService.send(answer);
    this.handleModal(false);
  }
}
