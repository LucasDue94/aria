export class Alternative {
  option: string;
  description: string;
  value: string;

  constructor(object?: any) {
    if (object) {
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }
  }
}
