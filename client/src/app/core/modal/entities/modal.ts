import {ModalTheme} from './enumerators/modalTheme.enum';
import {ModalSize} from './enumerators/modalSize.enum';
import {ModalType} from './enumerators/modalType.enum';

/**
 * @classdesc this class is responsible for representing the characteristics and behavior of the modal.
 */

export class Modal {
  /**
   * @propertydesc this property is the message in modal body.
   */
  message: string;

  /**
   * @propertydesc this property is the modal type ( CUSTOM, ALERT, PROMPT OR CONFIRM )
   */
  type: ModalType;

  /**
   * @propertydesc this property is the header title.
   */
  title: string;

  /**
   * @propertydesc this property is the modal theme. By default is INFO.
   */
  theme = ModalTheme.INFO;

  /**
   * @propertydesc this property is the modal size on screen. By default is MEDIUM.
   */
  size = ModalSize.MEDIUM;

  /**
   * @propertydesc this property is used for show/hide cancel button in component.
   */
  useCancel = true;

  /**
   * @propertydesc this property is used for show/hide trash icon in confirm button.
   */
  useTrashIcon = false;

  /**
   * @propertydesc this property set the confirmation button name. Default is ok.
   */
  confirmationButtonName = 'Ok';

  /**
   * @propertydesc this property set a custom height in modal.
   */
  height: string;

  /**
   * @propertydesc this property set a custom width in modal.
   */
  width: string;

  /**
   * @propertydesc this property is used for enable/disable the blur. Default is true.
   */
  blur = true;

  /**
   * @propertydesc this property is modal status. By default is true.
   */
  private internalStatus = false;

  constructor(obj?) {
    if (obj) {
      for (const prop of Object.keys(obj)) {
        this[prop] = obj[prop];
      }
    }
  }

  /**
   * @method this method open the modal.
   */
  public open() {
    this.internalStatus = true;
  }

  /**
   * @method this method close the modal.
   */
  public close() {
    this.internalStatus = false;
  }

  /**
   * @method this method return modal status.
   */
  get status() {
    return this.internalStatus;
  }

}
