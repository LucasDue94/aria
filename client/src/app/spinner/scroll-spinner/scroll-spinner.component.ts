import {Component, Input, OnInit} from '@angular/core';
import {faHeart} from "@fortawesome/free-solid-svg-icons/faHeart";

@Component({
  selector: 'app-scroll-spinner',
  templateUrl: './scroll-spinner.component.html',
  styleUrls: ['./scroll-spinner.component.scss']
})
export class ScrollSpinnerComponent implements OnInit {
  @Input() show = false;
  faHeart = faHeart;

  constructor() { }

  ngOnInit() {
  }

}
