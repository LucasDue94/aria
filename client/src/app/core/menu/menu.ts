import {IconDefinition} from "@fortawesome/fontawesome-common-types";

export class Menu {

  name: string;
  status: boolean;
  permission: string;
  faIcon: IconDefinition;
  router: string[];

  constructor(object?: any) {
    if (object) {
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }
  }
}
