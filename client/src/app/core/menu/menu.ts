import {IconDefinition} from '@fortawesome/fontawesome-common-types';

export class Menu {

  name: string;
  status = false;
  permission: string;
  faIcon: IconDefinition;
  router: string[];

  constructor(object?: any) {
    Object.assign(this, object);
  }
}
