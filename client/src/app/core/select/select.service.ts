import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  currentSelect = null;
  previousSelect = null;

  constructor() {
  }


  emit(element) {
    this.previousSelect = this.currentSelect;
    this.currentSelect = element;

    if (this.currentSelect != this.previousSelect && this.previousSelect != null)
      this.previousSelect.show = false;
  }
}
