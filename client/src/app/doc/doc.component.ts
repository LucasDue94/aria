import {AfterViewInit, Component, OnInit} from '@angular/core';
import { swaggerUIBundle, swaggerUIStandalonePreset } from '../../polyfills';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss']
})
export class DocComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const ui = swaggerUIBundle({
      url: 'http://localhost:3002',
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


