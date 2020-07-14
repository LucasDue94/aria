import {Component, OnInit} from '@angular/core';
import {Cid} from '../core/cid/cid';
import {CidService} from '../core/cid/cid.service';

@Component({
  selector: 'aria-diagnostico',
  templateUrl: './diagnostico-list.component.html'
})
export class DiagnosticoListComponent implements OnInit {

  cidList: Cid[] = [];
  cids;

  constructor(private cidService: CidService) { }

  ngOnInit() {
    this.cids = this.cidService;
    this.cidService.list().subscribe((cidList: Cid[]) => {
      this.cidList = cidList;
    });
  }
}
