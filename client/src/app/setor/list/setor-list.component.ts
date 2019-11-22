import {Component, OnInit} from '@angular/core';
import {SetorService} from "../../core/setor/setor.service";
import {Setor} from "../../core/setor/setor";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {faFrown, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder} from "@angular/forms";


@Component({
  selector: 'app-setor-list',
  templateUrl: './setor-list.component.html',
  styleUrls: ['./setor-list.component.scss']
})
export class SetorListComponent implements OnInit {
  faFrown = faFrown;
  faSearch = faSearch;
  faPlus = faPlus;
  setores: Setor[];
  data: Setor[];
  searchForm = this.fb.group({
    searchControl: ['']
  });

  constructor(private setorService: SetorService, private spinner: SpinnerService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.spinner.show();
    this.setorService.list().subscribe(setores => {
      this.data = setores;
      this.setores = this.data;
      this.spinner.hide();
    });
  }

  search() {
    this.searchForm.get('searchControl').valueChanges.subscribe(res => {
      this.setores = this.data.filter(function (obj) {
        return `${obj.id}`.includes(res.toUpperCase()) || obj.descricao.includes(res.toUpperCase());
      });
    });
  }
}
