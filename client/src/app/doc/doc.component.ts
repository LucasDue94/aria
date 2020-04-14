import {AfterViewInit, Component, OnInit} from '@angular/core';
import { swaggerUIBundle, swaggerUIStandalonePreset } from '../../polyfills';
import {TitleService} from "../core/title/title.service";

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss']
})
export class DocComponent implements OnInit, AfterViewInit {

  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
   this.titleService.send('Documentação')
  }

  ngAfterViewInit(): void {
    const ui = swaggerUIBundle({
      url: 'http://localhost:3002/v1/doc',
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [
        swaggerUIBundle.presets.apis,
        swaggerUIStandalonePreset
      ],
      plugins: [
        swaggerUIBundle.plugins.DownloadUrl
      ],
      layout: 'StandaloneLayout'
    });
  }

}


