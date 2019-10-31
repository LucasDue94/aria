export class Alert {
  message: string;
  icon: string;
  type: string;
  constructor(object?) {
    for (var prop in object) {
      this[prop] = object[prop];
    }
  }
}
