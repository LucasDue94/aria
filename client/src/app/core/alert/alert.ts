import {Icon} from "@fortawesome/fontawesome-svg-core";

export class Alert {
  message: string;
  icon: Icon;
  type: string;
  constructor(object?) {
    for (var prop in object) {

      if (object.hasOwnProperty('icon')) {
        this.icon = object['icon'];
        delete object['icon'];
      }
      this[prop] = object[prop];
    }
  }
}
