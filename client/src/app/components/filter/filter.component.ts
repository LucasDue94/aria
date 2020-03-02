import { Component, OnInit } from '@angular/core';
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  faIconSearch = faSearch
  constructor() { }

  ngOnInit() {
    console.log('klsnd')
  }

}
