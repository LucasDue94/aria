import {Component, ElementRef, OnInit} from '@angular/core';
import * as jsPdf from "jspdf";
import {UserOptions} from "jspdf-autotable";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor() {
    interface jsPDFWithPlugin extends jsPdf {
      autoTable: (options: UserOptions) => jsPdf;
    }
  }

  ngOnInit() {
  }


  headerPdf() {
    console.log("HEADER");
  }

  bodyPdf(data: any[], chart?: ElementRef) {
    this.headerPdf();
    this.footerPdf()
  }

  footerPdf() {
    console.log('FOOTER');
  }

}
