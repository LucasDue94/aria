import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'grupo-braden',
  templateUrl: './grupo-braden.component.html',
  styleUrls: ['./grupo-braden.component.scss']
})
export class GrupoBradenComponent implements OnInit {

  @Input() BRADEN;
  groupBraden = this.fb.group({});

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

}
